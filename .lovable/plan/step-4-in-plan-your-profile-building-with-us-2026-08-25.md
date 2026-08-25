# Step 4 in "Plan your profile building with us"

The pathway currently ends at Grades 11–12 with "make it application-ready". You want a fourth step that names the actual outcomes a child walks away with — the things a university can see and verify.

## The new card: Step 4 — "Turn it into proof universities can check"

Band label: **Grades 9–12 · alongside any programme**

Goal line: the work only counts if an admissions officer can find it, read it and confirm it is real. Step 4 is about packaging everything from Steps 1–3.

Instead of programme buttons, this card lists the concrete outcomes, each with a one-line explanation:

1. **Write to a professor and land a research role** — how to find the right academic, read one of their papers, and send an email that actually gets a reply.
2. **Publish a paper with a citable link** — a permanent, checkable record of the research, not a claim on a CV.
3. **Build and launch a real venture** — a live product or service with customers, revenue or users, plus a pitch deck.
4. **A portfolio site that holds everything** — capstones, papers, demo videos and awards in one link that goes on every application.
5. **A professional presence universities can verify** — LinkedIn and a public builder profile that match the portfolio, with certificates and mentor letters attached.
6. **Mentor letters and certificates on file** — named, dated, verifiable documents from each programme.

Each outcome names which earlier step or programme type produces it (for example the Research Publication Fellowship for the paper, Future AI Leaders / Future Entrepreneurs for the venture), and links to the finder filtered to that type so a parent can act immediately.

The card gets a distinct treatment — a tinted "outcome" panel with tick markers instead of programme buttons — so it reads as the destination rather than a fourth intake to book.

## Supporting copy changes

- The section intro currently says "three-stage path". It becomes a four-step path: explore, go deep, make it application-ready, then make it verifiable.
- On desktop the grid becomes four columns (two on tablet, one on mobile) so all four steps read across in order.

## Technical notes

- `src/lib/programmes.ts`: add an `OUTCOMES` list (title, body, optional programme id, optional finder type filter) and extend the `PATHWAY` entry shape with an optional `outcomes` field so Step 4 renders items instead of programme buttons.
- `src/components/ProfilePathway.tsx`: render the outcome variant when a stage has `outcomes`, update the intro copy and the grid to four columns, keeping existing tokens and no hardcoded colours.
- Nothing else changes — the programme pages, finder filters and calendar are untouched.
