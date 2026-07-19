# Local development without Supabase

Set this in `.env.local`:

```env
NEXT_PUBLIC_DATA_SOURCE=local
```

Then run:

```powershell
npm.cmd run dev
```

## What changes

- No Supabase network requests
- Auth uses seeded local accounts via secure HTTP-only cookie session
- Lessons, quizzes, vocabulary, grammar, and progress use in-memory mock data
- Admin CRUD updates the in-memory store until the dev server restarts

## Sample accounts

| Role  | Email | Password |
|-------|-------|----------|
| Admin | `erfanmalayri@outlook.com` | `451377e451377E` |
| User  | `erfanmalayriii@gmail.com` | `451377e451377E` |

## Production mode

Remove `NEXT_PUBLIC_DATA_SOURCE=local` (or set it to `supabase`) and configure:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

The repository layer automatically switches back to Supabase.
