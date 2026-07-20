-- =========================================================================
-- User learning state — persists each learner's last active language,
-- level, lesson, and section so the app can resume exactly where they left
-- off right after login, instead of always sending them to the Main Menu.
-- =========================================================================

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

create index if not exists user_learning_state_language_idx
  on public.user_learning_state (language_slug);

alter table public.user_learning_state enable row level security;
alter table public.user_learning_state force row level security;

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
