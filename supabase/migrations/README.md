# About these migrations

This folder is **not** the full schema history of the `temdomobmzdkzulweony`
("Learn with Leaders - Data") Supabase project. The `public` schema (`all_masterclasses`,
`all_masterclasses_public`, `all_partners`, `all_programs`, `all_cohorts`,
`all_mentors`, `promo_codes`, `all_utm_mediums`, and the `lwl_site.*` helper
functions like `upsert_application` / `get_user_role`) was created outside this
repo -- it's shared infrastructure used by other platforms in the Learn with
Leaders group, not something this site owns.

What that means in practice:

- **`supabase db reset` / replaying these migrations on a clean database will
  fail.** Several files here `ALTER` / `GRANT` / `REVOKE` on tables and
  functions that no migration in this folder ever creates.
- This repo's own tables live in the `lwl_site` schema: the editorial overrides
  (`site_programs`, `site_cohorts`), the Compass concierge's PII store
  (`concierge_sessions`, `concierge_messages`, `concierge_leads`), and the
  rate limiter (`ai_rate_limit_hits`).
- **Before standing up a staging/review copy of this database** (e.g. for the
  upcoming LMS work), get a full schema dump from whoever administers the
  shared Supabase project -- these 9+ files alone are not enough to recreate
  it.
- Treat any `ALTER VIEW` / `GRANT` / `REVOKE` found in this folder as evidence
  of what changed and when, not as the current live state -- the live project
  has been edited directly (via the Supabase dashboard / SQL editor) at least
  once without a matching migration here (see the `security_invoker`
  correction in `20261007120000_*.sql` for a worked example: the live view was
  already back to the safe setting when this was investigated on 2026-10-07,
  despite an earlier migration in this folder setting it to the unsafe one).
