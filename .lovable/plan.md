# Migration strategy document — site by site, page by page

Deliverable: a single Word document (`.docx`) you can hand to a developer, host or agency and have them execute without asking questions. It goes domain by domain, and inside each domain, URL by URL.

## What the document contains

**1. Executive summary (1 page)**
Why eight domains hurt you, what merging changes for Google and for AI answer engines, expected timeline and traffic curve, and the one decision that gates everything (which domain becomes canonical).

**2. Ground rules (1 page)**
The non-negotiables every redirect must follow: 301 only, page-to-page not homepage-dumping, no redirect chains, no JS/meta-refresh redirects, old domains renewed indefinitely, destination page must be at least as rich as the page it replaces.

**3. One chapter per satellite domain** — seven chapters, identical structure:
- What the site is, what it currently ranks for, its rough traffic and top pages
- Content audit: what exists there that this site does not yet have (curriculum detail, mentor bios, outcomes, testimonials, partner proof, FAQs) and which page here should absorb it
- **The mapping table**: every discovered URL → destination URL on the new site → redirect type → note on why that destination is the true equivalent
- Fallback rule for unmatched URLs on that domain (its subject hub, never the homepage)
- Pages that must be built here first before this domain can be flipped
- Its own cutover checklist and rollback trigger

Domains covered: futuredoctorsprogram.com, futurelawyersprogram.com, joinfinlit.com, joinonwards.com, sirluthercenter.com, satinstinct.com, purposeplaybook.ai.

**4. This site's own page-by-page audit**
Every route in the app - home, `/finder`, `/calendar`, `/calendar-month`, `/about`, `/profile-building`, `/testimonials`, `/internships`, `/shortlist`, `/fit`, and all programme pages - with, per page: its target search intent, current title and meta description, what should change, the structured data it should carry, and its internal-linking role. Plus the gaps: sitemap, absolute canonicals, `Organization` and `BreadcrumbList` schema, and the new subject hub pages.

**5. Cutover runbook**
The ordered, per-domain sequence: verify in Search Console, install the redirect map, `curl -I` verification, submit Change of Address, two-week watch window, then the next domain. Pilot domain named, sequencing for the rest, and the specific metrics to watch with the numbers that mean "stop and roll back".

**6. Off-site work**
Social bios, brochures, PDFs, email signatures, Google Ads destination URLs, and the outreach list of partners, schools and press whose links should be updated rather than redirected.

**7. AEO section**
What ChatGPT, Perplexity and Gemini need in order to cite you: one canonical fact page per programme, consistent naming across every surface, question-shaped headings taken from real parent queries, and entity-level `Organization` markup.

**8. Application flow**
The recommended single intake on this site with programme and cohort pre-filled, Calendly as the secondary path, source tagging so lead origin stays attributable, and the exceptions where a partner legally owns registration.

**9. Appendices**
The full consolidated mapping table across all seven domains, a DNS reference (A records to 185.158.133.1 plus the `_lovable` TXT record), and a QA checklist.

## How I'll build it

1. Crawl the seven satellite domains to enumerate their real URLs, titles and page content - the mapping tables are built from what's actually there, not guesses. Any domain that blocks crawling gets flagged as needing a manual list from you.
2. Pull ranking and traffic data per domain via Semrush so the chapters prioritise by real value rather than treating every page as equal.
3. Read every route in this app to build the page-by-page audit section from the actual current metadata.
4. Generate the `.docx` with the LWL brand styling - Cormorant Garamond headings, Karla body, crimson and gold accents - then convert every page to an image and check each one for clipped text, broken tables or layout issues before handing it over.

Output lands in your documents as a downloadable Word file. No project code changes in this step - the document is the deliverable.

## Open question I'll assume unless you say otherwise

The document will be written with **learnwithleaders.com as the canonical destination**, since that's the brand name parents search and what your press coverage points at. If you'd rather keep the current domain, say so and I'll swap it throughout - every mapping table depends on that one choice.
