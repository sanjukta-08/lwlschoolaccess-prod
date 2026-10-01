CREATE TABLE lwl_site.concierge_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  source_page text, utm_source text, utm_medium text, utm_campaign text
);
CREATE TABLE lwl_site.concierge_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES lwl_site.concierge_sessions(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user','assistant','tool')),
  content text,
  surfaced_program_ids text[],
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX concierge_messages_session_idx ON lwl_site.concierge_messages(session_id, created_at);
CREATE TABLE lwl_site.concierge_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES lwl_site.concierge_sessions(id) ON DELETE CASCADE,
  name text, contact text, grade text,
  interested_program_ids text[], notes text,
  contacted boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX concierge_leads_one_per_session ON lwl_site.concierge_leads(session_id);
GRANT ALL ON lwl_site.concierge_sessions, lwl_site.concierge_messages, lwl_site.concierge_leads TO service_role;
REVOKE ALL ON lwl_site.concierge_sessions, lwl_site.concierge_messages, lwl_site.concierge_leads FROM anon, authenticated;
ALTER TABLE lwl_site.concierge_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lwl_site.concierge_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE lwl_site.concierge_leads ENABLE ROW LEVEL SECURITY;