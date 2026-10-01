# Make the 38 programmes easier to scan

Right now all 38 results sit in one flat grid of tall, equally-weighted cards sorted only by next start date. Every card shows the same eight blocks of detail, so nothing stands out and a parent has to read all of them. Three changes fix that: lighter cards, grouping by category, and a month-wise ordering.

## 1. Lighter, more scannable cards

Reduce each card to what a parent decides on at a glance:

- Track pill + type/grade line (keep, unchanged)
- Programme name
- One-line tagline (clamped to 2 lines instead of 3)
- One compact meta line instead of the three-row Starts / Length / Live on box: `Sat 29 Aug · 3 weekends · 5:00 PM GMT+4`. Full ET/Dubai detail moves into the details sheet and a tooltip.
- Fee with early-bird strike-through (keep)
- "Also starts" chips: show max 2 + "+3 more"
- Actions: keep Apply now, make Details a quieter text link

Result: cards roughly 40% shorter, so 6–9 fit on screen instead of 3.

## 2. Separate the categories

Instead of one flat grid, results render as category sections in a fixed order, each with its own heading and count:

```text
Fellowships (12)
Programmes (16)
Competitions (5)
Internships (3)
MUN & Conferences (2)
```

- Headings are sticky-lite (small serif heading + mono count + one-line "what this is" descriptor).
- Selecting a single type in the existing pill row collapses to just that section.
- A "Jump to" row of chips under the finder scrolls to each category.

## 3. Month-wise sorting

Add a Sort control to the results header with two modes, kept in the URL:

- **By category** (default) — the sections above, each internally sorted by next start date.
- **By start month** — sections become months (September 2026, October 2026, …), each row showing the category as a small pill so the type is still visible. This mirrors the calendar list view but keeps the card layout.

Also add a density toggle (Comfortable / Compact) — compact renders a one-line table-like row per programme (name, category, grades, start, length, fee, Apply) for parents who want to compare many at once.

## Technical notes

- `src/lib/finder.ts`: add `sort` (`cat` | `month`) and `density` (`comfy` | `compact`) to `FinderSearch`, `DEFAULT_SEARCH`, and `validateFinderSearch` with safe fallbacks. Add `groupMatches(matches, sort)` returning `{ key, label, sub, rows }[]` so both grouping modes share one shape.
- `src/routes/index.tsx`: replace the single grid with grouped sections driven by `groupMatches`, plus the sort/density controls and jump chips. Fallback/empty state behaviour unchanged.
- `src/components/ProgrammeCard.tsx`: trim to the reduced content above; add a `compact` variant rendering the single-row layout. No new colour values — existing tokens only.
- New `src/components/ResultGroup.tsx` for the section heading + grid, and `TYPE_BLURB` in `src/lib/programmes.ts` for the one-line category descriptors.
- `/calendar` is untouched; the month sort on the finder complements it rather than replacing it.
