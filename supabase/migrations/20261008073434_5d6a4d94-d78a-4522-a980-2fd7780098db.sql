create or replace function lwl_site.purge_expired_data()
returns void
language plpgsql
security definer
set search_path = lwl_site, public
as $$
begin
  -- Scrambled IP addresses: 30 days.
  delete from lwl_site.ai_rate_limit_hits where created_at < now() - interval '30 days';

  -- Compass conversations WITHOUT contact details: 90 days since the last message.
  with last_msg as (
    select s.id, greatest(s.created_at, coalesce(max(m.created_at), s.created_at)) as last_at
    from lwl_site.concierge_sessions s
    left join lwl_site.concierge_messages m on m.session_id = s.id
    group by s.id, s.created_at
  ), doomed as (
    select l.id from last_msg l
    where not exists (select 1 from lwl_site.concierge_leads x where x.session_id = l.id)
      and l.last_at < now() - interval '90 days'
    union
    -- Compass conversations WITH contact details: 24 months since the last message.
    select l.id from last_msg l
    where exists (select 1 from lwl_site.concierge_leads x where x.session_id = l.id)
      and l.last_at < now() - interval '24 months'
  ), d1 as (
    delete from lwl_site.concierge_messages where session_id in (select id from doomed)
  ), d2 as (
    delete from lwl_site.concierge_leads where session_id in (select id from doomed)
  )
  delete from lwl_site.concierge_sessions where id in (select id from doomed);
end;
$$;

revoke all on function lwl_site.purge_expired_data() from public, anon, authenticated;

select cron.schedule('lwl-site-purge-expired-data', '40 2 * * *', 'select lwl_site.purge_expired_data();');