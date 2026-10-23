# SEO, Social Previews, and AI Discoverability

## 1. Goals

Make the public RECALL website easy for search engines and link-preview crawlers to understand. Do not promise that any file or tag guarantees indexing, rankings, or citations in AI assistants.

## 2. Technical SEO

Use Next.js App Router's current built-in metadata conventions where possible:
- `app/layout.tsx`: default title template, description, metadata base, canonical URL, icons, Open Graph/X defaults.
- `app/sitemap.ts`: generate `https://<canonical-domain>/sitemap.xml` containing only canonical public URLs.
- `app/robots.ts`: describe crawler rules and include the sitemap URL.
- `app/opengraph-image.tsx` or a static `app/opengraph-image.png`: create the share preview.
- Correct per-page title and description for each public content page.
- Use one canonical HTTPS host (choose apex or `www`) and redirect the alternate host.
- Add semantic headings, meaningful link text, descriptive alt text, fast rendering, and internal links to the README/docs.

Only include pages that exist, are canonical, and should be indexed. Exclude login, auth callbacks, download endpoints, private/account routes, API routes, and error pages from the sitemap. `robots.txt` does not secure pages; every private route still needs authorization.

## 3. Sitemap and search tools

1. Deploy the canonical domain.
2. Verify ownership in [Google Search Console](https://search.google.com/search-console/about).
3. Submit `/sitemap.xml`, use URL Inspection for the home page, and monitor crawl/indexing reports.
4. Add the site in [Bing Webmaster Tools](https://www.bing.com/webmasters/about), verify ownership, and submit the same sitemap; importing Google Search Console where supported is convenient.
5. Diagnose 404, redirect, canonical, robots, or rendering problems before requesting re-indexing.

A sitemap supports URL discovery; it does not guarantee that a URL will be indexed or rank.

## 4. Open Graph / social preview

Set:
- `og:title`
- `og:description`
- `og:type=website`
- `og:url` to the canonical production URL
- `og:image` to a full absolute URL for the share image
- `og:image:width` and `og:image:height` when known
- X/Twitter card metadata, including `summary_large_image` and matching title/description/image.

Create a custom 1200×630 share image using RECALL colors and product imagery. Ensure text remains legible at small preview sizes. Do not reuse the Dribbble site's image or marks. Validate by sharing a deployed URL to actual target platforms and their available preview tools; cached previews may need time or re-scraping.

## 5. Structured data

Add JSON-LD only when the underlying facts are true:
- `SoftwareApplication` may describe RECALL as developer software and state its supported operating system appropriately.
- `Organization` may identify the actual project/maintainer presence and official repository URL if an organization entity has been established.
- Avoid fake ratings, reviews, pricing, address, business identity, or unconfirmed publisher names. Structured data helps parsers understand a page but does not guarantee enhanced results.

Validate structured data and inspect the rendered HTML on the production domain.

## 6. `llms.txt`

Optionally publish `/llms.txt` as a short Markdown index for AI tools that choose to consume the convention. Include:
- short project summary;
- what RECALL does and does not do;
- key feature names;
- local-first storage statement with cloud-fallback nuance;
- links to the GitHub README, problem statement, architecture, packaging and setup docs;
- official download instructions and current compatibility notes.

Do not make unsupported promises such as “this ensures ChatGPT, Gemini, and Claude understand the site.” There is no universal guarantee that these products consume `llms.txt`, and it is not a Google Search ranking feature. Keep it consistent with the public README and update it per release.

## 7. AI crawler policy

Decide which publicly accessible AI/search crawlers to allow based on the project's content and policy. Consult current official crawler documentation during implementation because bot names and purposes evolve. Consider search/discovery crawlers separately from model-training crawlers; for example, OpenAI documents `OAI-SearchBot` separately from `GPTBot`, and Google's `Google-Extended` is not the same as Googlebot for Search indexing.

The public marketing pages can be crawlable. Auth callbacks, APIs, protected download routes, and user-only pages should be excluded from sitemap and appropriately marked private/noindex, but **must be protected by server authorization regardless of crawler rules**.

## 8. Acceptance checklist

- [ ] Canonical URL and metadata base use the production domain.
- [ ] `robots.txt` is valid and lists the sitemap.
- [ ] `sitemap.xml` includes homepage plus only real, public, canonical pages.
- [ ] Auth/private/API paths do not appear in sitemap.
- [ ] OG image is accessible without authentication and social card metadata is complete.
- [ ] Homepage title, description, H1, and structured data accurately describe RECALL.
- [ ] Google Search Console verified and sitemap submitted after launch.
- [ ] Bing Webmaster Tools verified and sitemap submitted after launch.
- [ ] Optional `llms.txt` exists, is accurate, and makes no AI indexing promises.
- [ ] AI crawler access policy is documented and tested against production `robots.txt`.
