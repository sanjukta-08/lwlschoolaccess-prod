# Redesign the brochure cover (page 1)

The cover currently reads as a flat crimson block: a visible tone seam across the middle, a large empty gap between the intro paragraph and the stats, no imagery, no proof marks, and no gold texture. Same palette (ivory / deep crimson / antique gold / ink) and the same fonts as the rest of the brochure — only the cover composition changes.

## What the new cover looks like

Top to bottom, with no dead space:

1. **Header rule** — white wordmark left, gold-outlined "Programme Brochure 2026-27" chip right, thin gold hairline beneath.
2. **Hero block** — the headline moves up and gets a gold rule above it, tightened line spacing, and the gold italic line ("learn with leaders.") kept as the accent. Supporting paragraph sits narrower (about 55% width) directly under it.
3. **Right-hand crest area** — the bird brand mark, large, low-opacity gold, bleeding off the right edge behind the headline, so the empty right half becomes texture instead of blank crimson.
4. **Proof strip** — a single ivory band across the cover carrying the mentor universities (Harvard, Yale, MIT, Stanford, Princeton) as text lockups, replacing the current unused mid-page gap.
5. **Stat quartet** — same four figures (18 programmes, 47 cohorts, 7 pathways, Grades 5–12), rebuilt as gold-ruled columns in a boxed strip with a subtle darker panel so they read as a plinth, not floating numbers.
6. **Footer** — website and city line left, Zoom / timings line right, separated by a gold hairline.

Background gets a proper deep-crimson gradient plus a faint gold dot grid and a soft gold radial glow in the upper right, so the seam artefact disappears and the page has depth.

## Technical notes

- All work is in the existing generator `/tmp/br/gen.py`: the `cover` page string and the `.cover`, `.band`, `.stats`, `.bottom` CSS rules. No app source files change.
- Remove the `.band` element that causes the horizontal tone seam; replace with a single layered `background` on `.cover` (linear gradient + radial gold glow + dot-grid overlay).
- Bird mark: embed `src/assets/lwl-bird-black.webp` (or the white bird) as a base64 data URI in the HTML so the PDF renderer needs no network, tinted gold via `filter`/opacity at ~12–16%.
- University proof strip uses type only (letter-spaced small caps), so no logo licensing or image fetching is required.
- Re-render with the existing `/tmp/br/pdf.py`, output a new versioned file `/mnt/documents/LWL-Programme-Brochure-2026-27-v2.pdf` (original kept), then convert every page to an image and visually check the cover plus confirm pages 2–15 are unchanged and unbroken.
