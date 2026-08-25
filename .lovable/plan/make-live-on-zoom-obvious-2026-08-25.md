# Make "Live on Zoom" obvious

Add a small Zoom mark plus a "Live on Zoom" label wherever a family sees a session time, so it's immediately clear these are live online sessions — not recorded courses.

## What changes

- New small `ZoomBadge` component: a compact Zoom camera glyph (inline SVG, Zoom blue) with the text "Live on Zoom", in two sizes — a tiny inline version for list rows and a slightly larger pill for page headers.
- Finder list rows and cards: the badge sits next to the session time, so each row reads "Starts Sat, 12 Sept · 5:00 PM GMT+4 · Live on Zoom".
- Programme landing pages: badge in the hero fact strip and beside each cohort's time.
- Calendar and month views: badge on each cohort row's time.
- Fit-quiz result cards: badge under the commitment line.
- Home page and finder headers: keep the existing "Live on Zoom" chip but add the Zoom glyph to it for consistency.
- Programmes that are not live online (any in-person or self-paced entries) do not get the badge.

## Technical notes

- Zoom glyph drawn as an inline SVG in `src/components/ZoomBadge.tsx` (no image asset, no network request).
- Styling uses existing semantic tokens plus one new `--zoom` blue variable in `src/styles.css`.
- Touch points: `ProgrammeCard.tsx`, `CohortRows.tsx`, `CohortAgenda.tsx`, `MonthGrid.tsx`/`DayList.tsx`, `ProgrammeLanding.tsx`, `FitQuiz.tsx`, `routes/index.tsx`, `routes/finder.tsx`.
- Badge is decorative-plus-text, so the SVG is `aria-hidden` and the label carries the meaning for screen readers.
