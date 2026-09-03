# Import the three designed camp pages from the other project

## What I found in the other project

On that site, `/our-offerings/camps` is a listing page and each camp opens its own page. Three of the camps you have cards for here are genuinely bespoke designs there:

| Camp | Their URL | How it is built there |
| --- | --- | --- |
| HCUS Young Global Leaders Summer Camp | `/our-offerings/camps/hcusociety` | Dedicated page, 21 own sections |
| HCUS Young Global Leaders Winter Camp | `/our-offerings/camps/hucswintercamp` | Dedicated page, 21 own sections |
| IGNITE Entrepreneurship (Cambridge Judge) | `/our-offerings/camps/cambridgesummercamp` | Bespoke `Ignite*` sections rendered **inside** the generic programme page |

That last row is exactly the behaviour you noticed: IGNITE (and Geneva and Salamanca) do not have standalone pages there — their sections are injected into the shared programme-detail shell, so the generic listing/programme chrome wraps the camp content. Geneva and Salamanca have no bespoke design at all there, so per your answer they stay on the current camp template here.

## What gets built here

Three new standalone camp pages, keeping their original look (their own in-page navbar, section styling and footer, self-contained), at the slugs the existing cards already point to:

- `/camps/hcus-young-global-leaders-summer`
- `/camps/hcus-young-global-leaders-winter`
- `/camps/ignite-cambridge-judge`

Each page carries the full section set from the source: hero, stats and student-diversity map, about, programme overview and details, fee inclusions, day-by-day schedule, city outings, accommodation, HCUS/organisation context, past professors and mentors, awards, testimonials, gallery, application process, terms and FAQ. For IGNITE the injected sections are lifted out of the shared shell and assembled as a real page, so nothing renders inside another page.

Pre-Med and Pre-Law Horizons are left untouched, as are the Geneva and Salamanca pages and the `/camps` hub.

## Data and links

- Dates, cohorts, fee and the Apply link stay database-driven through the existing catalogue wiring and the confirmed apply-link rule; the ported pages' hardcoded date/price strings get replaced with live values where the source had them baked in.
- Editorial content (schedules, outings, hotels, faculty bios, terms, FAQs) is page copy and stays in code, as it is on the source site.

## Technical notes

- Route files: `src/routes/camps.hcus-young-global-leaders-summer.tsx`, `camps.hcus-young-global-leaders-winter.tsx`, `camps.ignite-cambridge-judge.tsx` (explicit routes take priority over `camps.$slug.tsx`; the dynamic route keeps serving the remaining four camps).
- Components copied to `src/components/camps/hcus-summer/`, `hcus-winter/`, `ignite/` plus the shared world-map chart. Conversions needed: `react-router-dom` `Link` → `@tanstack/react-router` `Link`; `PageMeta`/`BreadcrumbSchema` → the route `head()` (title, description, og/twitter, Course + FAQPage JSON-LD); browser-only bits (IntersectionObserver deferral, video autoplay hook, the map) rendered client-side so SSR does not break.
- Assets: about 124 real images across the three camps copied into `src/assets/camps/hcus-summer/`, `hcus-winter/`, `ignite/`. Two dependencies are needed: `framer-motion` and `react-simple-maps` (used by the diversity map); `lucide-react` is already here.
- Because these pages keep their own visual language, they are scoped under their own component folders and do not touch the shared brand tokens, `SiteHeader`, `SiteFooter` or any other page.
- No database, schema or apply/pay-route changes.
