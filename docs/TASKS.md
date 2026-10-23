# Implementation Plan and Acceptance Checklist

## Phase 0 — Repository and tool audit
- [ ] Inspect the existing repository and identify whether a landing-page app already exists.
- [ ] Read all documents in this specification.
- [ ] Check lockfile, current stack, design assets, lint/test commands, Vercel config, environment files, and branch workflow.
- [ ] Confirm shadcn, 21st, and Framelink MCP tool status; preserve existing RECALL MCP config.
- [ ] Decide whether website app lives in a separate repo or a dedicated folder/root in this repo.

## Phase 1 — Visual foundation
- [ ] Implement design tokens from `DESIGN.md`.
- [ ] Build nav, hero, feature section, how-it-works, privacy section, download CTA, and footer.
- [ ] Use RECALL-specific imagery/product visuals and the Dribbble mood without copying assets.
- [ ] Confirm all links and contact destinations are real.
- [ ] Implement desktop, tablet, and mobile states, keyboard nav, reduced motion, focus indicators, and contrast.

## Phase 2 — Product and metadata
- [ ] Verify all claims and OS/release info against current repository release docs.
- [ ] Add title/description/canonical URL, favicon, Open Graph/X card metadata and share image.
- [ ] Implement `app/sitemap.ts` and `app/robots.ts` or their framework-equivalent.
- [ ] Add truthful JSON-LD and optional `llms.txt`.
- [ ] Exclude login/private/API routes from sitemap; enforce access via server authorization.

## Phase 3 — Supabase Auth
- [ ] Create a dedicated Supabase project for website identity/storage.
- [ ] Configure GitHub OAuth and exact callback/redirect URLs.
- [ ] Implement supported server-side cookie session pattern and callback handling.
- [ ] Validate same-origin return paths.
- [ ] Add clear logged-out, loading, cancelled/error, and logged-in states.
- [ ] Test with real, non-production credentials.

## Phase 4 — Protected downloads and rate limits
- [ ] Upload approved Windows ZIP to private Storage bucket.
- [ ] Configure server-only storage access and central release version/object path.
- [ ] Implement protected download route and short-lived signed URL issuance.
- [ ] Add Upstash user and IP backstop limits.
- [ ] Ensure rate limiter outage fails closed for link issuance with a retryable response.
- [ ] Add minimal download events only if approved and under a privacy policy.
- [ ] Test public object URLs, guessed paths, invalid session, expired URL, 429, and unavailable artifact states.

## Phase 5 — Operational hardening
- [ ] Configure Vercel environment separation, production domain, allowed redirects, caching, headers, and available Firewall rules.
- [ ] Add error monitoring if selected.
- [ ] Add privacy/terms pages before optional analytics or forms.
- [ ] Add dependency update/security checks in GitHub Actions.

## Phase 6 — QA and launch
- [ ] Lint, typecheck, tests and production build pass.
- [ ] Playwright tests for critical download flow and malicious redirect cases pass.
- [ ] Mobile/keyboard/accessibility regression checks pass.
- [ ] SEO and social metadata validated on the deployed domain.
- [ ] Private release asset confirmed not publicly accessible.
- [ ] Verify Google Search Console and Bing Webmaster Tools after the custom domain is live; submit sitemap.
- [ ] Add a release/update runbook and rollback plan.

## MVP exit criteria

The app is not production-ready if the visual page is polished but auth/download is fake, public storage bypasses access control, secrets are committed, or the release policy is misleading. If credentials are unavailable, clearly ship the public UI and a secure documented integration boundary rather than a fake green success state.
