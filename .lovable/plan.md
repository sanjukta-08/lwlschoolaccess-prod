# Import the complete Geneva, Spain and IGNITE camp pages

## What I found

- **Geneva** and **Spain** are currently served here by the shared generic camp page.
- The referenced Student Website project does not contain native Geneva or Spain page code; it embeds their older live pages.
- The newly specified **Elite Summer Academy** project does contain the complete dedicated `/geneva` page: 21 sections, 78 locally stored page files, 88 images, custom styling, and six interactive carousels. This is now the Geneva source of truth.
- Spain will still be recreated from its complete embedded original at `learnwithleaders.com/camps/salamancaspaincamp/`, which includes the Salamanca introduction, learning outcomes, programme details, accommodation, schedule, tours, professor, gallery, testimonials and terms.
- The current IGNITE page is an earlier partial import. The referenced **IGNITE Gateway** is a separate, much fuller page with its own navigation, video-led hero, statistics/gallery, objectives, details, schedule, accommodation, activities, faculty, media, testimonials, terms and FAQ.

## What will be built

### 1. Geneva — complete dedicated page
Create a standalone page at the existing URL:

`/camps/future-sustainability-innovators-geneva`

Import the complete `/geneva` experience from **Remix of Elite Summer Academy**, preserving its exact 21-section structure: hero, institutional network, overview, seven experiences, SDGs, itinerary, holiday map, academics, hackathon, challenges, badges, Geneva location, excursions, instructors, logistics, accommodation, awards, testimonials, college-application value, FAQs and organisations. Preserve its visual identity and carousel interactions, but render it locally without an iframe.

### 2. Spain — complete dedicated page
Create a standalone page at the existing URL:

`/camps/entrepreneurship-ai-salamanca`

Reproduce the complete Salamanca page locally, preserving its original styling, programme details, schedule, activities, professor, gallery, testimonials, terms and closing actions.

### 3. IGNITE — replace the partial import
Replace the current content at:

`/camps/ignite-cambridge-judge`

with the complete **IGNITE Gateway** experience, including all source sections, images and videos rather than merging it with the existing partial version.

## Live catalogue and links

- Keep dates, eligibility, duration, fee and cohort availability connected to the existing live catalogue wherever those values are displayed.
- Keep editorial material—daily agendas, locations, faculty biographies, FAQs and testimonials—as page content from the source designs.
- Route every student application action through each camp’s existing live `camp.applyUrl`:
  - Geneva: `https://apply.learnwithleaders.com/apply/geneva-camp`
  - Spain: `https://apply.learnwithleaders.com/apply/salamanca-entrepreneurship-ai`
  - IGNITE: `https://apply.learnwithleaders.com/apply/cambridge-ignite`
- Preserve separate school-enquiry and Book a Meeting actions only where the source has them; no local application, payment or enquiry form will be created.

## Technical approach

- Add explicit TanStack routes for Geneva and Spain so they take priority over the existing dynamic camp route; keep all three current public URLs unchanged.
- Port each design into an isolated camp component folder so its styling cannot alter the rest of the website. Geneva’s imported legacy HTML/CSS will be converted or safely scoped rather than injecting remote scripts or global Bootstrap behavior.
- Transfer Geneva’s complete local media/CSS set from **Elite Summer Academy**, download Spain’s original page assets, and transfer only the media used by the live IGNITE Gateway page. Every binary will be re-uploaded into this project’s asset storage; no hotlinks or cross-project asset pointers will remain.
- Convert source routing and controls to the project’s TanStack navigation and existing button components.
- Load page-specific fonts through route metadata, make browser-only video/carousel behavior safe during server rendering, and retain reduced-motion support.
- Add complete route metadata plus Course and FAQ structured data where the source content supports it.
- Leave the `/camps` hub, its cards, and the other four camp pages unchanged.

## Verification

- Compare all three pages section-by-section with their sources on desktop and mobile.
- Confirm every image and video loads, navigation and carousels work, no content overlaps, and no source iframe remains.
- Confirm all Apply buttons open the correct Application Portal URL and all Book a Meeting/school actions retain their intended destination.
- Verify the three routes return successfully, metadata renders, catalogue values hydrate without a blank flash, and the project has no build, runtime or console errors.
