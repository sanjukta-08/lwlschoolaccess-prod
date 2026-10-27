# Competitions page: hide two cards, link Global Future Career Challenge

- Hide "Creating Livelihoods Challenge" and "FinLit – The Junior Venture Challenge at Kings' School Al Barsha" from the /competitions page (cards and the page's search-engine list). They stay in the database and elsewhere on the site unchanged.
- "Global Future Career Challenge" card opens https://joinfuturedge.com/ in a new tab, carrying visitor campaign tracking like the other seven.

## Technical details
- `src/routes/competitions.tsx`: extend the existing name filter (next to the "next generation finance" exclusion) in both the page list and the JSON-LD list; add a `future career challenge` match to `externalCompetitionUrl`.
- Verify in the browser that eight cards remain, all opening new tabs.
