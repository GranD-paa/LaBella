-- Quiz management extensions for scalable language → level → section organization

alter table public.quizzes
  add column if not exists language_slug text not null default 'italian',
  add column if not exists level_slug text not null default 'a1-1',
  add column if not exists section_slug text not null default 'quiz',
  add column if not exists status text not null default 'published';

alter table public.quizzes
  drop constraint if exists quizzes_status_check;

alter table public.quizzes
  add constraint quizzes_status_check
  check (status in ('draft', 'published'));

alter table public.quiz_questions
  add column if not exists question_type text not null default 'multiple_choice',
  add column if not exists expected_answer text,
  add column if not exists explanation text;

alter table public.quiz_questions
  drop constraint if exists quiz_questions_question_type_check;

alter table public.quiz_questions
  add constraint quiz_questions_question_type_check
  check (question_type in ('multiple_choice', 'written'));

create index if not exists quizzes_language_level_section_idx
  on public.quizzes (language_slug, level_slug, section_slug);

create index if not exists quizzes_status_idx
  on public.quizzes (status);
