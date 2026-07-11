# LaBella — Deployment Guide

This folder contains reference files and instructions for deploying LaBella to production (Vercel recommended).

## App identity (PWA)

| Property | Value |
|----------|-------|
| **Name** | LaBella |
| **Theme color** | `#18181b` |
| **Background color** | `#ffffff` |
| **Start URL** | `/dashboard` |
| **Display mode** | `standalone` |

PWA assets live in the project root:

- `public/manifest.json` — Web App Manifest (Android “Add to Home Screen”)
- `public/service-worker.js` — Basic offline/cache support
- `public/icons/` — Placeholder SVG icons (192, 512, maskable)

The service worker registers automatically in production via `components/pwa/service-worker-register.tsx`.

## Prerequisites

1. A [Supabase](https://supabase.com) project with the schema from `supabase/schema.sql` applied
2. A [Vercel](https://vercel.com) account (or any Node.js host that supports Next.js 14)
3. Node.js 18+ locally

## Environment variables

Copy `.env.example` to `.env.local` in the project root:

```bash
cp final-deployment/.env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |

> Never commit `.env.local` or expose the Supabase **service role** key in the browser.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm run start
```

Verify the production build succeeds before deploying.

## Deploy to Vercel

1. Push the repository to GitHub/GitLab/Bitbucket
2. Import the project in Vercel
3. Set environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Deploy — Vercel detects Next.js automatically

The root `vercel.json` configures service-worker headers for PWA support.

### Post-deploy checklist

- [ ] Sign up / sign in works against production Supabase
- [ ] Dashboard loads lessons
- [ ] Lesson pages show vocabulary, grammar, and quiz tabs
- [ ] Quiz submission saves to `user_quiz_attempts`
- [ ] Profile page shows quiz history
- [ ] On Android Chrome: **Menu → Add to Home screen** installs the PWA
- [ ] `/pricing` subscription cards show the “coming soon” toast

## Supabase production notes

1. Run `supabase/schema.sql` in the SQL editor
2. Ensure the `private` schema is **not** exposed via the Data API
3. Set **Authentication → URL Configuration** redirect URLs to include your Vercel domain
4. Promote a user to admin: `UPDATE profiles SET is_admin = true WHERE id = '<user-uuid>';`

## Performance

- Next.js App Router with server components for data fetching
- Route-level `loading.tsx` skeletons on all data pages
- Image optimization via `next/image` with remote patterns configured
- Gzip compression enabled in `next.config.mjs`

## File map

```
public/
  manifest.json          # PWA manifest
  service-worker.js      # Offline shell caching
  icons/                 # App icons
final-deployment/
  DEPLOYMENT.md          # This guide
  manifest.json          # Reference copy of manifest
  vercel.json            # Reference Vercel config
  .env.example           # Environment template
vercel.json              # Active Vercel config (project root)
next.config.mjs          # Next.js production settings
```
