-- =========================================================================
-- LaParla - Supabase database schema
-- =========================================================================
-- Run this in the Supabase SQL editor (or via `supabase db push` / migrations)
-- on a fresh project. Safe to re-run thanks to IF NOT EXISTS / OR REPLACE.
-- =========================================================================

create extension if not exists pgcrypto;

-- Private schema for security-definer helper functions. Never expose this
-- schema via the Data API (Project Settings > API > Exposed schemas).
create schema if not exists private;

-- =========================================================================
-- 1. profiles
-- =========================================================================
-- One row per auth.users row. Created automatically by the
-- handle_new_user() trigger below whenever a new user signs up.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  email text,
  is_admin boolean not null default false,
  role text not null default 'learner',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  constraint profiles_role_check check (role in (
    'learner',
    'limited_admin',
    'quiz_manager',
    'content_manager',
    'admin',
    'super_admin'
  )),
  constraint profiles_status_check check (status in ('active', 'suspended'))
);

comment on table public.profiles is 'Public profile data for each authenticated user.';

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_status_idx on public.profiles (status);

-- =========================================================================
-- 2. lessons
-- =========================================================================
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  order_number integer not null default 0,
  created_at timestamptz not null default now()
);

-- =========================================================================
-- 3. vocabulary
-- =========================================================================
create table if not exists public.vocabulary (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  word text not null,
  translation text not null,
  image_url text,
  example_sentence text,
  pronunciation text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  constraint vocabulary_status_check check (status in ('draft', 'published'))
);

-- =========================================================================
-- 4. grammar_rules
-- =========================================================================
create table if not exists public.grammar_rules (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  title text not null,
  description text,
  example text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  constraint grammar_rules_status_check check (status in ('draft', 'published'))
);

-- =========================================================================
-- 5. quizzes
-- =========================================================================
create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  title text not null,
  language_slug text not null default 'italian',
  level_slug text not null default 'a1-1',
  section_slug text not null default 'quiz',
  status text not null default 'published',
  created_at timestamptz not null default now(),
  constraint quizzes_status_check check (status in ('draft', 'published'))
);

-- =========================================================================
-- 6. quiz_questions
-- =========================================================================
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes (id) on delete cascade,
  question_text text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_option text not null check (correct_option in ('a', 'b', 'c', 'd')),
  question_type text not null default 'multiple_choice',
  expected_answer text,
  explanation text,
  created_at timestamptz not null default now(),
  constraint quiz_questions_question_type_check check (question_type in ('multiple_choice', 'written'))
);

-- =========================================================================
-- 7. user_quiz_attempts
-- =========================================================================
create table if not exists public.user_quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  quiz_id uuid not null references public.quizzes (id) on delete cascade,
  score integer not null default 0,
  answers_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- =========================================================================
-- 8. video_lessons
-- =========================================================================
create table if not exists public.video_lessons (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  language_slug text not null default 'italian',
  level_slug text not null default 'a1-1',
  title text not null,
  description text,
  video_url text not null,
  thumbnail_url text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  constraint video_lessons_status_check check (status in ('draft', 'published'))
);

-- =========================================================================
-- 9. user_learning_state
-- =========================================================================
-- One row per learner: their last active language, level, lesson, and
-- section. Used to resume the course automatically right after login.
create table if not exists public.user_learning_state (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  language_slug text not null,
  level_slug text,
  lesson_id uuid references public.lessons (id) on delete set null,
  section_slug text,
  updated_at timestamptz not null default now(),
  constraint user_learning_state_section_check check (
    section_slug is null
    or section_slug in ('grammar', 'vocabulary', 'visual', 'quiz')
  )
);

comment on table public.user_learning_state is
  'Tracks each learner''s last active language/level/lesson/section so navigation can resume it after login.';

-- =========================================================================
-- 10. language_settings
-- =========================================================================
-- Super-admin controlled overrides for whether a language (beyond the
-- default Italian course) is "coming soon" or fully active/open to
-- learners. Missing rows fall back to the static default in
-- `lib/curriculum/languages.ts` (currently only Italian is active).
create table if not exists public.language_settings (
  language_slug text primary key,
  enabled boolean not null default false,
  updated_at timestamptz not null default now()
);

comment on table public.language_settings is
  'Super-admin toggles for opening additional language courses (e.g. German, Turkish, English) from "coming soon" to active.';

