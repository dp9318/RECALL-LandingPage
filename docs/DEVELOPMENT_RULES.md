# Development Rules

## Product and architecture

- Read all docs in this folder before implementation. Resolve conflicts in favor of `DECISIONS.md`, then `PRD.md`, `ARCHITECTURE.md`, and the security docs.
- Inspect existing repository state first. Reuse sound existing structure rather than migrating frameworks just to match this recommendation.
- Keep the site independent from the RECALL local engine. No marketing-site call should need a running local RECALL service.
- Treat README/docs/release plan as the source of truth for feature and compatibility statements.

## Design

- Treat `DESIGN.md` tokens and reference intent as mandatory.
- No arbitrary new palette, inconsistent border radii, random shadows, or generic stock SaaS blocks.
- shadcn provides primitives, 21st gives reviewed inspiration, Figma is the source of exact measurements only when an actual frame exists.
- Use semantic HTML and CSS design tokens; avoid duplicating one-off values.
- Respect reduced motion and accessible contrast; all actions must be keyboard usable.

## Security

- Server-authorize downloads every time; client state is presentational only.
- Do not accept bucket/object paths or external redirect URLs from users.
- Keep privileged secrets server-only. No `NEXT_PUBLIC_` prefix for secret credentials.
- Never commit `.env.local`, real MCP credentials, or generated secret files.
- Use private storage for the official gated ZIP and short-lived signed URLs.
- Rate-limit URL issuance and verify token-based bot checks server-side if enabled.
- Never log cookies, auth tokens, private signed URLs, secrets, or local RECALL content.
- RLS protects browser-facing tables. No direct browser privilege for protected download audit writes.

## Engineering

- Keep types strict; validate untrusted inputs at the server boundary.
- Extract constants like current release metadata and public URLs to one typed source.
- Handle loading/empty/error states explicitly and avoid fake success states when integrations are not configured.
- Add tests whenever changing auth, redirect, rate-limit, storage, route or metadata behavior.
- Use lockfile-based installs and avoid installing dependencies for functionality already provided by the framework.

## MCP component review

- Discover before installing; don't install multiple libraries that solve the same problem.
- Review generated/community code, dependency list, licensing, focus behavior, mobile behavior and data/analytics side effects.
- Don't blindly copy external logos/assets, design markup or tracking scripts.
- Don't edit or delete existing MCP entries while adding new ones.

## Git / Definition of done

- Follow the repository's actual branch and PR workflow; do not commit directly to a protected branch.
- Keep commits focused and descriptive.
- A feature is complete only after implementation, tests, docs, security behavior and production build agree.
- Report actual test commands/results and list provider setup still required; never state that authentication or deployment works if it was not tested.
