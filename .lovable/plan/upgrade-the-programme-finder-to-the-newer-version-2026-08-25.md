# Upgrade the Programme Finder to the newer version

The new upload is an improved version of the same page. It keeps all 38 programmes and the finder, and adds five things the current app doesn't have. Plan is to port each of them.

## 1. Dubai time alongside US Eastern

Every session time currently shows only ET (e.g. "Sat & Sun, 9:00–10:30 AM ET"). The new version converts to Dubai time and shows both: "5:00 PM–6:30 PM GMT+4 (Sat & Sun, 9:00–10:30 AM ET)". Applied on the programme cards, the detail sheet, the calendar rows and the day panel.

## 2. Hero stat strip

Under the hero subtitle: Programmes (38), Upcoming cohorts (75), Months ahead (10), Mentors from (Harvard · Yale).

## 3. Full calendar list view

The new version presents the calendar as a month-grouped agenda list — date block, programme name, grades · length · time, fee and a "Starting soon" / "Applications open" badge — with its own keyword search and an "All upcoming / Starting soon" toggle, and a count of matching cohorts.

The existing month grid stays. The `/calendar` page gets a Grid / List switch (kept in the URL) so parents can use either, with the list as the default since that matches the new design.

## 4. "Describe your child" counsellor block

A two-column card on the finder page: copy on the left with three clickable example prompts that fill the box, a free-text area on the right, and an "Ask the counsellor" button that opens the user's email to hello@learnwithleaders.com with the text prefilled.

## 5. FAQ accordion + missing sections

- Six-question FAQ accordion ("Are all these programmes fully online?", ages/grades, cost, who teaches, how to apply, how often updated), styled as the crimson +/– disclosure from the new file.
- Add the "How it works" and "Why Learn with Leaders" sections that exist in the source page but were never ported.
- Header nav gains anchors for Full calendar / How it works / FAQ.

## Technical notes

- New helper `dualTime()` in `src/lib/programmes.ts` (ET → GMT+4, handles ranges like "9:00–10:30 AM"), reused by every component that renders `p.time`.
- New components: `HeroStats`, `CohortAgenda` (list view), `CounsellorCard`, `FaqAccordion`, `HowItWorks`, `WhyLwl`.
- `/calendar` search params extend with `view` (`list` | `grid`) and a status filter (`all` | `soon`) via `fallback()` so bad URL values degrade safely.
- FAQ gets FAQPage JSON-LD in the route `head()` for search results; new sections use existing brand tokens (crimson, ink, wash, gold, track colours) — no new colour values.
- The counsellor block is a `mailto:` link exactly like the source; no backend needed.
