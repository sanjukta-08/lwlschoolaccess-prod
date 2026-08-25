# Full calendar page + a parent-first home page

Two changes: the calendar becomes its own full-calendar page matching the new upload, and the home page becomes a guided starting point — trending picks first, then all the main programmes, then a profile-building pathway.

## 1. `/calendar` — the full calendar (rebuilt to match the upload)

Replaces the current month-grid page with the agenda layout from the new file:

- White hero: "The **full calendar** — July 2026 to April 2027", with the sub-line about picking a category, searching, and Dubai time (GMT+4) alongside US Eastern.
- Sticky control bar: **By month / By type** view switch, keyword search, type pills (All, Fellowships, Programmes, Competitions, Internships, MUN) with live counts, and **All upcoming / Starting soon**.
- Interest chip row (Medicine, Law, Finance, AI & Tech, Entrepreneurship, Research, Debate, Leadership, Exams) with live counts.
- Month jump strip (Jul '26 … Apr '27 with cohort counts) that scroll-spies and only shows in month view.
- **By month:** month heading + cohort count, then one row per cohort — colour-coded date block, track · type line, programme name, grades · length · dual time, fee, and a "Starting soon" / "Applications open" badge.
- **By type:** grouped by programme type with the type blurb, one row per programme showing its next start plus "Also starts" pills.
- Count line ("N programmes · N cohorts match"), "Clear all filters", empty-state note.
- Any row opens the existing detail sheet. All filters stay in the URL so links are shareable.

The existing month-grid + day panel is retired from this page (the agenda covers it), keeping the page focused as in the upload.

## 2. Home page — think like a parent

Above the current results, in this order:

- **Trending now — top 5 to start with:** a numbered strip of the five flagship programmes (highest-demand, nearest starts) as compact cards — rank, name, grades, next start, fee, why-it-suits-you line, Apply. Card 1 gets a "Most popular" flag.
- **All main programmes:** the existing grouped result list stays, keeping category sections, month sort, compact density and the finder filters.
- **Plan your profile building with us:** a Grade 5–7 → 8–10 → 11–12 pathway strip — what to build at each stage (explore interests → depth and evidence → application-ready proof), with 2–3 recommended programmes per stage that link into the detail sheet, and a "Talk to an advisor" CTA.
- Calendar hand-off card linking to the full calendar page.

Header nav updates to "Finder / Full calendar / How it works / FAQ".

## Technical notes

- New components: `CalendarControls`, `CohortRows` (month + type grouping), `MonthJump`, `TrendingTop5`, `ProfilePathway`. `/calendar` rebuilt around them; `MonthGrid`/`DayList` removed from the route.
- `src/lib/finder.ts` gains a `calView` (`month` | `type`) search param via the existing string-with-fallback validator, and helpers `groupEntriesByMonth`, `groupProgrammesByType`, and `facetCounts` for the live pill counts.
- Trending picks and pathway stages are declared as small typed lists in `src/lib/programmes.ts` referencing existing programme ids — no data duplication, no backend.
- Existing tokens only (ink, wash, crimson, gold, track colours); `dualTime` reused for every time string; per-route `head()` metadata updated for the calendar page.
