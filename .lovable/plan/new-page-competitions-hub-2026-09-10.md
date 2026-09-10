# New page: Competitions hub

## Goal
A dedicated `/competitions` page that showcases the competitions run by the LWL family (Onward, FinLit, etc.). Each competition appears as a card; clicking a card takes the visitor straight to the competition's own page (e.g. `https://joinonwards.com/competitions`, `https://joinfinlit.com/competition`).

## Approach
Stay true to the database-driven rule: cards are built from the live catalogue (`all_programs` / `all_partners`), filtered to competitions, not hardcoded. Cards link out to each partner's own competition page via the existing centralized apply-link logic — for Onward/FinLit programmes this resolves to the partner `apply_url` (the joinonwards.com / joinfinlit.com pages), so clicks land exactly on the pages you listed. No local apply/pay pages are created.

## What will change

### 1. New route `src/routes/competitions.tsx` (`/competitions`)
- Shared `PageHero` (same hero style as Camps/Masterclasses/Internships): title "Competitions", short intro, CTA to the Finder and Book a Meeting.
- Card grid of competitions from the live catalogue (competition-typed programmes), each card showing:
  - Competition name, partner (Onward, FinLit, …), category chip
  - Short description, format (Online/In Person), grades/ages
  - Prize/format highlights where data exists
  - "View competition" link → external partner page in a new tab
- If no live competition rows exist, an editorial section still presents the two flagship competitions with the Onward and FinLit cards linking to the URLs provided, so the page is never empty.
- SEO head: unique title, description, og tags, canonical, ItemList JSON-LD for the competitions.

### 2. SiteHeader + SiteFooter
- Add "Competitions" → `/competitions` entry in the "Our Offerings" dropdown (desktop + mobile accordion).
- Add to footer links under offerings.

### 3. Optional cross-links
- Finder already supports `type=comp`; the page adds a link "Browse all in the Finder" → `/finder?type=comp`.

## Technical notes
- Catalogue data comes from `useHydratedCatalogue()` + existing competition filter; no new server functions.
- External links use the centralized partner apply-url resolution from `src/lib/catalogue.functions.ts` (read live, never hardcoded per the SOP).
- Route file pattern matches `internships.index.tsx`; createFileRoute path `/competitions`.

## Verification
- Typecheck + build pass.
- `/competitions` renders cards; clicking a card navigates to the correct external partner page.
