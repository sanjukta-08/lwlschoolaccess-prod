# Learn with Leaders search preservation — 29 October 2026

## Scope

The catalogue app will replace the existing `www.learnwithleaders.com` website. Preserve that canonical hostname. This task changes search metadata only, with no page design or visible-copy changes, no payment/application changes, and no tracking changes.

## Completed and verified in preview

- Audited existing live HTML, robots/sitemap endpoints, brand search, Semrush estimates and backlinks, and Google's verified `https://www.learnwithleaders.com/` property through Sanjukta's Google Search Console.
- Recorded 226 URLs returned by Google for 29 September–26 October 2026; 128 had clicks, totalling 2,568. This is a search-performance sample, not a complete index inventory.
- Confirmed Google's indexed Yale competition URL: submitted and indexed; successful mobile crawl on 26 October 2026. That URL accounted for 723 clicks in the sample.
- All 123 current sitemap pages return 200 and have one title, description, canonical and matching Open Graph URL in server HTML after corrections. Invalid routes and programme/camp/conference slugs return 404.
- Added missing absolute canonicals and Open Graph URLs across public routes, retaining their existing titles and descriptions except neutralizing the staging-domain reference in the privacy search snippet.
- Centralized the public search origin for route metadata and sitemap. Current default remains `https://lwlschoolaccess.com` until cutover is ready, avoiding premature cross-domain canonicals to nonexistent destination pages.
- Added truthful homepage Organization/WebSite identification and kept the confirmed LinkedIn identity. No invented legal entity/address/reviews/awards or unsupported search action.
- Removed invalid multi-job listing JobPosting markup and unsupported Course syllabus/duration/credential fields, without touching visible text. Retained existing FAQ markup.
- Removed root-level generic share images that could override a page's own preview; retained the platform's default screenshot fallback. No substitute share illustration was invented.
- Added six exact server-side 301 redirects for evidence-backed old addresses. They preserve all query parameters and do not intercept nested resource paths.
- Protected catastrophic 500 fallback responses against indexing/cache storage, preserving the existing fallback appearance and status.
- Kept SSR, crawler access, Google verification, existing first-paint safeguard, sitemap exclusions, and admin noindex/auth protection. No hidden crawler-only copy or llms.txt was introduced.

## Verified redirect mappings

| Old path | Destination |
| --- | --- |
| `/about-us/` | `/about` |
| `/our-offerings/competitions/` | `/competitions` |
| `/our-offerings/camps/` | `/camps` |
| `/our-offerings/conference/` | `/conferences` |
| `/camps/hucswintercamp/` | `/camps/hcus-young-global-leaders-winter` |
| `/camps/salamancaspaincamp/` | `/camps/entrepreneurship-ai-salamanca` |

## Do not cut over the domain yet

Replacing DNS/hosting now would remove indexed content the app does not contain. Preserve the original server/CMS and files until these are resolved. No safe legacy-origin endpoint, CMS export or hosting control was available during this task; do not proxy the public domain to itself after replacement (that loops).

1. **Yale and HUSO India/Middle East:** keep their exact competition URLs and all associated results/resources/PDFs on the existing origin infrastructure, or export and serve them unchanged on the replacement. The new generic details do not contain their results, rules, exam times, registration paths and supporting material. Competition cards still depend on those exact old addresses. No misleading redirects were added.
2. **HCUS summer:** legacy is summer 2027; replacement copy represents summer 2026. Do not redirect `/camps/hcusociety/` to that different edition.
3. **Geneva summer:** legacy July 2027 cannot map to the December 2026 winter programme.
4. **Pre-Law, Pre-Med, Cambridge and Geneva winter:** programme identity matches, but deadline/accommodation/date/price information differs. Visible corrections need separate permission; retain old URLs pending reconciliation.
5. **Other old URLs:** mentor profiles, certificate programmes, offline-programmes, FAQ/contact/gallery/media pages and downloadable files have no verified complete replacement. Review the saved Google inventory plus a full CMS/server/file export. Search Analytics and sampled links cannot discover every historical backlink target.
6. **Infrastructure:** preserve an independently addressable legacy origin and route unmigrated paths/assets there, while routing migrated paths to this app. Alternatively import the old pages/assets verbatim. DNS alone cannot split paths.

## Cutover sequence, once preservation is complete

1. Keep the legacy host and assets backed up; verify every traffic-bearing legacy path and resource has a same-content retained response or a true equivalent 301 destination.
2. Configure the replacement build with `VITE_PUBLIC_SITE_URL=https://www.learnwithleaders.com`. Update `public/robots.txt`'s Sitemap directive to `https://www.learnwithleaders.com/sitemap.xml` in that same release. Do not do either on the current public staging deployment alone.
3. Preserve apex-to-www normalization at hosting level with a permanent path/query-preserving redirect. Decide how `lwlschoolaccess.com` and the alternate Lovable hostname will redirect to the corresponding primary-domain paths; do not change partner/application domains.
4. Deploy only after preservation routing/exports are in place. Check the actual published initial HTML and redirects, not only preview.
5. Re-list the verified Google property and submit the newly live primary-domain sitemap once. Existing Google property verification should be retained; Search Console returned no submitted sitemap records in this audit. Do not submit a sitemap containing only another host's URLs.
6. Inspect representative legacy and new URLs in Google's index; monitor clicks/impressions, crawl failures and resource status after cutover. URL Inspection reads Google's stored index, not a live test or indexing request.

