# RECALL Landing Page — Implementation Documentation

**Status:** Implementation-ready specification, with product decisions clearly marked where confirmation is still needed.  
**Deployment target:** Vercel  
**Recommended app stack:** Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui  
**Identity and download services:** Supabase Auth + private Supabase Storage  
**Rate limiting:** Upstash Redis / `@upstash/ratelimit`, with Vercel Firewall where available

## Purpose

This pack is the source of truth for building RECALL's public landing page and protected official-download flow. It combines product requirements, the visual reference direction, architecture, security, deployment, SEO/AI discoverability, and Antigravity MCP tooling.

The referenced Dribbble lodge-booking design is a **visual mood and layout reference**, not a request to copy the lodging product or its exact assets. Translate the cinematic image treatment, cool deep blues, warm amber lighting, spacious typography, rounded media framing, and restrained glass effects into a developer-tool identity.

## Read in this order

1. [`DECISIONS.md`](DECISIONS.md) — defaults and questions that must not be silently guessed.
2. [`PRD.md`](PRD.md) — goals, page requirements, and acceptance criteria.
3. [`DESIGN.md`](DESIGN.md) and [`CONTENT.md`](CONTENT.md) — visual system, layout, and approved draft copy.
4. [`ARCHITECTURE.md`](ARCHITECTURE.md), [`AUTH_AND_DOWNLOAD.md`](AUTH_AND_DOWNLOAD.md), and [`SECURITY.md`](SECURITY.md) — the security-sensitive flows.
5. [`TECH_STACK.md`](TECH_STACK.md) and [`MCP_TOOLING.md`](MCP_TOOLING.md) — implementation stack and Antigravity tool setup.
6. [`SEO_AI_DISCOVERY.md`](SEO_AI_DISCOVERY.md) and [`DEPLOYMENT.md`](DEPLOYMENT.md) — launch and discoverability requirements.
7. [`DEVELOPMENT_RULES.md`](DEVELOPMENT_RULES.md) and [`TASKS.md`](TASKS.md) — rules and implementation sequence.
8. [`ANTIGRAVITY_HANDOFF.md`](ANTIGRAVITY_HANDOFF.md) — the prompt to paste into Antigravity.

## Locked product truths

- RECALL is a **local-first persistent memory engine for AI coding agents**, not a standalone chatbot and not a hosted replacement for the coding agent.
- Its existing runtime uses Python, MCP, FastAPI, SQLite as canonical truth, and ChromaDB as a derived semantic index.
- The landing page must not imply that local project memories are uploaded to Supabase or to the marketing site.
- The website and the RECALL runtime are separate systems. The website's Supabase project is for website identity and minimal website metadata only.
- A login button that hides a public GitHub download link is not meaningful access control. For a real website download gate, the official ZIP must be stored privately and served through a server-authorized, time-limited URL. Public source code and MIT licensing remain public; users may still build or redistribute code under the license.
- The website is public and indexable. Login, auth callback, private account, download endpoints, and other non-public routes must not be listed in the sitemap.
- Never replace or overwrite RECALL's existing MCP config. Merge new MCP servers into the appropriate configuration and keep API keys out of version control.

## External references

- [RECALL GitHub repository](https://github.com/dp9318/RECALL)
- [Dribbble design reference](https://dribbble.com/shots/27389159-Landing-Page-Design-for-Lodge-Booking)
- [Google Antigravity MCP](https://antigravity.google/docs/mcp)
- [shadcn/ui MCP](https://ui.shadcn.com/docs/mcp)
- [21st MCP setup](https://21st.dev/mcp)
- [Framelink Figma Context MCP](https://github.com/GLips/Figma-Context-MCP)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage downloads](https://supabase.com/docs/guides/storage/serving/downloads)
- [Upstash Rate Limit](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview)
- [Next.js metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
