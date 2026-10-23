# Technology Stack and Tool Choices

## Recommended MVP stack

| Area | Selection | Why |
|---|---|---|
| Framework | Next.js App Router + React + TypeScript | Server routes, SSR/crawlable pages, metadata conventions, and Vercel deployment in one app. |
| Styling | Tailwind CSS | Fast design-token iteration and responsive layouts. |
| UI primitives | shadcn/ui + Lucide | Accessible, editable components committed to the codebase; avoid opaque UI dependencies. |
| Community components | 21st MCP, selectively | Discovery/inspiration for specific sections; review and adapt all code. |
| Design-to-code context | Framelink Figma MCP | Read a concrete Figma frame and help implement the supplied visual spec. |
| Hosting | Vercel | Git deployments, preview URLs, environment separation, CDN and optional firewall protections. |
| Authentication | Supabase Auth + `@supabase/ssr` | Cookie-backed server/client session pattern for Next.js; use current official setup instructions. |
| User/event data | Supabase Postgres, minimal | Optional download audit rows; no RECALL memory data. |
| Official ZIP | Private Supabase Storage | Supports controlled downloads using short-lived signed URLs. |
| Rate limiting | Upstash Redis + `@upstash/ratelimit` | Connectionless HTTP client suited to serverless/Vercel route handlers. |
| Bot check | Cloudflare Turnstile, optional | Add to abuse-prone forms/auth steps if real traffic merits it. |
| Transactional email | Supabase Auth SMTP with Resend or another verified SMTP provider | Avoid depending on low-quota default test email delivery in production. |
| Error monitoring | Sentry, optional at MVP | Capture exceptions and regression context without blocking core behavior. |
| Analytics | Vercel Web Analytics / Speed Insights, optional | Start with low-friction traffic and performance insight; define privacy disclosure. |
| Tests | Vitest or project-compatible unit testing + Playwright + axe | Component, auth/download E2E, and accessibility coverage. |
| CI | GitHub Actions | Lint, typecheck, tests, build, and dependency/security checks. |

## Why not add more tools immediately?

Avoid adding a second analytics system, second auth provider, second database, dedicated backend API, or generalized CMS until there is a concrete need. This is a focused marketing site and one protected download flow—not a second RECALL product.

## Versions and dependency policy

Do not pin speculative version numbers in the spec. At implementation time, use compatible current stable releases, commit the package lockfile, avoid prerelease dependencies unless justified, and verify every integration against official docs. Prefer maintained packages with minimal dependencies.

## Environment variable plan

Public-to-browser values (these are identifiers, not service-role secrets):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or the exact public key name currently shown by Supabase)
- `NEXT_PUBLIC_SITE_URL`

Server-only values:

- `SUPABASE_SECRET_KEY` or the project-supported server-only service credential; use the current Supabase key model, least privilege, and never prefix it with `NEXT_PUBLIC_`.
- `SUPABASE_RELEASE_BUCKET`
- `SUPABASE_RELEASE_OBJECT_PATH`
- `CURRENT_RELEASE_VERSION`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `TURNSTILE_SECRET_KEY` (only if enabled)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (only if enabled)
- `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` (only if configured and appropriate)

OAuth provider credentials are configured in the Supabase provider settings and Vercel environment as required by the chosen integration. Do not invent environment variable names for an SDK; centralize them in a typed env module and validate required production values at startup.

## Tool-specific rules

- Use shadcn MCP for the official registry and foundations.
- Use 21st MCP for discovery, not blind component replacement.
- Use Framelink only when a real Figma file/frame URL is available and access is granted.
- Keep MCP config and API keys out of the repository. Prefer global Antigravity config for token-bearing servers.
