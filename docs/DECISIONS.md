# Decisions, Defaults, and Open Questions

## Defaults for implementation

| Topic | Default | Status |
|---|---|---|
| Visual direction | Dribbble lodge reference: cinematic, deep blue/teal, warm amber, spacious editorial layout, rounded imagery; reinterpret for developer tooling | Agreed direction |
| Hosting | Vercel | Required by request |
| App stack | Next.js App Router + TypeScript + Tailwind + shadcn/ui if no existing landing site needs preserving | Recommended; audit existing repo first |
| Community components | 21st MCP used selectively; review source and dependencies | Recommended |
| Figma-to-code | Framelink when an actual Figma design/frame exists | Optional tool; not a Dribbble importer |
| Authentication | Supabase Auth, GitHub OAuth first | Recommended default |
| Session model | Server-validated cookie session using the current Supabase SSR guide | Required security pattern |
| Download policy | A sign-in gate should protect the official ZIP; use private Supabase Storage and short-lived signed URLs | Recommended; check existing public release assets |
| Rate limiting | Upstash per user + IP backstop; Vercel Firewall where supported | Recommended |
| Bot defense | Add Turnstile if sign-up/contact abuse merits it | Optional |
| Analytics | Start with Vercel Analytics/Speed Insights if desired; no extra analytics tool initially | Optional |
| `llms.txt` | Publish a short accurate guide; no promised indexing/ranking benefit | Optional |
| Email | Verified SMTP provider via Supabase Auth in production, if using email sign-in/verification | Required for email-based flows |

## Decisions the team must confirm before production

1. **What does “login then allow download” mean?** The default assumes anyone with a valid account may download. If the download is invite-only, add an explicit allowlist/role check.
2. **Where is the official ZIP hosted today?** If the same ZIP remains a public GitHub Release asset, the site gate is bypassable. For true gating, keep the official website binary private in Supabase Storage and ensure no duplicate public asset exposes the same ZIP. This does not restrict access to public MIT source code.
3. **Which public contact channel should the footer show?** Default to GitHub Issues/Discussions. Do not invent an email.
4. **What is the canonical production domain?** Required for canonical metadata, sitemap, OAuth URLs, and OG URLs.
5. **What is the current release version and artifact checksum?** Read from the actual release build/source of truth at implementation time, not hard-coded from an old document.
6. **Do we want user accounts for tracking or only download access?** Collect the least possible data. Do not add a user dashboard or profile tables without a reason.
7. **Should anonymous visitors be able to read docs/source?** Recommended yes; keep the marketing site, GitHub source, and technical docs public.
8. **Should AI crawlers be allowed?** Decide intentionally by crawler class; document search crawler and training crawler preferences separately.

## Invariants

- Never silently change RECALL's existing local memory architecture.
- Never claim `llms.txt` guarantees inclusion in AI products.
- Never claim the download is protected if it is available from a public URL.
- Never use real auth/download credentials in tracked config or client bundles.
- Never store RECALL's local memories in the marketing-site database.
