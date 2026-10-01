# Camps: a hub landing page + a page for every camp

Camps are the one offering missing from this site. They deserve a different feel from the online fellowships: passports, campuses, Harvard/Cambridge/Geneva/Salamanca, students on the ground. So camps get their own section with a flagship hub page and a rich page per camp — testimonials, real video, and playful touches, held inside the crimson/gold brand.

## The 7 camps (from learnwithleaders.com)

| Camp | Host | Dates |
| --- | --- | --- |
| HCUS Young Global Leaders Summer Camp | Harvard | To be announced |
| HCUS Young Global Leaders Winter Camp | Harvard | 3-10 & 10-17 Jan 2027 (2 cohorts) |
| Pre-Med Horizons Program | Harvard (HUGEM) | 4-9 Jan 2027 |
| Pre-Law Horizons Program | Harvard (HUGEM) | 11-16 Jan 2027 |
| IGNITE Entrepreneurship | Cambridge Judge | To be announced |
| Future Sustainability Innovators | University of Geneva | 13-19 Dec 2026 |
| Entrepreneurship Powered by AI | Salamanca, Spain (NYU faculty) | 13-19 Dec 2026 |

## Step 1 - you pick the hub design

Before building, I'll show 3 rendered directions for the camps hub hero and camp-card grid (e.g. a boarding-pass/passport travel feel, a full-bleed campus editorial feel, and a map-anchored "where in the world" feel). You choose one, and every camp page inherits that language.

## The hub page `/camps`

- Hero: destination-led, with the count of camps, cities and universities, and a "Book a call" CTA.
- A "next departures" rail: the soonest camps first with dates, city and seats note.
- Camp cards: campus photo, university crest line, city, dates, duration, grade band, one-line promise, and a bordered "Explore camp" button.
- Filter chips that stay simple: destination (USA / UK / Europe), season (Winter / Summer), and theme (Leadership, Medicine, Law, Entrepreneurship, Sustainability, AI).
- Video wall using the real Geneva camp clips already in the project, plus learner and parent testimonials pulled from the existing testimonials data filtered to camp attendees.
- A "what a camp week feels like" strip: arrival, campus sessions, city immersion, capstone, closing ceremony — with fun, human copy rather than bullet lists.
- Parents-usually-ask FAQs: safety and supervision, visas and letters, flights and accommodation, fees and what's included.

## Each camp page `/camps/<slug>`

Modelled on the strongest camp page you already have (Pre-Med Horizons), same skeleton for all seven:

1. Full-bleed campus hero: eyebrow line, camp name, host university, lede, dates chip, "Apply now" + "Book a call".
2. Stat band: days of programming, capstone count, themes per day, career pathways.
3. The vision: why this field, why this campus.
4. Day-by-day journey (six days for the Harvard camps, matching each camp's real arc).
5. The framework: who it's for, how it unfolds, what students carry forward.
6. What's included / not included, so parents can budget honestly.
7. Cohort cards with dates and apply links; multi-cohort handled for the Harvard Winter Camp.
8. Testimonials and videos from that camp where we have them, otherwise the section falls back to camp-wide proof rather than looking empty.
9. Sticky apply bar, and "other camps you may like" at the bottom.

Where the live site has no dates yet, the page says "Dates to be announced - join the interest list" instead of faking a date.

## Navigation and discovery

- "Camps" added to the header, and inside the Our Offerings dropdown as its own group.
- Camps linked from the homepage (a slim destination band) and from the footer.
- Each page gets its own title, description, social preview text, plus Course/Event and FAQ structured data so individual camps can rank in Google.

## Technical notes

- New `src/lib/camps.ts`: camp records (slug, name, host, city, country, season, themes, gradeBand, dates/cohorts, fee note, inclusions, journey days, framework pillars, faqs, apply URL) and helpers for sorting by next start date.
- New routes `src/routes/camps.index.tsx`, `src/routes/camps.tsx` (layout `<Outlet />`), `src/routes/camps.$slug.tsx` with `notFoundComponent`.
- New components: `CampHero`, `CampCard`, `CampJourney`, `CampFramework`, `CampInclusions`, `CampCohorts`, `CampVideoWall`, `CampFaq`, `RelatedCamps` — reusing `PageHero`, `SectionHeading`, `FaqAccordion`, `StoryGallery`, `SaveButton` and the existing shortlist/ICS helpers so camps can be saved and added to a calendar like programmes.
- Campus imagery generated as brand-consistent assets (no hotlinking from the old WordPress site); Geneva video assets already in `src/assets` reused.
- Colour accents via existing track tokens only; no hardcoded colours. No data-layer or Supabase changes.
