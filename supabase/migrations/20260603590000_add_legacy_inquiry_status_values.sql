-- Older deployments used an inquiry_status enum with open/reviewed/closed.
-- Add the app's newer values in their own migration so PostgreSQL commits them
-- before the compatibility repair maps existing rows.
do $$
begin
  if exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public'
      and t.typname = 'inquiry_status'
  ) then
    alter type public.inquiry_status add value if not exists 'new';
    alter type public.inquiry_status add value if not exists 'contacted';
    alter type public.inquiry_status add value if not exists 'archived';
  end if;
end $$;
