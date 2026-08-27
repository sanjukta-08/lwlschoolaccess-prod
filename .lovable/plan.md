# Merging the programme websites into one

Today the brand is spread across eight domains: this site plus futuredoctorsprogram.com, futurelawyersprogram.com, joinfinlit.com, joinonwards.com, sirluthercenter.com, satinstinct.com and purposeplaybook.ai. Each one is a small, separately-ranked site. Google splits its trust between them and AI answer engines (ChatGPT, Perplexity, Gemini) have no single source to cite. Merged, all that history stacks on one domain — that's the whole reason to do it.

## How a merge actually works

Search engines treat a **301 permanent redirect** as "this page moved here forever". When Google recrawls an old URL and receives a 301, it transfers the old page's ranking history to the new URL and, over a few weeks, swaps the old URL out of results for the new one. Nothing is lost as long as three things hold:

1. The redirect is **301**, not 302 (temporary) and not a JavaScript or meta-refresh redirect.
2. It is **page-to-page**, not everything dumped on the homepage. Google discards the equity of a redirect whose destination isn't a genuine equivalent.
3. The redirect **stays live for years**, so the domains must keep renewing.

So the merge is really three jobs: make the destination pages worthy, map every old URL to a new one, then flip DNS domain by domain.

## Phase 1 — make this site the better destination (before any redirect)

**Crawl and inventory.** For each of the seven domains, list every URL, what it ranks for and roughly what traffic it gets. I can crawl the public pages myself; Semrush fills in the ranking and traffic data. Output: a spreadsheet-style mapping table — `old URL → new URL → reason`.

**Absorb the content.** Anything that lives only on a satellite (curriculum week-by-week, mentor bios, past cohort outcomes, real testimonials, partner detail, their FAQs) gets folded into the matching `/programmes/<slug>` page here. If the new page is thinner than the old one, rankings drop after the redirect — this is the single most common way merges fail.

**Build the landing pages the satellite homepages need.** A satellite homepage ranks for a category term ("medicine programme for high school students"), not a single cohort. It needs a category page to land on, so I add subject hubs:

```text
futuredoctorsprogram.com   → /medicine
futurelawyersprogram.com   → /law-and-debate
joinfinlit.com             → /finance
joinonwards.com            → /leadership          (multi-track; see below)
sirluthercenter.com        → /research
satinstinct.com            → /test-prep
purposeplaybook.ai         → /ai
```

joinonwards.com is the awkward one — it hosts debate, communication, AI, entrepreneurship, leadership and changemaker programmes. Its homepage goes to `/finder`, and each of its sub-pages redirects to the specific programme or subject hub it matches.

Each hub page: the subject's story, who it's for by grade, the programmes in it, upcoming cohorts, FAQs, and links down into the individual programme pages.

**Fix the technical foundations.** This site currently has no sitemap and uses relative canonicals. Before redirects arrive it needs `/sitemap.xml` covering every route and all 35 programme pages, absolute canonical URLs on the final domain, and `Organization` + `BreadcrumbList` structured data next to the existing Course/FAQ markup — so Google can crawl the new destinations quickly the moment traffic redirects in.

## Phase 2 — flip the domains, one at a time

Per domain, in this order:

1. Verify the old domain in Google Search Console (needed later for Change of Address) and note its current traffic as a baseline.
2. Configure the 301 map at the domain's DNS/host: each known path → its mapped new URL; anything unmatched falls back to that domain's subject hub, never the homepage.
3. Publish, then test: `curl -I` each old URL and confirm `301` and the right `Location`. Check that redirects don't chain (old → hub → programme is two hops; make it one).
4. In Search Console, submit **Change of Address** from the old property to the new one. This tells Google to move the site rather than discover it accidentally.
5. Watch for two weeks: crawl errors, indexed-page count on the new domain rising, old domain falling.

Start with the smallest domain (satinstinct.com or purposeplaybook.ai) as the pilot. If it behaves as expected after two weeks, do the rest in pairs.

**What you'll see:** a dip of roughly 20–40% in weeks 2–6 while Google reprocesses, then recovery, then — because one domain now holds all the links and content — growth past the sum of the parts. Full settling takes about 3–6 months.

## Phase 3 — the off-site half

Redirects move the pages; they don't move mentions. In parallel:

- Update social bios, Google Business profiles, brochures, PDFs, email signatures and ad destination URLs.
- Ask partners, schools and press (Forbes and similar) linking to old domains to update to the new URLs — a direct link is worth more than a redirected one.
- Rebuild any Google Ads campaigns pointing at old domains; redirected ad URLs can get disapproved.

## Which domain survives

My recommendation: **learnwithleaders.com** as the single home, with this catalogue app serving it, because it is the brand name people search and the domain your press coverage already points at. If that site can't host this app, keep the current domain as canonical instead — the plan is identical either way. The one thing that matters is deciding once, because every redirect and canonical depends on it.

## For AI answer engines (AEO)

AI engines pick one authoritative source per entity and cite it. Consolidation is the highest-impact thing you can do for them. On top of it:

- One page per programme carrying unambiguous facts — dates, fee, eligibility grades, format, duration — in readable text *and* structured data. Already largely true here; the merge makes it the only version in existence.
- Question-shaped headings that match what parents type: "What does the Future Doctors Fellowship cost?", "Is it accredited?", "What does my child produce at the end?"
- Consistent naming. "FinLit Fellowship" must never appear as three different names on three domains.
- A factual `/about` plus `Organization` schema so engines can attribute claims to Learn with Leaders as an entity rather than to seven unrelated sites.

## Applications — my suggestion

Route every application through this site: one shared form, pre-filled with the programme and cohort, with "Book a meeting" (your Calendly) as the secondary path. All leads land in one place with a source tag, parents never bounce to an unfamiliar domain mid-decision, and the conversion happens on the same domain as the content. Keep an external intake only where a partner (Yale, Harvard-affiliated competitions) legally owns registration.

## Technical notes

- New: `src/routes/sitemap[.]xml.ts` covering all routes plus every programme slug; `Sitemap:` line in `robots.txt`; absolute canonicals once the final domain is fixed.
- New subject hub routes (`/medicine`, `/law-and-debate`, `/finance`, `/ai`, `/research`, `/leadership`, `/test-prep`) reusing `TRACKS` and the existing finder query logic, each with its own head metadata and JSON-LD.
- `src/lib/programmes.ts`: keep `site` as an archival field but stop using it as the primary CTA once its domain redirects here, otherwise pages link into their own redirect.
- Redirect rules live at each domain's DNS/host, not in this app. I'll produce the complete old→new mapping table as a document you or your host paste in; custom domains connected to Lovable are pointed via A records to 185.158.133.1 plus a `_lovable` TXT record.
- Optional: an `ApplyForm` component plus a submissions table in Lovable Cloud, so applications are queryable rather than only emailed.

## What I need to start

1. The canonical domain decision (learnwithleaders.com vs the current one).
2. Permission to crawl the seven satellites so I can build the URL mapping table.

I'd suggest we begin with Phase 1 — sitemap, canonicals, subject hub pages — since none of it depends on DNS and it's all needed before the first redirect goes live.
