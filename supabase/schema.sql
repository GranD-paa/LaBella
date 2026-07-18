-- =========================================================================
-- LaBella - Supabase database schema
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
  created_at timestamptz not null default now()
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
  created_at timestamptz not null default now()
);

-- =========================================================================
-- 5. quizzes
-- =========================================================================
create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now()
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
  created_at timestamptz not null default now()
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
-- Indexes on foreign keys / common lookup columns
-- =========================================================================
create index if not exists vocabulary_lesson_id_idx on public.vocabulary (lesson_id);
create index if not exists grammar_rules_lesson_id_idx on public.grammar_rules (lesson_id);
create index if not exists quizzes_lesson_id_idx on public.quizzes (lesson_id);
create index if not exists quiz_questions_quiz_id_idx on public.quiz_questions (quiz_id);
create index if not exists user_quiz_attempts_user_id_idx on public.user_quiz_attempts (user_id);
create index if not exists user_quiz_attempts_quiz_id_idx on public.user_quiz_attempts (quiz_id);
create index if not exists lessons_order_number_idx on public.lessons (order_number);

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

alter table public.profiles force row level security;
alter table public.lessons force row level security;
alter table public.vocabulary force row level security;
alter table public.grammar_rules force row level security;
alter table public.quizzes force row level security;
alter table public.quiz_questions force row level security;
alter table public.user_quiz_attempts force row level security;

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
