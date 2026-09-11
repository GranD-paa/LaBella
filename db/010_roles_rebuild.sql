-- =========================================================================
-- 010: the role tiers, rebuilt
-- =========================================================================
-- The old tiers (`content_manager`, `quiz_manager`, `limited_admin`) were
-- three names for "an admin who may edit some content", never wired to
-- anything a person actually does here. They are replaced by tiers that match
-- the jobs on this platform:
--
--   super_admin  unchanged — everything, including who holds which role.
--   head_admin   watches the admin tier: may suspend an account and may
--                decide what the admin role is allowed to do, but may never
--                move an account between roles.
--   admin        customer support. Answers questions and tickets. Cannot
--                suspend anybody — being locked out is an oversight call.
--   teacher      uploads and removes content, but only for the languages
--                assigned to them.
--   writer       the blog, and nothing else.
--   learner      a signed-up account with no admin access. Whether it is a
--                paying account is answered by `subscriptions`, not by a role.
--
-- Two new things back that up:
--
--   * `profiles.assigned_languages` — the teacher's scope.
--   * `role_permission_overrides` — what a head admin changed about the admin
--     role, stored so the change survives a deploy. Escalating permissions
--     are refused in application code (`LOCKED_PERMISSIONS`) and the check
--     constraint below keeps the obvious ones out of the table too.
--
-- Additive and idempotent, like the migrations before it. Run after 009.
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. Migrate accounts off the retired tiers
--
-- Runs before the constraint is swapped, so no existing row can fail it.
-- A content or quiz manager was a person who edited lessons and quizzes —
-- that is a teacher now, and the assignment below gives them every language
-- so nobody loses access they had this morning. A super admin narrows that
-- later from the panel.
-- -------------------------------------------------------------------------
alter table public.profiles
  add column if not exists assigned_languages text[] not null default '{}';

comment on column public.profiles.assigned_languages is
  'Languages a language-scoped role (teacher) may edit. Empty grants nothing.';

update public.profiles
set assigned_languages = array['italian', 'english', 'german', 'turkish']
where role in ('content_manager', 'quiz_manager', 'limited_admin')
  and cardinality(assigned_languages) = 0;

update public.profiles
set role = 'teacher'
where role in ('content_manager', 'quiz_manager', 'limited_admin');

-- -------------------------------------------------------------------------
-- 2. The new set of roles
-- -------------------------------------------------------------------------
alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in (
    'learner',
    'writer',
    'teacher',
    'admin',
    'head_admin',
    'super_admin'
  ));

-- A language scope is only meaningful for the roles that are scoped by one.
-- Keeping it empty elsewhere means a demoted teacher cannot carry a stale
-- grant back up with them if they are ever promoted again.
update public.profiles
set assigned_languages = '{}'
where role <> 'teacher' and cardinality(assigned_languages) > 0;

alter table public.profiles
  drop constraint if exists profiles_assigned_languages_check;

alter table public.profiles
  add constraint profiles_assigned_languages_check
  check (
    assigned_languages <@ array['italian', 'english', 'german', 'turkish']
  );

-- -------------------------------------------------------------------------
-- 3. role_permission_overrides — what the head admin changed
--
-- One row per editable role. The payload is a JSON object of permission key
-- to boolean; keys the application does not know about are ignored on read,
-- so an old row can never grant a permission that has since been renamed.
-- -------------------------------------------------------------------------
create table if not exists public.role_permission_overrides (
  role_slug text primary key,
  permissions jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by text references "user" (id) on delete set null,
  constraint role_permission_overrides_role_check
    check (role_slug in ('admin')),
  -- Defense in depth behind `LOCKED_PERMISSIONS`: even a direct SQL write
  -- cannot park an escalating permission in here for the app to read back.
  constraint role_permission_overrides_no_escalation
    check (
      not (permissions ? 'fullAccess')
      and not (permissions ? 'manageRoles')
      and not (permissions ? 'manageAdminPermissions')
      and not (permissions ? 'suspendUsers')
      and not (permissions ? 'manageBilling')
      and not (permissions ? 'manageSubscriptions')
    )
);

comment on table public.role_permission_overrides is
  'Head-admin edits to what an editable role may do. Merged over the defaults in lib/permissions/roles.ts.';

-- No RLS policy, for the same reason 003 dropped one: the app connects as a
-- single role, so the only gate that means anything is the head-admin guard in
-- lib/auth/action-guards.ts, which every write to this table passes through.

