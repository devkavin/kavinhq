# Kavin HQ

Minimal, premium personal brand and business portfolio website for Kavin HQ.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components
- Supabase PostgreSQL, Auth, and Storage
- React Hook Form
- Zod
- Framer Motion dependency available for subtle transitions

## Local Setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in Supabase values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=kavindra.senanayake@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The app uses local seed data when Supabase variables are not configured, so `npm run build` can pass before the database is connected.

## Supabase

Run the SQL migration in `supabase/migrations/20260603180000_initial_schema.sql`, then run `supabase/seed.sql`.

The migration creates:

- `projects`
- `notes`
- `services`
- `testimonials`
- `contact_inquiries`
- `media_assets`
- `site_settings`
- Public `media` storage bucket
- RLS policies for public published reads, public contact inserts, and admin-only writes

Admin access is limited by Supabase Auth email:

```text
kavindra.senanayake@gmail.com
```

## Admin

Visit `/admin` after signing in with Supabase Auth as the configured admin email. The dashboard includes management areas for projects, notes, services, testimonials, contact inquiries, media, and settings.

Media uploads use Supabase Storage bucket `media`. Uploaded image URLs should be stored in the related content records.

## Deployment To Vercel

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the environment variables from `.env.example`.
4. Run the Supabase migration and seed SQL.
5. Deploy.

## Build

```bash
npm run build
```
