-- Audit finding (2026-10-07, Critical): askCompass and recommendProgrammes are
-- public server functions with no usable rate limit. The Compass per-session
-- message cap counts rows against a client-supplied sessionId, so a script can
-- mint a new session on every call and get a fresh budget each time -- open-
-- ended exposure on the OpenAI/Gemini bill behind both features.
--
-- This table backs a small shared IP-based limiter (src/lib/rate-limit.server.ts)
-- used by both features. Only a hashed IP is stored, never the raw address, to
-- avoid adding another place that holds identifying visitor data.
create table if not exists lwl_site.ai_rate_limit_hits (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  route text not null,
  created_at timestamptz not null default now()
);

create index if not exists ai_rate_limit_hits_lookup_idx
  on lwl_site.ai_rate_limit_hits (ip_hash, route, created_at);

alter table lwl_site.ai_rate_limit_hits enable row level security;

-- Same default-deny pattern as concierge_sessions/messages/leads: no policies,
-- grants revoked from anon/authenticated -- only the service-role client (used
-- server-side only) can read or write this table.
revoke all on lwl_site.ai_rate_limit_hits from anon, authenticated;

-- Follow-up (not done here): nothing prunes old rows yet. This table is
-- small and write-light, but a daily cleanup of rows older than a few days
-- should be added once this project has scheduled-job infra.
