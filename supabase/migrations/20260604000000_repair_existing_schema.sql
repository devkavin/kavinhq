-- Compatibility repair for an older Kavin HQ Supabase schema.
-- This migration is intentionally additive/backfilling so existing rows survive.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

insert into public.admin_users (email)
values ('kavindra.senanayake@gmail.com')
on conflict (email) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where email = auth.jwt() ->> 'email'
  );
$$;

create or replace function public.update_timestamp()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

alter table public.services
  add column if not exists short_description text,
  add column if not exists who_it_is_for text,
  add column if not exists what_is_included text[] not null default '{}',
  add column if not exists deliverables text[] not null default '{}';

alter table public.services
  alter column description drop not null,
  alter column details drop not null,
  alter column icon drop not null;

update public.services
set short_description = coalesce(short_description, description),
    who_it_is_for = coalesce(who_it_is_for, details);

alter table public.projects
  add column if not exists excerpt text,
  add column if not exists summary text,
  add column if not exists role text,
  add column if not exists focus text,
  add column if not exists stack text[] not null default '{}',
  add column if not exists cover_image_url text,
  add column if not exists gallery_images text[] not null default '{}',
  add column if not exists my_role text,
  add column if not exists architecture_flow text,
  add column if not exists challenges text,
  add column if not exists outcome text,
  add column if not exists what_i_learned text,
  add column if not exists live_url text,
  add column if not exists github_url text,
  add column if not exists sort_order integer not null default 0;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'projects'
      and column_name = 'tech_stack'
      and data_type = 'ARRAY'
  ) then
    execute $sql$
      alter table public.projects
        alter column tech_stack type text
        using array_to_string(tech_stack, ', ')
    $sql$;
  end if;
end $$;

alter table public.projects
  alter column description drop not null,
  alter column overview drop not null,
  alter column problem drop not null,
  alter column goal drop not null,
  alter column what_built drop not null,
  alter column tech_stack drop not null,
  alter column key_features drop not null,
  alter column result drop not null,
  alter column lessons drop not null,
  alter column image drop not null,
  alter column gallery drop not null,
  alter column year drop not null;

update public.projects
set excerpt = coalesce(excerpt, description),
    summary = coalesce(summary, overview),
    stack = case when cardinality(stack) = 0 then coalesce(tech_stack, '{}') else stack end,
    cover_image_url = coalesce(cover_image_url, image),
    gallery_images = case when cardinality(gallery_images) = 0 then coalesce(gallery, '{}') else gallery_images end,
    my_role = coalesce(my_role, what_built),
    outcome = coalesce(outcome, result),
    what_i_learned = coalesce(what_i_learned, lessons);

alter table public.notes
  add column if not exists tags text[] not null default '{}',
  add column if not exists cover_image_url text,
  add column if not exists published_at timestamptz,
  add column if not exists seo_title text,
  add column if not exists seo_description text;

alter table public.notes
  alter column excerpt drop not null,
  alter column date drop not null,
  alter column read_time drop not null,
  alter column image drop not null;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'notes'
      and column_name = 'read_time'
      and data_type <> 'integer'
  ) then
    execute $sql$
      alter table public.notes
        alter column read_time type integer
        using nullif(regexp_replace(coalesce(read_time, ''), '[^0-9]', '', 'g'), '')::integer
    $sql$;
  end if;
end $$;

update public.notes
set cover_image_url = coalesce(cover_image_url, image),
    published_at = coalesce(published_at, date::timestamptz);

alter table public.testimonials
  add column if not exists role_or_company text,
  add column if not exists image_url text;

update public.testimonials
set role_or_company = coalesce(role_or_company, nullif(concat_ws(' / ', role, company), ''));

create table if not exists public.lab_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  description text,
  image_url text,
  tags text[] not null default '{}',
  status public.content_status not null default 'draft',
  external_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.contact_inquiries
  add column if not exists company_or_brand text,
  add column if not exists phone_or_whatsapp text,
  add column if not exists budget_range text,
  add column if not exists existing_website_or_social_link text,
  add column if not exists source text,
  add column if not exists is_read boolean not null default false,
  add column if not exists is_spam boolean not null default false;

update public.contact_inquiries
set company_or_brand = coalesce(company_or_brand, company),
    phone_or_whatsapp = coalesce(phone_or_whatsapp, phone),
    existing_website_or_social_link = coalesce(existing_website_or_social_link, link);

update public.contact_inquiries set status = 'new' where status::text = 'open';
update public.contact_inquiries set status = 'archived' where status::text = 'closed';

alter table public.contact_inquiries
  alter column status set default 'new';

alter table public.media_assets
  add column if not exists file_name text,
  add column if not exists file_path text,
  add column if not exists public_url text,
  add column if not exists mime_type text,
  add column if not exists size_bytes bigint not null default 0,
  add column if not exists uploaded_by uuid references auth.users(id) on delete set null;

alter table public.media_assets
  alter column path drop not null,
  alter column status drop not null;

update public.media_assets
set file_name = coalesce(file_name, path),
    file_path = coalesce(file_path, path),
    public_url = coalesce(public_url, ''),
    mime_type = coalesce(mime_type, 'application/octet-stream');

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.notes enable row level security;
alter table public.testimonials enable row level security;
alter table public.lab_items enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.media_assets enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'admin_users' and policyname = 'admin_read_admin_users') then
    create policy "admin_read_admin_users" on public.admin_users for select using (public.is_admin());
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'admin_users' and policyname = 'admin_manage_admin_users') then
    create policy "admin_manage_admin_users" on public.admin_users for all using (public.is_admin()) with check (public.is_admin());
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'contact_inquiries' and policyname = 'public_insert_inquiries') then
    create policy "public_insert_inquiries" on public.contact_inquiries for insert with check (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'lab_items' and policyname = 'public_read_lab_items') then
    create policy "public_read_lab_items" on public.lab_items for select using (status = 'published');
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'lab_items' and policyname = 'admin_manage_lab_items') then
    create policy "admin_manage_lab_items" on public.lab_items for all using (public.is_admin()) with check (public.is_admin());
  end if;
end $$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'kavin-hq-media',
  'kavin-hq-media',
  true,
  5242880,
  array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'public_read_kavin_hq_media') then
    create policy "public_read_kavin_hq_media" on storage.objects for select using (bucket_id = 'kavin-hq-media');
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'admin_insert_kavin_hq_media') then
    create policy "admin_insert_kavin_hq_media" on storage.objects for insert with check (bucket_id = 'kavin-hq-media' and public.is_admin());
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'admin_update_kavin_hq_media') then
    create policy "admin_update_kavin_hq_media" on storage.objects for update using (bucket_id = 'kavin-hq-media' and public.is_admin()) with check (bucket_id = 'kavin-hq-media' and public.is_admin());
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects' and policyname = 'admin_delete_kavin_hq_media') then
    create policy "admin_delete_kavin_hq_media" on storage.objects for delete using (bucket_id = 'kavin-hq-media' and public.is_admin());
  end if;
end $$;
