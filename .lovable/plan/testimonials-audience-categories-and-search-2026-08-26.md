# Testimonials: audience categories and search

Rename the `/stories` section to **Testimonials** and rebuild it so a visitor can narrow 80+ pieces of feedback down to exactly what they want to read: by who said it, what subject it was, which programme, and what format it came in.

## What we have today

- 65 written feedback quotes (62 from students, 3 from parents) grouped by programme/cohort
- 6 LinkedIn posts, 4 Instagram research features, 10 video clips - all tagged by subject track
- A wall of handwritten thank-you notes
- Current filtering: subject track chips only, one long page split into LinkedIn / video / Instagram / cohort feedback blocks

No educator or school quotes exist, so Schools is left out for now (the audience filter is built so it can be added later without rework).

## New structure

**Name:** Testimonials. Nav label "Testimonials", route `/testimonials` with `/stories` redirecting so existing links keep working. Page headline stays warm ("What families say afterwards"), the label stays plain and searchable.

**Four filter controls in one bar, all reflected in the URL so any view is shareable:**

1. **Who** - Everyone / Students / Parents (counts shown on each)
2. **Interest** - the 7 subject tracks
3. **Programme** - dropdown of every programme with feedback, e.g. Future Doctors Batch 2
4. **Format** - Written / LinkedIn / Instagram / Video / Handwritten note
5. **Search box** - free text across quote body, name, and programme

Active filters appear as removable chips with a live "showing N of 82 testimonials" count and a friendly empty state that clears back to everything.

**Results** render as one unified, mixed-format grid instead of four separate sections, so filtering actually narrows the page rather than reshuffling blocks. Each card shows the person's voice badge (Student / Parent), the programme, and the subject accent colour already in use. Video and social cards keep their existing lightboxes.

Below the grid, the current programme-by-programme feedback listing is kept as a "Browse by programme" section, collapsed by default per programme.

Home page and programme landing pages keep their existing carousels; their "See all stories" buttons become "Read all testimonials" pointing at the new route with the relevant filter pre-applied (e.g. a Future Doctors page links straight to its own testimonials).

## Categorisation work

Every existing item gets tagged for the new filters:

- **Voice**: written quotes already carry Student/Parent. LinkedIn, Instagram and video items get a voice tag inferred from their author line (all currently student voices, parents marked where the post is written by a parent).
- **Programme id**: written quotes mostly have this; social and video items get mapped to the catalogue programme where identifiable (Future Doctors, Research Scholars, Harvard camps, Finance Fellowship, etc.), left unmapped otherwise.
- **Format**: derived from the source list, no manual tagging needed.
- Any item whose subject track is missing gets one from its programme's track.

## Technical notes

- New `src/lib/testimonials.ts` normalises all four sources (`LEARNER_QUOTES`, `LINKEDIN_POSTS`, `INSTAGRAM_POSTS`, `VIDEO_TESTIMONIALS`, handwritten notes) into one `Testimonial` union type with `voice`, `track[]`, `programmeId`, `format`, plus a `filterTestimonials()` + `facetCounts()` pair mirroring the finder's pattern in `src/lib/finder.ts`.
- Voice/programme tags added to the source arrays in `src/lib/social-proof.ts`; quote text is not edited.
- Route `src/routes/testimonials.tsx` with `validateSearch` using `fallback()` for `who`, `track`, `programme`, `format`, `q`, and `stripSearchParams` on defaults. `src/routes/stories.tsx` becomes a redirect.
- New `TestimonialFilters.tsx` (styled like `CalendarControls`) and `TestimonialGrid.tsx`; `StoryGallery`, `VideoTestimonials`, `QuoteCard` and `HandwrittenNotes` are reused as card renderers.
- Fresh `head()` metadata for the route plus `Review`/`ItemList` JSON-LD so the testimonials are eligible for rich results.
