-- Corrective migration: pin the public listing views to security_invoker.
--
-- Audit finding (2026-10-07): migration 20260910152309 set
-- `all_masterclasses_public` to `security_invoker = off`, which would make the
-- view run with its owner's privileges instead of the caller's, bypassing the
-- RLS policy on the underlying `all_masterclasses` table (anon is restricted
-- to `is_published = true` rows there).
--
-- Direct inspection of the live database (2026-10-07) shows the view is
-- currently `security_invoker = on` in production, so this is not an active
-- vulnerability today -- but the discrepancy between this repo's migration
-- history and live state means a future `supabase db push`/reset that replays
-- migrations in order would silently set it back to `off`. This migration
-- makes the required state explicit and idempotent so that can't happen.
--
-- If a later admin change intentionally needs security_invoker = off for a
-- specific view, that decision should be re-made consciously here, not
-- inherited silently from a three-week-old migration.

alter view if exists public.all_masterclasses_public set (security_invoker = on);
