# Seven-category programme filter (from your doc)

Rebuild the finder's navigation around the seven interest categories in your document, with one category per programme so a chip never shows the same programme twice.

## The seven chips

Medicine & Healthcare · Law, Debate & Communication · Finance & Investing · AI, Technology & Entrepreneurship · Research & Academic Writing · Leadership & Global Affairs · Test Prep & College Readiness

Each chip shows a short parent-facing line (e.g. "For students drawn to argument, advocacy and speaking on stage") and a live count. Results group under category headings so browsing without a filter still reads cleanly.

## Which programmes appear

The finder leads with the 18 canonical programmes from the doc. Nothing is deleted from the catalogue — the other cohorts and HSA/MUN variants keep their landing pages and calendar rows, and the finder has a quiet "Show all programmes" toggle at the bottom of the list for people who want the full set.

Two mapping notes I'll surface rather than guess on:
- "Junior Doctor Fellowship" (Grades 5–8, 3 weekends) has no exact match in the current data; the closest is "Future Doctors Level 1 (HSA)". I'll map it to that and flag it for your confirmation.
- Per your answer, the flagged data issues (Young Debaters date, naming variants, "Research Fellowship" duplicate) stay untouched this round.

## Secondary filter row

A single compact second row, collapsed on mobile:

- Grade band: 5–7 · 6–8 · 8–12 · 9–12 (matching the doc's bands, replacing the current 5–7 / 8–10 / 11–12 split)
- Duration: 3-weekend intensive · 6 weeks · 8 weeks · 10–12 weeks
- Mentor university: Harvard · Yale · MIT / Stanford / Princeton (new field, also shown as a line on cards and landing pages)
- Type: Fellowship · Programme · Competition
- Live on Zoom: filter to programmes with live mentor sessions, with the session time shown in your timezone and Dubai

Every filter stays in the URL, so a chip combination is shareable and a school can be sent a pre-filtered link.

## Cards and landing pages

Each result row shows: category dot, programme name, grades, duration, mentor university, next start date, fee. Clicking opens the existing programme landing page. Home-page pathway tiles and the calendar's type filter switch to the same seven categories so the language is consistent site-wide.

## Technical notes

- `src/lib/programmes.ts`: add `CATEGORIES` (7 keys with label + blurb), a single `cat` field per programme, `mentors: string[]`, and a `canon: true` flag on the doc's 18. Existing `tracks` stay for search keywords and landing-page copy.
- `src/lib/finder.ts`: new search params `cat`, `dur`, `uni`, `live`; grade bands updated to the doc's four; filtering groups by programme (not cohort) so a chip can't repeat a programme.
- `src/components/FinderPanel.tsx`, `ResultGroup.tsx`, `ProgrammeCard.tsx`: chip row, secondary row, mentor line, canonical/all toggle.
- `src/components/ProfilePathway.tsx` and `src/routes/calendar.tsx`: reuse `CATEGORIES` instead of `TRACKS`.
