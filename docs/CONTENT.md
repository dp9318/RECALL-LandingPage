# Website Content Draft

Copy is a starting point. Keep statements aligned with the actual release and repository; do not add unverified claims, testimonials, customer logos, stars, download numbers, or speed benchmarks without evidence.

## Brand one-liner

**RECALL — Persistent memory for AI coding agents.**

## Navigation

- Features
- How it works
- Privacy
- GitHub
- Primary CTA: **Sign in to download** (or **Download RECALL** when already authenticated)

## Hero

**Eyebrow:** A persistent context engine for AI coding agents  
**Headline:** Your AI agent forgets. RECALL doesn't.  
**Body:** Keep project decisions, conventions, and explicit instructions available across coding sessions. RECALL retrieves relevant context, preserves memory lineage, and helps agents work with what your project has already established.  
**Primary CTA:** Sign in to download  
**Secondary CTA:** Explore on GitHub  
**Trust note:** Local-first by design. Your RECALL memory store stays on your machine.

Ensure the privacy note describes current product behavior accurately. Optional cloud conflict arbitration can send context to a configured provider only under the conditions documented by the project. Do not simplify this into a blanket “zero data ever leaves your device” claim if optional cloud fallback is enabled.

## Problem section

**Your coding agent is capable. Its context shouldn't reset every session.**

Important architecture decisions, coding conventions, and previous fixes are easy to lose between conversations. RECALL gives your agent a persistent, inspectable context layer instead of asking you to repeat the same background every time.

## Feature cards

### Persistent project memory
Keep durable decisions and project context across sessions, with historical lineage where applicable.

### Explicit custom instructions
Give user-authored global and project-scoped instructions clear priority over older context.

### Context-aware retrieval
Combine structured/keyword retrieval with semantic search to bring relevant memories into the current task.

### Conflict-aware context
Apply deterministic precedence rules, use bounded local arbitration only when necessary, and return unresolved states when certainty is not justified.

### Memory lineage and compaction
Keep supersession and provenance visible while reducing active context without silently erasing canonical evidence.

### Local-first storage
SQLite remains canonical; the semantic index is derived and rebuildable. Website authentication does not upload the local memory store.

## How it works

1. **Capture** — preserve useful project context and explicit updates.
2. **Retrieve** — find relevant memories using structured and semantic signals.
3. **Resolve** — apply authority rules and bounded arbitration for residual ambiguity.
4. **Return context** — deliver context to the coding agent through MCP or the dashboard API.

## Integrations

Use a careful label such as “Connect RECALL to your agent workflow” and list integrations only according to the current README. Link to the actual setup section rather than implying every editor is a one-click managed integration.

## Download section

**Bring continuity to your coding sessions.**  
Sign in to access the official Windows distribution. See requirements and installation instructions before downloading.

Requirements shown on the page must match the current release docs. As documented today, the portable distribution targets 64-bit Windows 10 (build 19041+) / Windows 11 and Python 3.11 or 3.12 in PATH; verify against the actual artifact before each release.

## Footer

- GitHub repository: `https://github.com/dp9318/RECALL`
- Documentation: repository `docs/` index until a dedicated docs site is launched
- License: MIT — link to repository `LICENSE`
- Contact: link to GitHub Issues/Discussions unless a real public project email is supplied
- Privacy Policy and Terms: add before enabling optional analytics/contact data collection

## SEO title and meta description

Title draft: `RECALL — Persistent Memory for AI Coding Agents`  
Description draft: `Carry project decisions, custom instructions, and relevant context across AI coding sessions with RECALL, a local-first memory engine for coding agents.`

## Copy exclusions

Do not describe RECALL as a hosted chatbot, cloud memory service, autonomous coding agent, or guaranteed hallucination eliminator. Avoid “100% private” or “nothing ever leaves your machine” claims if users can explicitly configure a cloud conflict provider.