## Limitations and research sources

## Follow-up readiness check — 29 October 2026

- Rechecked all 123 current sitemap pages in preview: HTTP 200, exactly one nonempty title, description, canonical, Open Graph title/description/type/URL and Twitter card; canonical destinations remain on `https://lwlschoolaccess.com`.
- Added explicit homepage Twitter title/description and descriptive root fallback titles. No visible design/content, tracking or domain changes were made for search readiness.
- All 15 search-preservation and catalogue-link regression tests pass. Preview build reports OK.
- Google Search Console connection was explicitly deferred by the user. Verification, sitemap submission and current Google indexing/performance checks remain uncompleted in this project; an existing verification tag alone is not proof of completed setup.
- SEO/AEO/GEO foundations are ready in preview; Google ranking, answer-engine inclusion and AI citations are not guaranteed. No extra crawler-only text or speculative llms.txt was added.
- Legacy resource export/preservation remains a prerequisite for a future domain cutover, not an available action today. Do not switch the live domain yet.
- These follow-up metadata edits and competition corrections reach the published site only after its next publish.

### Competition link audit

- Read shared programme, cohort and partner records and compared both published and preview competition cards. All eight currently listed competitions have the correct official programme page saved in `all_programs.program_url`.
- Removed name-based competition destination overrides; cards now follow that exact field. Partner labels now read `all_partners.org_name` instead of guessing from URL hostnames. Existing exclusions and date ordering remain unchanged.
- Fixed a shared application resolver that was replacing authored HUSO India, HUSO Middle East and Yale registration URLs with derived LWL Portal URLs. Shared `apply_url` now takes precedence; only absent links use LWL pay-slug derivation. No shared database rows were changed.
- Clicked all eight competition cards and all 12 active competition-classified catalogue detail application links, including competitions currently excluded from the competition listing and HCUS without an upcoming cohort. Confirmed all eight listed competition registration pages render the correct form; visitor attribution survived our outbound clicks. No forms were submitted and payment/application completion was not tested.
- Active shared programme audit: 104 rows, no missing application URLs or partners. 69 lack `program_url`; 14 editorial application URLs and 17 editorial site URLs differ from shared data. Shared catalogue URLs remain authoritative; these differences were not written back to the database or substituted for shared URLs.

| Listed competition | Registration verified |
| --- | --- |
| Moot Court | `https://futurelawyersprogram.com/moot-court/apply` |
| HUSO Middle East | `https://studentform.ivyolympiad.com/register/middle-east` |
| HUSO India | `https://studentform.ivyolympiad.com/register/india` |
| Global Pre-Med | `https://futuredoctorsprogram.com/competition/apply` |
| Onward AI Founders | `https://www.joinonwards.com/competitions/register` (partner redirects to non-www) |
| Global Future Career | `https://apply.learnwithleaders.com/apply/global-future-career-challenge` |
| Wolves of Wall Street | `https://joinfinlit.com/competition/apply` |
| Yale Global Essay | `https://studentform.ivycomp.com/` |

### Remaining external-owner issues

- FinLit's Wolves landing page contains additional application links to `/apply` and `/fellowship#apply`, alongside correct competition CTAs. Those URLs are on the partner website, not this project's cards or application links. Review their context with FinLit before changing the partner page.
- Onward's actual `/competitions/register` page works; its form offers February/June/October 2027 seasons, while the shared catalogue includes a November 2026 intake. The partner page shows a February 15 deadline versus February 12 in that shared cohort and conflicting USD 100/USD 60 fee labels. Reconcile in the owning partner/Console; do not invent new URLs here. `/competitions/apply` is not the saved catalogue destination and must not replace `/competitions/register`.
- Wolves registration copy says eight weeks, while the catalogue/card duration is 12 weeks; programme identity and application URL match, but content must be reconciled by FinLit/Console.
- HCUS Debating Championship's saved Portal application URL reports inactive. It has no upcoming cohort, so it is not on the eight-card competitions listing or upcoming Finder/calendar results. The saved active programme flag/Portal availability requires owner reconciliation.
- Partner-site onward forwarding after our outgoing click was not verified for every subsequent click. This project cannot guarantee other websites retain attribution.

- Existing `/robots.txt`, `/sitemap.xml`, `/sitemap_index.xml` and `/wp-sitemap.xml` redirect to homepage HTML. This is not valid XML and provides no complete historic inventory.
- The public page sample and Google performance response are not a full historical crawl. No guarantee of rankings, AI citations, or instant Google re-crawl is possible.
- Semrush US estimates (121 monthly organic visits, 128 keywords) are estimates, not measured traffic; direct Google data is stronger for this migration. Backlink estimates show 11,840 links/2,701 referring domains and many low-quality directory links. No disavow action was taken; no manual-action status was verified.
- The earlier August consolidation plan includes satellite moves and local application routes incompatible with this project's current boundaries. It was not applied.
- Provider/CDN/cache/DNS configuration and live cutover have not been changed. Current edits reach the live URL only on the next publish.
- References: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes ; https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls ; https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data ; https://developers.google.com/search/docs/appearance/ai-features .

Evidence files beside this document contain exact validated mapping observations and the supplied Google page inventory. These are operational documents, not public routes.