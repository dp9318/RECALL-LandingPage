# Security Specification and Release Gate

## 1. Security goals

1. Only authenticated users can receive the official website download URL.
2. The server, not the browser, determines authentication and authorization.
3. Private release artifacts and secrets remain inaccessible without authorization.
4. Rate limits reduce brute force, scraping, and download-link abuse.
5. Website data is separated from RECALL's local memory data.
6. Logs and analytics avoid leaking tokens, signed URLs, custom instructions, or source code.

## 2. Threat model

Protect against:
- Unauthenticated direct calls to the download route.
- Forged/stale client-side auth state.
- Brute force, credential stuffing, OAuth callback abuse, and excessive link issuance.
- Exposure of a public bucket/object path or privileged Supabase credential.
- Stolen/forwarded signed URLs during their valid window.
- Open redirects via an attacker-controlled `next`/`returnTo` parameter.
- Cross-site request attempts, XSS, unsafe dynamic HTML, injection into forms/URLs, and dependency supply-chain risks.
- Secrets committed in `.env`, MCP configuration, logs, screenshots, or generated artifacts.
- Misleading privacy claims about local-first processing.

## 3. Authentication and session

- Use Supabase Auth with the current official Next.js server-side integration. Cookie-based session handling and PKCE are preferred for the App Router; confirm the current `@supabase/ssr` guidance during setup because auth libraries evolve.
- Validate the user/session on the server in every protected route. Never use local state or `getSession()` alone as the authority for sensitive server-side authorization; follow the current official recommended verified-user pattern.
- Validate OAuth `state`/callback through the supported Supabase flow. Restrict allowed callback and site URLs to the real domains and localhost development URLs only.
- `returnTo` must be a relative path or match a strict same-origin allowlist. Reject arbitrary external URLs.
- Configure session cookies securely through the supported framework library (`HttpOnly`, `Secure` in production, appropriate `SameSite`, sane lifetime/refresh behavior).
- Logout clears the session and returns to a public route.
- Initial policy: any verified signed-in user can request the official download. If this is meant to be invite-only or limited to approved users, add an explicit authorization policy; authentication alone only proves identity.

## 4. Download authorization

- Store the official Windows ZIP in a private Supabase Storage bucket.
- A single server route, e.g. `GET /api/download`, validates the session, authorization policy, release availability, and rate-limit decision before creating a short-lived signed URL or redirecting to it.
- Proposed signed URL expiry: 120 seconds, subject to browser/download tests. A signed URL is a bearer credential during its lifetime; do not log it and do not claim it is instantly revocable.
- Do not accept a client-supplied object path, bucket name, filesystem path, URL, or release version without validating it against server-controlled release metadata. Prevent arbitrary file access and open redirects.
- Set a controlled filename (e.g. `recall-<version>-windows.zip`) when supported.
- If the official artifact remains publicly attached to a GitHub Release, the download gate is bypassable. Move the official gated ZIP to private storage or explicitly describe the gate as a website convenience, not artifact protection.
- The source repository can remain public under MIT. The gate does not prevent users from cloning, building, or redistributing code under the license.

## 5. Rate limiting and bot mitigation

Use at least two identifiers where practical: authenticated Supabase user ID and a carefully derived network identifier for abuse protection. Avoid untrusted forwarded headers unless using platform-documented trusted IP extraction.

Initial policy proposals (tune after testing and traffic observations):

- `GET /api/download`: up to 10 requests per authenticated user per 10 minutes, plus an IP-based backstop of 30 requests per 10 minutes.
- Contact submission (if built): 5 attempts per IP per hour, add server-side Turnstile verification if abuse is observed.
- Sign-up/sign-in: retain Supabase Auth built-in limits; consider edge rules and Turnstile before adding aggressive duplicate application limits that lock out legitimate users.
- Rate-limit key generation must not use raw user input; normalize inputs and bound their size.
- Protected download URL issuance should fail closed with a safe retryable 503 if the central limiter is unavailable, rather than silently skipping the security control.
- Return `429 Too Many Requests` and a useful `Retry-After` value when appropriate. Never reveal whether a particular account exists in public auth errors.

