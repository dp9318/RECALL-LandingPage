# Authentication and Protected Download Flow

## Product behavior

A visitor can view all marketing content without signing in. Clicking the primary download CTA opens the login page. After successful login, the user returns to the download action and receives the currently approved official Windows ZIP.

## Initial identity provider

Use **GitHub OAuth via Supabase Auth** first. The audience is developers and RECALL is already hosted on GitHub. Do not render a Google/email option unless it has been configured, verified, and tested. A secondary email magic-link option may be added later if user research supports it.

Authentication means “the person has signed in”; it does not automatically mean they are an authorized member of an invite-only beta. If the product team requires approval, implement a separate server-checked allowlist/role policy and tests.

## Flow

1. Visitor presses “Sign in to download”.
2. Navigate to `/login?returnTo=/download` (or equivalent). Validate and normalize the return path server-side.
3. Supabase Auth starts GitHub OAuth with a strict, registered redirect URL.
4. `/auth/callback` exchanges the code using the supported SSR/PKCE pattern and establishes cookies.
5. The app redirects to the validated internal download route.
6. The server verifies the current user, applies any additional permission rule, and checks user/IP rate limits.
7. The server resolves the approved current release version and fixed object key from server-side config.
8. The server creates a short-lived signed URL from the private bucket and redirects or returns it with safe cache headers.
9. The UI records only a minimal success/failure status; no access token or signed URL is stored client-side longer than necessary.

## Route contract (proposed)

- `GET /login`: accessible login page.
- `GET /auth/callback`: supported OAuth callback handler.
- `GET /api/download`: protected route; verifies session; 302/307 redirects to the signed URL or uses an equivalent controlled mechanism.
- Optional `GET /download`: friendly page that presents release version, release notes, requirements, and the button; actual artifact hand-off still uses the protected route.

Exact route names may be adapted to an existing codebase, but the separation of public UI and protected server logic must remain.

## Safe redirect rules

- Accept only a single internal path like `/download` or a small allowlist of internal destinations.
- Reject absolute URLs, protocol-relative URLs (`//evil.example`), unexpected schemes, CRLF, encoded traversal, and malformed values.
- Provide a default fallback route if validation fails.

## Supabase Storage configuration

- Bucket name is configured on the server (e.g. `recall-releases`), not passed by the user.
- Bucket visibility: **private**.
- Object path and approved release version come from validated server-side release metadata.
- Signed URL expiry: start at 120 seconds; test with realistic download startup and proxy behavior before finalizing.
- If supported, set the download filename explicitly.
- Never store signed URLs in a database audit log or application log.

## Rate limits (initial values)

- Authenticated user: 10 download URL attempts per 10 minutes.
- IP-derived backstop: 30 attempts per 10 minutes.
- Return 429 + retry information for exceeding the limit.
- Public contact form, if added: 5 submissions per hour per IP and server-validated Turnstile when needed.

These values are a starting point, not a claim of universal best practice. Verify the correct IP extraction mechanism on Vercel and tune after launch.

## User experience states

- Signed out: “Sign in to download” with a simple explanation.
- Signing in: loading state; prevent duplicate submissions.
- Login cancelled/failed: show a retry path and keep the user on a safe public route.
- Signed in and ready: show release version, OS/system requirements, and a clear download action.
- Rate limited: explain when to retry, without exposing infrastructure details.
- Release unavailable: clear status, link to public source/docs, no raw storage errors.
- Expired signed URL: re-verify session and request a fresh URL; never reuse a stale URL indefinitely.
