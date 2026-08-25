# Add "Learn with Leaders" story, press, reach and LinkedIn sections to the home page

Four new home-page blocks that build parent trust before they reach the finder.

## 1. About Learn with Leaders

A short "who we are" band: one paragraph on the mission (Ivy League student mentors, live cohorts, Grades 5–12, verifiable proof), plus four proof stats pulled from real data where possible — programmes count, cohorts count, tracks, plus reach. Links to the finder and profile-building page.

## 2. In the press

A press strip with logo-style wordmarks (Forbes first) and clickable article cards: publication, headline, date. Headlines and URLs start as clearly-marked placeholders in one small data file so you can paste the real Forbes links later without touching layout. Cards open in a new tab.

## 3. Schools we work with

A global-reach band stating: students from **80+ countries** and **30,000+ schools worldwide**. Big animated-feel stat tiles, a short line about how school partnerships work (single cohorts to co-branded pathways), and a region chip row (UAE, India, SE Asia, East Asia, Europe, North America). Reuses the existing "Bringing this to your school?" CTA below it, so no duplicate ask.

## 4. Learn with Leaders on LinkedIn

A gallery of LinkedIn-style post cards recreated in code (no image uploads needed): avatar initials, student/parent name, role line ("Grade 11 · Fellowship alum"), post text about their experience/outcome, and a reactions + comments footer with the LinkedIn glyph. 6 cards, responsive grid, subtle card tilt/hover. Content is written as realistic sample stories in the same data file, easy to replace with real ones.

## Placement on the home page

```text
Hero + stats
Pick a pathway
Flagship programmes
Partners strip
About Learn with Leaders      <- new
In the press (Forbes)         <- new
Schools we work with          <- new
How it works / Why LWL
LinkedIn stories              <- new
Bringing this to your school? CTA
Final CTA + footer
```

## Technical notes

- New data file `src/lib/social-proof.ts`: `PRESS[]` (publication, headline, date, url, placeholder flag), `LINKEDIN_POSTS[]` (name, role, text, reactions, comments), `REACH` (countries, schools, regions), and the about copy.
- New components: `src/components/AboutLwl.tsx`, `src/components/PressStrip.tsx`, `src/components/GlobalReach.tsx`, `src/components/LinkedInStories.tsx`.
- All styling via existing semantic tokens (crimson, ink, paper, gold, wash, line) and the serif/mono type pairing already in `src/styles.css` — no new colours, no hardcoded hex.
- `src/routes/index.tsx` imports and renders the four sections in the order above; home-page meta description updated to mention global reach.
- Adds `Organization` JSON-LD on the home route (name, description, sameAs LinkedIn) for SEO, and `Review`-free — testimonials stay presentational to avoid fake structured data.
