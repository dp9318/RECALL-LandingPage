# RECALL Landing Page — Two-Person Work Split

This plan lets Dipankar and Shiva work in parallel with separate Antigravity sessions while minimizing merge conflicts and security gaps.

## Goal

Deliver a polished, responsive RECALL public landing page inspired by the supplied Dribbble lodge design, with credible product messaging, SEO/social metadata, real Supabase authentication, a genuinely protected official download, rate limiting, tests, and Vercel deployment readiness.

The landing site is separate from RECALL's existing local-first Python/MCP/FastAPI engine and dashboard. Do not replace or migrate the existing `frontend/` dashboard. Unless repository audit discovers an already-established marketing-site app, place the new Next.js site in a dedicated `website/` directory in the monorepo, with its own `package.json` and lockfile.

## Ownership

### Dipankar — Product UI, visual design, content, SEO, integration lead

Own:
- Visual implementation faithful to `DESIGN.md` and the lodge-reference mood, translated into RECALL-specific visuals.
- Responsive navigation, hero, feature sections, workflow/architecture explainer, privacy/trust section, download CTAs, footer.
- Design tokens, marketing components, shared UI primitives and page-level visual states.
- Public copy based on verified `README.md` and docs; no invented testimonials, contact details, performance claims, release status, or compatibility claims.
- Global/root layout, metadata, canonical URL, Open Graph/X card tags, social preview asset, favicon, sitemap, robots.txt, optional `llms.txt`, truthful JSON-LD.
- Integrating Shiva's auth/download work into the page and doing the final visual/regression pass.
- Owns shared UI files, global CSS/design tokens, root layout/metadata, `website/package.json`, lockfile and shared config changes. Shiva should request dependency changes rather than editing the package manifest independently.

Suggested files (adjust after audit):
- `website/app/(marketing)/page.tsx`
- `website/app/layout.tsx`
- `website/app/globals.css`
- `website/components/marketing/**`
- `website/components/ui/**`
- `website/lib/seo/**`
- `website/app/sitemap.ts`
- `website/app/robots.ts`
- `website/public/og/recall-social.png`
- `website/public/llms.txt`

### Shiva — Authentication, protected downloads, security, tests, operations

Own:
- Supabase Auth integration and login/logout/callback/error/loading states.
- Server-side session verification; never trust client-only auth state for authorization.
- Private Supabase Storage configuration instructions and fixed, server-controlled release object key/version configuration.
- Protected download endpoint, short-lived signed URL issuance, and safe failure behavior.
- Upstash rate limits keyed by user and trusted client IP; robust handling of rate-limiter outages.
- Download-flow audit events only if approved, minimal, and described by privacy documentation.
- Security tests for authorization, malicious `returnTo`, guessed object paths, URL expiry, rate limits and missing configuration.
- Vercel environment/redirect/callback setup guidance, security headers, secret handling, release upload/update runbook, deployment checklist, and auth/download test instructions.
- Report any package dependencies needed to Dipankar, who maintains `website/package.json` and the lockfile.

Suggested files (adjust after audit):
- `website/app/(auth)/login/page.tsx`
- `website/app/auth/callback/route.ts`
- `website/app/api/download/route.ts`
- `website/lib/supabase/**`
- `website/lib/security/**`
- `website/lib/downloads/**`
- `website/lib/ratelimit/**`
- `website/tests/auth-download/**`
- `website/.env.example` (placeholders only; coordinate before adding shared environment names)
- Relevant focused updates to `AUTH_AND_DOWNLOAD.md`, `SECURITY.md`, `DEPLOYMENT.md` and `TASKS.md`

Shiva should use Dipankar's existing exported UI primitives, but must not modify shared marketing components, global styles or root layout without coordinating first.

## Collaboration protocol

### Phase 0 — Agree on the base before parallel work

1. Both people open the same RECALL repository in separate local clones or separate Git worktrees. Do **not** have two Antigravity sessions edit the same working directory at the same time.
2. Dipankar starts a small scaffold/base branch after auditing the repository and docs. Confirm site location, framework, package manager, scripts, test setup, environment variable names, routing conventions and available MCP tools.
3. Add only the website scaffold, minimal buildable shell, shared types/config, `.env.example`, and documented scripts. Do not build the whole page or add provider secrets in this base phase.
4. Push and merge the base through the repository's normal PR workflow. The existing RECALL docs specify feature branches and PRs into `integration/recall`; verify current team workflow before targeting a branch.
5. Once the base is merged, both create their own feature branches from the same updated base.

### Parallel work rules

- Dipankar's branch: `feature/landing-page-ui-seo`
- Shiva's branch: `feature/landing-page-auth-security`
- Keep commits focused. Each person should tell the other about shared contracts before changing route names, exported component props, environment variable names or release config.
- Only Dipankar edits `website/package.json`, its lockfile, root layout, global styles, design tokens and shared UI primitives. Shiva sends dependency requests with package name and reason.
- Only Shiva owns auth/session/download server logic and protected-download tests. Dipankar must not implement a fake client-side login or duplicate authorization checks in UI as a substitute for server authorization.
- Integrate through pull requests, not by copying whole directories from one worktree over another.
- Never commit `.env.local`, real OAuth/API keys, Supabase service-role keys, Upstash tokens, signed URLs, private release artifacts, databases or MCP credentials.
- Keep existing RECALL MCP entries and the current RECALL dashboard intact.

