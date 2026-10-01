-- Data API grants for the public masterclass listing
GRANT SELECT ON public.all_masterclasses_public TO anon, authenticated;
GRANT SELECT ON public.all_masterclasses TO anon, authenticated;
GRANT ALL ON public.all_masterclasses TO service_role;
GRANT SELECT ON public.all_partners TO anon, authenticated;
GRANT ALL ON public.all_partners TO service_role;
GRANT SELECT ON public.all_programs TO anon, authenticated;
GRANT ALL ON public.all_programs TO service_role;
GRANT SELECT ON public.all_cohorts TO anon, authenticated;
GRANT ALL ON public.all_cohorts TO service_role;

-- Mentors: expose only public-facing columns
GRANT SELECT (id, full_name, bio, university, image_url) ON public.all_mentors TO anon;
GRANT SELECT ON public.all_mentors TO authenticated;
GRANT ALL ON public.all_mentors TO service_role;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='all_mentors' AND policyname='all_mentors_public_read'
  ) THEN
    CREATE POLICY "all_mentors_public_read" ON public.all_mentors
      FOR SELECT TO anon USING (true);
  END IF;
END $$;