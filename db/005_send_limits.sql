-- =========================================================================
-- 005: send limits
--
-- Run against the ArvanCloud cluster after 004. Additive and idempotent, so
-- re-running it is safe.
--
-- Every outbound message that costs money or can be aimed at a stranger — an
-- SMS code today, an email tomorrow — is counted here before it is sent.
--
-- Why a table and not the in-memory limiter in lib/auth/rate-limit.ts: that
-- one lives in the process, so a deploy or a pod restart wipes it, and an
-- attacker only has to wait for one. A counter that protects real money has
-- to outlive the process that wrote it.
-- =========================================================================

create table if not exists public.send_attempts (
  id bigserial primary key,
  -- 'sms' or 'email'. Kept as text rather than an enum so adding a channel
  -- is a code change and not a migration.
  channel text not null,
  -- What the limit is counted against: 'phone', 'email', 'ip' or 'global'.
  scope text not null,
  -- The phone number, address or IP itself. 'global' rows use a fixed key.
  subject text not null,
  created_at timestamptz not null default now()
);

comment on table public.send_attempts is
  'One row per outbound SMS or email, used to enforce per-recipient, per-IP and global send limits. Pruned by the sweep at the bottom of this file.';

-- Every read is "how many rows for this channel+scope+subject since T", so
-- the index carries all three and puts time last.
create index if not exists send_attempts_lookup_idx
  on public.send_attempts (channel, scope, subject, created_at desc);

-- The sweep below deletes by age alone.
create index if not exists send_attempts_created_at_idx
  on public.send_attempts (created_at);

-- Old rows are deleted by the application itself, roughly once an hour — the
-- longest window any limit uses is 24 hours, so nothing here is worth keeping.
-- A plain DELETE from the app rather than a stored function: one place the
-- rule lives, and nothing to forget to re-create on a fresh database.

-- -------------------------------------------------------------------------
-- Retiring `user.region`
--
-- The column is not in any migration here: Better Auth created it from the
-- `additionalFields` declaration that used to pick a verification path. That
-- declaration is gone — every account is now proved by an SMS code to an
-- Iranian number — so nothing writes the column any more.
--
-- It is dropped rather than left behind because a `not null` column that no
-- code fills is a sign-up that fails on the first insert after deploy, and
-- the failure would look like an auth bug rather than a schema one. Existing
-- rows lose a value that no longer means anything.
-- -------------------------------------------------------------------------
alter table if exists public."user" drop column if exists region;
