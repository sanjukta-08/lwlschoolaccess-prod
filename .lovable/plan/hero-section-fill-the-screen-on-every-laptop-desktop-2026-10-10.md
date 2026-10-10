# Hero section: fill the screen on every laptop/desktop

## What you saw

The earlier screenshot filled your whole screen because the robot was large and the hero stretched. My last change shrunk the hero to a fixed compact height, so on your screen it now ends early with empty space below. That was wrong — the hero should adapt to the screen, not stay one fixed size.

## The fix

Make the hero **responsive to the screen height** instead of fixed:

- On laptops and desktops, the hero fills the visible screen (below the nav bar) — tall screens get a taller hero, short screens get a shorter one, with a sensible minimum so nothing crams.
- The title, buttons and info line stay vertically centred in that space.
- The robot (your new friendly one) stays flush in the bottom-right corner and grows/shrinks with the screen height, so it looks right on a small laptop and a big monitor alike.
- Phones and tablets keep the current compact auto-height layout (already verified good).

## Technical details

- `src/components/future-careers.css`:
  - `.fc-hero` gets `min-height: calc(100svh - <nav height>)` inside the existing `@media (min-width: 1100px)` block; smaller screens keep `min-height: auto`.
  - `.fc-hero-body` / `.fc-hero-copy` centred vertically within that height (flex column, `justify-content: center`).
  - `--fc-robot-h` on wide screens becomes viewport-driven, e.g. `clamp(200px, 30vh, 340px)`, so the robot scales with screen height; base (mobile) value unchanged.
  - Remove the fixed reserved-bottom-padding approach on wide screens (robot overlays the corner; content bottom padding keeps the info row clear of it).
- No changes to text, colours, fonts, or any other section.

## Verification

- Playwright screenshots at 1347x753 (your screen), 1920x1080, 1440x900, 1280x800 and 390x844: hero fills the screen, no overlap between robot and text, no empty band below.
- Check build log shows "build OK".
