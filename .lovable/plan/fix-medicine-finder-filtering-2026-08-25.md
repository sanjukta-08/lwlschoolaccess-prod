# Fix Medicine finder filtering

## Goal
When a parent clicks the **Medicine** interest tile in the finder, the page should feel clearly filtered to medicine only. No unrelated trending cards or recommendations should appear above the filtered medicine results.

## What I confirmed
- The main programme results already use `getMatches(state)`, so the “All main programmes” list is filtered by `state.interest`.
- The “Top 5 programmes to start with” section is currently rendered separately via `TrendingTop5` and always uses the global `TRENDING` list, so it can still show non-medicine programmes after Medicine is selected.
- The finder route renders `TrendingTop5` before the filtered “All main programmes” section, which makes the filter look broken.

## Plan
1. **Make the trending section filter-aware**
   - Pass the current finder state into `TrendingTop5`.
   - When an interest such as Medicine is selected, only show trending picks that match that interest.
   - Update the heading copy so it reads like “Top Medicine programmes to start with” when a subject filter is active.

2. **Protect against unrelated recommendations**
   - If the filtered trending list is empty, hide the trending block rather than showing unrelated programmes.
   - Keep the existing general Top 5 behaviour when no interest filter is selected.

3. **Keep the main results as the source of truth**
   - Leave the existing finder cards, type chips, grade filter, month filter, and search logic intact.
   - Ensure Medicine + type filters still work together, e.g. Medicine + Programmes shows only medicine items of type Programme.

4. **Validate the behaviour**
   - Check `/finder?interest=med` shows only Medicine items in the visible recommendation/results sections.
   - Check switching back to Everything restores the general Top 5.
   - Check Medicine + Programmes does not show Fellowships.
