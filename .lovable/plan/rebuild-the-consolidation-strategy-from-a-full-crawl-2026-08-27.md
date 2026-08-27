# Rebuild the consolidation strategy from a full crawl

## What changes vs. the current document

The first version was built from sitemaps, Semrush exports and spot-checks. Several domains have pages that never appear in a sitemap, so the mapping tables had fallback rules where they should have had exact rows. This version is built from an exhaustive crawl: every reachable URL on every domain, its real title, meta description, H1 and body summary — then mapped one by one.

## Domains to crawl exhaustively

- futuredoctorsprogram.com
- futurelawyersprogram.com
- joinfinlit.com
- joinonwards.com
- sirluthercenter.com
- satinstinct.com
- purposeplaybook.ai
- learnwithleaders.com (the canonical destination)

Method per domain: seed from homepage + sitemap (where one exists) + robots.txt, then follow every internal link recursively until no new URLs appear. Record for each page: URL, HTTP status, title, meta description, H1, word count, page type (programme / blog / policy / thin), and a one-line content summary. Flag redirect chains, 404s, duplicate titles and thin pages as we go. Any domain that blocks crawling gets listed explicitly as needing a manual export from you.

## Document structure

1. **Executive summary** — why eight domains dilute you, what merging changes for Google and for AI answer engines, timeline and expected traffic curve, and the one gating decision (canonical domain).
2. **Estate audit** — per-domain page counts by type, traffic and keyword concentration from Semrush, and the handful of URLs that carry most of the value.
3. **Ground rules** — 301 only, page-to-page, no chains, no JS/meta-refresh redirects, old domains renewed indefinitely, destination at least as rich as the page it replaces.
4. **Seven domain chapters**, identical shape: what the site is and ranks for; content audit of what exists there and is missing here; the **complete mapping table with one row per crawled URL** (source → destination → redirect type → why that destination); pages that must be built here before flip; per-domain cutover checklist and rollback trigger.
5. **Destination architecture** — every page that must exist on the hub before redirects land: subject hubs, guides library, individual guide pages absorbing blog traffic, and the metadata each needs.
6. **This site's page-by-page audit** — every route in this app with target intent, current title and description, what should change, structured data, and internal-linking role. Plus the open technical gaps: real sitemap.xml, absolute canonicals, Organization and BreadcrumbList schema.
7. **Cutover runbook** — ordered per-domain sequence with Search Console verification, redirect install, `curl -I` checks, Change of Address, watch window, and the numeric stop/rollback signals.
8. **Off-site work** — social bios, brochures, PDFs, email signatures, Ads destination URLs, and the outreach list of partners and press whose links should be updated rather than redirected.
9. **AEO section** — one canonical fact page per programme, consistent naming across surfaces, question-shaped headings from real parent queries, entity-level Organization markup.
10. **Application flow** — single intake on this site with programme and cohort pre-filled, Calendly as secondary, source tagging, and the partner exceptions.
11. **Appendices** — full consolidated mapping table across all seven domains, crawl inventory with statuses, DNS reference, QA checklist.

## Technical notes

Crawl runs from the sandbox in parallel per domain, output written to JSON per domain so mapping tables are generated from data rather than hand-written. Document regenerated with the existing `docx` pipeline and LWL branding (Cormorant Garamond headings, Karla body, crimson `#A31D33` / gold `#B98A1F`), static table of contents for Word/LibreOffice compatibility. Every page rendered to an image and visually inspected for clipped text, broken tables and pagination before handover.

## Out of scope

No project code changes in this step — the Word document is the deliverable. Building the destination pages is the next phase.

## Assumption

Written with **learnwithleaders.com as the canonical destination**, unchanged from the previous version. Say the word if you want the current domain instead and I will swap it throughout.
