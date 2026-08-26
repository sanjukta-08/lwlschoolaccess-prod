# Easy-pick category chips on calendar pages

## Goal
Make programme-type selection the fastest action on both calendar views, just as it is on the finder. Parents should see the main categories up front and switch with one click.

## What we will build

### 1. Prominent category toggle chips
- A sticky-aware row of large pill/tile buttons placed directly inside the calendar filter bar, above the dropdown fields.
- One button per programme type: **All**, **Fellowships**, **Programmes**, **Competitions**.
- Each button shows the type label + live count of matching options (respecting the other active filters).
- Active state uses the premium ink/gold treatment already in the design system.
- Clicking a chip updates the `type` search param and, on the month-grid page, resets the month index to the first available month.

### 2. Refined dropdown filter bar
- Keep the horizontal bar (subject area, starts in, search).
- Remove the duplicated "Programme type" dropdown from the bar because the chips now handle it.
- Re-order the remaining fields for natural parent flow: **Subject area → Starts in → Search**.
- Keep the live counter, "All upcoming / Starting soon" toggle, active-filter chips and "Clear all" link below the bar.

### 3. Default state
- On first load the calendar continues to show **All** programme types.
- The "All" chip is selected by default.

### 4. Visual polish
- Match spacing, rounded corners, and typography to the existing premium calendar filter style.
- On mobile, the chip row becomes horizontally scrollable with a subtle fade hint.

## Files to change
- `src/components/CalendarControls.tsx` — add the category chip row, wire it to the `type` search param, remove the type dropdown from the bar.
- `src/routes/calendar.tsx` — no direct changes; the component consumes the updated `CalendarControls`.
- `src/routes/calendar-month.tsx` — ensure month index resets when the type chip changes so the user lands on the first relevant month.

## Out of scope
- No changes to the finder page (it already has category chips per the approved finder plan).
- No new routes or data models.
- No changes to programme detail pages, homepage, or shortlist.
