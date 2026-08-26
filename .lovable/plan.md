# Fix heading-to-subheading spacing in the testimonial bands

## What's wrong

Measured on the live homepage: every section has a 4px gap between heading and
subheading, except two - "What learners said about each programme" and
"Hear it from the students", which sit at 13.4px.

Cause: in those two bands the subheading shares a flex row with a right-hand
link ("Read all learner feedback" / "Watch all clips"). That row uses
`items-center`, and the taller link button vertically centres the paragraph,
pushing it down by ~9px. The LinkedIn and Instagram bands have no link in that
row, so they stay at 4px.

## The fix

In `src/components/StoryStrip.tsx`, change those two subheading rows from
`items-center` to `items-start` so the paragraph stays flush under the heading,
and keep the link visually aligned to the first text line. No other section is
touched; spacing everywhere becomes a consistent 4px.

Then re-measure in the preview to confirm all headings report the same gap.
