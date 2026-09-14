-- =========================================================================
-- 012: the blog agent's control panel
-- =========================================================================
-- One row that the admin panel at /admin/blog/agent reads and writes, so the
-- owner can switch the agent on and off, point it at an AI service, and edit
-- its prompt without a deploy.
--
-- Additive and idempotent, like the migrations before it. Run after 011.
-- =========================================================================

create table if not exists public.blog_agent_settings (
  -- A singleton. The check below makes a second row impossible, so every
  -- read can say `where id = 1` without wondering which row is current.
  id smallint primary key default 1,

  -- Off by default. Applying this migration must not start publishing: the
  -- owner turns the agent on from the panel once the connection is tested.
  enabled boolean not null default false,
  auto_publish boolean not null default true,
  max_attempts integer not null default 3,

  -- One OpenAI-compatible service. Null columns fall back to the server's
  -- environment variables, which is how the agent ran before this table.
  api_base_url text,

  -- AES-256-GCM, sealed in lib/blog/agent/secret.ts with a key derived from
  -- BETTER_AUTH_SECRET. The plain key never leaves the server; the panel only
  -- ever sees `api_key_hint`, the key's last four characters.
  api_key_ciphertext text,
  api_key_hint text,

  writer_model text,
  -- Null: use the default image model. Empty string: covers switched off.
  image_model text,

  -- Only the sections the owner changed, keyed by section name. A missing
  -- key means "use the default in lib/blog/agent/prompts.ts", so a fix to a
  -- default still reaches every section nobody has customised.
  prompt_overrides jsonb not null default '{}'::jsonb,

  updated_at timestamptz not null default now(),
  updated_by text,

  constraint blog_agent_settings_singleton check (id = 1),
  constraint blog_agent_settings_attempts_check
    check (max_attempts between 1 and 10)
);

comment on table public.blog_agent_settings is
  'Single-row control panel for the blog agent: on/off, AI connection, prompt overrides.';

insert into public.blog_agent_settings (id)
values (1)
on conflict (id) do nothing;
