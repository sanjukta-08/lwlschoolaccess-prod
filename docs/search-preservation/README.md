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

- Existing `/robots.txt`, `/sitemap.xml`, `/sitemap_index.xml` and `/wp-sitemap.xml` redirect to homepage HTML. This is not valid XML and provides no complete historic inventory.
- The public page sample and Google performance response are not a full historical crawl. No guarantee of rankings, AI citations, or instant Google re-crawl is possible.
- Semrush US estimates (121 monthly organic visits, 128 keywords) are estimates, not measured traffic; direct Google data is stronger for this migration. Backlink estimates show 11,840 links/2,701 referring domains and many low-quality directory links. No disavow action was taken; no manual-action status was verified.
- The earlier August consolidation plan includes satellite moves and local application routes incompatible with this project's current boundaries. It was not applied.
- Provider/CDN/cache/DNS configuration and live cutover have not been changed. Current edits reach the live URL only on the next publish.
- References: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes ; https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls ; https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data ; https://developers.google.com/search/docs/appearance/ai-features .

Evidence files beside this document contain exact validated mapping observations and the supplied Google page inventory. These are operational documents, not public routes.