# Plan: Restore the hero world map in the right corner

## Goal
Put the world-map artwork back into the homepage hero, positioned toward the right corner as requested, instead of removing it.

## What will change
- Re-add the existing `world-map-gold` asset to the homepage hero.
- Position it on the right side, biased toward the bottom-right/right-corner area.
- Keep it visible enough to feel intentional, but faded enough that it does not compete with the headline and buttons.
- Preserve the current left-side bird background and existing hero copy/buttons.

## Visual direction
- The map should sit as a premium background brand element, not a separate image block.
- It should be larger than a tiny watermark and anchored toward the right edge/corner.
- Add a subtle fade/gradient overlay only where needed so text remains readable.

## Technical details
- Update `src/routes/index.tsx` only.
- Import the existing `src/assets/world-map-gold.png.asset.json` asset.
- Add an absolutely positioned, pointer-events-none image layer inside the hero background stack.
- Use responsive sizing so the map stays on the right for desktop and does not create awkward empty space on mobile.
- Verify the hero visually in the live preview after implementation.
