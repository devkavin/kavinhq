create extension if not exists "pgcrypto";

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = lower(coalesce(current_setting('app.admin_email', true), 'kavindra.senanayake@gmail.com'));
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  summary text,
  category text,
  year text,
  role text,
  focus text,
  status text default 'draft' check (status in ('draft', 'published')),
  featured boolean default false,
  stack text[] default '{}',
  cover_image_url text,
  gallery_images jsonb default '[]'::jsonb,
  problem text,
  goal text,
  my_role text,
  tech_stack text,
  key_features jsonb default '[]'::jsonb,
  architecture_flow text,
  challenges text,
  outcome text,
  what_i_learned text,
  live_url text,
  github_url text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  category text,
  tags text[] default '{}',
  cover_image_url text,
  status text default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  read_time int,
  seo_title text,
  seo_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  short_description text,
  who_it_is_for text,
  what_is_included jsonb default '[]'::jsonb,
  deliverables jsonb default '[]'::jsonb,
  status text default 'published' check (status in ('draft', 'published')),
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role_or_company text,
  quote text not null,
  image_url text,
  status text default 'draft' check (status in ('draft', 'published')),
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.lab_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  description text,
  image_url text,
  tags text[] default '{}',
  status text default 'draft' check (status in ('draft', 'published')),
  external_url text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company_or_brand text,
  phone_or_whatsapp text,
  project_type text,
  budget_range text,
  timeline text,
  existing_website_or_social_link text,
  message text not null,
  source text,
  status text default 'new' check (status in ('new', 'reviewed', 'contacted', 'archived')),
  is_read boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_path text not null,
  public_url text,
  bucket text default 'kavin-hq-media',
  mime_type text,
  size_bytes bigint,
  alt_text text,
  created_at timestamptz default now()
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index projects_slug_idx on public.projects(slug);
create index projects_status_idx on public.projects(status);
create index projects_featured_idx on public.projects(featured);
create index projects_category_idx on public.projects(category);
create index notes_slug_idx on public.notes(slug);
create index notes_status_idx on public.notes(status);
create index notes_published_at_idx on public.notes(published_at desc);
create index notes_category_idx on public.notes(category);
create index services_status_idx on public.services(status);
create index testimonials_status_idx on public.testimonials(status);
create index lab_items_status_idx on public.lab_items(status);
create index inquiries_status_idx on public.contact_inquiries(status);
create index inquiries_read_idx on public.contact_inquiries(is_read);

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger notes_updated_at before update on public.notes for each row execute function public.set_updated_at();
create trigger services_updated_at before update on public.services for each row execute function public.set_updated_at();
create trigger testimonials_updated_at before update on public.testimonials for each row execute function public.set_updated_at();
create trigger lab_items_updated_at before update on public.lab_items for each row execute function public.set_updated_at();
create trigger inquiries_updated_at before update on public.contact_inquiries for each row execute function public.set_updated_at();
create trigger settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.notes enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.lab_items enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.media_assets enable row level security;
alter table public.site_settings enable row level security;

create policy "public read published projects" on public.projects for select using (status = 'published');
create policy "public read published notes" on public.notes for select using (status = 'published');
create policy "public read published services" on public.services for select using (status = 'published');
create policy "public read published testimonials" on public.testimonials for select using (status = 'published');
create policy "public read published lab items" on public.lab_items for select using (status = 'published');
create policy "public read public settings" on public.site_settings for select using (key in ('homepage', 'social_links', 'availability'));
create policy "public insert inquiries" on public.contact_inquiries for insert with check (
  name is not null and email is not null and message is not null and status = 'new' and is_read = false
);

create policy "admin manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage notes" on public.notes for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage lab items" on public.lab_items for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage inquiries" on public.contact_inquiries for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage media" on public.media_assets for all using (public.is_admin()) with check (public.is_admin());
create policy "admin manage settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('kavin-hq-media', 'kavin-hq-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "public read media" on storage.objects for select using (bucket_id = 'kavin-hq-media');
create policy "admin upload media" on storage.objects for insert with check (bucket_id = 'kavin-hq-media' and public.is_admin());
create policy "admin update media" on storage.objects for update using (bucket_id = 'kavin-hq-media' and public.is_admin());
create policy "admin delete media" on storage.objects for delete using (bucket_id = 'kavin-hq-media' and public.is_admin());
