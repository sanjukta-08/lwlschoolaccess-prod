# Header polish + a gold brand mark layer

## 1. Hero headline on two lines
Currently the H1 wraps unpredictably ("Where ambitious students learn with leaders."). Lock it to two deliberate lines:

```text
Where ambitious students
learn with leaders.
```

- Line 1 in ink, line 2 as the italic serif accent, each on its own block line at every breakpoint (no reliance on natural wrapping).
- A short gold hairline rule (the wing motif, see below) sits under line 2 as a signature underline instead of the bare full stop.
- Tighter leading so the two lines read as one lockup.

## 2. Gold wing brand mark
Introduce a reusable wing motif derived from the LWL logo's wing, drawn as inline SVG (no new image asset), in the existing but currently unused `--gold` brand colour.

Where it appears, for a consistent signature across pages:
- Under the hero headline as a gold wing-rule flourish.
- On the eyebrow pill: gold wing tick replacing the plain crimson dot.
- Beside every section heading (`Pick a pathway`, `Delivered with partners`, etc.) as a small gold wing glyph, so the whole site shares one mark.
- In the footer next to the logo.

New component `src/components/WingMark.tsx` with `size`/`tone` props, plus a `SectionHeading` wrapper so headings stay identical everywhere.

## 3. Gold accents, used sparingly
Gold becomes the secondary brand colour (crimson stays primary/CTA):
- Gold hairline dividers between major sections in place of grey lines.
- Gold underline on the active header nav link.
- Gold ring/keyline on hero stat numbers and partner logo row.
- New tokens: `--gold-soft` (tint surface) and `--gold-line` (hairline), plus a `gold-rule` utility, so nothing is hardcoded.

## 4. Header alignment and spacing
- Vertically centre logo, nav, and actions on one optical baseline; raise the logo to `h-10 / md:h-11` so it holds against the nav weight.
- Even nav rhythm: consistent `px-3.5 py-2` hit areas, `gap-0.5`, active link = ink text + gold underline.
- Group the right cluster with a clear gap between shortlist badge and the advisor button so they stop crowding.
- Sticky, translucent header with a gold hairline bottom border that only appears once the page is scrolled (frosted blur over the hero wash).
- Mobile: full-width menu panel, matched padding with the bar, and a wing mark on the panel edge.

## Technical notes
- `src/styles.css`: add `--gold-soft`, `--gold-line`, `@theme` colour entries, and `gold-rule` / `header-blur` utilities.
- New: `src/components/WingMark.tsx`, `src/components/SectionHeading.tsx`.
- Edit: `src/components/SiteHeader.tsx` (alignment, sticky, gold active state), `src/components/SiteFooter.tsx` (wing mark), `src/routes/index.tsx` (hero lockup, section headings, gold dividers).
- Verify with a Playwright screenshot at desktop and mobile widths before finishing.
