-- Public website reads the published masterclass listing as an anonymous visitor.
-- The listing view runs with the caller's own permissions, so the anonymous role
-- needs narrow read access to the columns the listing exposes.

GRANT SELECT (
  id, partner_id, program_id, cohort_id, slug, title, description, series,
  session_number, audience, scheduled_at, duration_minutes, display_timezone,
  host_mentor_id, host_name, learning_outcomes, apply_url, capacity, is_published
) ON public.all_masterclasses TO anon;

GRANT SELECT (id, org_name, logo_url) ON public.all_partners TO anon;

GRANT SELECT (id, full_name, bio, university, image_url) ON public.all_mentors TO anon;

DROP POLICY IF EXISTS all_mentors_public_read ON public.all_mentors;
CREATE POLICY all_mentors_public_read ON public.all_mentors
  FOR SELECT TO anon USING (true);