Vercel Firewall/edge limits are an additional layer where available, not a substitute for route-level policy. Upstash handles application-specific quotas. Turnstile tokens must be verified server-side and bound to the expected hostname/action where supported.

## 6. Database and storage

- Private release bucket; no public object URLs for the protected ZIP.
- Enable RLS on all user-created/website application tables.
- Do not let browser clients self-assert download authorization or write arbitrary audit rows.
- Keep privileged server credentials server-only, scoped to minimum capabilities, and rotate if exposed.
- Do not store RECALL memory content, local SQLite databases, ChromaDB files, source code snippets, project conversations, or custom instructions in website storage.
- Minimize data retention. If a download-event table is used, store user ID, release version, timestamp, and outcome only unless a documented need justifies more.

## 7. App and HTTP protections

- Validate all server inputs with schemas and enforce request size limits.
- Use parameterized database access/SDKs; do not construct raw SQL from user input.
- Avoid `dangerouslySetInnerHTML`; if unavoidable, sanitize a narrowly defined input with a well-reviewed sanitizer.
- Configure a tested Content Security Policy and security headers, including frame protection (CSP `frame-ancestors`), `X-Content-Type-Options: nosniff`, and a suitable `Referrer-Policy`. Do not deploy a too-strict CSP that breaks the OAuth callback or required assets; use report-only first if needed.
- Enforce HTTPS on production. Use trusted origin checks for state-changing routes and avoid CORS `*` with credentials.
- Keep detailed error information server-side; present non-sensitive messages to visitors.
- Do not cache authenticated API responses or signed URL responses in a shared CDN cache. Use appropriate `Cache-Control: private, no-store` on sensitive responses.
- Set a least-privilege policy for allowed MCP tools in Antigravity; do not grant blanket access to unknown tools.

## 8. Secrets and operations

- Never commit tokens, `.env.local`, OAuth client secrets, Supabase service credentials, Upstash tokens, Figma tokens, or 21st API keys.
- Add `.env*` to ignore rules while explicitly allowing safe `.env.example` files with blank placeholders.
- Use separate Vercel Development, Preview, and Production environments. Restrict production secret access to maintainers who need it.
- A workspace `.agents/mcp_config.json` may be tracked by Git. Do not put real 21st or Figma keys there. Prefer `%USERPROFILE%\.gemini\config\mcp_config.json` for local, credential-bearing Antigravity configuration.
- Do not log Authorization headers, cookies, access/refresh tokens, raw request bodies from auth forms, private storage URLs, or raw local-IP details.
- Enable dependency update/security alerts and review registry components before adding dependencies.

## 9. Privacy, crawler access, analytics

- Publish a privacy policy before enabling optional analytics or public forms that collect personal data.
- Make email provider, analytics and error-monitoring choices consistent with the published policy.
- Review crawler access intentionally. Public marketing pages may be crawled; auth/private routes should not be exposed in sitemaps and must still enforce authorization even if robots directives are misconfigured.
- `robots.txt` and `llms.txt` are not access-control systems.

## 10. Security verification before production

- [ ] Unauthenticated call to the download route cannot issue or leak a signed URL.
- [ ] Authenticated flow works only for the configured policy.
- [ ] Expired/invalid cookie and OAuth state failures are safe.
- [ ] External `returnTo` URLs are rejected.
- [ ] Direct public object URL cannot access the private ZIP.
- [ ] Signed URL expires in the intended short interval; URL never appears in app logs.
- [ ] Rate limit works across independent requests/instances; 429 and retry behavior tested.
- [ ] Upstash failure follows documented fail-closed behavior on download issuance.
- [ ] Browser clients cannot read other users' data or write privileged audit entries.
- [ ] No secret found in repository history/current tree/build output.
- [ ] CSP/headers verified without breaking auth, metadata, styles, and assets.
- [ ] CI tests and dependency scans pass.
- [ ] Privacy and terms pages linked from footer.
- [ ] Public repo/asset paths do not silently bypass the stated download policy.
