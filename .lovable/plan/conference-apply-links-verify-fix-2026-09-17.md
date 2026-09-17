# Conference Apply Links — verify & fix

## Goal
Every "Apply now" / "Register" button on all 12 HWMUN conference pages links to its correct Application Portal URL.

## Current state (verified this turn)
- The database (`all_programs.pay_slug`) already holds exactly the slugs from your list:
  `hwmun-cambodia`, `hwmun-india`, `hwmun-kazakhstan`, `hwmun-bangkok`, `hwmun-indonesia`,
  `hwmun-japan`, `hwmun-riyadh`, `hwmun-mumbai`, `hwmun-vietnam`, `hwmun-greece`, `hwmun-dubai`
  (plus `hwmun-abu-dhabi`).
- Code already builds the link as `https://apply.learnwithleaders.com/apply/{pay_slug}` and every
  imported conference page renders its buttons from that live value — no hardcoded links.

## Work
1. Visit all 12 conference pages (`/conferences/hwmun-*`) in the preview and check every Apply /
   Register button on each page (nav, hero, mid-page, bottom CTA) points to the matching URL:
   - Cambodia → /apply/hwmun-cambodia
   - India → /apply/hwmun-india
   - Kazakhstan → /apply/hwmun-kazakhstan
   - Bangkok → /apply/hwmun-bangkok
   - Indonesia → /apply/hwmun-indonesia
   - Japan → /apply/hwmun-japan
   - Riyadh → /apply/hwmun-riyadh
   - Mumbai → /apply/hwmun-mumbai
   - Vietnam → /apply/hwmun-vietnam
   - Greece → /apply/hwmun-greece
   - Dubai → /apply/hwmun-dubai
   - Abu Dhabi → /apply/hwmun-abu-dhabi
2. Also check the `/conferences` hub cards link through to the correct pages.
3. Fix any button that falls back to a wrong/generic link (e.g. if a page's data lookup fails and
   it falls back to a contact page instead of the apply URL).
4. Confirm all links open externally (new tab) — no local `/apply` or `/pay` pages, per standing rule.

## Technical notes
- Links derive from `all_programs.pay_slug` via `applyLink()` in `src/lib/catalogue.functions.ts`;
  buttons consume `conference.apply`. No database writes needed — data already correct.
- Verification via Playwright against the running preview; no design changes.
