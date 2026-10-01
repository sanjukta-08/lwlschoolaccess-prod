# Plan: Import the Kings Week Without Walls page

## Goal
Bring the source page `/week-without-walls/kings` from **Join Onward - All Schools** into this Learn with Leaders site as closely as possible, including its linked programme-detail experience.

## What I will build
1. **Add the Kings Week Without Walls landing page**
   - Create a new page at `/week-without-walls/kings`.
   - Preserve the source layout, copy, filters, programme cards, logos, hero treatment, FAQ, and footer.
   - Keep the page visually Onward/Kings as requested, instead of restyling it into the main Learn with Leaders page style.

2. **Add the linked programme detail pages**
   - Create `/week-without-walls/kings/:programSlug` for the five linked programme pages:
     - The Sovereign Capital Challenge
     - Future AI Entrepreneurs Program
     - HPAIR Social Impact Leaders
     - HPAIR Leadership & Communication Program
     - The Junior Venture Challenge
   - Preserve the detail-page structure from the source so “View details” links do not break.

3. **Move media and brochures safely**
   - Copy real source image/logo files into this project.
   - Re-create source PDF brochure asset links in this project rather than copying project-scoped asset pointers.
   - If any source brochure download cannot be transferred from the valid source preview URL, keep that one brochure button disabled or linked to a safe placeholder and report it clearly.

4. **Adapt only what must change for this app**
   - Convert React Router links/navigation to TanStack Router.
   - Replace the source `PageMeta` component with route-level page metadata.
   - Keep this site’s existing UTM forwarding and tracking untouched, so outbound brochure links and navigation continue using the current platform rules.
   - Do not create any `/apply`, `/pay`, checkout, form, or admin page.

5. **Verify before handoff**
   - Check the app build/type signal after edits.
   - Open `/week-without-walls/kings` and at least one programme detail URL in the preview.
   - Confirm the page renders, filters work, details links work, brochure links are safe, and there are no visible layout breaks on desktop and mobile.

## Technical notes
- Destination routes will be TanStack route files for `/week-without-walls/kings` and `/week-without-walls/kings/$programSlug`.
- Shared programme data can be kept in a local module so the landing and detail page stay in sync.
- Source project-scoped `*.asset.json` files will not be copied directly; they must be downloaded from the source preview origin and re-added to this project or safely handled if unavailable.
