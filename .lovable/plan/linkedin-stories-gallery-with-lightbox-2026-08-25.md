# LinkedIn stories gallery with lightbox

Turn the LinkedIn social proof into a real screenshot gallery: a tile grid you can click to open a full-size lightbox, reused on the home page, every programme page, and a dedicated gallery page.

## What you get

**1. A gallery data list you control**
One list of approved LinkedIn posts, each with: student/parent name, role, date, the post text, reaction/comment counts, a topic tag, an optional link to the live post, and an image slot for the approved screenshot.

Because no screenshots are in the project yet, each entry starts in "no image" mode and renders as the styled text card we already have. As soon as you upload approved screenshots, I attach them to the matching entries and those tiles become real image tiles — no other code changes needed.

**2. Lightbox modal**
Clicking any story opens a centred modal with the full screenshot (or the full post text when there's no image), the author line, date, tag, reaction counts, and a "View on LinkedIn" link. Arrow keys and on-screen prev/next move through the gallery; Esc closes it. Keyboard-accessible and built on the dialog component already in the project.

**3. Where it appears**
- **Home page** — a compact "What families post afterwards" strip: 4 tiles + "See all stories" link. Keeps the home page clean.
- **Every programme page** — a "Stories from this programme" band directly under the reviews section, filtered to stories tagged with that programme's category/track, with a fallback to the top general stories so no page looks empty. Added to the page jump nav.
- **New `/stories` page** — the full gallery, with filter chips by programme category, plus the existing press strip and a "Talk to an advisor" CTA at the bottom.
- The `/about` page's LinkedIn section is upgraded to the same clickable gallery.

**4. Consent and honesty**
Each entry carries an `approved` flag; only approved entries render. Placeholder entries are clearly marked in the data file so we never publish an unverified quote as real. Screenshots keep names visible only where you've confirmed permission — otherwise I add a blurred-name variant note in the data file.

## Technical notes

- `src/lib/social-proof.ts`: extend `LINKEDIN_POSTS` into a typed `LinkedInStory[]` with `id`, `image?` (asset pointer URL), `tags: string[]` (programme categories/tracks), `postUrl?`, `approved: boolean`.
- New `src/components/StoryGallery.tsx`: grid of tiles (image tile or text tile) + `StoryLightbox` using `@/components/ui/dialog`, with keyboard prev/next and focus trap. Props: `stories`, `limit`, `heading`, `variant: "strip" | "grid"`.
- New `src/routes/stories.tsx`: full gallery, category filter chips in the URL search params, own `head()` metadata and ImageGallery JSON-LD.
- `src/components/LinkedInStories.tsx` becomes a thin wrapper over `StoryGallery` so `/about` keeps working.
- `src/components/ProgrammeLanding.tsx`: new `#stories` section under `#reviews`, tag-matched with a general fallback; add the jump-nav entry.
- `src/routes/index.tsx`: strip variant, 4 tiles.
- `src/components/SiteHeader.tsx`: "Stories" nav link.
- Screenshots go through `lovable-assets` pointers (not committed binaries); images lazy-load with width/height set to avoid layout shift, and `alt` text describing the post.

## What I need from you

Upload the approved LinkedIn screenshots (any number, PNG/JPG). I'll build the gallery now with the existing text stories so it's live and shaped correctly, then drop your screenshots into the matching entries when they arrive.
