# Plan: Refine Learner Feedback Cards

## What I will change

1. **Slow the learner feedback movement**
   - The current learner feedback marquee uses `55s` by default.
   - On the homepage, the online learner row is set to `80s` and the summer camp row is set to `70s`.
   - I will make both rows noticeably slower and calmer, with a premium gallery feel instead of a fast ticker.

2. **Match the shared reference card style more closely**
   - Rework the learner feedback card into the reference-style layout:
     - colored background panel,
     - clean white quote card offset on top,
     - circular student initials/avatar overlapping near the lower-left,
     - name and programme details placed clearly below the quote,
     - consistent card height and width across all cards.
   - Keep the luxury education look using the existing brand tokens: crimson, gold, ink, paper, and soft shadows.

3. **Improve readability**
   - Increase quote area breathing room.
   - Keep a controlled text clamp so every card remains the same size.
   - Make the student name and programme label easier to scan.
   - Keep tap/click behavior so the full feedback opens in the modal.

4. **Apply consistently**
   - Update the homepage learner feedback rows.
   - Keep the `/stories` learner feedback grid visually consistent with the same card system.
   - Preserve the existing section heading style and spacing.

## Technical details

- Main file to update: `src/components/LearnerQuotes.tsx`.
- Homepage usage is in `src/components/StoryStrip.tsx`, where the learner marquee durations are currently passed as `80` and `70` seconds.
- I will avoid hardcoded color values in components and use the existing semantic brand classes.
- I will verify the homepage visually after implementation to confirm the cards move slower and better match the reference.
