# Product Requirements Document — RECALL Landing Page

## 1. Product summary

Create a polished, responsive, search-friendly marketing site for RECALL that explains the product clearly and converts developers into users. The site follows the reference's cinematic composition and color mood while expressing RECALL's technical identity.

## 2. Goals

1. Explain the cross-session memory problem and RECALL's value in the first screen.
2. Communicate the product accurately: persistent local-first project memory and custom instruction enforcement for AI coding agents.
3. Show the workflow, core capabilities, integrations, privacy stance, and Windows setup expectations.
4. Provide a reliable sign-in flow and gate the official Windows ZIP through a server-side authorization flow.
5. Make the public pages discoverable by search engines and produce rich social-share previews.
6. Ship and preview on Vercel with security checks and automated tests.

## 3. Users

- Developers who use coding agents across multiple sessions.
- Developers and teams who need durable project context, architectural decision history, and explicit instructions.
- Open-source visitors who want to understand, evaluate, or download RECALL.
- Existing contributors who want to reach documentation, installation instructions, or the source repository.

## 4. Information architecture

### MVP sections

- Navigation: RECALL identity, Features, How it works, Integrations / Compatibility, GitHub, and a prominent Download CTA.
- Hero: clear value proposition, short explanation, primary sign-in/download CTA, secondary GitHub CTA, and a custom RECALL product/workflow visual.
- Feature section: persistent project memory, explicit custom instructions, hybrid retrieval, conflict handling, lineage/compaction, and local-first control.
- How it works: capture → retrieve → resolve conflicts → assemble context for the agent.
- Compatibility / workflow: describe supported integrations conservatively and link to the current README for verified setup instructions.
- Download / CTA section: versioned official Windows release with system requirements and signed-in download state.
- Footer: GitHub, documentation, license, contact details or a verified contact channel, privacy policy, and terms where applicable.

The user explicitly requested navigation, hero, features, footer/contact, sign-in then download, and strict adherence to the visual reference. Additional sections above support explanation and conversion, but must not make the page bloated.

## 5. Functional requirements

### FR-01: Public landing page
- Serve the homepage without requiring authentication.
- Work on mobile, tablet, laptop, and wide desktop screens.
- Use semantic HTML, keyboard-operable navigation, descriptive links, and accessible contrast.

### FR-02: Navigation
- Include working anchor links for on-page sections.
- Include a visible, keyboard-accessible primary download/sign-in CTA.
- Include GitHub and documentation links that point to real URLs.
- The mobile navigation must open, close, trap no unnecessary focus, and close on selection/Escape.

### FR-03: Authentication
- Use Supabase Auth with server-validated cookie-based sessions through the currently recommended Supabase SSR integration for Next.js.
- Initial sign-in provider: GitHub OAuth, appropriate for the developer audience. Add email/magic-link only if configured and tested, not as a dead UI option.
- Preserve a validated internal return path so a visitor returns to download after authenticating.
- Never trust a client-only auth state for protected operations.

### FR-04: Protected official download
- The download flow must require an authenticated server-side session.
- Store the official Windows release ZIP in private Supabase Storage if the team intends a real gate.
- Only a server-side route may create a short-lived signed URL after validating the user, rate limit, and release version.
- If the official ZIP remains a public GitHub Release asset, document that the website gate is bypassable. Do not claim that the artifact is protected.
- Display download progress/errors and a useful recovery path.

### FR-05: Product features
- Feature copy must be supported by the current RECALL README and docs.
- Present SQLite as canonical truth and ChromaDB as a derived/rebuildable semantic index.
- Do not call RECALL a chatbot or claim the website hosts local memories.
- Do not publish unverified performance claims, adoption counts, ratings, or claims that contradict the current README.

### FR-06: Footer / contact
- Use confirmed public contact channels only. Until the team supplies an email, use GitHub Issues/Discussions or the repository link instead of fabricating an address.
- Link to the MIT license and project repository.
- Add privacy and terms pages before enabling collection of user data beyond minimum authentication/session requirements.

### FR-07: Search and social metadata
- Correct page titles, descriptions, canonical URL, icon, Open Graph and X/Twitter card metadata.
- Provide sitemap and robots directives.
- Add truthful structured data for the software/project where useful.
- Optionally publish `llms.txt`; treat it as a hint, not a ranking or inclusion mechanism.

### FR-08: Reliability and abuse controls
- Preserve Vercel deployment preview workflow.
- Rate-limit server endpoints that issue download URLs and accept public form submissions.
- Record minimal download audit events only if the team has a defined operational reason and privacy notice.
- Provide error monitoring and useful logs without exposing secrets, session tokens, or unnecessary personal data.

## 6. Non-functional requirements

- SEO: main marketing copy rendered as crawlable HTML; not hidden behind client-only rendering.
- Performance: avoid huge hero media, unnecessary animation libraries, and excessive third-party scripts. Respect reduced-motion settings.
- Accessibility: aim for WCAG 2.2 AA, including keyboard flow, focus visibility, labels, and contrast.
- Security: server-side authorization, least privilege, secrets outside source control, secure session handling, and rate-limited protected endpoints.
- Maintainability: reusable components, central design tokens, strict TypeScript, lint/build/type-check, and automated critical-flow tests.
- Privacy: the site must not capture or transmit RECALL's local memory database, code snippets, or custom instructions.

## 7. Success criteria

- A first-time visitor can explain RECALL's purpose after reading the hero and features.
- Sign-in then download succeeds end-to-end using a real configured provider.
- Unauthenticated download access is denied; invalid or expired sessions cannot issue a URL.
- Rate limits are tested with repeated requests.
- Homepage, sitemap, robots, canonical metadata, OG preview, and favicon work on the production domain.
- No secrets are committed; production environment variables are configured separately from preview/development.
- Builds, lint/type-checks, accessibility checks, and critical Playwright flows pass.
