# Clean up the /finder page

The finder works, but it reads as clutter: nothing lines up, every row repeats the same information, and there are too many controls competing at the top. This is a presentation-only pass. No filter logic, data, or routing changes.

## What is actually wrong (from the live page)

1. **Rows do not line up.** Each result row is a flex-wrap strip, so the title, dates, fee and buttons sit at slightly different x-positions on every row. Long titles push the columns around, and rows vary in height.
2. **Broken icons.** Several sidebar interest tiles ("All", "Research", "AI & Tech", "Entrepreneurship") and some row icons render as empty boxes instead of glyphs.
3. **Repetition as noise.** Nearly every row says `5:00 PM GMT+4 · Live on Zoom`. Repeated 35 times it stops being information.
4. **Four control clusters stacked.** Trending strip, headline, Category/Month toggle, List/Cards toggle, and a type tab bar all sit within 150px of each other, while the sidebar repeats the same type filter with counts.
5. **Dead space.** The sidebar ends about a third of the way down and leaves a long empty column; the page then ends in an accordion stack plus a banner plus a CTA plus a footer.

## The fix

**A. Turn the list into a real table-like grid**
Replace the wrap-flex row with a fixed column template: programme (flexible) · schedule · fee · actions. Same left edge, same baselines, same row height on every row. Hairline dividers instead of a card per row, so 35 rows read as one calm column. Alternating row tint on hover only.

**B. One line of metadata per row**
- Line 1: programme name + track dot.
- Line 2: the outcome sentence.
- Line 3: `Fellowship · Grades 8-12 · 6 sessions · ~2h/week` in one muted mono line.
- Right side: start date (bold), local time under it, fee, then a single outlined "View" and the save heart.
- "Live on Zoom" moves out of every row into one line stated once above the list; the Zoom mark stays only on Cards view.

**C. Fix the icons**
Swap the emoji glyphs in the interest tiles and row markers for lucide icons (already installed) so nothing renders as a box. One consistent icon set, track colour applied via the existing tokens.

**D. Simplify the toolbar**
- Keep the headline plus a single result count.
- One row of controls on the right: sort (Category / Month) and view (List / Cards).
- Remove the duplicated type tab bar from the results area, since the sidebar already owns type filtering with counts. Group headings stay for Category/Month sorting.
- Trending top-3 strip moves above the toolbar with clear separation, or is dropped from /finder since it already leads the homepage. Default: keep it, visually separated.

**E. Sidebar as a quiet rail**
- Tighter vertical rhythm, section labels in small caps, thin dividers between groups.
- Applied filters shown as removable chips at the top of the results, so state is visible without re-reading the rail.
- Rail sticks and gets a subtle full-height background so the empty lower column no longer reads as a gap.

**F. Calm the page tail**
Keep the calendar banner and the four accordion sections, but give them one shared container and consistent spacing so the page ends deliberately instead of trailing off. Reduce the number of vertical rhythms on the page to one spacing scale.

## Technical notes

- `src/routes/finder.tsx`: toolbar restructure, remove the group tab bar, applied-filter chips, spacing scale, tail grouping.
- `src/components/ProgrammeCard.tsx`: rewrite the `compact` branch as a CSS-grid row with fixed columns; trim per-row Zoom badge; outlined View button.
- `src/components/FinderPanel.tsx`: rail spacing, lucide icons in `Tile`, sticky full-height treatment.
- `src/components/ResultGroup.tsx`: divider-based list container instead of gapped cards.
- Colours and type stay on existing tokens (`ink`, `wash`, `line`, `crimson`, `gold`, track colours). No new hardcoded colours.
