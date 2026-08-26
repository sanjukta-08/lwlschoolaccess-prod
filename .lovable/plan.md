# Learner testimonials from the two feedback docs

Add the real learner feedback from the two documents as a new band on the homepage, directly below the Instagram section, with each quote labelled by the programme it came from.

## What gets added

A new section: **"What learners said about each programme"** placed after the Instagram band and before the video clips.

- Quotes are grouped by programme name (Future Doctors, Onward AI Pathway, ADNOC cohorts, Financial Literacy, Onward Fellowship batches, EDGE AI, plus the Summer Camp 2026 programmes: Yale Global Diplomacy, HCUS Young Global Leaders, FUSI Geneva, IGNITE Cambridge).
- Each card shows the quote, the learner's first name + last initial, and a gold programme label chip (parent quotes marked "Parent").
- Auto-scrolling continuous marquee, matching the Instagram band behaviour (hover to pause, tap a card to expand the full quote).
- Two rows: online LWL programmes on the first track, Summer Camp 2026 on the second, each with its own small label.
- A "Read all learner feedback" link to `/stories`.

## Where else it appears

- `/stories`: a full, non-scrolling grid of every quote, grouped under programme headings.
- Individual programme landing pages: quotes are matched to their programme and shown in the existing testimonials section, so e.g. the Future Doctors page shows the Future Doctors quotes. Camp programmes that are not in the catalogue (FUSI Geneva, IGNITE Cambridge, HCUS, Yale Global Diplomacy residential) appear only on the homepage and `/stories`.

## Editorial handling

- Long parent essays are shown as a shortened lead with a "read full note" expansion, so cards stay scannable.
- The two near-duplicate Safa entries from FUSI Geneva are merged into one.
- Names kept as given in the docs; only surnames abbreviated for privacy where full names are long.
- No em-dashes, matching the site-wide rule.

## Technical notes

- New file `src/lib/learner-testimonials.ts`: typed list `{ quote, name, role, programme, programmeId?, camp? }`, with `programmeId` mapped to existing catalogue IDs (`fdf`, `fd1`, `fd2`, `ail`, `onw`, `finlit`, `flp`, etc.) and helpers `quotesForProgramme(id)` and grouped selectors.
- New component `src/components/LearnerQuotes.tsx` reusing the marquee/lightbox pattern from `StoryGallery.tsx`, with `variant="marquee" | "grid"`.
- Rendered in `src/components/StoryStrip.tsx` after the Instagram block; heading spacing follows the existing `SectionHeading` rhythm (`leading-none` + `mt-1` + `mt-4`).
- `src/lib/programme-proof.ts` `testimonialsFor()` extended to prefer real doc quotes for a programme before falling back to the current curated ones.
- `/stories` gains a "Programme feedback" band using the grid variant.
