# Faithful Conference Page Import

## Goal
Replace the redesigned conference experience with the original conference pages from **Remix of LwL Student Website 2026 (23)**. Preserve each supplied page’s exact layout, sections, colors, imagery, typography, spacing, navigation, carousels, testimonials, host-school content, and interactions.

## Implementation

1. **Import the eight original landing pages one-for-one**
   - Abu Dhabi
   - Bangkok
   - Cambodia
   - Dubai
   - Greece
   - India
   - Kazakhstan
   - Vietnam
   - Port each source page independently rather than combining them into a shared redesigned template.
   - Preserve Greece’s separate design and stylesheet exactly as supplied.
   - Adapt only framework-specific navigation and asset imports needed for this TanStack app; make no visual or editorial redesign.

2. **Restore the original conferences listing page**
   - Recreate the source project’s conference-filtered Programs page appearance, including its dark theme, original heading, search, result count, cards, past-conference treatment, supporting sections, and FAQ presentation.
   - Feed the listing from the current live conference catalogue instead of copying the source’s static programme records.

3. **Keep required live-data and routing safeguards**
   - Replace source-hardcoded dates, fees, eligibility, venue/location, status, images, and application destinations with the matching live catalogue values where those values are displayed.
   - Keep every application button external to `apply.learnwithleaders.com`; do not recreate the source project’s local `/apply` page or add `/pay` routes.
   - Preserve each original Calendly or school link where it is part of that conference page.
   - Keep current URLs and redirects working, with route-specific metadata.

4. **Design only the four conferences missing from the source**
   - Indonesia
   - Japan
   - Mumbai
   - Riyadh
   - Give these four complete landing pages using the closest suitable original conference page structure and visual family, customized only with their live catalogue information and available imagery.
   - Do not alter the eight imported designs while creating these four pages.

5. **Assets and verification**
   - Reuse the already transferred source assets and bring across any missing page-specific media through this project’s asset storage.
   - Check the listing and all 12 conference pages on desktop and mobile.
   - Verify page interactions, images, one H1 per page, live catalogue values, external application links, legacy redirects, and a clean build/runtime result.

## Technical notes
- Source React Router links and page metadata will be translated to TanStack equivalents without changing appearance.
- The source’s remote font import will be loaded through the app head rather than CSS, preserving the Greece page typography without breaking the build.
- Existing shared conference templates will no longer render the eight source-authored pages.
