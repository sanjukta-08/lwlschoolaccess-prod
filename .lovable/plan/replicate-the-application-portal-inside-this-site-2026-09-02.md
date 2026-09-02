# Replicate the Application Portal inside this site

The portal is 28k lines of app code (Apply 1.6k, Form Builder 2.6k, 18 admin screens, checkout ~1.5k) plus 34 Deno functions. We rebuild all of it here on this project's stack — TanStack routes and server functions — wired to the same `lwl_site` tables, and keep it dormant so the live portal stays the only thing acting on the world.

## Confirmed starting point

- Every table the portal uses already exists in `lwl_site`: `lwl_applications` (13 rows), `form_templates` (41), `program_codes` (227), `payment_links`, `captured_leads`, `camp_leads`, `camp_payments`, `application_installments`, `email_templates`, `email_send_log`, `program_email_settings`, `email_reminder_settings`, `whatsapp_drip_sequences`, `app_settings`, `mentors`, `user_profiles`, `program_attachments`. **No new tables, no schema changes** — we read and write what is already there.
- The portal reaches these tables through a service-role gateway function on its own Supabase project. Here we talk to `lwl_site` directly from server functions, which removes the gateway entirely.
- Admin identity: `lwl_site.user_profiles` has 3 admin rows, and none of their `user_id`s exist in this project's shared `auth.users` — those accounts live on the portal's own auth project. So admin accounts have to be (re)created on the shared project and their `user_profiles` rows pointed at the new ids. Nothing existing is deleted; we add rows, and the live portal keeps using its own.

## Dormancy — how "built but not in use" works

One `app_settings`-backed kill switch, read server-side on every mutation:

- Reads (catalogue, forms, applications, payments, leads, analytics) are fully live.
- Writes are allowed only for records this replica creates, and only when the switch is on; while off, a write returns a clear "replica is dormant" result and logs nothing.
- Email, WhatsApp and Stripe charge paths are stubbed behind the same switch with a dry-run mode that renders the exact message/payload to screen instead of sending. Stripe uses test keys only until you say otherwise.
- No cron registrations, no Stripe webhook endpoint registration, no WATI templates activated from this project. The live portal keeps owning all scheduled sending.

## Phases

**Phase 1 — Foundations**
Admin auth on the shared project (sign-in, role read from `user_profiles`, `super_admin`/`admin`/`manager`/`lwl_admin`), the `/admin` shell (sidebar, guard, profile menu) restyled into this site's Noir & Gold system, the data layer (`lwl_site` server functions with role checks in every handler), the dormancy switch, and the admin dashboard with live counts.

**Phase 2 — Apply**
`/apply` and `/apply/$formSlug` end to end: form-template driven fields, program-code resolution, school picker, country/state/city, phone/email normalisation, UTM + scroll tracking, lead autosave, submitted view. Restyled, same behaviour and same table columns.

**Phase 3 — Pay**
`/pay/$id` (application payments and direct payment links), installment plan preview, promo validation, payment success page, legacy `/checkout/$id` redirect, plus `/privacy` and `/terms`. Stripe in test mode; the webhook handler is written as a server route but left unregistered.

**Phase 4 — Admin operations**
Applications table with filters and detail drawer, Payments, Payment Links, Promo Codes, Program Codes, Mentors, Captured Leads, UTM Analytics, Manage Admins, Manage Students, Profile Settings.

**Phase 5 — Form Builder**
The full drag-and-drop builder over `form_templates`, including preview and publish (publish is a write, so it obeys the dormancy switch).

**Phase 6 — Automation**
Automated Emails, Automated WhatsApp, Camp Automation, Camp Flagged, WhatsApp Broadcasts — all editable and previewable, sending disabled. Cron logic ported as `/api/public/*` routes with secret checks, deliberately not scheduled.

**Phase 7 — Verification**
Walk every route in the live preview against the portal's behaviour, confirm no route collides with the marketing site, confirm zero writes happened while dormant, and hand you a checklist of what to flip on at cutover.

## Technical notes

- Routes: `/apply`, `/apply/$formSlug`, `/pay/$id`, `/checkout/$id`, `/payment-success`, `/privacy`, `/terms`, and `/admin/*` under a gated `_authenticated`-style admin layout. None of these paths exist on the marketing site today.
- Data access: `src/lib/portal/*.functions.ts` server functions; the service-role client is imported inside handlers only, and every handler re-checks the caller's role from `user_profiles` before touching data. Public apply/pay reads use the existing public RPCs (`get_public_form_template`, `get_public_payment_link`, `upsert_application`).
- Writes are confined to `lwl_site`; `public.*` (all_programs, all_partners, all_cohorts, all_mentors) stays read-only, and the existing live catalogue wiring is reused rather than duplicated.
- Secrets needed as we reach each phase: Stripe test keys, SMTP sender, WATI token, cron secret, Google One Tap client id. I'll request them at the phase that needs them, not upfront.
- The portal's 34 Deno functions are not redeployed anywhere; their logic becomes server functions here. The live portal's functions are untouched.
- Restyling swaps the portal's theme tokens for this site's semantic tokens and typography; layout and field order stay recognisable so admins aren't retrained.

## What I need from you at cutover (not now)

Which email address(es) should become admins on the shared project, and when to flip the dormancy switch per flow.
