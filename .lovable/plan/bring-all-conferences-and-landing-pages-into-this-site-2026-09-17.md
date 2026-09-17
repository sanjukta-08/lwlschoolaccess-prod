# Bring all conferences and landing pages into this site

## Goal
Add a complete Conferences section for all 12 live Harvard World Model United Nations records, with a discoverable hub and an individual landing page for every location.

## Conference coverage

### Import the eight complete source pages
- Abu Dhabi
- Bangkok
- Cambodia
- Dubai
- Greece
- India
- Kazakhstan
- Vietnam

Bring across their complete page content, sections, interactions, and image assets from the referenced project, adapting routing and shared controls to this TanStack site.

### Build four additional matching pages
- Indonesia
- Japan
- Mumbai
- Riyadh

Use the same polished HWMUN visual family and reusable conference sections, but populate location-specific facts only from verified live catalogue fields. Do not invent venue, agenda, committee, partner, or schedule details that the database does not provide.

## Live catalogue behaviour
- Extend the existing catalogue model so `Conferences` is a first-class offering type rather than falling into the generic programme category.
- Resolve each conference by its database `pay_slug`, then use live programme and cohort records for names, descriptions, images, dates, location, grades, duration, price, availability, and application destination.
- Keep all Apply buttons external and use each record’s canonical `apply_url` / `pay_slug`; do not create local `/apply` or `/pay` pages.
- Show only conferences with a current or future cohort on the conference hub. Keep all 12 landing URLs available; when a conference has no upcoming cohort, show a clear “new dates to be announced” state instead of presenting it as upcoming.
- Make cohort changes automatically update the hub and landing pages without editing page code.
- No database writes or schema changes are planned; this work reads the existing shared public catalogue only.

## Pages and navigation
- Add `/conferences` as the conference hub, listing current conferences in date order with filters/search suited to location and date discovery.
- Add `/conferences/{pay_slug}` landing URLs for all 12 conferences.
- Add Conferences to the desktop and mobile “Our Offerings” menus and the footer.
- Preserve the source project’s old `/our-offerings/conferences/...` links with redirects to the new canonical URLs.
- Add the hub and all landing pages to the sitemap with unique canonical metadata, descriptions, Open Graph tags, and structured programme/event information where live data supports it.

## Visual and asset migration
- Copy the source conference photography, school/partner marks, testimonial imagery, committee imagery, and decorative assets into this project’s own asset storage; do not reference source-project-only asset pointers.
- Preserve the character of the imported conference pages while applying this site’s established Bricolage Grotesque heading rule, upright headings, and original Learn with Leaders navbar/footer logos.
- Consolidate repeated HWMUN sections into reusable components so the 12 pages remain consistent and maintainable.
- Keep existing non-conference pages and catalogue content unchanged.

## Validation
- Verify the hub and all 12 landing URLs on desktop and mobile.
- Check every conference card, old-path redirect, in-page navigation item, Apply button, meeting link, image, and date state.
- Confirm expired/no-cohort conferences are not advertised as upcoming, cancelled sessions cannot surface, and live cohort changes control ordering and visibility.
- Confirm metadata, sitemap output, runtime console, network requests, and preview build are clean.