-- -------------------------------------------------------------------------
-- 4. lessons.language_slug — the teacher's scope, made checkable
--
-- Lessons were keyed by `order_number` alone. In practice each language
-- already owns its own numbers — only Italian ships static levels, and every
-- level added from the panel takes the next number free across the whole
-- platform — so no two languages share a lesson row today. What was missing is
-- a way to *ask* a lesson which language it belongs to, which is precisely
-- what gating a teacher on their assigned languages needs.
--
-- The column is therefore recorded, not yet used for lookups: every existing
-- query still resolves a lesson by `order_number` and behaves exactly as it
-- did before. Nothing a learner sees moves.
-- -------------------------------------------------------------------------
alter table public.lessons
  add column if not exists language_slug text not null default 'italian';

alter table public.lessons
  drop constraint if exists lessons_language_check;

alter table public.lessons
  add constraint lessons_language_check
  check (language_slug in ('italian', 'english', 'german', 'turkish'));

-- Levels added from the Language Management page carry their language on the
-- override row, and their lesson took that override's order number. Anything
-- with no such override is one of Italian's static levels, which is what the
-- column default already says.
update public.lessons l
set language_slug = o.language_slug
from public.curriculum_level_overrides o
where o.is_custom
  and o.order_number = l.order_number
  and l.language_slug <> o.language_slug;

create index if not exists lessons_language_order_idx
  on public.lessons (language_slug, order_number);

-- -------------------------------------------------------------------------
-- 5. Gifted subscriptions
--
-- A super admin can put a learner on a plan without a payment. The attribution
-- is recorded for the admin side only: `granted_by` names who gave it, and
-- nothing on the learner's own subscription card reads these columns, so the
-- recipient sees an ordinary subscription.
-- -------------------------------------------------------------------------
alter table public.subscriptions
  add column if not exists granted_by text references "user" (id) on delete set null,
  add column if not exists granted_at timestamptz,
  add column if not exists grant_note text;

comment on column public.subscriptions.granted_by is
  'The admin who gifted this subscription. Admin-facing only — never shown to the subscriber.';

create index if not exists subscriptions_granted_by_idx
  on public.subscriptions (granted_by)
  where granted_by is not null;

-- The audit timeline needs a word for it, or `grant_subscription` below fails
-- its own insert.
alter table public.subscription_events
  drop constraint if exists subscription_events_type_check;

alter table public.subscription_events
  add constraint subscription_events_type_check check (type in (
    'created', 'renewed', 'payment_failed', 'past_due',
    'canceled', 'expired', 'reactivated', 'refunded', 'plan_changed',
    'granted'
  ));

-- -------------------------------------------------------------------------
-- 6. grant_subscription — the gift, atomically
--
-- Mirrors what `settle_payment` does for a paid subscription, minus the money:
-- no payment row is written, so gifted access never shows up as revenue in the
-- accounting dashboard.
-- -------------------------------------------------------------------------
create or replace function public.grant_subscription(
  p_user_id text,
  p_plan_slug text,
  p_language_slug text,
  p_period_months integer,
  p_granted_by text,
  p_note text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_now timestamptz := now();
  v_anchor integer := extract(day from now())::integer;
  v_existing public.subscriptions%rowtype;
  v_id uuid;
begin
  if p_period_months is null or p_period_months < 1 then
    raise exception 'period_months must be at least 1';
  end if;

  if not exists (
    select 1 from public.subscription_tiers where plan_slug = p_plan_slug
  ) then
    raise exception 'unknown plan %', p_plan_slug;
  end if;

  -- One live subscription per language: extend the existing one rather than
  -- colliding with the partial unique index guarding that rule.
  select * into v_existing
  from public.subscriptions
  where user_id = p_user_id
    and language_slug = p_language_slug
    and status in ('active', 'past_due')
  limit 1;

  if found then
    update public.subscriptions
    set plan_slug = p_plan_slug,
        status = 'active',
        current_period_end = greatest(current_period_end, v_now)
          + make_interval(months => p_period_months),
        period_months = p_period_months,
        cancel_at_period_end = false,
        granted_by = p_granted_by,
        granted_at = v_now,
        grant_note = p_note,
        updated_at = v_now
    where id = v_existing.id
    returning id into v_id;
  else
    insert into public.subscriptions (
      user_id, plan_slug, language_slug, status,
      current_period_start, current_period_end,
      anchor_day, period_months,
      granted_by, granted_at, grant_note
    ) values (
      p_user_id, p_plan_slug, p_language_slug, 'active',
      v_now, v_now + make_interval(months => p_period_months),
      v_anchor, p_period_months,
      p_granted_by, v_now, p_note
    )
    returning id into v_id;
  end if;

  insert into public.subscription_events (subscription_id, user_id, type, payload)
  values (
    v_id,
    p_user_id,
    'granted',
    jsonb_build_object(
      'plan_slug', p_plan_slug,
      'granted_by', p_granted_by,
      'period_months', p_period_months,
      'note', p_note
    )
  );

  return v_id;
end;
$$;

comment on function public.grant_subscription is
  'Gifts a subscription with no payment attached. Super-admin only, enforced in the server action.';
