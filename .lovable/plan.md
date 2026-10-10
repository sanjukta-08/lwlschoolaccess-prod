# School leaders masterclass page

Build a new page, "Leading a School in the Age of AI", from the uploaded design. Keep its text and section order. Make it look like the student page.

## Address
`/masterclass/leaders/age-of-ai`. This matches the student page at `/masterclass/students/age-of-ai`.

## Sections, in the design's order
1. Top bar with the LWL logo, links to the sections on the page (About, Five decisions, Readiness check, Dr Jojo, FAQ) and a "Reserve my place" button.
2. Hero: badge, title "Leading a School in the *Age of AI*", lead line, short summary, two buttons, info line, Dr Jojo photo card, and a five-item details strip (date, time, learning mode, audience, fee).
3. Why now.
4. Five decisions (numbered cards 01–05).
5. AI readiness check (sample questions).
6. Dr Jojo: quote, biography, roles, credentials on one centred line.
7. Watch and read: the YouTube video plus three press articles.
8. Three cards: You leave with / Who it is for / For your students. The last card links to the student page.
9. Questions and answers.
10. Reserve section and footer.

## Look
- Uses the design's fonts (Source Serif 4 for headings, Source Sans 3 for body text), saved on the site so they load fast. The design's crimson colour, warm backgrounds, spacing, rounded corners and gold bird marks are copied exactly. These styles apply to this page only.
- The page works on laptops, desktops and phones. Lessons from the student page are applied from the start: a centred hero, credentials on one line, and no photo borders.
- Uses the design's photos and logo. Where a design photo is missing from the upload, the matching Dr Jojo photo from the student page is used.

## Reserve button
The design includes a sign-up form. This site must not collect sign-ups, so every "Reserve my place" button will open the external booking page instead. The booking link is not confirmed yet, so for now the buttons scroll to the Reserve section. Send the leaders' booking link and I will connect it.

## Also
- Add the page title, description and share settings, and add the page to the sitemap.
- On the student page, add a link from its "For schools" section to the new page.

## Technical details
- New `src/routes/masterclass.leaders.age-of-ai.tsx` with `head()` (title, description, og tags, canonical https://lwlschoolaccess.com/masterclass/leaders/age-of-ai).
- New `src/components/SchoolLeadersLanding.tsx` and a scoped `school-leaders.css` with an `.sl-` prefix. Local font files go in `src/assets/fonts`.
- The asset hashes from the design (`bb6a7a…` logo, `bc2191…` bird, `80b5d6…` portrait) are matched to uploaded files. Any that are missing fall back to the existing future-careers assets.
- No form fields, no data capture and no database changes.
