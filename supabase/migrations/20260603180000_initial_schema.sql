create extension if not exists "pgcrypto";

create type public.content_status as enum ('draft', 'published');
create type public.inquiry_status as enum ('open', 'reviewed', 'closed');

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.email(), '') = 'kavindra.senanayake@gmail.com';
$$;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  overview text not null,
  problem text not null,
  goal text not null,
  what_built text not null,
  tech_stack text[] not null default '{}',
  key_features text[] not null default '{}',
  result text not null,
  lessons text not null,
  image text not null,
  gallery text[] not null default '{}',
  year text not null,
  category text not null,
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  date date not null default current_date,
  read_time text not null,
  category text not null,
  image text not null,
  status public.content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  details text not null,
  icon text not null,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  company text,
  quote text not null,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  phone text,
  project_type text not null,
  timeline text not null,
  link text,
  message text not null,
  status public.inquiry_status not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'media',
  path text not null,
  public_url text not null,
  alt text,
  status public.content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.notes enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.media_assets enable row level security;
alter table public.site_settings enable row level security;

create policy "Public can read published projects" on public.projects for select using (status = 'published' or public.is_admin());
create policy "Public can read published notes" on public.notes for select using (status = 'published' or public.is_admin());
create policy "Public can read published services" on public.services for select using (status = 'published' or public.is_admin());
create policy "Public can read published testimonials" on public.testimonials for select using (status = 'published' or public.is_admin());
create policy "Public can read published media" on public.media_assets for select using (status = 'published' or public.is_admin());

create policy "Public can insert contact inquiries" on public.contact_inquiries for insert with check (true);
create policy "Admin can read contact inquiries" on public.contact_inquiries for select using (public.is_admin());

create policy "Admin can manage projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin can manage notes" on public.notes for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin can manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin can manage testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin can manage inquiries" on public.contact_inquiries for update using (public.is_admin()) with check (public.is_admin());
create policy "Admin can manage media assets" on public.media_assets for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin can manage settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public can read media bucket" on storage.objects for select using (bucket_id = 'media');
create policy "Admin can upload media" on storage.objects for insert with check (bucket_id = 'media' and public.is_admin());
create policy "Admin can update media" on storage.objects for update using (bucket_id = 'media' and public.is_admin()) with check (bucket_id = 'media' and public.is_admin());
create policy "Admin can delete media" on storage.objects for delete using (bucket_id = 'media' and public.is_admin());
