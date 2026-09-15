# Import the Pre-Med and Pre-Law camp pages

Right now clicking the Winter Camp card opens a full bespoke page, while Pre-Med Horizons and Pre-Law Horizons fall back to the generic camp template. This brings both real designed pages across from the Pre-Med Gateway project, exactly as they look there.

## What gets built

Two new standalone camp pages at the slugs the existing cards already point to:

- `/camps/premed-horizons-harvard` — from that project's home page (five-day timeline version, as you chose)
- `/camps/prelaw-horizons-harvard` — from its `/pre-law` page

Each page keeps its original look and full section set: video hero, camp details, day-by-day timeline, the framework, capstone, deliverables, outcomes, mentors, city outings, and the closing call-to-action — with their own in-page navigation and footer, self-contained like the three camps already imported.

The separate Pre-Law brochure page is not included. Nothing else on the site changes: the `/camps` hub, the other five camp pages, and the shared header and footer stay untouched.

## Images and video

Both pages depend on around 30 photos and video clips (Harvard campus, the law library, MIT, the museum outing, seven mentor portraits). Those live in the other project, so each one is downloaded from that project's own preview and re-uploaded here before the pages are wired up. If any single file can't be fetched, I'll stop and tell you rather than quietly swapping in a stand-in.

## Dates, fees and apply links

Dates, cohorts and the Apply link stay database-driven through the existing catalogue wiring and the confirmed apply-link rule. The imported pages hardcode a Google Form apply link and a "book a meeting" link from the old site — those get replaced with the live apply URL and the site's standard booking link. Editorial copy (schedule, outings, mentor bios, FAQs) stays in code as it does on the source site.

## Technical notes

- New route files `src/routes/camps.premed-horizons-harvard.tsx` and `src/routes/camps.prelaw-horizons-harvard.tsx`. Explicit routes take priority over `camps.$slug.tsx`, which keeps serving the remaining five camps.
- Page bodies and the shared `ScheduleSection` copied into `src/components/camps/premed/` and `src/components/camps/prelaw/`, scoped to their own folders so the shared brand tokens are not touched.
- The source project's colour tokens (`ink`, `paper`, `cream`, `crimson`, `gold`) and its Playfair display treatment are ported as scoped tokens/utilities for these two page trees only, so the pages render identically without altering the rest of the site.
- Conversions: `PageMeta`-style head handling moves into each route's `head()` (title, description, og/twitter, Course + FAQPage JSON-LD); browser-only behaviour (IntersectionObserver reveal, video autoplay, scroll spy) rendered client-side so SSR does not break.
- Assets re-uploaded into `src/assets/camps/premed/` and `src/assets/camps/prelaw/` as new project asset pointers; no cross-project pointer files are copied.
- No new dependencies expected (`lucide-react` is already here). No database, schema, or apply/pay-route changes.
