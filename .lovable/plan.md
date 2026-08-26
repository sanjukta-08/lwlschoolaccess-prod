# Learner feedback quotes from the two feedback docs

I fetched both documents successfully:

- **LWL Programs - Learner Testimonials (Master Feedback Sheet)** - roughly 60 quotes across Future Doctors (Batch 1 and 2), Onward AI Pathway, Onward Future AI Leaders Fellowship, Onward Batches 1-5, ADNOC Cohorts 1 and 2, Financial Literacy, EDGE AI.
- **Summer Camp 2026 - Learner Testimonials** - quotes across Yale Global Diplomacy, HCUS Young Global Leaders, FUSI Geneva, and the fourth camp programme, including two long parent testimonials.

Each quote has a learner (or parent) name and the programme it belongs to, so every card can carry the programme name as a label.

## What gets built

**1. New content file for the quotes**

All quotes stored as structured data: name, whether they are a student or parent, programme label (e.g. "Future Doctors - Batch 2", "Yale Global Diplomacy Programme"), quote text, source doc group (LWL Programs vs Summer Camp 2026), and - where a matching programme page exists - a link to that programme's landing page.

Very long testimonials (the two Yale parent notes, the FUSI Geneva ones) get clamped on the card with a "Read full note" expansion so the band stays scannable.

**2. Homepage band, below the Instagram section**

A new section titled around "What learners said when the cohort ended", sitting directly under the Instagram band and above the video band. It shows a curated set of the strongest quotes in the same auto-scrolling continuous-loop style already used for Instagram, with:

- programme name as a gold label on each card
- learner name plus a "Parent" tag where applicable
- quote in serif, sized to the existing card rhythm
- pause on hover, arrows to step through
- a "Read all learner feedback" button linking to the Stories page

Styling follows the existing testimonial cards exactly (bordered card, same heading size, same spacing rhythm) so nothing looks bolted on.

**3. Full list on the Stories page**

A new band on `/stories` listing every quote, grouped by programme with a sticky-style programme heading and a count, in two columns on desktop. The existing track filter on that page continues to work: selecting a track narrows the quotes to the programmes in that track. Programme headings link through to the programme landing page where one exists.

## Technical notes

- New `src/lib/learner-feedback.ts` holding the parsed quotes plus helpers (`FEEDBACK_BY_PROGRAMME`, `FEATURED_FEEDBACK`, `feedbackForTracks`), reusing the `TrackKey` and slug helpers already in `src/lib/programme-slug.ts` and `src/lib/programmes.ts`.
- New `src/components/LearnerQuotes.tsx` with two variants: `marquee` (homepage) and `list` (stories page), mirroring the API of `StoryGallery`.
- `src/components/StoryStrip.tsx` gets the homepage band inserted between the Instagram and video sections.
- `src/routes/stories.tsx` gets the grouped full list, wired to its existing `track` search param.
- Duplicate entries in the source docs (the same person repeating a near-identical note) are collapsed to one card each.
- No new dependencies, no backend, no images - text only, so page weight is unaffected.
