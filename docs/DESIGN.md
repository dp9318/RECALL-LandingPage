# Visual Design Specification

## 1. Reference intent

Reference: [Dribbble — Landing Page Design for Lodge Booking](https://dribbble.com/shots/27389159-Landing-Page-Design-for-Lodge-Booking).

**Follow the reference's visual language closely, not its subject matter.** Preserve the cinematic, premium, calm composition: deep cool blue/teal field, atmospheric image, warm amber highlights, rounded image containers, large editorial headlines, small refined labels, spacious alignment, and subtle translucent UI surfaces. Do not reuse the lodging brand, copy, or copyrighted image assets.

Translate the cabin/nature mood into RECALL-specific imagery: a softly lit developer workspace, abstract memory/context graph, layered code/context panels, or a dark product dashboard preview with amber nodes. Use actual RECALL dashboard screenshots from the repository when suitable; otherwise make a clearly illustrative custom product visual.

## 2. Visual principles

- Cinematic, intentional, high-end; avoid generic SaaS gradient wallpaper.
- Warm amber serves as a sharp accent, not the page's dominant fill.
- Keep blue/teal near-black tones as a stable background foundation.
- Use rounded media frames and cards; avoid a page made entirely from nested cards.
- Hero typography must dominate the first screen and be readable within a few seconds.
- Favor fewer, larger, carefully composed elements over many tiny decorative widgets.
- Use real interface details and diagrams rather than made-up user counts or testimonial quotes.

## 3. Initial design tokens (tune after implementation against the reference)

- `--color-ink`: `#101E29` — main dark ink.
- `--color-deep-blue`: `#173548` — primary blue field.
- `--color-blue-muted`: `#7895A4` — secondary blue-gray.
- `--color-amber`: `#E4AD70` — warm accent / primary CTA highlight.
- `--color-cream`: `#F4F0E8` — warm light surface / light section.
- `--color-surface`: `#FFFFFF` — card surface where required.
- `--color-text`: `#15232D` — light-surface text.
- `--color-muted`: `#63727D` — secondary text.
- `--radius-card`: 24–32px for feature/media frames.
- `--radius-control`: 999px for pill buttons where reference calls for it.
- Layout: consistent 8px base spacing scale; content max width around 1200–1320px; generous vertical spacing; responsive horizontal gutters.

Treat these as starting tokens; compare implementation screenshots with the reference and refine as a system. Don't randomly choose colors per component.

## 4. Page composition

1. **Top navigation** over the hero: logo/wordmark on left; anchors and GitHub on desktop; primary CTA; mobile menu.
2. **Hero**: eyebrow label, headline such as “Your AI agent forgets. RECALL doesn't.”, short subcopy, primary “Sign in to download” button, secondary “Explore on GitHub” link, and a composed visual that shows persistent context flowing back to a coding agent.
3. **Problem / transition statement**: one concise statement about context lost between sessions; keep it editorial and visually calm.
4. **Feature section**: 4–6 real capabilities in an intentionally varied grid inspired by bento/editorial composition. Use icons and UI miniatures selectively.
5. **How it works**: capture → retrieve → resolve conflicts → assemble relevant context. Use a simple visible flow, not a dense architecture chart on the marketing page.
6. **Privacy / control section**: local-first data stance, SQLite canonical store, rebuildable semantic index, opt-in cloud arbitration nuance, and link to technical docs.
7. **CTA/download section**: current release version from one source of truth, Windows support requirements, authenticated download action, and GitHub source link.
8. **Footer**: repo, docs, license, contact channel, privacy/terms.

## 5. Interaction and motion

- Motion should reinforce depth and progression, not distract.
- Prefer low-distance fade/translate and subtle reveal; disable or reduce for `prefers-reduced-motion`.
- No scroll hijacking, scroll-jacking, infinite parallax, autoplay audio, or essential information available only on hover.
- Buttons require hover, active, focus-visible, disabled, loading, and error states.
- Feature cards can respond on hover but must remain understandable on touch devices.

## 6. Responsiveness

- Desktop: use the full editorial composition and side-by-side text/product visual.
- Tablet: reduce overlap and constrain headline width; keep main CTA above the fold where feasible.
- Mobile: stack hero content and visual; no horizontal overflow; button targets at least 44px; nav collapses accessibly; feature grid becomes one column or compact two-column cards only when legible.
- Check 360px, 390px, 768px, 1024px, 1440px widths.

## 7. Accessibility

- Meet WCAG 2.2 AA contrast target.
- Use H1 once, logical heading levels, semantic landmarks, meaningful alt text, and visible focus rings.
- Decorative images use empty alt; meaningful diagrams include an adjacent textual explanation.
- Don't rely on amber/blue alone to convey state.
- Test navigation and auth forms by keyboard and screen reader where practical.

## 8. Design component policy

- **shadcn/ui:** source for stable accessible primitives (buttons, dialog, dropdown, input, form elements, sheet, separator, toast/sonner as appropriate).
- **21st.dev:** inspiration and selected specialist sections/components; inspect code and dependencies, then adapt to RECALL tokens. Do not paste entire templates unreviewed.
- **Framelink Figma MCP:** use when a concrete Figma frame exists; inspect hierarchy, spacing, colors, fonts, and assets and implement against that source. Framelink does not turn a Dribbble URL into a Figma file.
- All sources must be reconciled to the same design tokens. The finished page must look like one brand, not a component collage.
