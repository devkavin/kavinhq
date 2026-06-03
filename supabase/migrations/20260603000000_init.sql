-- Supabase Migration: Initial Schema for Kavin HQ Website
-- Generated on 2026-06-03

create extension if not exists pgcrypto;

create table public.admin_users (
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

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  short_description text,
  who_it_is_for text,
  what_is_included text[] not null default '{}',
  deliverables text[] not null default '{}',
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  summary text,
  category text not null,
  year text,
  role text,
  focus text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  featured boolean not null default false,
  stack text[] not null default '{}',
  cover_image_url text,
  gallery_images text[] not null default '{}',
  problem text,
  goal text,
  my_role text,
  tech_stack text,
  key_features text[] not null default '{}',
  architecture_flow text,
  challenges text,
  outcome text,
  what_i_learned text,
  live_url text,
  github_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  category text not null,
  tags text[] not null default '{}',
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  read_time integer,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role_or_company text,
  quote text not null,
  image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lab_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  description text,
  image_url text,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  external_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company_or_brand text,
  phone_or_whatsapp text,
  project_type text not null,
  budget_range text,
  timeline text not null,
  existing_website_or_social_link text,
  message text not null,
  source text,
  status text not null default 'new' check (status in ('new', 'reviewed', 'contacted', 'archived')),
  is_read boolean not null default false,
  is_spam boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_path text not null,
  public_url text not null,
  bucket text not null default 'kavin-hq-media',
  mime_type text not null,
  size_bytes bigint not null,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index idx_services_status_order on public.services (status, sort_order);
create index idx_projects_status_order on public.projects (status, sort_order, created_at desc);
create index idx_projects_featured on public.projects (featured) where status = 'published';
create index idx_notes_status_published on public.notes (status, published_at desc);
create index idx_contact_inquiries_created on public.contact_inquiries (created_at desc);
create index idx_media_assets_created on public.media_assets (created_at desc);

create trigger trg_site_settings_timestamp before update on public.site_settings for each row execute function public.update_timestamp();
create trigger trg_services_timestamp before update on public.services for each row execute function public.update_timestamp();
create trigger trg_projects_timestamp before update on public.projects for each row execute function public.update_timestamp();
create trigger trg_notes_timestamp before update on public.notes for each row execute function public.update_timestamp();
create trigger trg_testimonials_timestamp before update on public.testimonials for each row execute function public.update_timestamp();
create trigger trg_lab_items_timestamp before update on public.lab_items for each row execute function public.update_timestamp();
create trigger trg_contact_inquiries_timestamp before update on public.contact_inquiries for each row execute function public.update_timestamp();

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.notes enable row level security;
alter table public.testimonials enable row level security;
alter table public.lab_items enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.media_assets enable row level security;

create policy "admin_read_admin_users" on public.admin_users for select using (public.is_admin());
create policy "admin_manage_admin_users" on public.admin_users for all using (public.is_admin()) with check (public.is_admin());

create policy "public_read_site_settings" on public.site_settings for select using (true);
create policy "admin_manage_site_settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "public_read_services" on public.services for select using (status = 'published');
create policy "admin_manage_services" on public.services for all using (public.is_admin()) with check (public.is_admin());

create policy "public_read_projects" on public.projects for select using (status = 'published');
create policy "admin_manage_projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());

create policy "public_read_notes" on public.notes for select using (status = 'published');
create policy "admin_manage_notes" on public.notes for all using (public.is_admin()) with check (public.is_admin());

create policy "public_read_testimonials" on public.testimonials for select using (status = 'published');
create policy "admin_manage_testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());

create policy "public_read_lab_items" on public.lab_items for select using (status = 'published');
create policy "admin_manage_lab_items" on public.lab_items for all using (public.is_admin()) with check (public.is_admin());

create policy "public_insert_inquiries" on public.contact_inquiries for insert with check (true);
create policy "admin_manage_inquiries" on public.contact_inquiries for all using (public.is_admin()) with check (public.is_admin());

create policy "admin_manage_media_assets" on public.media_assets for all using (public.is_admin()) with check (public.is_admin());

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

create policy "public_read_kavin_hq_media" on storage.objects
for select
using (bucket_id = 'kavin-hq-media');

create policy "admin_insert_kavin_hq_media" on storage.objects
for insert
with check (bucket_id = 'kavin-hq-media' and public.is_admin());

create policy "admin_update_kavin_hq_media" on storage.objects
for update
using (bucket_id = 'kavin-hq-media' and public.is_admin())
with check (bucket_id = 'kavin-hq-media' and public.is_admin());

create policy "admin_delete_kavin_hq_media" on storage.objects
for delete
using (bucket_id = 'kavin-hq-media' and public.is_admin());
