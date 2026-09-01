-- Learn with Leaders website: editorial layer over the shared public.all_* tables.
-- Everything here lives in our own schema (lwl_site). No shared object is touched.

CREATE TABLE lwl_site.site_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  program_id uuid UNIQUE,
  slug text UNIQUE,
  name_override text,
  type_key text CHECK (type_key IN ('fel','prog','comp')),
  track_key text CHECK (track_key IN ('med','law','fin','ai','res','lead','sat')),
  mentor_key text CHECK (mentor_key IN ('harvard','hpair','yale','ivy')),
  tag text,
  about text,
  session_time text,
  badge text,
  dur_override text,
  grade_min integer,
  grade_max integer,
  fee_early text,
  fee_regular text,
  site_url text,
  apply_url text,
  surface text NOT NULL DEFAULT 'online' CHECK (surface IN ('online','camp')),
  is_visible boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 100,
  skills jsonb,
  projects jsonb,
  faqs jsonb,
  do_steps jsonb,
  profile_impact jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE lwl_site.site_cohorts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_code text NOT NULL REFERENCES lwl_site.site_programs(code) ON DELETE CASCADE ON UPDATE CASCADE,
  cohort_id uuid,
  start_date date,
  label text,
  session_time text,
  elig text,
  flyer_url text,
  brochure_url text,
  fee_early text,
  fee_regular text,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_cohorts_needs_anchor CHECK (cohort_id IS NOT NULL OR start_date IS NOT NULL)
);

CREATE INDEX site_cohorts_program_code_idx ON lwl_site.site_cohorts (program_code);
CREATE UNIQUE INDEX site_cohorts_cohort_id_key ON lwl_site.site_cohorts (cohort_id) WHERE cohort_id IS NOT NULL;

CREATE OR REPLACE FUNCTION lwl_site.site_touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = lwl_site, public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER site_programs_touch BEFORE UPDATE ON lwl_site.site_programs
  FOR EACH ROW EXECUTE FUNCTION lwl_site.site_touch_updated_at();
CREATE TRIGGER site_cohorts_touch BEFORE UPDATE ON lwl_site.site_cohorts
  FOR EACH ROW EXECUTE FUNCTION lwl_site.site_touch_updated_at();

GRANT USAGE ON SCHEMA lwl_site TO anon, authenticated;
GRANT SELECT ON lwl_site.site_programs TO anon, authenticated;
GRANT SELECT ON lwl_site.site_cohorts TO anon, authenticated;
GRANT ALL ON lwl_site.site_programs TO service_role;
GRANT ALL ON lwl_site.site_cohorts TO service_role;

ALTER TABLE lwl_site.site_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lwl_site.site_cohorts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site programme content"
  ON lwl_site.site_programs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public can read site cohort content"
  ON lwl_site.site_cohorts FOR SELECT TO anon, authenticated USING (true);
