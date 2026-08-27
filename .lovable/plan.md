# Merging the programme websites into one, the SEO-safe way

You have one strong hub (this site) and seven satellite domains: futuredoctorsprogram.com, futurelawyersprogram.com, joinfinlit.com, joinonwards.com, sirluthercenter.com, satinstinct.com, purposeplaybook.ai. Split across eight domains, every one of them competes with the others for the same parent searches and none builds real authority. Merging them behind a single domain is the right long-term move for both Google and AI answer engines (ChatGPT, Perplexity, Gemini) — those engines cite one canonical, well-structured source, not seven thin ones.

## The recommendation

**One home for everything, permanent redirects from the rest.**

1. Pick the surviving domain. My recommendation: **learnwithleaders.com** as the brand home, with this app serving the programme catalogue on it. If that main site can't host this app, keep it on the current domain and treat that as the canonical home — but decide once and never change it, because the redirect map depends on it.
2. Every satellite domain 301-redirects page-by-page to its matching page here. A 301 passes the accumulated ranking value; a parked page or a generic homepage redirect throws it away.
3. Before flipping any redirect, the destination page has to be as good as or better than the page it replaces — copy across the content that only exists on the old sites (curriculum detail, mentor bios, FAQs, real testimonials, past cohort outcomes).
4. Keep the old domains registered and renewing for at least 3 years. Redirects must stay live; a dropped domain undoes the transfer.

## Order of work

**Phase 1 — make this site the better destination**
- Inventory every URL on the seven domains (page, current traffic, what it ranks for), and record what each one should redirect to.
- Fold missing content from each satellite into its `/programmes/<slug>` page, so nothing is lost in the move.
- Add domain hub pages so category searches have somewhere to land: `/medicine`, `/law-debate`, `/finance`, `/ai`, `/research`, `/leadership`, `/test-prep`. These become the pages that inherit the satellite homepages' equity (futuredoctorsprogram.com → `/medicine`, joinfinlit.com → `/finance`, satinstinct.com → `/test-prep`, and so on).
- Add technical foundations this site is missing: a real `sitemap.xml`, absolute canonical URLs, and `Organization` + `BreadcrumbList` structured data alongside the existing Course/FAQ markup.

**Phase 2 — redirect, domain by domain**
- Start with the smallest satellite as a test, watch it for two weeks, then do the rest.
- Set up 301s at the DNS/host level for each domain (one redirect rule set per domain, mapping old path → new path, everything unmatched falling back to its hub page rather than the homepage).
- Verify each domain in Google Search Console before the switch, submit a Change of Address, and keep the old properties for monitoring.

**Phase 3 — consolidate off-site signals**
- Update Google Business profiles, social bios, brochures, ads, email templates and partner listings to the new URLs.
- Ask partners and press (Forbes, schools, universities) linking to old domains to point at the new ones — this is where most of the authority transfer actually happens.
- Track for 90 days: total organic traffic across the merged set should recover and then exceed the sum of the parts; a 20–40% dip in weeks 2–6 is normal.

## For AI search (AEO)

Answer engines reward one authoritative, machine-readable source:
- One page per programme with unambiguous facts — dates, fees, eligibility, format — in both readable text and structured data. Already largely in place here; the merge makes it the only version.
- Question-shaped headings and FAQ blocks answering what parents actually ask ("what does a medicine fellowship for grade 10 cost", "is it accredited", "what does my child produce").
- Consistent naming everywhere. "FinLit Fellowship" should never appear as three different names across three domains.
- A short, factual `/about` and provider schema so engines can attribute claims to Learn with Leaders as an entity.

## Applications — my suggestion

Route everything through **this site**, one shared form per programme, pre-filled with the programme and cohort, plus "Book a meeting" (your Calendly) as the secondary path. Reasons: every lead lands in one place with a source tag, parents never bounce to an unfamiliar domain mid-decision, and Google sees the conversion step on the same domain as the content. Keep the existing registration links only where a partner (Yale, Harvard-affiliated competitions) legally owns the intake.

## Technical notes

- New: `public/sitemap.xml` (all routes + 35 programme pages), `Sitemap:` line in `robots.txt`, absolute canonicals once the final domain is fixed.
- New route `src/routes/domains.$domain.tsx` (or seven static routes) for the subject hub pages, reusing `TRACKS` and the finder query logic.
- `src/lib/programmes.ts`: keep `site` as an archival reference but stop linking it as the primary CTA once its domain redirects here — otherwise pages link into their own redirect.
- Redirect maps live with each domain's DNS/host, not in this app; I'll produce the old→new mapping table as a document you or your host can paste in.
- One shared `ApplyForm` component + a submissions table in Lovable Cloud (so leads are queryable rather than only emailed), if you want the applications consolidated properly.

## What I need from you to start

The canonical domain decision (learnwithleaders.com vs this one), and a crawl or list of the pages on each satellite domain — I can also crawl them myself if they're publicly reachable.
