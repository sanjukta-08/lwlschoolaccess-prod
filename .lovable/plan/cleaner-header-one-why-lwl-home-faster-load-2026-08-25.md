# Cleaner header, one "Why LWL" home, faster load

Three fixes: slim the navigation down to five real destinations, fold "Why LWL" into the About page, and cut the weight the first screen has to download.

## 1. Header: 9 links down to 5

The header currently carries Programme Finder, Full calendar, Month view, Profile building, Stories, About, Saved, Pathways, Why LWL and the advisor button — ten items on one row, which is what reads as unprofessional.

New header:

```text
[logo]   Programmes   Calendar   Profile building   Stories   About      ♡ Saved   [Talk to an advisor]
```

- Calendar becomes one link to `/calendar`; the month-grid view is reached from a view toggle already present on the calendar pages, not from the header.
- Pathways and Why LWL leave the header (they were in-page anchors, not pages).
- Saved stays as the small heart badge, advisor button stays as the only filled action.
- On mobile the list collapses to logo + Saved + advisor, with the five links in a compact menu.

## 2. A real footer that carries the rest

Today each page ends with a single line of copyright. Add one shared footer used by every page, with four columns:

- **Programmes** — Programme Finder, Trending, Flagship fellowships, All by interest
- **Dates** — Full calendar, Month view, Saved & reminders
- **Why us** — Profile building, About Learn with Leaders, Family stories, Press
- **Talk to us** — Book a call, Partner with us (schools), advisor email

Plus the logo, the reach line ("families in 80+ countries"), and the existing "details and fees correct at time of publishing" note.

## 3. Merge "Why LWL" into About

The "Why LWL" block currently repeats on the home page and inside the finder page. It moves to `/about` as a proper section next to the press strip and global reach, so About becomes the single place that argues the case. The home page keeps its short trust strip (stats + partner logos) and loses the duplicate block; the finder page loses it too, so results stay above the fold. The old `/#why` anchor redirects readers to `/about#why` via an anchor on that section.

## 4. Loading speed

Measured on the current preview: server responds in ~40ms, page fires load at ~0.6s locally with ~500KB transferred over 15 requests — so the server is not the problem; weight and render-blocking assets are. Planned changes, in order of expected effect:

- **Fonts.** Three Google families (Newsreader with a variable optical-size axis, Figtree at 4 weights, IBM Plex Mono at 3) load from a render-blocking third-party stylesheet. Self-host them as `@fontsource` packages and cut to the weights actually used (serif 400/500 + italic, sans 400/600, mono 500). Removes two extra DNS/TLS handshakes and the blocking round trip.
- **Programme data.** `programmes.ts`, `programme-detail.ts` and `programme-proof.ts` are ~2,200 lines of data. Split them so the home page ships only what its cards need, and the long marketing copy loads with the programme landing route rather than with every page.
- **Below-the-fold sections.** Stories gallery, press strip and testimonials render on the server today; make them lazy so the hero and pathway grid paint first.
- **Images.** Preload the logo, give it explicit dimensions (already set), and keep the story screenshots lazy with fixed aspect ratios so nothing shifts.
- **Verify.** Re-measure the same numbers after the changes and report before/after, rather than assuming the fix worked.

## Technical notes

- New `src/components/SiteFooter.tsx`; the inline `<footer>` in `index.tsx`, `finder.tsx`, `calendar.tsx`, `calendar-month.tsx`, `stories.tsx`, `about.tsx`, `profile-building.tsx`, `shortlist.tsx` and `ProgrammeLanding.tsx` is replaced by it.
- `SiteHeader.tsx` reduced to five `Link`s plus `ShortlistBadge`; mobile menu built on the existing Radix dialog/collapsible already in the project.
- `WhyLwl` stays exported from `HowItWorks.tsx` but is rendered only from `about.tsx`, inside `<section id="why">`.
- Fonts: install `@fontsource-variable/newsreader`, `@fontsource-variable/figtree`, `@fontsource/ibm-plex-mono`, import them at the top of `src/styles.css`, drop the Google `<link>` entries from `__root.tsx` head.
- Lazy sections use `React.lazy` + `Suspense` with fixed-height fallbacks to avoid layout shift.
- No data-layer or content changes beyond moving the Why-LWL block; all existing links keep working.