-- =========================================================================
-- 11. curriculum_level_overrides
-- =========================================================================
-- Super-admin customization of a language's curriculum structure: renaming
-- a default level's title/description (is_custom = false), or adding a
-- brand-new level for a later CEFR stage such as A2/B1/B2 (is_custom =
-- true). Missing rows simply mean "use the static default" from
-- `lib/curriculum/{italian,english,german,turkish}.ts`.
create table if not exists public.curriculum_level_overrides (
  id uuid primary key default gen_random_uuid(),
  language_slug text not null,
  slug text not null,
  code text not null,
  title text not null,
  description text not null default '',
  order_number integer not null,
  is_custom boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (language_slug, slug)
);

comment on table public.curriculum_level_overrides is
  'Super-admin renames of default curriculum levels and brand-new levels (e.g. A2/B1/B2) added per language.';

-- =========================================================================
-- 12. banners
-- =========================================================================
-- Super-admin managed promotional slides shown in the carousel at the top
-- of the learner Main Menu. `image_url` points at a file in the public
-- `banners` Storage bucket (see policies below). `link_href` is optional —
-- when set, clicking the slide navigates there.
create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  title text,
  link_href text,
  order_number integer not null default 0,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  constraint banners_status_check check (status in ('draft', 'published'))
);

comment on table public.banners is
  'Super-admin managed promotional banners shown in the Main Menu carousel.';

-- =========================================================================
-- Indexes on foreign keys / common lookup columns
-- =========================================================================
create index if not exists vocabulary_lesson_id_idx on public.vocabulary (lesson_id);
create index if not exists grammar_rules_lesson_id_idx on public.grammar_rules (lesson_id);
create index if not exists quizzes_lesson_id_idx on public.quizzes (lesson_id);
create index if not exists quiz_questions_quiz_id_idx on public.quiz_questions (quiz_id);
create index if not exists user_quiz_attempts_user_id_idx on public.user_quiz_attempts (user_id);
create index if not exists user_quiz_attempts_quiz_id_idx on public.user_quiz_attempts (quiz_id);
create unique index if not exists user_quiz_attempts_user_quiz_unique on public.user_quiz_attempts (user_id, quiz_id);
create index if not exists lessons_order_number_idx on public.lessons (order_number);
create index if not exists user_learning_state_language_idx on public.user_learning_state (language_slug);
create index if not exists video_lessons_lesson_id_idx on public.video_lessons (lesson_id);
create index if not exists grammar_rules_status_idx on public.grammar_rules (status);
create index if not exists vocabulary_status_idx on public.vocabulary (status);
create index if not exists quizzes_language_level_section_idx on public.quizzes (language_slug, level_slug, section_slug);
create index if not exists quizzes_status_idx on public.quizzes (status);
create index if not exists banners_status_order_idx on public.banners (status, order_number);

-- =========================================================================
-- Row Level Security
-- =========================================================================
alter table public.profiles enable row level security;
alter table public.lessons enable row level security;
alter table public.vocabulary enable row level security;
alter table public.grammar_rules enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.user_quiz_attempts enable row level security;
alter table public.video_lessons enable row level security;
alter table public.user_learning_state enable row level security;
alter table public.language_settings enable row level security;
alter table public.curriculum_level_overrides enable row level security;
alter table public.banners enable row level security;

alter table public.profiles force row level security;
alter table public.lessons force row level security;
alter table public.vocabulary force row level security;
alter table public.grammar_rules force row level security;
alter table public.quizzes force row level security;
alter table public.quiz_questions force row level security;
alter table public.user_quiz_attempts force row level security;
alter table public.video_lessons force row level security;
alter table public.user_learning_state force row level security;
alter table public.language_settings force row level security;
alter table public.curriculum_level_overrides force row level security;
alter table public.banners force row level security;

-- -------------------------------------------------------------------------
-- Helper: private.is_admin() — security definer so it can read
-- profiles.is_admin without RLS recursion. Lives in the `private` schema
-- (never exposed via the Data API) per Supabase security best practices.
-- -------------------------------------------------------------------------
create or replace function private.is_admin()
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select coalesce(
    (select p.is_admin from public.profiles p where p.id = (select auth.uid())),
    false
  );
$$;

-- -------------------------------------------------------------------------
-- profiles policies
-- -------------------------------------------------------------------------
drop policy if exists "Profiles are viewable by owner or admin" on public.profiles;
create policy "Profiles are viewable by owner or admin"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id or private.is_admin());

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Admins can manage all profiles" on public.profiles;
create policy "Admins can manage all profiles"
  on public.profiles for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- Defense in depth: the "Users can update own profile" policy above lets a
