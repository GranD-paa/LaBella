-- =========================================================================
-- 011: the blog writes itself
-- =========================================================================
-- Two tables behind one idea: the blog should be able to run for a month
-- without anyone opening the admin panel.
--
--   1. `blog_topics` is the queue. A month of subjects goes in once; the
--      agent takes one per day at the scheduled hour and turns it into a
--      post. Nothing else about the schedule lives in code — change a row,
--      change what publishes.
--   2. `blog_agent_runs` is the receipt. Which model wrote it, how many
--      tokens it burned, how long it took, whether it worked. Without this
--      the only evidence a run ever happened is the post itself, and a run
--      that failed leaves no evidence at all.
--
-- Additive and idempotent, like the migrations before it. Run after 010.
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. blog_topics
--
-- The queue is a table rather than a list in a config file because three of
-- its columns change while the agent is running — `status`, `attempts`,
-- `last_error` — and because claiming the next row has to be atomic. Two
-- pods mid-deploy, or a cron that fires twice, must not both take the same
-- subject and publish it twice; `for update skip locked` against this table
-- is what makes that impossible, and that only exists in a database.
--
-- `scheduled_for` is a timestamptz, so it is stored in UTC and compared in
-- UTC no matter which timezone wrote it. The 13:00 Tehran the agent aims for
-- is 09:30 UTC — Iran is UTC+3:30 and has had no DST since 2022 — and that
-- conversion happens once, in `lib/blog/agent/schedule.ts`, not in every
-- caller's head.
-- -------------------------------------------------------------------------
create table if not exists public.blog_topics (
  id uuid primary key default gen_random_uuid(),

  -- What to write about, in the author's own words. The agent is given this
  -- verbatim; it is not a keyword, it is a brief.
  topic text not null,

  -- Optional steering: angle, audience, a fact that must appear, a source to
  -- lean on. Left null for "you decide".
  notes text,

  -- Hints, not commands. The writer proposes a category and language from
  -- the site's own lists; these override that proposal when the author has
  -- an opinion. An unknown slug is ignored the same way the editor ignores
  -- it, so a typo here costs nothing.
  category_slug text,
  language_slug text,

  -- When this subject is due. The agent takes the oldest due row, so a
  -- backlog drains in order rather than being skipped.
  scheduled_for timestamptz not null,

  -- pending  — waiting for its turn
  -- running  — claimed by a run that has not finished
  -- done     — published, `post_id` says what
  -- failed   — gave up after `attempts` tries
  -- skipped  — the author took it out of rotation by hand
  status text not null default 'pending',

  -- Per-topic model override, for comparing two models on the same subject.
  -- Null means "use the configured default", which is the normal case.
  writer_model text,
  image_model text,

  -- Set once the run succeeds. `on delete set null` because deleting a bad
  -- post should not delete the record that it was once written.
  post_id uuid references public.blog_posts (id) on delete set null,

  attempts integer not null default 0,
  last_error text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint blog_topics_status_check
    check (status in ('pending', 'running', 'done', 'failed', 'skipped'))
);

comment on table public.blog_topics is
  'Queue of subjects the blog agent turns into posts, one per scheduled slot.';

-- The claim query is the only hot read: oldest due row that is still
-- pending. Both columns, in that order, because the status narrows first.
create index if not exists blog_topics_claim_idx
  on public.blog_topics (status, scheduled_for);

-- -------------------------------------------------------------------------
-- 2. blog_agent_runs
--
-- One row per attempt, not per success. A run that died halfway through
-- still gets its row, with the error on it, which is the difference between
-- "the blog stopped publishing last Tuesday" and knowing why.
--
-- Tokens are stored rather than a price. Rates change, and a row written
-- today should still be readable next year; multiplying by the rate at read
-- time keeps history honest. `cost_toman` is filled in anyway, because the
-- author wants to compare models on value rather than on taste alone and
-- recomputing a month of runs by hand is nobody's idea of a comparison.
-- -------------------------------------------------------------------------
create table if not exists public.blog_agent_runs (
  id uuid primary key default gen_random_uuid(),

  topic_id uuid references public.blog_topics (id) on delete set null,
  post_id uuid references public.blog_posts (id) on delete set null,

  -- Which models actually ran, resolved after the override above was
  -- applied. Recorded as plain text: the bazaar's catalogue changes and a
  -- foreign key to a list that moves would block the insert, not help it.
  writer_model text,
  image_model text,

  prompt_tokens integer not null default 0,
  completion_tokens integer not null default 0,
  image_prompt_tokens integer not null default 0,
  image_completion_tokens integer not null default 0,

  -- Derived at write time from the rate table in `lib/ai/pricing.ts`.
  cost_toman numeric(14, 2) not null default 0,

  duration_ms integer,

  -- running — started, not finished (a crash leaves this behind)
  -- done    — a post exists
  -- failed  — `error` says what happened
  status text not null default 'running',
  error text,

  -- Per-step detail: what each model call cost and how long it took, so a
  -- slow run can be blamed on the right step without re-running it.
  steps jsonb not null default '[]'::jsonb,

  created_at timestamptz not null default now(),
  finished_at timestamptz,

  constraint blog_agent_runs_status_check
    check (status in ('running', 'done', 'failed'))
);

comment on table public.blog_agent_runs is
  'One row per blog-agent attempt: model, tokens, cost, duration, outcome.';

-- The admin panel lists newest first; nothing else reads this table in bulk.
create index if not exists blog_agent_runs_created_idx
  on public.blog_agent_runs (created_at desc);

-- Finding every run for one topic, for the two-model comparison.
create index if not exists blog_agent_runs_topic_idx
  on public.blog_agent_runs (topic_id);

-- -------------------------------------------------------------------------
-- 3. Keep `updated_at` honest on blog_topics
--
-- The agent writes `status` from three different places. A trigger is the
-- only way every one of them agrees about when the row last moved.
-- -------------------------------------------------------------------------
create or replace function public.touch_blog_topics_updated_at()
returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_topics_touch_updated_at on public.blog_topics;
create trigger blog_topics_touch_updated_at
  before update on public.blog_topics
  for each row execute function public.touch_blog_topics_updated_at();
