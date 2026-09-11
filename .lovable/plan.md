# Refresh `/camps` "Next departures" copy (application-review version)

The "Next departures" band on `/camps` currently says places are allocated when an application is complete. The user wants the wording to tie allocation to the application-review step instead.

## Copy change

In `src/routes/camps.index.tsx`, inside the "Confirmed sessions" / "Next departures" section, update the `SectionHeading` subheading prop while keeping the existing eyebrow and heading:

- eyebrow: `Confirmed sessions` (unchanged)
- heading: `Camps starting <em className="text-crimson-deep">soon</em>` (unchanged)
- subheading: `Here are the next confirmed cohorts. Places are confirmed once the application review is complete.`

## Scope

- One file edit only: `src/routes/camps.index.tsx`.
- No layout, styling, routing, or data changes.
- Build/typecheck verification after the edit.
