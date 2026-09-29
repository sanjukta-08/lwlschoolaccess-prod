# Fix fonts and Apply Now buttons on lwlschoolaccess.com

## 1. Remove curvy/"snake" fonts everywhere
- Remove the extra decorative fonts loaded site-wide (Cormorant Garamond italic, Playfair, Optima italic, handwritten-style fonts).
- Switch every page, including the camp, conference, Kings and handwritten-notes sections, to the site's clean fonts: Bricolage Grotesque for headings, Figtree for body text.
- Remove italic/script styling from quotes, accents and notes. Text stays upright everywhere.

## 2. Check and fix every Apply Now button
- Crawl every page on the site: home, finder, calendar, programme pages, camps, conferences, competitions, internships, masterclasses and Kings. Collect every Apply, Register and Pay link.
- Open each link and record the result: working page, error, or missing link.
- Fix broken links:
  - Learn with Leaders programmes go to `apply.learnwithleaders.com/apply/{pay_slug}`, using the slug from the database.
  - Partner programmes go to their own apply link.
  - Links that have no valid target get hidden. They will not point to an error page.
- Keep UTM tracking on every link.
- Some links may still fail after these fixes. If the page that fails is in the Application Portal, which is a separate project, you get a list of those links so they can be fixed there. No local apply or pay pages will be created.

## 3. Verify
- Take screenshots on desktop and mobile to confirm the new fonts.
- Re-run the link check and confirm every Apply Now button works.

## Technical details
- Fonts are set in `src/styles.css` scoped blocks (`.camp-*`, `.hwmun-imported`), `src/hwmun-*.css`, `__root.tsx` head links, `camps/shared/fonts.ts` and the Salamanca/Geneva CSS.
- Apply links are built by the helpers in `src/lib/programmes.ts`, `camps.ts` and `conferences.ts`.
