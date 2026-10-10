# Future Careers in the Age of AI landing page

## Goal
Create a dedicated page at `/masterclasses/future-careers-age-of-ai` that faithfully reproduces the supplied six-page PDF and exported HTML, using the supplied wording and media without rewriting or adding content.

## Build
- Preserve the existing `/masterclasses` listing while adding the dedicated child page.
- Recreate the reference header, hero, programme details, why-it-matters band, four learning outcomes, crimson challenge panel, Dr Jojo profile, interview/press section, six student notes, audience/schools panels, FAQ, and dark footer.
- Match the reference’s page-scoped Playfair Display and Lato typography, crimson/gold/ink palette, spacing, borders, shadows, image crops, grain texture, responsive stacking, and anchor navigation.
- Store and serve the six supplied images through the project asset flow; do not embed the PDF or copy the exported runtime.
- Keep every supplied sentence exactly as written, including the visible `[platform]` placeholder.
- Add page-specific title, description, social metadata, canonical URL, and structured headings without changing visible content.

## Reservation behavior
- Omit the full reservation form section, as requested.
- Keep the visible “Reserve my place” buttons in their reference positions.
- Route all reservation buttons through one shared page constant; leave them non-navigating until the external URL is supplied, then only that value needs updating.
- Do not create any local registration, `/apply`, payment, or data-capture flow.

## Verification
- Compare the completed page against all six PDF pages at desktop width.
- Check phone and tablet layouts for the hero image, headings, cards, navigation, and footer without overflow or overlap.
- Confirm the existing masterclass listing and the rest of the site remain unchanged.
- Confirm the page builds cleanly and all supplied images load.

## Not included yet
- A working reservation destination, because its external URL has not been supplied.
- A live catalogue record or database change; the matching masterclass is not currently present in the catalogue.
