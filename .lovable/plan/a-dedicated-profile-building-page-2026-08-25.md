# A dedicated Profile Building page

A new page at `/profile-building` that answers the parent question the finder can't: what does each programme actually *do* for my child's university profile, what skills come out of it, and what proof do we end up holding?

## Page structure

1. **Hero** — "Profile building, explained" with a short lede: universities read a story, not a list; here is how each programme type contributes and what your child walks away holding.

2. **The four steps, restated** — a compact strip reusing the existing pathway steps (Explore → Go deep → Application-ready → Verifiable proof) so this page and the finder tell the same story, with a link into the finder.

3. **What each programme type builds** — one block per type (Fellowships, Programmes, Competitions, Internships, MUN & Conferences). Each block carries:
   - what it is for in profile terms (depth, exploration, external validation, workplace credibility, diplomacy and negotiation)
   - **Skills gained** — chips (e.g. research method and citation, case reasoning, financial modelling, pitching, cross-examination, drafting resolutions)
   - **What you end up holding** — the tangible proof (paper, capstone, ranked award, internship letter, mentor letter, certificate)
   - the programmes in that type, each linking to its landing page

4. **Interest-by-interest table** — for each track (Medicine, Law, Finance, AI & Tech, Entrepreneurship, Research, Debate, Leadership, Exams) a row giving the profile story it supports, the two or three headline skills, and the outcome to aim for, linking to the finder filtered to that interest.

5. **From programme to proof** — a short flow showing how a single programme becomes an application line: attend live → build the artefact → get it reviewed → publish or launch → link it in the portfolio → mentor letter on file.

6. **Grade-band timing** — what to do in Grades 5–7, 8–10 and 11–12, and the honest note about what is too late.

7. **Parent FAQ** — reuse the existing accordion with profile-building questions (how many programmes is enough, do certificates matter, does this replace grades, how do universities verify).

8. **Closing CTA** — talk to a counsellor plus links to the finder and calendar.

## Copy source

Skills and outcomes are written per type and per interest as new content — grounded in the existing programme data (type, track, duration, takeaways) so nothing contradicts the programme landing pages. No invented university claims or guarantees.

## Navigation

Header gets a "Profile building" link next to Programme Finder and Full calendar. The pathway section on the finder gets a "How profile building works →" link into the new page, and programme landing pages link to it from their takeaways area.

## Technical notes

- New route `src/routes/profile-building.tsx` with its own `head()` (title, description, og/twitter) and FAQPage JSON-LD.
- New content module `src/lib/profile-building.ts`: `TYPE_PROFILE` (purpose, skills, proof per `TypeKey`), `TRACK_PROFILE` (story, skills, outcome per `TrackKey`), and the proof-flow and grade-band lists — all typed against the existing keys so they stay in sync with the catalogue.
- New components `src/components/ProfileTypeBlocks.tsx` and `src/components/ProfileTrackTable.tsx`; reuse `FaqAccordion`, `CounsellorCard` and existing tokens/design language. No hardcoded colours.
- `SiteHeader.tsx` gains the new link; `ProfilePathway.tsx` and `ProgrammeLanding.tsx` gain a link to the page. Finder, calendar and programme data logic stay untouched.
