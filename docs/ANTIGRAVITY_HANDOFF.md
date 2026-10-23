# Antigravity Handoff — Start Here

## What to do before pasting the prompt

1. Open the RECALL repository/workspace in Antigravity.
2. Copy this documentation folder into the repo at `docs/landing-page/` (or extract the ZIP at the repo root and move the folder there). Do not replace the existing core `docs/` files.
3. Confirm the three MCP tools are connected using `MCP_TOOLING.md`. Do not put real 21st/Figma keys in tracked workspace configuration.
4. Make sure the existing RECALL MCP config remains intact.
5. Start by asking Antigravity to audit the repository and report the current state, then implement in phases.

## Prompt to paste into Antigravity

```text
We are implementing the public RECALL landing page and authenticated official-download flow in this repository. Read every file under docs/landing-page/ before changing code. These docs are the product/design/security source of truth for the website.

First audit the existing repository and report:
1. Current framework, package manager, app root, and deployment configuration.
2. Existing UI patterns/design tokens/assets that can be reused.
3. Existing auth, API, environment, test, Git workflow, and MCP configuration; do not overwrite or duplicate working configuration.
4. Differences between the current repository and docs/landing-page/.
5. A concise phased plan with concrete files to create/change and risks.

Then proceed without waiting for approval on routine implementation details, using DECISIONS.md defaults unless a genuinely blocking credential or product policy is missing. Preserve RECALL's current Python/MCP/FastAPI/local-memory architecture. The marketing website is separate and must never upload local RECALL memories, source snippets, custom instructions, SQLite databases, or ChromaDB files to Supabase.

DESIGN: Follow docs/landing-page/DESIGN.md closely. The Dribbble lodge-booking reference is a visual mood/layout guide, not a request to reuse its assets or copy its brand. Translate the cinematic deep-blue/teal atmosphere, warm amber accent, oversized editorial typography, rounded media framing, generous spacing and restrained glass-like layers into RECALL-specific visuals. Use shadcn MCP for solid primitives, 21st MCP selectively for community inspiration, and Framelink only when we provide an actual Figma frame. Do not make a generic template collage.

SECURITY: Follow SECURITY.md and AUTH_AND_DOWNLOAD.md. Implement server-verified Supabase Auth sessions and a protected download route. The official ZIP must be in a private Supabase Storage bucket if the download gate is meant to be real. Never commit secrets; never put server credentials in NEXT_PUBLIC variables. Rate-limit URL issuance with Upstash and use a safe failure behavior. Do not trust client-only auth state or user-supplied storage paths/URLs. Public GitHub source remains public; ensure the official gated binary is not also exposed at a public asset URL if the site claims to protect it.

SEO: Follow SEO_AI_DISCOVERY.md: canonical metadata, sitemap, robots, Open Graph/X cards, an accessible share image, truthful JSON-LD, and optional accurate llms.txt. Do not promise that llms.txt guarantees ChatGPT/Gemini/Claude indexing.

WORK PROCESS:
- Use the existing stack if the audit finds a functional website already exists. Do not rewrite/migrate solely for preference. If no landing-site app exists, use the recommended Next.js App Router + TypeScript + Tailwind + shadcn stack documented in TECH_STACK.md.
- Add/update one coherent design-token system and responsive reusable components.
- Implement in phases: (1) page shell and design, (2) content sections and responsive details, (3) Supabase Auth, (4) private download endpoint + Upstash limits, (5) SEO/social metadata, (6) tests and launch checks.
- Do not fabricate contact email, testimonials, ratings, version numbers or performance claims; use verified repository information and documented placeholders where required.
- Keep privacy/terms linked when personal data or analytics are enabled.
- Add tests for unauthenticated download rejection, valid sign-in/download path (where test credentials exist), malicious returnTo rejection, rate limiting, private-storage access, public metadata, mobile navigation, and keyboard accessibility.
- Run lint, typecheck, unit tests, Playwright where configured, and production build. Report actual command results; do not claim a test passed unless it ran successfully.
- Keep commits focused, follow repository branch/PR workflow, and do not commit `.env.local`, tokens, generated release binaries, or MCP credentials.

If credentials are not configured, finish the UI and add typed integration boundaries with clear setup notes; do not fake a successful authentication or public protected download. At the end, summarize files changed, decisions requiring real provider setup, commands run, outstanding blockers, and the exact next manual steps in Supabase/Vercel.
```

## Expected first response from Antigravity

Antigravity should first return an audit/plan, not immediately overwrite files. Once the audit agrees with the docs, let it implement the phases above. If it discovers an existing website, preserve/reuse what is sound and revise the plan before any framework migration.
