# Make the listing parent-readable + an AI "Find the fit" quiz

Honest answer on the current listing: a parent scanning a row sees name, type, grade band, duration, date, time and fee — that tells them *what it is*, but not *why it matters* or *whether it suits my child right now*. Two things are missing that every good programme finder has: a plain-language outcome line, and a decision aid for parents who don't know what to filter by.

## Part 1 — Listing readability (industry practice applied)

Best practice for finders (Coursera / Outschool / summer-programme directories) is: one line of what you get, one line of logistics, one clear next step, and never more than ~5 facts per row.

- **Add an outcome line to every row.** Under the title, one short parent-sentence: what the child produces or gains ("Ends with a research abstract + Demo Day"). Sourced from existing data, not new copy.
- **Regroup the metadata into two tiers.** Line 1: type · grades · duration. Line 2 (muted, mono): next start date · local time in the parent's timezone · fee. Fee gets a plain label ("Fee USD 850" and, where present, the strike-through original), because a bare number reads like a price tag with no context.
- **Human dates and times.** "Starts Sat 12 Sept · 9:00 AM ET (5:00 PM Dubai)" instead of `12 Sept 5:00 PM GMT+4`.
- **Status pills instead of jargon.** "Starts in 3 weeks", "Filling fast", "Last few seats" — only when true from cohort dates.
- **Reduce chrome.** One primary action per row ("View programme"), Apply moves to the landing page; the heart stays. Today two competing buttons per row make the list feel like a checkout.
- **Fix the count mismatch.** The finder headline hardcodes "38 programmes"/"Grades 5–12" while the catalogue holds 35; drive both from data.
- **Category headers get a one-line explainer** ("Fellowships — deepest, mentor-led, 6–8 weeks") so a parent understands the difference between Fellowship / Programme / Competition without reading FAQ.

## Part 2 — AI fit quiz ("Which programme fits my child?")

A 5-step quiz, launchable from the footer, the finder rail, and one home CTA. Feels like a short conversation, not a form.

Steps: grade → what they're drawn to (multi-select interests) → how much time per week → what you want out of it (marks, portfolio, confidence, university proof, exploring) → where you are (timezone).

Then: the whole catalogue (name, type, tracks, grades, duration, time, fee, outcomes, cohort dates) is sent to Lovable AI along with those answers, and it returns 3 ranked picks, each with:
- one sentence in parent language on why this child, not a generic blurb
- the concrete outcome after finishing
- next cohort + weekly commitment
- one honest "consider instead if…" alternative

Results render as cards linking to the programme landing pages, with "Save all three" (existing shortlist) and "Email/share this shortlist" so it survives into a parent conversation. Deterministic filtering runs first (grade + timezone hard rules), so the AI only ever ranks programmes the child can actually attend — no hallucinated programmes, no impossible times.

Also, per your Synthesis reference: a light, playful surface — progress dots, one question per screen, big tap targets, and a "thinking" line while the model reasons. It reads like a short guided consult rather than a filter panel.

## Technical notes

- New `src/lib/recommend.functions.ts` with a `createServerFn` calling Lovable AI (`google/gemini-3.7-flash`) via the AI SDK gateway helper in `src/lib/ai-gateway.server.ts`; `LOVABLE_API_KEY` stays server-side. Structured output kept schema-light, with a code-side fallback to plain ranked filtering if the model call fails or credits run out.
- Catalogue is compressed into a compact prompt payload built from `PROGRAMMES` + `programme-proof` (ids only for output, resolved back in code) so the model cannot invent a programme.
- Quiz lives at `/fit` with answers in URL search params (shareable), plus a footer entry point; results are also linkable.
- Row changes are contained to `ProgrammeCard.tsx`, `ResultGroup.tsx`, `CohortRows.tsx` and a small `formatCohort` helper; no data model change beyond an outcome one-liner map.
- Timezone handled by the existing `regions.ts` / dual-time helper.
