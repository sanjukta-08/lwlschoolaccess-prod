# Internships page for Learn with Leaders

## Goal
Add a public `/internships` page that lists the two sponsorship roles from the uploaded doc, plus a dedicated `/internships/apply` page where candidates can submit an application.

## Page structure

### `/internships`
- Use the shared `PageHero` component with eyebrow "Join us · Learn with Leaders", title "Sponsorship roles — Competitions", and a short subtitle about the mission.
- Two role cards:
  - **Sponsorship Manager, Competitions** (Full Time, Remote)
  - **Sponsorship Intern, Competitions** (Remote)
- Each card shows: title, location/duration/reporting line, "About the role", "What you'll do" bullets, "What we're looking for" bullets, compensation or "What you get", and an "Apply for this role" button linking to `/internships/apply?role=...`.
- Add a "Why join us?" band below the roles highlighting the mission, remote-first setup, and Harvard/Yale-affiliated mentorship.
- Close with a footer CTA linking back to `/finder` and `/about`.

### `/internships/apply`
- Form fields: full name, email, phone (optional), role (pre-selected from query string), CV/resume link, cover message, LinkedIn/profile URL.
- Client-side validation for required fields and email format.
- Submit composes a pre-filled email to `careers@learnwithleaders.com` with the role in the subject line. This can be swapped for a real ATS/backend endpoint later.
- Success state confirms the email was prepared and gives a "Back to internships" link.

## Route files
- `src/routes/internships.tsx` — layout wrapper that renders `<Outlet />`.
- `src/routes/internships.index.tsx` — role listing page (URL `/internships`).
- `src/routes/internships.apply.tsx` — application form page (URL `/internships/apply`).

## Components
- `src/components/RoleCard.tsx` — reusable role card used on the listing page.
- `src/components/InternshipApplyForm.tsx` — form component used on the apply page.

## Navigation
- Add an "Internships" link under the "Talk to us" column in `src/components/SiteFooter.tsx`.

## SEO / metadata
- `/internships`: unique title, description, og:title, og:description, og:url, canonical, and JSON-LD `JobPosting` schema for each role.
- `/internships/apply`: unique title, description, og:title, og:description, og:url, and canonical.

## Design
- Use existing brand tokens: crimson/gold palette, `PageHero`, `font-serif` headings, `mono-label`, rounded cards, and `shadow-soft`.
- No hardcoded colors.

## Acceptance
- Both routes render without build errors.
- Footer link navigates to `/internships`.
- Apply form validates and generates the correct mailto.
- Build passes.
