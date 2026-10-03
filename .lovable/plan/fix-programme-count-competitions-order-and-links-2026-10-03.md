# Fix programme count + competitions order and links

## 1. Programme count mismatch (home 85 vs Finder 74)
- Home page counts every programme in the catalogue, including ones with no upcoming start date. The Finder only counts programmes you can actually join (with an upcoming cohort).
- Change: the home page "Programmes" number (and the small stats strip) uses the same rule as the Finder, so both show the same number (74 today). The Finder page's "N programmes" subtitle gets the same rule.

## 2. Competitions page order
- Cards are currently pinned "AI Founders Challenge first, then catalogue order".
- Change: sort all competition cards by their next start date, earliest first (e.g. Wolves of Wall Street 24 Oct 2026, then YIRA 9 Jan 2027, then AI Founders 27 Feb 2027). Competitions with no date go last. Same order in the search-engine listing data.

## 3. Competition card click goes to registration form
- Cards currently open the apply link (AI Founders points to joinonwards.com/competitions/register).
- Change: clicking a card opens the competition's own programme page on this site (/programmes/...), where the full details and the Apply button live. Opens in the same tab. The "View competition" label stays.
- The AI Founders registration override is removed from card clicks (the programme page's Apply button keeps using the normal apply link).

## Technical notes
- Add a shared `listableProgrammes()` helper in `src/lib/programmes.ts` (programmes with >=1 upcoming cohort) and use it in `src/routes/index.tsx`, `src/components/HeroStats.tsx`, `src/routes/finder.tsx` subtitle.
- `src/routes/competitions.tsx`: replace `sortCompetitions` with next-cohort-date ascending; card wraps in `<Link to="/programmes/$slug" params={{ slug: slugOf(p) }}>` instead of external `<a>`; JSON-LD item URLs point to the on-site programme page.
- Verify in the browser: home and Finder show the same count; competitions ordered by date; clicking a card lands on its programme page.
