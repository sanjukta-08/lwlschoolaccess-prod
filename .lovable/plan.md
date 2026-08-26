# Visual consistency and learner feedback polish

## Goal
Make every section heading feel like it belongs to the same premium brand voice as the hero headline, slow the learner feedback marquee to match the social-proof bands, and redesign the learner feedback cards to match the reference the user will reshare.

## Work items

### 1. Unify section heading typography with the hero headline
- Update `src/components/SectionHeading.tsx` so every `<h2>` uses the same treatment as the hero `<h1>`:
  - `leading-[1.05]` instead of `leading-none`
  - `text-balance`
  - keep `font-serif`, `font-medium`, `tracking-tight`
  - keep the existing clamp size scale, but make the visual rhythm identical to the hero
- Preserve the optional `<em className="text-crimson-deep">` pattern so callers can still highlight one word in crimson, just like the hero does with "learn with leaders".
- Verify the change on the homepage, `/finder`, `/calendar`, `/programmes/$slug`, `/stories`, `/profile-building`, and `/about`.

### 2. Slow the learner feedback marquee
- In `src/components/LearnerQuotes.tsx`, change the default `QuoteMarquee` duration from `70s` to `55s` so it matches the Instagram marquee speed in `StoryGallery.tsx`.
- Keep the pause-on-hover/focus behaviour intact.
- Ensure reduced-motion media query still disables the animation.

### 3. Redesign learner feedback cards to match the reference
- Once the user reshares the reference image, inspect the layout, colour panel, quote plate offset, avatar placement, typography, and any decorative marks.
- Refactor `QuoteCard` in `src/components/LearnerQuotes.tsx` to replicate that reference exactly:
  - coloured brand panel background
  - offset white quote plate
  - avatar and cohort details placement
  - quote truncation / expansion behaviour
  - hover and focus states
- Update both the homepage marquee variant and the `/stories` grid variant so they share the same card design.
- Keep the existing lightbox behaviour for reading the full quote.

## Out of scope
- No changes to programme data, filters, routing, or backend.
- No new pages or navigation changes.

## Verification
- Build passes without errors.
- Visual check on the preview: all section headings line-wrap and balance like the hero; learner marquee scrolls at the same speed as the Instagram band; learner cards match the reshared reference.
