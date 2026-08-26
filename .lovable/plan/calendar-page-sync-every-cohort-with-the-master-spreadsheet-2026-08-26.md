# Calendar page: sync every cohort with the master spreadsheet

## What the spreadsheet actually contains

The sheet has a summary tab plus ten month tabs (Jul 26 - Apr 27). The month tabs are the newer, cleaner source: they use the current programme names (e.g. "Capital Minds - AI Finance Fellowship", "Yale Global Affairs - World Leaders Academy", "Young Researchers Program"), carry a Batch/Cohort number per row, and add two columns the site does not use at all - **Flyer** and **Brochure** links. The old summary tab still lists retired items (Cartier, Allianz, Jiva) and older HSA programme names, so it will be ignored.

Good news from the check: the cohort **dates** on the site already line up with the month tabs for all 18 live programmes. What is missing is everything else the sheet records per cohort.

## What changes

1. **Cohort records get real detail.** Today a cohort is just a date. Each cohort will carry its own batch/cohort label ("Cohort 1", "Batch 2", "Batch 3"), its own session timing, its own fee, its own eligibility line, and its flyer + brochure links - taken row by row from the month tabs. Where a cohort matches the programme default, no override is stored.

2. **Per-cohort differences stop being wrong.** Examples found in the sheet: the November FinLit cohort is USD 999 (regular USD 1,200), not the programme's default fee; November SAT Instinct runs Sundays 10:30 AM EDT, a different slot from the March cohort. Right now the calendar shows one timing and one price for every cohort of a programme.

3. **Calendar page shows the cohort, not just the programme.** Each row in the monthwise calendar gains its cohort label, that cohort's own time and fee, and small "Flyer" / "Brochure" links next to Save and Apply. Clicking the row keeps going to the programme landing page.

4. **Past cohorts drop out cleanly.** Today's date is late August 2026, so the July cohorts and the 2 August SAT cohort are already past; they stay in the data as history but are filtered out of the calendar, finder and counts (the existing filter already does this) - so the visible calendar starts with the 23 and 29 August cohorts.

5. **Two sheet ambiguities get flagged, not guessed.** The Nov 26 tab has a Young Debaters row dated 26 September 2026 (looks like a copy-paste of the September cohort), and the ADNOC co-branded AI edition exists in the sheet but is not part of the 18-programme site catalogue. Neither will be invented into the calendar; I will list them back to you for confirmation.

## Technical notes

- `src/lib/programmes.ts`: extend `Cohort` with optional `label`, `time`, `elig`, `flyer`, `brochure` alongside the existing `fee`, then rewrite the `cohorts` arrays for all 18 programmes from the month tabs.
- `src/components/CohortRows.tsx`, `MonthGrid.tsx`, `CohortAgenda.tsx`, `DayList.tsx`, `calendar-month.tsx`: read cohort-level `time`/`fee`/`label` with programme-level fallback, and render flyer/brochure links.
- `src/lib/ics.ts` and `AddToCalendar`: use the cohort's own time when present so reminders are accurate.
- `TOTAL_COHORTS` and the finder facet counts keep working unchanged; no filter logic changes.
- No new dependencies, no backend, no route changes.
