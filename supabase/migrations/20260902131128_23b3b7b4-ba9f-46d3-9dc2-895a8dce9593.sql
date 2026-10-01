-- Column-level grants for anon already exist on public.all_partners and exclude
-- contact_name / contact_phone. The table-level grant was overriding them.
REVOKE SELECT ON public.all_partners FROM anon;

-- Re-assert the public-safe column set (idempotent, keeps site reads working).
GRANT SELECT (
  id, partner_slug, org_name, description, logo_url, website,
  country, offerings, approval_status, approved_at, is_active,
  created_at, updated_at
) ON public.all_partners TO anon;