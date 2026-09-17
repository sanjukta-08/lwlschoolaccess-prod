# Replace the conference redesign with the original imported designs

## Goal
Remove the newly invented conference landing-page design and reproduce the conference experience from **Remix of LwL Student Website 2026 (23)** as closely as possible inside this site.

## Exact source designs to restore
- Import the complete source pages for Abu Dhabi, Bangkok, Cambodia, Dubai, Greece, India, Kazakhstan, and Vietnam.
- Preserve their original page order, layouts, crimson/white visual treatment, full-screen imagery, WorldMUN navigation, host-school branding, detail panels, objective cards, benefits, committee sections, schedules, testimonials, school sections, partner marks, final contact area, and scroll interactions.
- Preserve Greece as its distinct source design rather than forcing it into the shared design used by the other destinations.
- Retain the source conferences listing/card presentation for the `/conferences` view, adapted only where required to fit this site’s routing and live records.

## Keep live catalogue behaviour
- Replace hardcoded source facts that can change—dates, grades, location, fee, availability, conference name, and Apply destination—with values from the existing live catalogue.
- Continue excluding cancelled or expired cohorts from “upcoming” presentation.
- Keep a landing URL available when dates are unavailable, with a clear dates-to-be-announced state.
- Send every Apply/Register button to the canonical external Application Portal URL; do not recreate the source project’s local `/apply` links.
- Keep any source meeting links that are valid and keep school-registration links only where they already existed and remain appropriate.

## Remaining four conference pages
- Build Indonesia, Japan, Mumbai, and Riyadh in the same imported HWMUN visual system because the source project has no dedicated page for them.
- Use only verified live catalogue facts for those locations; do not invent venues, schedules, committees, hosts, testimonials, or partner details.
- Omit unsupported source sections cleanly rather than showing fabricated or irrelevant content.

## Assets and site integration
- Reuse the conference photography, WorldMUN artwork, icons, committee imagery, testimonial imagery, host-school marks, backgrounds, and decorative assets already transferred from the source project.
- Transfer any remaining source assets needed for exact reproduction into this project’s own asset storage.
- Adapt React Router links and source page metadata to TanStack routes without changing the visible design.
- Keep the established upright Bricolage heading rule and original Learn with Leaders logo artwork; no italic headings.
- Preserve `/conferences/{pay_slug}`, navigation, sitemap entries, and redirects from `/our-offerings/conferences/{pay_slug}`.

## Technical approach
- Replace the current generic `ConferenceLanding` output with imported destination-specific page renderers and shared HWMUN sections where the source pages are genuinely identical.
- Feed mutable fields into those renderers from each live `Programme` record while retaining source editorial sections and destination-specific visuals.
- Recreate source interactions with the existing component library: sticky section navigation, active-section state, schedule carousel, testimonial carousel, and scroll-to-top control.
- Keep all database access read-only and make no schema changes.

## Validation
- Compare the hub and all eight imported pages side by side with the source at desktop and mobile sizes.
- Verify the four additional pages match the imported family without unsupported claims.
- Test all 12 URLs, old-path redirects, in-page navigation, carousels, Apply buttons, meeting links, images, no-date states, metadata, and sitemap output.
- Confirm no local `/apply` or `/pay` page exists and finish with a clean preview build and no runtime or console errors.