## Shared contracts to agree early

- Login route: `/login`.
- Auth callback: `/auth/callback` (provider redirect URIs must match exactly).
- Protected download route: `/api/download`.
- Download CTA behavior: logged-out users go to login and return to a validated same-origin path; authenticated users request a download through the server route.
- The server selects the release version and private Storage object key from trusted configuration. Never accept an arbitrary bucket, object path or external download URL from the browser.
- UI states: checking session, signed out, signing in, cancellation/error, signed in, preparing download, rate limited, release unavailable, successful redirect.
- Website data is identity and minimal website metadata only. Local RECALL memory, user code, custom instructions, SQLite and ChromaDB data must never be uploaded to the marketing site.
- If the release ZIP is still publicly accessible on GitHub Releases, describe the website gate accurately; it cannot make that public artifact private.

## Prompt for Dipankar's Antigravity session

```text
You own the RECALL marketing UI, content, visual design, SEO/social metadata, and integration coordination. Read all docs/landing-page/*.md, especially TEAM_SPLIT.md, DESIGN.md, CONTENT.md, PRD.md, SEO_AI_DISCOVERY.md and DEVELOPMENT_RULES.md. Audit the repository before editing. Work only on your assigned files and do not implement auth/security server logic owned by Shiva.

Build a distinctive, responsive, accessible RECALL landing page that faithfully translates the supplied Dribbble lodge reference's cinematic atmosphere, deep blue/teal colors, warm amber accents, oversized editorial type, generous whitespace, rounded visual framing and restrained glass effects. Do not copy its assets or produce a generic SaaS template. Use shadcn MCP for maintained primitives, 21st MCP selectively for inspiration, and Framelink only if a real Figma frame is provided. The public site must accurately describe RECALL as a local-first persistent memory engine for AI coding agents. Add verified copy, navbar, hero, features, how-it-works, privacy/trust, download CTAs, contact footer, mobile navigation, canonical metadata, Open Graph/X tags, share image, sitemap, robots.txt and accurate optional llms.txt. Use real links or clearly marked TODO placeholders for unconfirmed contact details. Coordinate route and component contracts with Shiva. You own website/package.json and the lockfile; review Shiva's dependency requests. Run and report actual lint/typecheck/test/build results. Do not commit secrets or fake successful auth.
```

## Prompt for Shiva's Antigravity session

```text
You own Supabase authentication, protected release downloads, rate limiting, security and focused auth/download tests for the RECALL landing page. Read all docs/landing-page/*.md, especially TEAM_SPLIT.md, ARCHITECTURE.md, AUTH_AND_DOWNLOAD.md, SECURITY.md, DEPLOYMENT.md and DEVELOPMENT_RULES.md. Audit the repository before editing. Work only on your assigned server/auth/security/test files. Do not modify shared marketing UI, global CSS, root layout, website/package.json or its lockfile; send Dipankar any dependency request before using it in the final implementation.

Implement real server-verified Supabase Auth session handling, callback/login/logout states, a validated same-origin return path, and a protected `/api/download` route. The server must choose the current release version and object key from trusted configuration; use a private Supabase Storage bucket and short-lived signed URLs. Integrate Upstash rate limiting with user/IP safeguards and a safe, retryable failure if the limiter is unavailable. Never trust client-only auth, arbitrary browser-supplied URLs/bucket/object keys or user-provided redirects. Keep privileged credentials server-only; update `.env.example` with placeholder names only. Add tests for unauthenticated access, authenticated behavior where test credentials are available, malicious returnTo, rate limiting, expiry/missing artifact, and storage errors. Do not claim production auth works without real provider configuration and successful tests. Document exact Supabase/Vercel setup steps and tell Dipankar the UI states/routes/contracts your work exposes. Never commit keys, tokens, signed URLs or release ZIPs.
```

## Integration and acceptance

Before release, both review the combined site together:

- Landing UI renders on desktop, tablet and mobile and matches `DESIGN.md`.
- All navigation, CTAs, login, and download states are connected to the agreed routes.
- Unauthenticated download requests are rejected on the server.
- Signed URLs point only to the approved private object, expire as configured, and cannot be generated indefinitely without rate limits.
- Auth callbacks and return paths cannot redirect to arbitrary external URLs.
- No secrets appear in source, client bundles, Git history, logs or preview output.
- Public metadata/sitemap/robots/social cards are correct; auth and API routes are not indexed.
- Accessibility and keyboard navigation are checked; `prefers-reduced-motion` is respected.
- Lint, typecheck, unit/integration tests and production build results are recorded accurately.
- Supabase/Vercel/Upstash setup, private artifact upload, domain and webhook/email configuration are documented as complete or explicitly pending.

## Recommended merge order

1. Base scaffold PR.
2. Shiva's auth/security branch can merge once its interfaces are reviewed.
3. Dipankar merges/integrates UI/SEO against the latest shared branch.
4. Both perform one combined end-to-end test and fix integration issues in small follow-up commits.
5. Deploy to Vercel preview; test with non-production credentials and a non-production release artifact before production setup.
