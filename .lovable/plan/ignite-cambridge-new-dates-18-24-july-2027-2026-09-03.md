# IGNITE Cambridge: new dates 18-24 July 2027

Replace every "dates to be announced / Summer 2027" placeholder for the Cambridge Judge IGNITE camp with the confirmed dates: **18 - 24 July 2027**. 18 July 2027 is a Sunday and 24 July is a Saturday, which matches the existing Day 1 (Sunday) to Day 7 (Saturday) schedule, so the schedule tabs stay as they are.

## What changes

1. **Camps listing card and camp data** (`src/lib/camps.ts`, IGNITE entry): cohort becomes `label: "18 - 24 July 2027"` with `start: "2027-07-18"`, replacing the "Dates to be announced / Join the interest list" placeholder. This automatically updates the /camps card schedule line and any date-driven sorting or season display.

2. **Programme details card** (`IgniteProgrammeDetails.tsx`):
   - Dates card: "18 - 24 July 2027" (Cambridge, arrival Sunday, departure Saturday).
   - Fees footer line "Applications for Summer 2027 opening soon" becomes "Applications open for 18 - 24 July 2027".
   - Keep the airport pickup wording but drop "exact dates ... to be confirmed" so it only says pick-up location and timings are confirmed closer to the programme.

3. **CTA band** (`IgniteCTASection.tsx`): replace "Summer 2027 cohort • Applications opening soon — check back shortly" with "18 - 24 July 2027 • Cambridge Judge Business School".

4. **Terms section** (`IgniteTermsSection.tsx`): the arrival/departure sentence names the real dates (arrival Sunday 18 July, departure Saturday 24 July, 10:00 AM) instead of "Exact dates for the Summer 2027 cohort will be confirmed shortly".

5. Check the IGNITE hero and route `head()` metadata for any leftover placeholder date wording and align it to the confirmed dates.

## Notes

- Content/presentation only. No database writes: cohort rows in the shared catalogue are owned by the LWL Console, so if this camp should also appear as a live cohort in `all_cohorts`, that record needs to be created there.
- Apply link behaviour is unchanged.
