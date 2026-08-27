# Fix alignment across pages

Goal: every page reads on one consistent alignment grid, and nothing gets clipped or cut off at the right edge.

## 1. Finder filter bar - clipped dropdown labels

The five filter dropdowns sit in flex columns with small minimum widths (140-150px), so longer values like "anywhere in the world" get visually cut instead of fitting or truncating cleanly.

- Move the bar from a free-flowing flex row to an explicit responsive grid so each filter gets an equal, predictable column (2 columns on mobile, 3 on tablet, 6 on desktop with Search spanning 2).
- Give the select trigger `min-w-0` plus proper truncation with the chevron pinned right, so a long label ellipsises instead of being sliced.
- Shorten the longest option labels ("anywhere in the world" -> "Anywhere") so the common case fits without truncation at all.

## 2. Finder subject chips - overflowing off the right edge

"Browse by subject" is a single horizontal scroll row, so on desktop the last chip is chopped mid-word with no visual cue that more exists.

- Let the chips wrap on desktop (`flex-wrap` from the medium breakpoint) so all subjects are visible with nothing clipped; keep horizontal scroll on mobile.
- Add a right-edge fade mask on the mobile scroll state so a cut chip reads as "scroll for more" rather than a bug.
- Apply the same treatment to the "Then by format" row so both rows behave identically.

## 3. Centered vs left-aligned mix

Right now the finder hero is fully centered while everything below (chip rows, filter labels, results header) is left-aligned against a different edge, so nothing lines up.

- Adopt one rule site-wide: page hero centered, all content below left-aligned to the shared `page-shell` gutter.
- Make the finder chip rows, "Filtered by", results header, and view toggles all start at the same left gutter as the cards below them.
- Section headings inside content areas follow the same left edge, with the "Watch all"-style actions right-anchored on the same baseline (matching the pattern already used on the homepage feedback sections).

## 4. Other pages

Sweep the remaining routes for the same two defects (content not on the shared gutter, and rows that clip at the right edge):

- `/calendar` and `/calendar-month` - month strip and grid cards on the same gutter, equal card heights per row.
- `/programmes/$slug` - hero centered, sections below left-aligned; card grids fill rows evenly.
- `/about`, `/profile-building`, `/testimonials`, `/internships`, `/shortlist` - hero via the shared `PageHero`, body content on `page-shell`, no orphan center-aligned blocks.

## Technical notes

- Files touched: `src/components/FinderPanel.tsx` (bar layout + `BoxSelect` truncation), `src/routes/finder.tsx` (chip rows, results header alignment), `src/lib/regions.ts` (shorter location labels), plus alignment-only passes over the calendar, programme-landing, and content routes.
- No filtering, data, or business logic changes - presentation only.
- Verified after with a production build and rendered screenshots at desktop (1362px), tablet, and mobile widths to confirm no clipping and a single left gutter.
