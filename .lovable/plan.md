# Import the complete Geneva, Spain and IGNITE camp pages

## What I found

- **Geneva** and **Spain** are currently served here by the shared generic camp page.
- In the referenced Student Website project, their cards do not open locally built pages. They embed the original pages at:
  - `learnwithleaders.com/camps/genevacamp/`
  - `learnwithleaders.com/camps/salamancaspaincamp/`
- Those originals are full bespoke experiences: Geneva has its own discovery, seven-day programme, UN/CERN/WHO, academics, hackathon, badges, location, student stories and FAQ sections; Spain has its own Salamanca introduction, learning outcomes, programme details, accommodation, schedule, tours, professor, gallery, testimonials and terms.
- The current IGNITE page is an earlier partial import. The referenced **IGNITE Gateway** is a separate, much fuller page with its own navigation, video-led hero, statistics/gallery, objectives, details, schedule, accommodation, activities, faculty, media, testimonials, terms and FAQ.

## What will be built

### 1. Geneva — complete dedicated page
Create a standalone page at the existing URL:

`/camps/future-sustainability-innovators-geneva`

Reproduce the original Geneva page locally, including its visual identity, section order, interactions and full media set. It will no longer use the generic camp template or an iframe.

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
- Port each design into an isolated camp component folder so its styling cannot alter the rest of the website.
- Download and store the original Geneva and Spain page assets locally; copy the IGNITE Gateway’s complete media set into this project. No hotlinked or cross-project asset pointers will remain.
- Convert source routing and controls to the project’s TanStack navigation and existing button components.
- Load page-specific fonts through route metadata, make browser-only video/carousel behavior safe during server rendering, and retain reduced-motion support.
- Add complete route metadata plus Course and FAQ structured data where the source content supports it.
- Leave the `/camps` hub, its cards, and the other four camp pages unchanged.

## Verification

- Compare all three pages section-by-section with their sources on desktop and mobile.
- Confirm every image and video loads, navigation and carousels work, no content overlaps, and no source iframe remains.
- Confirm all Apply buttons open the correct Application Portal URL and all Book a Meeting/school actions retain their intended destination.
- Verify the three routes return successfully, metadata renders, catalogue values hydrate without a blank flash, and the project has no build, runtime or console errors.
