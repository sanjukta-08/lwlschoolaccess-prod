# Shortlist + Reminders: getting a programme into the family's plan

Right now a family can browse, filter and read a programme page — but there is no
way to say "we want this one". Nothing is saved, nothing lands in their calendar,
and nothing brings them back when the cohort is two weeks out. This adds that
whole layer, with no sign-up required.

## 1. Save it — a shortlist that needs no account

- A heart/"Save" control on every programme card, calendar row and landing page.
  One tap adds the programme (and the specific cohort date) to a shortlist.
- Saved in the browser, so it survives refresh and revisits with zero friction —
  no login wall between a curious student and their first save.
- A shortlist counter in the header ("Saved 3") that opens a new `/shortlist`
  page: the saved programmes, their next start dates, total fees, and grade fit,
  with a "Share with a parent" copy link that encodes the shortlist in the URL —
  the student saves, the parent opens the link on their phone.
- Empty state on `/shortlist` points back to the finder with the three top picks.

## 2. Calendar it — real reminders in the family's own calendar

On every programme landing page and on each cohort row:

- **Add to calendar** menu: Google Calendar, Outlook / Apple (`.ics` download).
- The event is not just the start date. Each programme generates:
  - an "Applications close / decide by" reminder ~10 days before the cohort,
  - the cohort start date, all-day, with the programme name, fee, session time
    in both Dubai (GMT+4) and US Eastern, plus the landing-page URL in the
    description so they can reopen it from the calendar entry.
- A "Download all my dates" `.ics` on `/shortlist` — one file, every saved
  cohort, so the whole shortlist lands in the family calendar in one action.
- On `/calendar` and `/calendar-month`, each row gets the same add-to-calendar
  action next to Apply.

## 3. Nudge it — the moments that put it in mind

Small, non-annoying prompts placed where intent is highest:

- **Deadline urgency on cards**: "Starts in 12 days" and "Applications close
  Fri" chips computed from the cohort date, so a date feels like a decision.
- **Seats/cohort-size framing** already in the data ("4–6 students") shown next
  to the date on the landing page hero.
- **Sticky bar** on the landing page gains a secondary "Save & remind me"
  next to Apply — a soft action for families who aren't ready to apply today.
- **Exit-ready prompt on the finder**: once a family has 2+ saves, a slim strip
  offers "Put these dates in your calendar" (ICS) — no modal, no pop-up.
- **Student-voice framing vs parent-voice framing**: the save control reads
  "Save for later" for the student; the shortlist page speaks to the parent
  (fees, dates, what the child ends up holding, how it reads on an application).

## 4. Optional follow-up (needs your go-ahead)

Everything above works with no backend. If you also want to *reach* families
after they leave — email the shortlist, email a reminder a week before the
cohort, and see which programmes families shortlist most — that needs Lovable
Cloud (database + email) and becomes a second phase:

- "Email me this shortlist" — captures name, email, child's grade → your lead list.
- Automated reminder email 10 days before a saved cohort starts.
- A simple internal view of the most-shortlisted programmes.

Say the word and I'll build phase 2 after phase 1 is live.

## Technical notes

- `src/lib/shortlist.ts`: shortlist state as `{programmeId, cohortDate}[]` in
  `localStorage` behind a small React hook + context, hydration-safe (read in
  `useEffect`, so SSR markup and client markup match).
- `src/lib/ics.ts`: pure ICS builder (VEVENT + VALARM) and a Google Calendar
  template-URL builder; no dependencies, works in the browser.
- `src/components/SaveButton.tsx`, `AddToCalendar.tsx`, `ShortlistBadge.tsx`,
  reused by `ProgrammeCard`, `CohortRows`, `CohortAgenda`, `DayList`,
  `TrendingTop5`, `ProgrammeLanding`.
- New route `src/routes/shortlist.tsx` with its own head metadata and
  `robots: noindex` (it's a personal page, not a search result), reading an
  optional `?ids=` param so a shared link rebuilds the list server-side.
- Countdown/urgency helpers extend `src/lib/programmes.ts` date utilities.
- No pop-ups or modals — everything stays inline, consistent with the current
  SEO-first structure.
