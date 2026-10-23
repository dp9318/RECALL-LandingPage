# Vercel Deployment and Operations

## 1. Repository strategy

The landing site can live in a dedicated repository or a clearly separated folder within the RECALL repository. Choose one after inspecting the existing workspace. If it shares the RECALL repo, configure Vercel's Root Directory to the website app; do not disturb the Python runtime's current build/test flow.

Use Git-based Vercel deployments with separate Development, Preview, and Production env values. Preview deployments must use a non-production Supabase project or clearly isolated provider configuration; do not connect untrusted preview code to the production private release bucket by default.

## 2. Setup checklist

1. Inspect repo and team workflow before scaffolding. Confirm package manager and lockfile.
2. Create/select a dedicated Supabase project for website auth/storage. Do not reuse the local RECALL canonical-memory database.
3. Configure GitHub OAuth in Supabase Auth and register development + production callback URLs explicitly.
4. Create the private release bucket and upload the approved versioned Windows ZIP; verify direct public access is denied.
5. Create Upstash Redis and add its REST URL/token only to the server environment.
6. Add the Git repo to Vercel and set the correct root directory/build commands.
7. Configure environment variables for Preview and Production separately.
8. Add a custom domain and set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS production domain.
9. Configure the auth provider allowlist / redirect URLs exactly; test on Vercel preview and custom domain.
10. Validate security tests and production metadata before announcing the site.

## 3. Environment setup

Keep `.env.local` for local development and ignore it in Git. Commit `.env.example` with placeholders only. Production secrets belong in Vercel's environment management, not source code or build args.

Likely variables (adapt exact names to the chosen SDK versions):

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
SUPABASE_RELEASE_BUCKET=recall-releases
SUPABASE_RELEASE_OBJECT_PATH=recall-<version>-windows.zip
CURRENT_RELEASE_VERSION=2.1.1
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
# Optional:
# TURNSTILE_SECRET_KEY=
# NEXT_PUBLIC_TURNSTILE_SITE_KEY=
# SENTRY_DSN=
```

Do not assume the example release version is always current; it is a sample based on repository docs at the time this pack was prepared. Use the release plan and artifact actually deployed.

## 4. Preview and production protection

- Preview access and data should be isolated. Protect Vercel preview deployments if the platform/plan supports it and avoid using production secrets for arbitrary preview builds.
- Do not expose Supabase secret/service credentials under a `NEXT_PUBLIC_` prefix.
- Restrict allowed OAuth redirect URLs and CORS/origin checks.
- Use safe caching: public marketing pages can cache; download/auth responses should be private/no-store.
- Add Vercel Firewall rules after reviewing actual platform capabilities and plan entitlements. App-level Upstash limits remain necessary for business rules.
- Enable deployment protection/permissions for production changes where appropriate.

## 5. CI gates

Required on each pull request:
- install from lockfile;
- lint;
- TypeScript check;
- unit/component tests;
- production build;
- Playwright critical flow tests in a test environment where feasible;
- dependency audit/security alerts.

A separate scheduled/maintainer-run E2E test can exercise the full OAuth + signed download path with controlled test credentials. Never expose those credentials in logs or test artifacts.

## 6. Production verification

- Homepage, `robots.txt`, `sitemap.xml`, favicon and OG image return expected status codes.
- Canonical metadata uses the production domain, not localhost or the Vercel preview host.
- Google/Bing crawler access for public pages matches the documented policy.
- Sign-in callback succeeds on the canonical domain.
- Unauthenticated download cannot create a signed URL.
- Private ZIP cannot be downloaded by guessed/public object URL.
- Rate limiter works across multiple instances and handles outage as documented.
- Mobile layout, keyboard navigation and reduced motion are validated.
- Contact, privacy and terms links do not lead to placeholders or 404s.
- Rollback plan is known and latest artifact/version can be reverted.

## 7. Launch sequence

1. Deploy a functional preview.
2. Complete design and accessibility review.
3. Complete auth/download abuse tests.
4. Add/verify custom domain and OAuth callbacks.
5. Deploy production.
6. Verify sitemap/robots/metadata and submit sitemap to Google Search Console and Bing Webmaster Tools.
7. Monitor Sentry/Vercel logs and review initial failed auth/download events.
