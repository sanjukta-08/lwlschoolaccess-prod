# Camp Apply buttons → correct application links

Point every Apply / Register button on all seven camp pages at the right application link.

## What I found

- The live catalogue already returns the correct new links for six camps (HCUS Winter → harvard-winter-camp, HCUS Summer → harvard-summer-camp, Geneva Winter → geneva-camp, Salamanca → salamanca-entrepreneurship-ai, Pre-Law → prelaw-academy, Pre-Med → premed-academy). Geneva's page stays on the winter link, as you chose.
- **IGNITE is not connected** to its catalogue record, so its Apply buttons fall back to an old link instead of `.../apply/cambridge-ignite`.
- **HCUS Winter page uses an old Google Form** for its Apply Now buttons (navbar and footer) instead of the application portal.
- Several pages still carry outdated fallback links (the old learnwithleaders.com camp URLs) used when live data hasn't loaded yet.

## Changes

1. **Connect IGNITE**: link the camp's record to its catalogue entry so every Apply button on the IGNITE page resolves to `apply.learnwithleaders.com/apply/cambridge-ignite`.
2. **HCUS Winter page**: replace the hardcoded Google Form in the navbar, footer, and any other winter page section with the live apply link (`.../apply/harvard-winter-camp`).
3. **Update fallbacks everywhere**: swap all outdated fallback URLs to the eight new links — in the camp data file and in the camp page components (HCUS Summer, Winter, IGNITE, Pre-Med, Pre-Law, Geneva, Salamanca) — so buttons are correct even before live data loads.
4. **Audit every button**: check each camp landing page (hero, navbar, details, footer, application-process sections) plus the camp cards on `/camps` so no Apply button still points to an old page or form.

## Verification

- Open all seven camp pages in the browser and confirm every Apply / Register button opens the matching link from your list.
- Typecheck and build must pass.

## Technical details

- One data fix in our own `lwl_site.site_programs` mapping table: set IGNITE's `program_id` to the `cambridge-ignite` programme (id `5748b6f9-52f3-4760-86e0-50ab2775eabb`). This is our own website table — the shared catalogue is not touched.
- Code fallbacks updated in `src/lib/camps.ts` (7 `applyUrl` values), `src/components/camps/hcus-summer/*` (5 files), `src/components/camps/hcus-winter/*` (navbar, footer, any others using the Google Form), `src/routes/camps.ignite-cambridge-judge.tsx`, `src/components/camps/premed/PremedCampPage.tsx`, `src/components/camps/prelaw/PrelawCampPage.tsx`.
- No changes to applications, payments, or the shared catalogue — all buttons keep linking out to the Application Portal.
