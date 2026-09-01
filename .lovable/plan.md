# Wire the whole site to live data

Today the catalogue is a 33-entry hardcoded array in `src/lib/programmes.ts`, consumed synchronously by ~40 components. The database holds the real operational truth: 9 partners, 60 programmes, 99 cohorts (59 upcoming), 33 mentors, 26 masterclasses. The plan moves every operational fact to the database and keeps only editorial and design material in our own `lwl_site` schema, so nothing in the visual front end changes.

## What the database owns after this

- Which programmes exist and whether they are live (`all_programs.is_active`, all 9 partners).
- Every date, deadline, seat count and cancellation (`all_cohorts`).
- Prices (`sticker_price`, `early_bird_price`, `price_currency`).
- Every outbound link — programme site, apply link, partner website. This is how the Sir Luther / Onward / Future Doctors / FinLit / Future Lawyers / SAT / TEO / Purpose Playbook redirects work: the button uses `apply_url`, falling back to `program_url`, then the partner's `website`. No domain is written into code.
- Mentors and masterclasses (`all_mentors`, `all_masterclasses_public` — masterclasses are already live).

## What stays ours (new `lwl_site` tables)

The shared tables have no session timings, no per-cohort fee, no flyer/brochure links, and no long-form copy — the site needs all four. Two new tables in our own schema, seeded from exactly what the code holds today so nothing changes visually on day one:

- `lwl_site.site_programs` — one row per programme we present: `program_id`, slug, pathway/track, format (fellowship / programme / competition), mentor group, one-line promise, long "about", session timing, badge line, sort order, visibility, surface (online or camp).
- `lwl_site.site_cohorts` — per-cohort extras: session timing, batch label override, eligibility line, flyer and brochure links.
- Landing-page material (skills, projects, FAQs, "what you do" steps, profile impact) goes in JSON columns on `site_programs`, seeded from `programme-detail.ts` and `programme-proof.ts`.

Both get public read access only; nothing outside `lwl_site` is created, altered or dropped.

## Date logic the system handles by itself

All derived from real dates at request time — no manual switches:

- Cohorts with `start_date` before today, or `is_cancelled`, never render.
- "Starting soon" appears from the actual gap to `start_date`.
- `application_deadline` drives a closing-soon line where badge space already exists; a passed deadline stops the cohort being offered as "apply now".
- `seats_total` vs `seats_filled` drives a "few seats left" note in the existing badge slot.
- A programme with no upcoming cohort still renders, with "Dates coming soon" in the date slot and Talk to an Advisor as the action.
- Calendar and finder month lists build from whatever months the database actually contains, so the range rolls forward on its own.

## Scope of the catalogue

Every active programme across all 9 partners. The 33 we present today keep their existing copy through the mapping; the roughly 24 additional rows appear with values derived from their own database fields (short description, duration, grades, price, format from `categories`, pathway from `tags`/`target_categories`). Retired and in-school/school-partnership rows stay out.

## Order of work

1. **Match report first.** Print a name-by-name match between the 33 code entries and `all_programs` rows. Anything that does not match cleanly comes back to you before any migration runs — no guessed mapping.
2. Migration creating the two `lwl_site` tables and seeding them with today's copy, timings, flyers and pathway assignments.
3. A single server function that returns the catalogue in the exact shape the components already expect, so cards, calendar rows, finder groups and landing pages keep their current markup.
4. Swap the synchronous array for loader-fed data across `/`, `/finder`, `/calendar`, `/calendar-month`, `/programmes/$slug`, `/shortlist`, `/fit`, `/camps` and the header/hero stat strips.
5. Camps: dates, prices and apply links come from the camp rows in `all_programs`; the Heritage Residency copy and photography stay in code, keyed to the database row.
6. Verify each page in the live preview against the current design before reporting done.

## Technical notes

- New `src/lib/catalogue.functions.ts`: a public `createServerFn` using the publishable-key client, joining `all_programs` + `all_partners` + `all_cohorts` + the two `lwl_site` tables, returning `Programme[]` in today's shape. Cached through TanStack Query (`staleTime` 5 minutes) and primed in route loaders with `ensureQueryData`.
- `src/lib/programmes.ts` keeps its types and every helper (`isPast`, `isSoon`, `feeOf`, `dualTime`, `durationKey`, grouping helpers); only the `PROGRAMMES` array and the derived constants (`TOTAL_COHORTS`, `TRENDING`) become functions of the fetched list.
- Components that import `PROGRAMMES` directly (`TrendingTop5`, `HeroStats`, `SiteHeader`, `FitQuiz`, `ProfileTrackTable`, `ics`, `shortlist`) read from a catalogue context provided once in `__root`, so their props and markup are untouched.
- `/programmes/$slug` moves its `head()` off the synchronous lookup onto `loaderData`, with the existing noindex fallback when the slug is unknown — same rendered output.
- All reads on `public.*` stay read-only; writes only ever touch `lwl_site`. No `has_role()` use; `search_path` pinned to `lwl_site, public` on any new function.
- External links keep `target="_blank" rel="noopener"`.
