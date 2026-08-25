# Make every programme clickable + skills and outcomes on each landing page

## What changes for a parent

1. **Every programme card is a link.** Clicking anywhere on a card in the finder, the calendar rows, the trending strip and the pathway lists opens that programme's own landing page. Today a card opens a quick-look modal and only the small "Details" link goes to the full page.
2. **"Quick look" stays available** as a small secondary action on the card, so parents who just want dates and fees don't lose that.
3. **Each landing page gains two new blocks:**
   - **Skills your child will gain** — 5–7 named skills, drawn from the programme's interest field and its category, shown as labelled items rather than a vague list.
   - **The project they finish with** — the concrete deliverable (e.g. a capstone case study, a working prototype and demo, a published paper, a pitch deck, a moot brief), plus what it proves on an application and where it can be shown (portfolio, LinkedIn, supervisor letter).
4. A short line links from those blocks to `/profile-building` so the skills-to-proof logic stays consistent across the site.

## Content approach

Skills and the finished project are written per programme for the flagships and derived for the rest, so all 35 pages read complete:

- Hand-written entries for the flagship fellowships (Future Doctors, Junior Doctor, Future Lawyers, FinLit, Future AI Leaders, Future Entrepreneurs, Future Changemakers, Young Debaters, Research Publication, MUN, the corporate internships).
- Everything else composes from the programme's interest track (existing per-field skills and target outcomes) plus its category (existing per-category proof list), so a competition reads like a competition and an internship like an internship.

## Technical section

- `src/lib/programme-detail.ts`: extend `ProgrammeDetail` with `skills: string[]`, `project: { title: string; body: string; proof: string[] }`. Add hand-written values in `WRITTEN` for flagship ids; add `derivedSkills(p)` and `derivedProject(p)` that read `TRACK_PROFILE` / `TYPE_PROFILE` from `src/lib/profile-building.ts`. Wire both into `detailFor`.
- `src/components/ProgrammeLanding.tsx`: add a "Skills your child will gain" grid and a "The project they finish with" panel (title, body, proof checklist) between the existing do-steps/takeaways and cohort cards, matching current card/pill styling and track accent. Include `teaches`/`educationalCredentialAwarded`-style fields in the existing Course JSON-LD.
- `src/components/ProgrammeCard.tsx`: make the whole card a `<Link to="/programmes/$slug" params={{ slug: slugOf(p) }}>` for both the normal and compact variants; keep apply buttons and the new "Quick look" button as nested controls with `stopPropagation`/`preventDefault`. Keep the `onOpen` prop so the modal still works from that button.
- `src/components/CohortRows.tsx`, `src/components/CohortAgenda.tsx`, `src/components/DayList.tsx`, `src/components/TrendingTop5.tsx`, `src/components/ProfilePathway.tsx`: point the row/title click target at the landing page route, keeping quick-look where it exists.
- No data-model or backend change; all routes already exist.

## Verification

Typecheck, then browser-check a fellowship, a competition and an internship landing page for the new sections, and confirm card clicks land on the right slug from the finder and calendar.
