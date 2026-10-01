# Easy Fellowship / Competition / Programme Filter

## Goal
Make programme-type selection the fastest action on the `/finder` page. Parents should see the main categories up front, switch with one click, and still have the full dropdown bar for deeper filtering.

## What we will build

### 1. Prominent category toggle chips at the top of results
- A sticky-aware row of large pill/tile buttons placed directly above the programme list.
- One button per programme type: **All**, **Fellowships**, **Programmes**, **Competitions**, **Internships**, **MUN & Conferences**.
- Each button shows the type label + live count of matching options (respecting the other active filters).
- Active state uses the premium ink/gold treatment already in the design system.
- Clicking a chip updates the `type` search param and scrolls the list back to the top of the results section.

### 2. Refined dropdown filter bar
- Keep the horizontal bar (interest, grade, starting, where you are, search).
- Remove the duplicated "Programme type" dropdown from the bar because the chips now handle it.
- Re-order the remaining fields for natural parent flow: **Interest → Grade → Starting → Where you are → Search**.
- Add small icons to each dropdown field for faster visual scanning.
- Keep the live counter and "Clear all" link below the bar.

### 3. Default state
- On first load the list continues to show **All** programme types.
- The "All" chip is selected by default.

### 4. Visual polish
- Match spacing, rounded corners, and typography to the existing premium finder style.
- Ensure the chips sit flush with the left/right page edges and align with the navbar/page container.
- On mobile, the chip row becomes horizontally scrollable with a subtle fade hint.

## Files to change
- `src/routes/finder.tsx` — add the category chip row, wire it to search params, remove type dropdown from the bar.
- `src/components/FinderPanel.tsx` — remove the type field from the `bar` layout and optionally add icons to the remaining fields.
- `src/lib/finder.ts` — no schema changes needed; reuse existing `typeCounts` helper.

## Out of scope
- No new routes or data models.
- No changes to programme detail pages, calendar, or homepage.
