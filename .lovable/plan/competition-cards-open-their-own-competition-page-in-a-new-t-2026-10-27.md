# Competition cards open their own competition page in a new tab

On /competitions, clicking these seven cards will open the competition's own page in a new browser tab instead of the on-site programme page:

| Card (matched by name) | Opens |
|---|---|
| AI Founders Challenge | https://joinonwards.com/competitions |
| Global Pre-Med Challenge | https://futuredoctorsprogram.com/competition |
| Wolves of Wall Street | https://joinfinlit.com/competition |
| Moot Court | https://futurelawyersprogram.com/moot-court |
| Yale (International Relations) Essay | https://www.learnwithleaders.com/competitions/the-yale-international-relations-essay-competition/ |
| HUSO Middle East | https://www.learnwithleaders.com/competitions/harvard-undergraduate-science-olympiad-middleeast/ |
| HUSO India | https://www.learnwithleaders.com/competitions/harvard-undergraduate-science-olympiad-india/ |

Any other competition card keeps working as it does today. Card look, order and dates stay unchanged.

## Technical details
- In `src/routes/competitions.tsx`, add a small name-keyword → URL map (case-insensitive; HUSO split by "india" / "middle east").
- `CompetitionCard` renders an `<a target="_blank" rel="noopener noreferrer">` when matched, otherwise the existing `<Link>`.
- Links pass through the existing `withUtm` helper so visitor UTMs and click IDs carry forward.
- Verify in the browser that all seven cards match and open new tabs.
