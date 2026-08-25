# Richer programme pages, no more pop-ups

Each programme page (`/programmes/<name>`) becomes the single place a parent lands, reads and decides — no modal anywhere, everything crawlable by Google.

## Remove the quick-look pop-up

- Delete the "Quick look" modal from the finder, home, calendar and pathway sections; every card, row and chip goes straight to the programme page.
- The modal component is removed, so there is no content that only exists inside JavaScript — every word is on a real URL search engines can index.

## What gets added to every programme page

New sections, in reading order after the existing hero and "What your child will actually do":

1. **Skills your child will gain** — upgraded from a plain list to grouped skill cards: the skill, one line on how it is practised in this programme, and which of the four skill families it belongs to (thinking, communication, building, working with people).
2. **Projects they finish with** — 3 concrete sample project briefs per programme (title, the question it answers, what gets produced, how long it takes), plus the existing proof checklist. Parents see exactly what comes out at the end.
3. **How this strengthens their university profile** — a short "before / after" band: the line a family could honestly write on an application after this programme, what admissions officers can verify, and which next programme deepens it. Links through to `/profile-building`.
4. **What families say** — 2–3 testimonial cards per programme (parent and student voice, grade, city) plus one longer featured quote. Written as placeholders you can swap for real quotes in one data file.
5. **Mentors, cohorts, FAQs, related programmes** — kept as-is, reordered so cohorts and apply sit below the proof story.

Also: a slim in-page nav under the hero (Overview · Skills · Projects · Profile · Reviews · Dates) so the longer page still feels navigable, and the sticky apply bar stays.

## SEO

- Testimonials feed `AggregateRating` + `Review` structured data on the Course schema; projects feed `syllabusSections`; the profile section extends `teaches`.
- Section headings become real `h2`/`h3` levels with anchor ids, so Google can deep-link to "Projects" or "Reviews".
- Unique title, description, og tags and canonical stay per programme (already in place).

## Technical notes

- New data file `src/lib/programme-proof.ts`: per-programme `projects[]`, `testimonials[]`, `profileImpact`, and skill grouping — hand-written for the flagships, derived from track + type (reusing `TRACK_PROFILE` / `TYPE_PROFILE` in `src/lib/profile-building.ts`) for the rest, so all 35 pages read complete.
- New components: `SkillMatrix.tsx`, `ProjectShowcase.tsx`, `ProfileImpact.tsx`, `ProgrammeTestimonials.tsx`, `PageJump.tsx`; `ProgrammeLanding.tsx` composes them.
- `ProgrammeSheet.tsx` deleted; `src/routes/index.tsx`, `finder.tsx`, `calendar.tsx`, `calendar-month.tsx` drop their `detailId` state and quick-look buttons.
- `programmes.$slug.tsx` head() extends the existing Course/FAQ JSON-LD with review and syllabus data.
- Testimonials are clearly marked placeholders in the data file (same pattern as `PRESS` in `src/lib/social-proof.ts`) — real quotes drop in without touching components.
