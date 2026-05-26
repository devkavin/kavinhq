# Kavin HQ

Production-ready personal brand and business portfolio for `kavinhq.com`, built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style components, Supabase Auth, Supabase PostgreSQL, and Supabase Storage.

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in the values.
3. Run the app:
   ```bash
   npm run dev
   ```

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor.
3. Run `supabase/seed.sql` in the SQL editor.
4. Create the admin user in Supabase Auth with email/password:
   `kavindra.senanayake@gmail.com`
5. In Supabase SQL settings, keep the default admin email fallback or set:
   ```sql
   alter database postgres set app.admin_email = 'kavindra.senanayake@gmail.com';
   ```

## Storage

The migration creates a public bucket named `kavin-hq-media` with a 5MB limit and image MIME validation. Admin uploads go to Supabase Storage and are tracked in `media_assets`.

## Environment Variables

Required:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAIL=kavindra.senanayake@gmail.com
NEXT_PUBLIC_SITE_URL=https://kavinhq.com
```

Optional:

```bash
NEXT_PUBLIC_ENABLE_HQ_MODE=true
NEXT_PUBLIC_MAX_UPLOAD_SIZE_MB=5
```

`SUPABASE_SERVICE_ROLE_KEY` is used only in server actions and server-only helpers. Do not expose it to the browser.

## Admin

- Login route: `/auth/login`
- Dashboard: `/admin`
- Only the email in `ADMIN_EMAIL` can access admin routes.
- Non-admin authenticated users are sent to a clean access denied page.

Admin sections include projects, notes, services, testimonials, lab items, inquiries, media, and settings.

## Vercel Deployment

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the environment variables above.
4. Deploy.

Vercel does not persist local uploaded files, so all admin media uploads use Supabase Storage. Local files in `public/images` are committed starter placeholders only.

## Checks

```bash
npm run lint
npm run build
```
