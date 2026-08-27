# Domain-First Navigation for Our Offerings

## Goal
Shift the site’s primary navigation from programme-type buckets (Programmes / Fellowships / Competitions) to **domain buckets** (Medicine, Law, AI, Research, etc.) in both the header and the finder, while keeping type filtering available as a secondary choice.

## Why this works
- Students often arrive knowing *“I want pre-med”* or *“I want AI.”*
- Parents can still scan by outcome domain without understanding the difference between a fellowship and a programme.
- The existing `interest`/`tracks` data already supports this; no catalogue restructure is needed.

## Proposed domain labels
Map directly to the existing 7 interest tracks:
- **All offerings** → `/finder`
- **Medicine & Healthcare** → `/finder?interest=med`
- **Law, Debate & Communication** → `/finder?interest=law`
- **Finance & Investing** → `/finder?interest=fin`
- **AI, Technology & Entrepreneurship** → `/finder?interest=ai`
- **Research & Academic Writing** → `/finder?interest=res`
- **Leadership & Global Affairs** → `/finder?interest=lead`
- **Test Prep & College Readiness** → `/finder?interest=sat`

## What we will change

### 1. Header dropdown (`src/components/SiteHeader.tsx`)
- Replace the current 4 type-based dropdown items with the 8 domain items above.
- Keep the trigger labelled **Our Offerings**.
- Add a small type hint under each domain label, e.g. *“Fellowships, programmes & competitions”*.
- Active state: `/finder` with any `interest` param is considered active for the dropdown trigger.
- Mobile menu: keep the accordion, but list domains instead of types.

### 2. Finder page (`src/routes/finder.tsx`)
- Move the **interest/domain** filter to the most prominent position at the top of the results as a horizontal chip row.
- Move the **programme type** filter to a secondary position — either as smaller chips below the domain row or as a dropdown in the filter bar.
- Keep the existing filter bar for grade, month, region, duration, and search.
- Update the live counter and clear-all behaviour so domain selection resets type only when it becomes invalid (not required for current data, but safe).

### 3. FinderPanel component (`src/components/FinderPanel.tsx`)
- Update the `bar` layout to remove the interest dropdown (now handled by chips) and keep the remaining fields in natural order: **Grade → Starting → Programme length → Where you are → Search**.
- Optionally add the type dropdown back into the bar if it is removed from the chip row.
- Update the `panel` and `rail` layouts so the domain/interest section is visually treated as the primary category choice.

### 4. Defaults and redirects
- No URL redirects needed; `/finder` remains the default landing.
- The existing `DEFAULT_SEARCH` stays unchanged except that header links will now pre-select `interest` instead of `type`.

## Out of scope
- No changes to programme detail pages, calendar, or homepage.
- No new data model; reuse existing `TRACKS` and `interest` search param.
- No renaming of routes.

## Verification
- Typecheck (`bunx tsc --noEmit`) and build (`bun run build`) must pass.
- Visual check: header dropdown lists domains; finder shows domain chips first; clicking a domain filters results correctly.
- Mobile check: accordion submenu lists domains and navigates cleanly.
