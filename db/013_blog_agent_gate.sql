-- ---------------------------------------------------------------------------
-- Blog agent: the reviewer's own settings.
--
-- One jsonb column rather than a column per knob. The set of checks is
-- expected to grow, and every new check would otherwise be another migration
-- run by hand against production for what is, in the end, a preferences blob
-- read in one place (`lib/blog/agent/gate-settings.ts`) and validated there.
--
-- Safe to run more than once.
-- ---------------------------------------------------------------------------

alter table public.blog_agent_settings
  add column if not exists gate jsonb not null default '{}'::jsonb;

comment on column public.blog_agent_settings.gate is
  'Reviewer settings: mode, which checks run, and each check''s threshold. '
  'An empty object means "use the defaults in lib/blog/agent/gate-settings.ts".';