-- user update their own row, but must never let them flip their own
-- is_admin flag, grant themselves a privileged role, or lift their own
-- suspension. Silently revert those columns unless the caller is already
-- an admin.
create or replace function private.protect_profile_privileged_fields()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    if new.is_admin is distinct from old.is_admin then
      new.is_admin := old.is_admin;
    end if;
    if new.role is distinct from old.role then
      new.role := old.role;
    end if;
    if new.status is distinct from old.status then
      new.status := old.status;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_privileged_fields on public.profiles;
create trigger protect_profile_privileged_fields
  before update on public.profiles
  for each row
  execute function private.protect_profile_privileged_fields();

-- -------------------------------------------------------------------------
-- Course content policies (lessons, vocabulary, grammar_rules, quizzes,
-- quiz_questions): readable by any signed-in learner, writable by admins.
-- -------------------------------------------------------------------------
drop policy if exists "Lessons are viewable by authenticated users" on public.lessons;
create policy "Lessons are viewable by authenticated users"
  on public.lessons for select
  to authenticated
  using (true);

drop policy if exists "Admins can manage lessons" on public.lessons;
create policy "Admins can manage lessons"
  on public.lessons for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

drop policy if exists "Vocabulary is viewable by authenticated users" on public.vocabulary;
create policy "Vocabulary is viewable by authenticated users"
  on public.vocabulary for select
  to authenticated
  using (true);

drop policy if exists "Admins can manage vocabulary" on public.vocabulary;
create policy "Admins can manage vocabulary"
  on public.vocabulary for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

drop policy if exists "Grammar rules are viewable by authenticated users" on public.grammar_rules;
create policy "Grammar rules are viewable by authenticated users"
  on public.grammar_rules for select
  to authenticated
  using (true);

drop policy if exists "Admins can manage grammar rules" on public.grammar_rules;
create policy "Admins can manage grammar rules"
  on public.grammar_rules for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

drop policy if exists "Quizzes are viewable by authenticated users" on public.quizzes;
create policy "Quizzes are viewable by authenticated users"
  on public.quizzes for select
  to authenticated
  using (true);

drop policy if exists "Admins can manage quizzes" on public.quizzes;
create policy "Admins can manage quizzes"
  on public.quizzes for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

drop policy if exists "Quiz questions are viewable by authenticated users" on public.quiz_questions;
create policy "Quiz questions are viewable by authenticated users"
  on public.quiz_questions for select
  to authenticated
  using (true);

drop policy if exists "Admins can manage quiz questions" on public.quiz_questions;
create policy "Admins can manage quiz questions"
  on public.quiz_questions for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- -------------------------------------------------------------------------
-- user_quiz_attempts policies: users only see/insert their own attempts;
-- admins can see everything for grading/analytics.
-- -------------------------------------------------------------------------
drop policy if exists "Users can view own quiz attempts" on public.user_quiz_attempts;
create policy "Users can view own quiz attempts"
  on public.user_quiz_attempts for select
  to authenticated
  using ((select auth.uid()) = user_id or private.is_admin());

drop policy if exists "Users can insert own quiz attempts" on public.user_quiz_attempts;
create policy "Users can insert own quiz attempts"
  on public.user_quiz_attempts for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Admins can manage all quiz attempts" on public.user_quiz_attempts;
create policy "Admins can manage all quiz attempts"
  on public.user_quiz_attempts for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- -------------------------------------------------------------------------
-- video_lessons policies: learners can only see published videos; admins
-- can see and manage everything (including drafts).
-- -------------------------------------------------------------------------
drop policy if exists "Video lessons viewable by authenticated" on public.video_lessons;
create policy "Video lessons viewable by authenticated"
  on public.video_lessons for select
  to authenticated
  using (status = 'published' or private.is_admin());

drop policy if exists "Admins can manage video lessons" on public.video_lessons;
create policy "Admins can manage video lessons"
  on public.video_lessons for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- -------------------------------------------------------------------------
-- user_learning_state policies: users only see/write their own resume
-- position; admins can see everything for support/analytics.
-- -------------------------------------------------------------------------
drop policy if exists "Users can view own learning state" on public.user_learning_state;
create policy "Users can view own learning state"
  on public.user_learning_state for select
  to authenticated
  using ((select auth.uid()) = user_id or private.is_admin());

