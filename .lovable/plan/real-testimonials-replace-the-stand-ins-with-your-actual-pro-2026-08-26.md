# Real testimonials: replace the stand-ins with your actual proof

I checked all three links. Everything is reachable: the doc lists 6 LinkedIn post links, 4 Instagram research posts, 1 Geneva video file plus 2 video folders (Harvard Winter Camp 25, Research Scholar). The LinkedIn screenshot folder has 6 images and the Instagram folder has 4 images.

Right now every story in the site's testimonial data is marked `placeholder: true` - stand-in copy we wrote. This replaces them with the real material.

## What changes

**1. Real LinkedIn screenshots everywhere**
Download the 6 screenshots, convert to WebP, host them as project assets, and wire each one to its matching LinkedIn post link so the card is clickable. The existing gallery, homepage strip and per-programme story blocks all read from the same data file, so they update at once. All 9 stand-in cards are deleted - nothing invented stays on the site.

**2. New "Featured research on Instagram" row**
The 4 Instagram screenshots become their own row in the stories gallery, each linking to the live post. Framed as published/featured research rather than a testimonial quote, since that is what they are.

**3. New video testimonials block**
A section on the stories page with the Geneva testimonial, the 4 Harvard Winter Camp 25 testimonials and the 3 Research Scholar testimonials, played inline from Drive with a poster frame. If any video in those two folders is not shared publicly, it is listed as a link instead of an inline player and I will flag which ones.

**4. Stories page restructure**
`/stories` becomes three clear bands: LinkedIn posts, video testimonials, Instagram research features - each with a short lead line. Homepage keeps only the compact strip (real posts only) so it stays clean, plus a link through to the full page.

**5. Tagging so programme pages show relevant proof**
Each real story gets tagged to the tracks it belongs to (medicine, research, law, AI, etc.) so a programme landing page shows testimonials from that pathway rather than a generic set.

## One thing to confirm as we go

The screenshots show real names and faces. I will keep them exactly as shared (no CSS blurring), on the assumption these are already permissioned for public use. Tell me if any specific person should be excluded.

## Technical notes

- Assets: fetch each Drive file, convert to WebP, upload via `lovable-assets`, reference the `.asset.json` pointers.
- `src/lib/social-proof.ts`: drop the placeholder entries, extend `LinkedInStory` with `sourceUrl` and a `source: "linkedin" | "instagram"` field, add a new `VIDEO_TESTIMONIALS` array (title, cohort, Drive file id, poster).
- New `src/components/VideoTestimonials.tsx`; `StoryGallery.tsx` gains source-based grouping; `StoryStrip.tsx` filters to real LinkedIn posts.
- `src/routes/stories.tsx` composes the three bands and gets its own head() metadata.
- Videos lazy-load below the fold so the page weight does not regress.
