# A landing page for every programme

Right now clicking a programme opens a modal summary. Parents who are seriously considering a programme need a real page they can read, bookmark, share on WhatsApp and come back to. So every one of the 38 programmes gets its own page at `/programmes/<name>`, built from the same template as the Future Doctors Fellowship page you uploaded.

## What each page contains

1. **Hero** — breadcrumb (Programmes / interest area), a type chip (Fellowship · Flagship), the programme name, a parent-facing lede, an "Apply for <next month>" button and a "Next cohort starts … · early bird USD …" note.
2. **Key facts strip** — Length, Cohort size, Eligibility (grades + ages), Live sessions in Dubai time with US Eastern underneath.
3. **What your child will actually do** — numbered steps (5 for flagships, 3–4 for shorter programmes), written per programme.
4. **What they'll take away** — tick pills: certificate, letter of participation, portfolio-ready output, parent progress reports (tuned per type — competitions get placement/judging feedback instead).
5. **Money-back guarantee band** where it applies.
6. **Upcoming cohorts** — one card per cohort from the existing calendar data: date, day/length/batch line, fee with struck-through list price, "Apply for this cohort", plus the timezone footnote (US Eastern / Dubai / India).
7. **Mentor note** — who leads it and why that matters.
8. **Parents usually ask** — 3–4 FAQ accordions, programme-specific.
9. **Sticky apply bar** on mobile and desktop: fee, early-bird note, Apply now.
10. **Related programmes** — 3 cards in the same interest area or the natural next step by grade, so a parent who lands from Google keeps exploring.

Each page is colour-accented by its interest area (medicine crimson, law, finance, AI, and so on) so the tracks stay recognisable.

## How the pages get linked

- Programme cards on the home page, finder and calendar link to the programme page. The quick-look modal stays for fast scanning, with a "See full details" link into the page.
- Trending Top 5, pathway tiles and flagship cards link straight to the pages.
- Every page gets its own title, description, social preview text and Course/FAQ structured data, so each programme can rank on its own in Google.

## Content approach

The template needs richer copy than the catalogue currently holds ("what they'll do", takeaways, mentor note, FAQs). I'll add an optional detail block per programme:

- Full hand-written detail for the flagships (Future Doctors, Junior Doctor, Future Lawyers, Future Investors, AI, Entrepreneurship and the other headline fellowships).
- For the rest, the page still renders completely — steps and FAQs derived from the existing tagline, description, duration, grades, fee and cohort data — and reads naturally rather than looking half-empty. You can then upgrade any programme's copy later.

## Technical notes

- New route `src/routes/programmes.$slug.tsx` with a slug derived from each programme id, `notFoundComponent` for unknown slugs, and head metadata plus JSON-LD per programme.
- `src/lib/programmes.ts`: add an optional `detail` field (lede, doSteps, takeaways, guarantee, mentor, faqs, cohortSizeLabel, ageLabel) and a slug helper; no changes to existing filtering data.
- New components: `ProgrammeHero`, `KeyFacts`, `DoSteps`, `TakeawayPills`, `CohortCards`, `MentorNote`, `ProgrammeFaq`, `StickyApplyBar`, `RelatedProgrammes`.
- Track accent handled with an existing CSS variable per track — no hardcoded colours.
- All 38 pages prerender as static server-rendered HTML.
