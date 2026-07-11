# LaBella

A full-stack language-learning Progressive Web App built with **Next.js 14** (App Router), **Tailwind CSS**, **shadcn/ui**, and **Supabase** (Postgres + Auth + Row Level Security).

Learners browse lessons, study vocabulary flashcards, read grammar rules, take quizzes, and track their progress. Admins manage all course content through a protected admin panel.

## Features

- **Authentication** — Email/password sign-up and sign-in via Supabase Auth
- **Dashboard** — Browse all lessons ordered by sequence
- **Lesson pages** — Vocabulary, grammar, and quiz tabs per lesson
- **Quizzes** — Multiple-choice quizzes with score tracking (one attempt per quiz)
- **Profile** — User info and complete quiz attempt history
- **Admin panel** — CRUD for lessons, vocabulary, grammar rules, and quizzes
- **Pricing page** — Subscription UI (payment integration placeholder)
- **PWA** — Installable on Android via Chrome “Add to Home Screen”
- **Loading skeletons** — Shadcn/ui skeletons on all data-fetching routes

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router, TypeScript) |
| UI | Tailwind CSS + shadcn/ui (Radix primitives) |
| Backend | Supabase (Postgres, Auth, RLS) |
| Forms | react-hook-form + zod |
| Notifications | sonner |
| Deployment | Vercel (recommended) |

## Environment variables

Create a `.env.local` file in the project root (see `final-deployment/.env.example`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public API key |

> Never expose the Supabase **service role** key in client-side code.

## Run locally

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (see above)
cp final-deployment/.env.example .env.local

# 3. Apply database schema in Supabase SQL editor
#    Run the contents of supabase/schema.sql

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push the repo to GitHub/GitLab/Bitbucket
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Project Settings
4. Deploy

See [`final-deployment/DEPLOYMENT.md`](./final-deployment/DEPLOYMENT.md) for the full deployment checklist, PWA details, and Supabase production setup.

## Project structure

```
app/
  (auth)/            # Login & sign-up pages
  actions/           # Server Actions (auth, quiz submission)
  admin/             # Admin panel + CRUD actions
  dashboard/         # Learner dashboard (lesson list)
  lesson/[id]/       # Lesson detail with tabs
  quiz/[quiz_id]/    # Quiz taking page
  profile/           # User profile & quiz history
  pricing/           # Subscription plans (UI only)
  page.tsx           # Public landing page
components/
  admin/             # Admin CRUD components
  auth/              # Auth forms
  dashboard/         # User navigation
  layout/            # Shared app shell
  lessons/           # Lesson cards, flashcards, tabs
  pricing/           # Subscription cards
  profile/           # Quiz history table
  pwa/               # Service worker registration
  quiz/              # Quiz form
  skeletons/         # Loading skeleton components
  ui/                # shadcn/ui primitives
lib/
  supabase/          # Supabase clients & middleware
  validations/       # Zod schemas
  revalidate-paths.ts # Cache revalidation helper
public/
  manifest.json      # PWA manifest
  service-worker.js  # Offline caching
  icons/             # App icons
final-deployment/    # Deployment reference files
supabase/
  schema.sql         # Database schema, RLS, triggers
types/
  database.types.ts  # TypeScript types for Supabase tables
```

## PWA (Progressive Web App)

LaBella can be installed on Android devices:

1. Open the app in Chrome
2. Tap the menu (⋮) → **Add to Home screen**

PWA configuration:

- **Name:** LaBella
- **Theme color:** `#18181b`
- **Background color:** `#ffffff`
- **Manifest:** `public/manifest.json`
- **Service worker:** `public/service-worker.js` (registers in production only)

## Database setup

Run [`supabase/schema.sql`](./supabase/schema.sql) in your Supabase SQL editor. This creates:

- Tables: `profiles`, `lessons`, `vocabulary`, `grammar_rules`, `quizzes`, `quiz_questions`, `user_quiz_attempts`
- Row Level Security policies for all tables
- Auto-profile creation trigger on sign-up

After running the script, ensure the `private` schema is **not** listed under **Project Settings → API → Exposed schemas**.

To promote a user to admin:

```sql
UPDATE profiles SET is_admin = true WHERE id = '<user-uuid>';
```

## Notes

- `middleware.ts` refreshes the Supabase session and protects routes (public: `/`, `/login`, `/sign-up`, `/pricing`)
- Admin mutations call `revalidateAppContent()` to refresh dashboard, lesson, and profile pages
- Quiz submissions are blocked server-side if the user already has an attempt
- If email confirmation is enabled in Supabase, new sign-ups must confirm their email before signing in
- Regenerate types from your live Supabase project:

  ```bash
  npx supabase gen types typescript --project-id <project-id> > types/database.types.ts
  ```

## License

Private project — all rights reserved.
