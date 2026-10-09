# Match the referenced project’s font style

## What I found
The referenced project loads **Poppins** for its clean modern public-facing typography, with **Playfair Display** available for selected editorial headings. Its homepage itself uses the clean bold sans-serif treatment rather than a decorative serif headline.

## Changes
- Use **Poppins** for the public website’s headings, body copy, navigation, buttons, cards, and forms so it matches the referenced project’s main visual style.
- Keep **IBM Plex Mono** only for the existing small technical labels where it is intentionally used.
- Load the required Poppins weights locally through the project’s font package flow to prevent late font swapping or size glitches.
- Preserve all current page layouts, colours, wording, tracking, links, and functionality.
- Check key public pages on desktop and mobile for wrapping, overflow, and font-loading stability.

## Scope
This is a typography-only change across the public site. The password-protected admin area keeps its existing practical interface styling.
