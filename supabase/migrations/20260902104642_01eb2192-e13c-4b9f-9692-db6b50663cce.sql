
-- 1) Trigger-only functions: never meant to be called directly via the API.
--    Triggers keep firing normally (PostgreSQL checks EXECUTE at trigger creation, not at fire time).
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
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM anon, authenticated', r.sig);
  END LOOP;
END $$;

-- 2) Destructive maintenance helper: backend/service_role only.
REVOKE EXECUTE ON FUNCTION lwl_site.purge_captured_leads_for_email(text) FROM anon, authenticated;
GRANT  EXECUTE ON FUNCTION lwl_site.purge_captured_leads_for_email(text) TO service_role;

-- 3) Helpers that make no sense (and leak data) for anonymous callers.
REVOKE EXECUTE ON FUNCTION lwl_site.link_untracked_payments_for_application(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION lwl_site.get_user_role(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION lwl_site.get_student_school_id(uuid) FROM anon;

-- 4) Shared partner directory: keep it publicly readable, but stop exposing
--    partner contact person / phone to unauthenticated callers.
REVOKE SELECT (contact_name, contact_phone) ON public.all_partners FROM anon;
