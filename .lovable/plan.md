# Header: "Our Offerings" dropdown

## Goal
Replace the single "Programmes" link in the site header with a top-level "Our Offerings" item that reveals a dropdown for **Programmes**, **Fellowships**, and **Competitions**. Each item links to `/finder` with the matching type filter pre-selected.

## What will change

### 1. Desktop header (`src/components/SiteHeader.tsx`)
- Convert the "Programmes" nav link into a hover/focus-activated dropdown labeled **"Our Offerings"**.
- Dropdown items:
  - **All offerings** → `/finder` (default search, type = all)
  - **Programmes** → `/finder?type=prog`
  - **Fellowships** → `/finder?type=fel`
  - **Competitions** → `/finder?type=comp`
- Keep the existing link styling (gold underline active state, rounded pills). Add a small chevron/arrow to indicate a dropdown.
- Dropdown panel: rounded-2xl, border-line, bg-paper, shadow-lift, with subtle hover highlight (`bg-wash` / `text-ink`).
- Keyboard/accessibility: `aria-expanded`, `aria-haspopup`, Escape to close, Tab through items.

### 2. Mobile header menu
- In the mobile sheet, "Our Offerings" expands into a nested accordion/list showing the same four items.
- Tapping the parent toggles the submenu; tapping a child navigates and closes the menu.

### 3. Active state
- `/finder` is considered active for "Our Offerings" and its children.
- Individual dropdown items can show an active hint when their type filter matches the current URL.

## Technical notes
- Reuse existing `DEFAULT_SEARCH` from `@/lib/finder` and spread `{ type: "prog" | "fel" | "comp" }` into the `search` prop on `<Link>`.
- No new routes or data changes needed; the finder already supports `type` filtering.
- Keep the change scoped to `SiteHeader.tsx` only.

## Verification
- Typecheck (`bunx tsc --noEmit`) and build (`bun run build`) must pass.
- Visual check: dropdown opens/closes smoothly on desktop; mobile submenu expands and links work.