drop policy if exists "Users can insert own learning state" on public.user_learning_state;
create policy "Users can insert own learning state"
  on public.user_learning_state for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own learning state" on public.user_learning_state;
create policy "Users can update own learning state"
  on public.user_learning_state for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Admins can manage all learning state" on public.user_learning_state;
create policy "Admins can manage all learning state"
  on public.user_learning_state for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- -------------------------------------------------------------------------
-- language_settings policies: any signed-in learner can read the current
-- toggles (needed to render the menu/learn pages), but only admins can
-- change them.
-- -------------------------------------------------------------------------
drop policy if exists "Language settings are viewable by authenticated users" on public.language_settings;
create policy "Language settings are viewable by authenticated users"
  on public.language_settings for select
  to authenticated
  using (true);

drop policy if exists "Admins can manage language settings" on public.language_settings;
create policy "Admins can manage language settings"
  on public.language_settings for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- -------------------------------------------------------------------------
-- curriculum_level_overrides policies: any signed-in learner can read the
-- current curriculum structure (needed to render /learn pages), but only
-- admins can add or rename levels. The super-admin-only restriction for
-- *creating/deleting* levels is enforced in the server action layer.
-- -------------------------------------------------------------------------
drop policy if exists "Curriculum level overrides are viewable by authenticated users" on public.curriculum_level_overrides;
create policy "Curriculum level overrides are viewable by authenticated users"
  on public.curriculum_level_overrides for select
  to authenticated
  using (true);

drop policy if exists "Admins can manage curriculum level overrides" on public.curriculum_level_overrides;
create policy "Admins can manage curriculum level overrides"
  on public.curriculum_level_overrides for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- -------------------------------------------------------------------------
-- banners policies: learners only see published slides; admins can see and
-- manage everything (including drafts). Restricting who may create/delete
-- to super admins specifically is enforced in the server action layer, the
-- same pattern used for curriculum_level_overrides above.
-- -------------------------------------------------------------------------
drop policy if exists "Banners viewable by authenticated" on public.banners;
create policy "Banners viewable by authenticated"
  on public.banners for select
  to authenticated
  using (status = 'published' or private.is_admin());

drop policy if exists "Admins can manage banners" on public.banners;
create policy "Admins can manage banners"
  on public.banners for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- Swaps two banners' order_number atomically in one transaction — doing
-- this as two separate client-side updates risks leaving the order
-- inconsistent if the second update fails after the first succeeds (e.g. a
-- dropped connection mid-reorder).
create or replace function public.swap_banner_order(banner_id_a uuid, banner_id_b uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  order_a integer;
  order_b integer;
begin
  if not private.is_admin() then
    raise exception 'forbidden';
  end if;

  select order_number into order_a from public.banners where id = banner_id_a;
  select order_number into order_b from public.banners where id = banner_id_b;

  if order_a is null or order_b is null then
    raise exception 'banner not found';
  end if;

  update public.banners set order_number = order_b where id = banner_id_a;
  update public.banners set order_number = order_a where id = banner_id_b;
end;
$$;

grant execute on function public.swap_banner_order(uuid, uuid) to authenticated;

-- -------------------------------------------------------------------------
-- Storage: a public bucket for banner images. Public buckets serve files
-- straight from the CDN URL with no RLS check, so read access needs no
-- policy here — only the write side (upload/replace/remove) is restricted
-- to admins.
-- -------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('banners', 'banners', true)
on conflict (id) do nothing;

-- The public-read comment above covers fetching files by their CDN URL.
-- Admin-side operations (list, replace, remove) go through the Storage API
-- instead, which needs to SELECT a row before it can update/delete it —
-- without this policy, RLS silently hides every row from that lookup and
-- update/remove calls succeed while affecting zero rows.
drop policy if exists "Admins can view banner image objects" on storage.objects;
create policy "Admins can view banner image objects"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'banners' and private.is_admin());

drop policy if exists "Admins can upload banner images" on storage.objects;
create policy "Admins can upload banner images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'banners' and private.is_admin());

drop policy if exists "Admins can update banner images" on storage.objects;
create policy "Admins can update banner images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'banners' and private.is_admin())
  with check (bucket_id = 'banners' and private.is_admin());

drop policy if exists "Admins can delete banner images" on storage.objects;
create policy "Admins can delete banner images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'banners' and private.is_admin());

-- =========================================================================
-- Trigger: automatically create a profile row when a new auth user signs up
-- =========================================================================
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url',
    new.email
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function private.handle_new_user();
