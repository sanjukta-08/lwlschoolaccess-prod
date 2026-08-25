# Programme Finder + Monthly Calendar

Rebuild the uploaded Learn with Leaders "Programme Finder" page as a real app, and add a month-by-month calendar view of every cohort start date, plus keyword search in the finder.

## Pages

1. `/` — Programme Finder (faithful replica)
   - Hero with eyebrow chip, serif headline, sub-line.
   - Overlapping white finder card: the "sentence" filters (grade select, start-date select), type segments with counts, interest tiles with per-track colours, live result count, reset link.
   - Result grid of programme cards: track pill, grade tag, name, tagline, meta rows (duration, timing, next start), early/regular fee with saving badge, "also in" pills, Apply + View page actions.
   - Click a card to open the detail sheet overlay (about, what's included, cohorts, fees, apply link).
   - Empty state with nearest alternatives, timezone note.

2. New: keyword search
   - A search field inside the finder card that matches programme name, tagline, about text and track labels, combined with the existing filters. Debounced, clearable, reflected in the URL.

3. `/calendar` — Monthly cohort calendar
   - Month grid (Mon–Sun) with prev/next month and "today" control; each cohort start date renders as a colour-coded chip using its track colour.
   - Day click opens a panel listing that day's cohorts (programme name, type, grade range, timing, fee, apply link) and links into the same detail sheet.
   - Mobile falls back to a stacked month list of dates.
   - Same grade / type / interest / search filters apply here, so the calendar reflects the finder selection.

Header nav links the two views (Finder / Calendar) with the existing crimson pill CTA.

## Technical notes

- Extract `TRACKS` and all `PROGRAMMES` from the uploaded HTML into a typed module `src/lib/programmes.ts` (id, name, type, tracks, grade range, tag, about, duration, time, fees, badge, site, apply, cohorts with optional per-cohort fee override). No backend or database — static data, so it renders on the server and is SEO-indexable.
- Shared filter logic in `src/lib/finder.ts` (grade, type, interest, start window, query) used by both routes; filters live in URL search params via `validateSearch` + `fallback` so views and links stay shareable.
- Design system: port the uploaded palette (ink, wash, crimson, gold) and the nine track colours into `src/styles.css` as semantic tokens; load Newsreader / Figtree / IBM Plex Mono via a `<link>` in `__root.tsx`. No hardcoded colour utilities in components.
- Components: `FinderPanel`, `ProgrammeCard`, `ProgrammeSheet`, `MonthGrid`, `DayList`, `SiteHeader`.
- Per-route `head()` metadata for `/` and `/calendar`.
