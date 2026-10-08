# Remove plain pre-load screens from application pages

## Confirmed cause

The catalogue site opens application links directly from the live catalogue; it does not render the plain screen shown in the screenshot. `joinfinlit.com/apply` itself sends that plain application copy in its first HTML response, before its designed application interface appears. The fix therefore belongs in the FinLit application project, while the catalogue site should continue linking directly to it.

## Plan

1. **Fix FinLit at the source**
   - Confirm which current FinLit project and published version owns `joinfinlit.com` before changing it.
   - Remove visible unstyled fallback copy from the initial document.
   - Replace it with either an immediately styled application shell or a branded loading state whose critical appearance is present in the first response, so slow JavaScript or fonts cannot reveal raw browser-default text.
   - Preserve the real application form, route, SEO metadata, accessibility, and catalogue link destination.

2. **Audit every application destination**
   - Build the destination list from the live programme, cohort, camp, conference, masterclass, competition, and Week Without Walls catalogue links.
   - Test each unique application URL with JavaScript disabled, slow loading, and normal loading to identify raw fallback text, blank flashes, missing styles, redirects, and failed pages.
   - Group findings by the project/domain that owns each page rather than changing the catalogue links blindly.

3. **Fix every editable application project**
   - Apply the same first-response rule to each affected application page owned in this workspace: no visible raw content and no default white browser page while the designed interface loads.
   - Keep crawler-only copy inside a true non-visible fallback and ensure it cannot be painted for ordinary visitors during startup.
   - Leave externally owned partner sites unchanged and report them with the exact URL and observed issue.

4. **Verify the full journey**
   - Test from the homepage Flagship Fellowships section through programme details and every Apply button placement.
   - Repeat on desktop and mobile with network throttling, recording the first paint and final page for each affected destination.
   - Confirm UTM parameters remain attached and every button still opens the correct application page.

## Scope boundaries

- No local `/apply` or `/pay` page will be added to `lwlschoolaccess.com`.
- No catalogue programme, cohort, partner, or link data will be hardcoded or rewritten merely to hide a destination-page loading problem.
- Any destination that is not editable from the user's workspace will be reported rather than proxied, copied, or visually disguised.
