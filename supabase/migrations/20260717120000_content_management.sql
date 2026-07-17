-- Content management extensions: draft/publish status and video lessons

alter table public.grammar_rules
  add column if not exists status text not null default 'draft';

alter table public.vocabulary
  add column if not exists pronunciation text,
  add column if not exists status text not null default 'draft';

alter table public.grammar_rules
  drop constraint if exists grammar_rules_status_check;

alter table public.grammar_rules
  add constraint grammar_rules_status_check
  check (status in ('draft', 'published'));

alter table public.vocabulary
  drop constraint if exists vocabulary_status_check;

alter table public.vocabulary
  add constraint vocabulary_status_check
  check (status in ('draft', 'published'));

create table if not exists public.video_lessons (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
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

create index if not exists video_lessons_lesson_id_idx
  on public.video_lessons (lesson_id);

create index if not exists grammar_rules_status_idx
  on public.grammar_rules (status);

create index if not exists vocabulary_status_idx
  on public.vocabulary (status);
