# Align the website catalogue with the official 18-programme list

The document is the source of truth: **18 unique programmes in 7 interest categories**, one category per programme, with canonical names, grade bands, formats and mentor universities. The site currently lists **32 programmes across 9 interest tracks**, with several names that don't match and duplicates the document does not recognise.

## What changes

### 1. Programme list trimmed to the 18 official ones

Kept and mapped to the document (all 18 already exist on the site):
Future Doctors Fellowship, Junior Doctor Fellowship, Future Lawyers Fellowship, Young Debaters Fellowship, Communication & Leadership Programme, FinLit Fellowship (Capital Minds), Wolves of Wall Street Competition, Future AI Leaders Fellowship, Future Entrepreneurs Fellowship, Young Entrepreneurs Program, Research Publication Fellowship, Young Researchers Program, YIRA Global Essay Competition, Onward 6-Week Programme, Advance Leadership Programme, Yale Global Affairs - World Leaders Academy, Future Changemakers Fellowship, SAT Instinct.

Removed from the site because they are not in the official list (14):
Research Scholars Programme, Future Doctors Level 1 (HSA), Future Doctors Level 2 (HSA), Future Lawyers Programme (HSA), Future Lawyers Level 2 (HSA), Future Entrepreneurs Programme (HSA), Future Changemakers Programme (HSA), AI & ML Bootcamp, Mastering Calm & Focus, Harvard Model Congress Young Leadership, Future MUN Leaders, World Debate Stars (ICMUN), Young Debaters Programme, The Impact & Research Fellowship, HUCEG Sustainability Leaders Challenge, Greenvan Corporate Internship, Model United Nations by HMCSF.

Their cohorts disappear from the finder, calendar, trending strip, pathway steps and landing pages. Anywhere a removed programme was referenced (Trending Top 5, profile-building pathway, fit quiz) is re-pointed to an official programme in the same category.

### 2. Seven interest categories replace the nine tracks

New chips: Medicine & Healthcare · Law, Debate & Communication · Finance & Investing · AI, Technology & Entrepreneurship · Research & Academic Writing · Leadership & Global Affairs · Test Prep & College Readiness.

Each programme gets exactly one category (no more multi-tag rows), so a parent clicking a chip sees a clean non-repeating list. Category colours, icons and landing-page accents are remapped; Debate merges into Law, Entrepreneurship merges into AI & Technology.

### 3. Grades, format and type corrected to the document

Grades and formats are set exactly as tabled (for example Communication & Leadership 6-12, Advance Leadership 6-12, Yale World Leaders Academy 6-12, Onward 5-12, Young Entrepreneurs 6-8, Young Researchers 6-8, SAT Instinct 9-12, Wolves of Wall Street 12 weeks). Type follows the document: Fellowship, Programme or Competition only - the Internship and Conference categories are retired since no official programme uses them.

### 4. New secondary filters

Added to the finder filter bar, matching the document's second row:
- Grade band: 5-7 · 6-8 · 8-12 · 9-12
- Duration: 3-Weekend Intensive · 6 Weeks · 8 Weeks · 10-12 Weeks
- Mentor university: Harvard · Yale · Harvard x HPAIR · MIT / Stanford / Princeton (new data field, shown as a small credential line on cards and landing pages)
- Type: Fellowship · Programme · Competition

### 5. Data-quality items from the document

- Young Debaters Fellowship: the 26 September 2026 date in the November tab is treated as a copy error and dropped, keeping the genuine November cohort.
- Canonical names applied everywhere, so cohorts of one programme never split across two rows.
- "Research Fellowship" (15 November 2026) is folded into Research Publication Fellowship unless you tell me it is a separate product.

## Technical notes

- `src/lib/programmes.ts`: rewrite `TrackKey` to the 7 category keys, `TYPES`/`TYPE_ORDER` to the 3 official types, `tracks: TrackKey[]` becomes a single `track`, add `mentors` field; prune the programme array to 18; fix grades/dur/type; update `TRENDING`, `PATHWAY`, `OUTCOMES` ids.
- `src/styles.css`: consolidate `--track-*` tokens to 7.
- `src/lib/finder.ts`: single-category matching, add gradeBand / duration / mentor filter predicates and counts.
- `src/components/FinderPanel.tsx` + `src/routes/finder.tsx`: new chip row labels, new dropdowns, mentor line on rows.
- `src/lib/programme-logos.ts`, `programme-detail.ts`, `programme-proof.ts`, `fit.ts`, `fit-prompt.ts`, `shortlist.ts`: drop entries for removed ids, remap track keys.
- Sweep `src/routes/{index,calendar,calendar-month,programmes.$slug,shortlist,stories}.tsx` and track-consuming components (`ProgrammeCard`, `MonthGrid`, `CohortAgenda`, `TrendingTop5`, `ProfilePathway`, `ProfileTrackTable`, `ProfileTypeBlocks`, `HeroStats`, `CohortRows`, `DayList`) for the old keys and removed ids.
- Verify with a production build plus Playwright passes over `/finder`, `/calendar`, `/`, and two landing pages.
