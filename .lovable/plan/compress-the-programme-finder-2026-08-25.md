# Compress the programme finder

Same content, half the scroll. The finder page currently stacks: tall hero + stats, filter panel, trending strip, sort/view/jump-to controls, every category group expanded at once, calendar CTA, pathway, counsellor, how-it-works, why, FAQ, closing CTA. Everything is centre-aligned and full-width, so nothing reads as a hierarchy — just one long column.

## The new visual play

```text
┌──────────────────────────────────────────────┐
│ compact hero: one line + inline stat chips   │
├──────────────┬───────────────────────────────┤
│ STICKY       │ Top picks (3 across, slim)    │
│ FILTER RAIL  ├───────────────────────────────┤
│ grade        │ [All][Fellowships][Programmes]│
│ interest     │ [Competitions][Internships]   │
│ type         │ ── rows of results ──         │
│ month        │ ...                           │
│ search       │ Show 12 more                  │
│ reset · count│                               │
└──────────────┴───────────────────────────────┘
│ accordion: How it works · Why LWL · FAQ      │
│ one CTA band + footer                        │
```

1. **Hero shrinks to a band.** Headline + one supporting line + the stats as small inline chips on the same row. No 190px spacer, no overlapping panel lift.
2. **Filters move to a left sticky rail** (desktop) so results start at the top of the viewport instead of below a full screen of controls. On mobile the rail becomes a single sticky filter bar that opens a sheet.
3. **Category groups become tabs, not stacked sections.** One category visible at a time with counts on each tab — this alone removes most of the page length. "Jump to" chips go away since tabs replace them.
4. **Compact row becomes the default view**, cards are the opt-in. Rows show the same data (track, name, type, grades, date, time, fee, Apply) in one line.
5. **Results paginate** — first 12 rows, then "Show 12 more", instead of rendering all 35 at once.
6. **Top picks strip slims down** to three horizontal picks in a single row, filter-aware as today.
7. **Marketing tail collapses.** Pathway, counsellor, how-it-works, why-LWL and FAQ become a compact accordion group ("How it works", "Why parents choose us", "Plan the profile", "Questions") plus the single closing CTA band. Nothing is deleted — it is one tap away.
8. **Alignment change:** left-aligned headings and a real 2-column grid replace centre-aligned everything, which is what makes the page feel long and undifferentiated.

## Technical notes

- `src/routes/finder.tsx`: restructure into hero band → `grid lg:grid-cols-[260px_1fr]` with `sticky top-20` rail → tabbed results → accordion tail. Keep search-param state, `getMatches`, `groupMatches`, SEO head and FAQ JSON-LD untouched.
- New `activeCat` + `visibleCount` local state; category tabs derive from `groupMatches(matches, state.sort)` so "By start month" sorting turns the tabs into month tabs for free.
- `src/components/FinderPanel.tsx`: add a `layout="rail" | "bar"` prop for the vertical stacked variant; existing horizontal usage elsewhere keeps working.
- `src/components/ProgrammeCard.tsx`: compact row gets slightly denser padding; no data removed. `density` default in `src/lib/finder.ts` flips to `compact`.
- `src/components/ResultGroup.tsx`: renders only the active group; sticky group heading no longer needed.
- Existing shadcn `Accordion`/`Sheet` for the tail and mobile filters; all colours stay on existing semantic tokens.
- No changes to programme data, routing, or the programme landing pages.
