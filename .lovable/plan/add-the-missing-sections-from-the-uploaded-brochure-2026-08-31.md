# Add the missing sections from the uploaded brochure

The uploaded 41-page combined brochure carries eight content sections that the current 34-page master brochure does not have. Everything else (cover, pathway spreads, calendar, 18 parent pages, partnership options, closing page) already matches, so the work is purely additive: build those eight pages in the same crimson / ivory / antique gold style and slot them into the running order. Result: a ~42-page v2 file.

## Pages to add

1. **Contents** (after the cover) — two-column contents table with page numbers, so a counsellor can jump straight to the grade grid, the calendar or a parent page.
2. **Projects students have made** — six real student cards (Rouqaya Elbanna, Swaraj Koyande, Wong Liang Hao, Kalina Abdulla, Aisha Saif A., Khalid W. Al-Sultan) with grade/country, what they made, and a "what they hold" line; plus the **Where it lands on an application** table mapping artefacts to Common App / UCAS / IB CAS.
3. **Seven pathways, seven verifiable outcomes** — the four-column table (pathway, artefact, the line a family can write, what can be verified) and a nine-quote grid of end-of-cohort feedback with a "for your newsletter" note.
4. **Your child says one sentence, here is the route** — six interest routes (doctor, arguing, money, building, deeper than the syllabus, changing something) as START → BUILD → PROVE chains with grades, fees and page references.
5. **Build a pathway, not a one-off** — suggested sequences for Grades 5-7, 8-10 and 11-12, three worked progressions (the future medic, the builder, the leader) and the "what a whole pathway costs at early-bird rates" table.
6. **Signature cohorts: the five flagship fellowships** — Future Doctors, Future Lawyers, FinLit (Capital Minds), Future AI Leaders, Research Publication, each with outcome, grades, length, next start and fee.
7. **Questions parents ask** — the six FAQs (clash with school, who teaches, what you hear while it runs, prior knowledge, missed sessions, wrong fit), the "what every programme includes" four-column strip, and the "a profile built one year at a time" Grade 7 / 9 / 11 / 12 table.
8. **Evidence: what students leave with, and who says so** — the four proof stats (426+ published, 80+ countries, 30,000+ schools, since 2004), two parent quotes, mentor universities, the eight partner organisations, "what a counsellor can put on file", the three written guarantees, and the schools/countries the featured students came from.

Existing pages keep their content; only their page numbers shift, and every cross-reference (pathway pages, parent pages, calendar page) is regenerated from the new numbering rather than typed in.

## Consistency fixes carried in the same pass

- Fill the gaps the upload leaves in the student cards ("Grade ? · Country ?") using the site's story data where it exists, otherwise drop the grade/country line rather than print a placeholder.
- Use one cohort count everywhere (cover, schools page, calendar intro), computed from the programme catalogue instead of the upload's hard-coded 41.
- Fees, grade bands, session times, next-start dates and page references on all new pages are generated from `src/lib/programmes.ts`, so they cannot drift from the live site.

## Technical notes

- Work stays in the generator scripts under `/tmp/br` (`gen2.py`, `merged.css`) plus the data dump from `src/lib/programmes.ts`. No app source files change.
- New pages reuse the existing `head()`, `pcard()`, `foot()` helpers and the current type scale, gold rules and card borders; the contents and page-reference numbers are derived from the assembled page list so they stay correct.
- Page numbering is derived from the final page order; the `PAGE_OF` map that drives the "p.NN" references is rebuilt after insertion.
- Output: `/mnt/documents/LWL-School-Brochure-2026-27-v2.pdf` (the current file is kept).
- QA: every page rendered to an image and checked for clipped text, table overruns, orphan headings and blank pages, with fixes re-rendered until clean.
