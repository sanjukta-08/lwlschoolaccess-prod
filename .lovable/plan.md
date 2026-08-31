# Phase 1 — make this site the destination the seven satellites deserve

Decisions locked: **learnwithleaders.com is canonical** and it is free to repoint. Every canonical URL, sitemap entry and redirect target in this plan uses `https://learnwithleaders.com`.

Nothing in Phase 1 depends on DNS, so all of it can ship before a single redirect goes live. The order below is deliberate: technical foundations first (so Google can crawl the new pages immediately), then the seven landing pages the satellite homepages need, then absorbing satellite content into programme pages.

## Step 1 — Technical foundations

**Sitemap.** New server route `src/routes/sitemap[.]xml.ts` generating XML at request time from the router inventory plus every programme slug in `src/lib/programmes.ts` (29 programmes today, growing). Excludes `/internships/apply`, `/shortlist` and `/fit` result states — no thin or session-dependent pages. Adds a `Sitemap:` line to `public/robots.txt` pointing at `https://learnwithleaders.com/sitemap.xml`.

**Absolute canonicals.** Right now only `/programmes/<slug>` carries a canonical. Every content route gets its own `head()` with an absolute self-referencing `canonical` and `og:url` on learnwithleaders.com, plus unique title, description, `og:title`, `og:description`: `/`, `/finder`, `/calendar`, `/calendar-month`, `/about`, `/profile-building`, `/testimonials`, `/internships`, `/fit`. Canonicals stay on leaf routes only — a duplicate in `__root.tsx` would emit two.

**Structured data.** `Organization` schema in `__root.tsx` (legal name, logo, sameAs for the LinkedIn/Instagram profiles, contact) so answer engines can attribute claims to Learn with Leaders as one entity. `BreadcrumbList` on every deep route — programme pages, subject hubs, internships — alongside the existing `Course` and `FAQPage` markup.

## Step 2 — Seven subject hub pages

A satellite homepage ranks for a category term, not a cohort, so it needs a category page to land on. Seven new routes, each mapped to the domain that will redirect into it:

```text
/medicine        <- futuredoctorsprogram.com
/law-and-debate  <- futurelawyersprogram.com
/finance         <- joinfinlit.com
/ai              <- purposeplaybook.ai
/research        <- sirluthercenter.com
/test-prep       <- satinstinct.com
/leadership      <- joinonwards.com (homepage; sub-pages map individually)
```

These are not new data — each maps 1:1 onto an existing `TRACKS` key (`med`, `law`, `fin`, `ai`, `res`, `lead`, `sat`), so the programme list and cohort list on each hub come from the existing finder query logic. No duplicate catalogue.

Each hub carries: the subject's story and why it matters for admissions, who it's for broken down by grade band, every programme in the track as cards linking down to `/programmes/<slug>`, the next upcoming cohorts, subject-specific FAQs in question-shaped headings parents actually type, and a link across to `/finder` pre-filtered to that track. One shared `SubjectHub` component driven by a `src/lib/subject-hubs.ts` content file, so the seven pages are consistent and cheap to extend.

`joinonwards.com` is the awkward one: it hosts debate, communication, AI, entrepreneurship, leadership and changemaker programmes. Its homepage lands on `/leadership`; its sub-pages redirect to the specific programme or the matching hub, resolved page by page in the redirect map.

## Step 3 — Absorb satellite content

This is the step that decides whether the merge works. If a destination page is thinner than the page it replaces, rankings drop after the redirect — the most common way merges fail. For each `/programmes/<slug>` that a satellite currently outranks, fold in from the satellite: week-by-week curriculum detail, mentor bios, past cohort outcomes and project examples, real testimonials, partner detail, and their FAQ text.

Naming gets normalised in the same pass — "FinLit Fellowship" must resolve to one name everywhere, since inconsistent naming is what stops answer engines from treating the programme as a single entity.

Also in this step: stop using the `site` field in `src/lib/programmes.ts` as the primary CTA, keeping it as an archival record. Once a satellite redirects here, a page linking out to it would be linking into its own redirect.

## What comes after (not built in this step)

Phase 2 is the DNS flip, domain by domain, with the redirect map from the strategy document — pilot on satinstinct.com or purposeplaybook.ai, watch two weeks, then pairs. Phase 3 is the off-site half: social bios, brochures, PDFs, ad destinations, and outreach to partners and press so links are updated rather than redirected.

Also deferred, worth doing before traffic arrives: a single application intake on this site with programme and cohort pre-filled and a source tag, with Calendly as the secondary path, so leads consolidate on the same domain as the content. Say the word and I'll fold it into Phase 1.

## Connecting the domain

learnwithleaders.com is free to repoint, so in Project Settings → Domains: connect both `learnwithleaders.com` and `www.learnwithleaders.com`, A records to `185.158.133.1` plus the `_lovable` TXT record, and set the root as primary. Do this early — SSL provisioning and DNS propagation can take up to 72 hours, and the canonicals this plan writes only become true once it is live.
