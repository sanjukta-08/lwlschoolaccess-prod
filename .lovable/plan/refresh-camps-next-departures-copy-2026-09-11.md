# Refresh `/camps` "Next departures" copy

The current copy on the `/camps` hub sounds like a travel agent. Update the "Next departures" band to a programme-focused tone that feels like an education offering.

## Copy change

In `src/routes/camps.index.tsx`, replace the existing `SectionHeading` props inside the "Next departures" section with:

- eyebrow: `Confirmed sessions`
- heading: `Camps starting soon` (keep the existing `<em className="text-crimson-deep">soon</em>` emphasis)
- subheading: `Here are the next confirmed cohorts. Places are allocated as soon as an application is complete.`

## Scope

- One file edit only: `src/routes/camps.index.tsx`.
- No layout, styling, routing, or data changes.
- Build/typecheck verification after the edit.
