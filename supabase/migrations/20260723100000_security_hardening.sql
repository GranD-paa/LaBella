-- Security hardening: RLS for video_lessons and quiz attempt uniqueness

alter table public.video_lessons enable row level security;
alter table public.video_lessons force row level security;

create policy "Video lessons viewable by authenticated"
  on public.video_lessons
  for select
  to authenticated
  using (status = 'published' or private.is_admin());

create policy "Admins can manage video lessons"
  on public.video_lessons
  for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

create unique index if not exists user_quiz_attempts_user_quiz_unique
  on public.user_quiz_attempts (user_id, quiz_id);
