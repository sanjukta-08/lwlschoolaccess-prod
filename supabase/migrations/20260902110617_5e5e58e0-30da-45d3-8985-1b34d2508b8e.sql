
-- Trigger-only functions: not callable through the API at all; triggers keep firing.
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'lwl_site'
      AND pg_catalog.format_type(p.prorettype, NULL) = 'trigger'
  LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated', r.sig);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', r.sig);
  END LOOP;
END $$;

-- Destructive maintenance helper: backend only.
REVOKE ALL ON FUNCTION lwl_site.purge_captured_leads_for_email(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION lwl_site.purge_captured_leads_for_email(text) TO service_role;

-- Signed-in + backend only.
REVOKE ALL ON FUNCTION lwl_site.link_untracked_payments_for_application(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION lwl_site.link_untracked_payments_for_application(uuid) TO authenticated, service_role;

REVOKE ALL ON FUNCTION lwl_site.get_user_role(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION lwl_site.get_user_role(uuid) TO authenticated, service_role;

REVOKE ALL ON FUNCTION lwl_site.get_student_school_id(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION lwl_site.get_student_school_id(uuid) TO authenticated, service_role;

-- Keep the public apply-form path working explicitly.
GRANT EXECUTE ON FUNCTION lwl_site.get_public_form_template(uuid, text, text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION lwl_site.upsert_application(jsonb) TO anon, authenticated, service_role;

-- Partner contact details stay hidden from anonymous callers regardless of default grants.
REVOKE SELECT (contact_name, contact_phone) ON public.all_partners FROM PUBLIC, anon;
