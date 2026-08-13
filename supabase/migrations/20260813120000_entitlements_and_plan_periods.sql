-- Entitlements, a fourth plan slot, and 1/3-month billing periods.
--
-- Three separate concerns, deliberately kept in three separate places:
--
--   * WHAT A TIER GRANTS lives in `subscription_tiers`, keyed by tier alone.
--     Capabilities must not be able to diverge per language — "Pro unlocks
--     grammar" being true for Italian and false for German would be a support
--     nightmare that no admin would ever notice they had caused.
--
--   * WHETHER A TIER IS SOLD lives in `subscription_plans.is_active`, which is
--     per (tier, language). That is the switch for the reserved fourth slot,
--     and it is checked in `create_pending_payment` as well as in the UI: a
--     plan hidden only in the storefront is still buyable by anyone who
--     crafts the request by hand.
--
--   * WHETHER GATING IS ENFORCED AT ALL lives in
--     `payment_settings.enforce_entitlements`, default FALSE. The gate ships
--     switched off so applying this migration cannot black out a site whose
--     payment gateway is not live yet. Turning it on is a deliberate act in
--     the admin panel.

-- =========================================================================
-- 1. subscription_tiers — what each tier unlocks
-- =========================================================================
create table if not exists public.subscription_tiers (
  plan_slug text primary key,
  -- Ordering for "everything in the tier below" comparisons and for deciding
  -- whether a plan change is an upgrade or a downgrade. Higher wins.
  tier_rank integer not null,

  -- Content gates. These map onto the learner-facing category routes in
  -- app/learn/[language]/[level]/[category]: `vocabulary`, `grammar`, and
  -- `visual` (which renders video lessons).
  unlocks_vocabulary boolean not null default true,
  unlocks_grammar boolean not null default false,
  unlocks_video boolean not null default false,

  -- The level-wide comprehensive exam (quiz section 'level-exam'), as opposed
  -- to the per-lesson quizzes, which stay free for everyone.
  unlocks_level_exam boolean not null default true,

  -- Retakes of a per-lesson quiz, beyond the one free attempt everybody gets.
  -- NULL means unlimited; 0 means no retakes.
  quiz_retake_limit integer,

  updated_at timestamptz not null default now(),
  constraint subscription_tiers_rank_check check (tier_rank >= 0),
  constraint subscription_tiers_retake_check
    check (quiz_retake_limit is null or quiz_retake_limit >= 0)
);

comment on table public.subscription_tiers is
  'What each subscription tier unlocks. Keyed by tier only, so capabilities cannot diverge between languages.';

comment on column public.subscription_tiers.quiz_retake_limit is
  'Retakes allowed beyond the first free attempt. NULL = unlimited, 0 = none.';

insert into public.subscription_tiers (
  plan_slug, tier_rank,
  unlocks_vocabulary, unlocks_grammar, unlocks_video, unlocks_level_exam,
  quiz_retake_limit
) values
  -- Basic: words with their images, plus the level exam and 3 quiz retakes.
  ('basic',    1, true, false, false, true, 3),
  -- Pro: everything in Basic plus the grammar of each lesson.
  ('pro',      2, true, true,  false, true, null),
  -- Ultimate: everything in Pro plus the video lessons.
  ('ultimate', 3, true, true,  true,  true, null),
  -- Reserved fourth slot for a future release. It grants everything, but is
  -- not sold anywhere until `subscription_plans.is_active` is switched on.
  ('elite',    4, true, true,  true,  true, null)
on conflict (plan_slug) do nothing;

alter table public.subscription_tiers enable row level security;
alter table public.subscription_tiers force row level security;

drop policy if exists "Subscription tiers viewable by authenticated" on public.subscription_tiers;
create policy "Subscription tiers viewable by authenticated"
  on public.subscription_tiers for select
  to authenticated
  using (true);

drop policy if exists "Admins can manage subscription tiers" on public.subscription_tiers;
create policy "Admins can manage subscription tiers"
  on public.subscription_tiers for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

-- =========================================================================
-- 2. subscription_plans — sale switch and the 3-month option
-- =========================================================================
alter table public.subscription_plans
  add column if not exists is_active boolean not null default true;

-- Extra discount for committing to three months at once. The 3-month list
-- price is always 3x the monthly price; this is what makes it worth buying.
alter table public.subscription_plans
  add column if not exists quarterly_enabled boolean not null default true,
  add column if not exists quarterly_discount_percent integer not null default 0;

alter table public.subscription_plans
  drop constraint if exists subscription_plans_quarterly_discount_check;
alter table public.subscription_plans
  add constraint subscription_plans_quarterly_discount_check
  check (quarterly_discount_percent >= 0 and quarterly_discount_percent <= 95);

comment on column public.subscription_plans.is_active is
  'Whether this tier is sold for this language. Enforced in create_pending_payment, not only in the UI.';

-- Seed the reserved fourth slot for every language, switched off. Copy is
-- placeholder text the admin panel replaces; price mirrors Ultimate so the
-- row is never accidentally sold for nothing.
insert into public.subscription_plans (
  plan_slug, language_slug, price_eur, discount_percent,
  title, description, features, order_number, is_active
)
select
  'elite',
  language_slug,
  price_eur + 2,
  0,
  '{"fa":"الیت","en":"Elite","it":"Elite"}'::jsonb,
  '{"fa":"طرح ویژه‌ای که به‌زودی معرفی می‌شود.","en":"A premium plan launching soon.","it":"Un piano premium in arrivo."}'::jsonb,
  '[{"fa":"همه امکانات اولتیمیت","en":"Everything in Ultimate","it":"Tutto quello incluso in Ultimate"}]'::jsonb,
  4,
  false
from public.subscription_plans
where plan_slug = 'ultimate'
on conflict (plan_slug, language_slug) do nothing;

-- =========================================================================
-- 3. payment_settings — the master gate and the free-trial band
-- =========================================================================
alter table public.payment_settings
  -- Ships FALSE: applying this migration must never take content away from
  -- learners on a site whose gateway is not live yet.
  add column if not exists enforce_entitlements boolean not null default false,
  -- CEFR bands that are free for everyone. A1 is the trial experience.
  -- Stored as bands rather than level slugs so opening up A2 later is a
  -- setting change, not a migration.
  add column if not exists free_cefr_bands text[] not null default array['A1']::text[],
  -- Retakes for learners with no subscription. Zero: everyone gets one free
  -- attempt at a per-lesson quiz, retaking it is a paid feature.
  add column if not exists free_quiz_retake_limit integer not null default 0,
  -- A pending payment older than this is eligible for reconciliation against
  -- the gateway.
  add column if not exists pending_payment_timeout_minutes integer not null default 20;

alter table public.payment_settings
  drop constraint if exists payment_settings_free_retake_check;
alter table public.payment_settings
  add constraint payment_settings_free_retake_check
  check (free_quiz_retake_limit >= 0);

alter table public.payment_settings
  drop constraint if exists payment_settings_pending_timeout_check;
alter table public.payment_settings
  add constraint payment_settings_pending_timeout_check
  check (pending_payment_timeout_minutes between 1 and 1440);

comment on column public.payment_settings.enforce_entitlements is
  'Master switch for content gating. FALSE leaves every lesson open, as before this migration.';

-- Charge the exact converted amount rather than rounding up to a clean 10,000
-- Rial. Conditional on the value still being the old default, so an admin who
-- later picks a rounding step of their own does not get it reset by a re-run of
-- this migration.
update public.payment_settings
set irr_rounding = 1
where id = 'default' and irr_rounding = 10000;

-- =========================================================================
-- 4. CEFR band helper
-- =========================================================================
-- Level slugs are shaped `a1-1`, `a2-3`, ... so the band is the part before
-- the first dash, upper-cased. Kept in one place because both the free-band
-- check and the app's TypeScript mirror have to agree on it.
create or replace function private.cefr_band_of(p_level_slug text)
returns text
language sql
immutable
set search_path = ''
as $$
  select upper(split_part(coalesce(p_level_slug, ''), '-', 1));
$$;

-- =========================================================================
-- 5. Quiz retakes
-- =========================================================================
-- The old unique index allowed exactly one attempt per quiz per user, for
-- ever, which made the retake allowance promised on the pricing cards
-- impossible to honour. Attempts become a numbered history instead.
alter table public.user_quiz_attempts
  add column if not exists attempt_number integer not null default 1;

-- Existing rows are all somebody's first attempt, which the default covers.
drop index if exists public.user_quiz_attempts_user_quiz_unique;

create unique index if not exists user_quiz_attempts_user_quiz_attempt_unique
  on public.user_quiz_attempts (user_id, quiz_id, attempt_number);

alter table public.user_quiz_attempts
  drop constraint if exists user_quiz_attempts_attempt_number_check;
alter table public.user_quiz_attempts
  add constraint user_quiz_attempts_attempt_number_check
  check (attempt_number >= 1);

-- -------------------------------------------------------------------------
-- record_quiz_attempt — the only way an attempt is written
-- -------------------------------------------------------------------------
-- The retake allowance is enforced here rather than in the app because it is
-- a paid entitlement: counting attempts in TypeScript and trusting the count
-- would let anyone with the network tab retake a quiz for free. Taking the
-- row lock up front also makes two submissions racing each other resolve to
-- two distinct attempt numbers instead of one lost write.
create or replace function public.record_quiz_attempt(
  p_quiz_id uuid,
  p_score integer,
  p_answers jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_settings public.payment_settings%rowtype;
  v_quiz public.quizzes%rowtype;
  v_used integer;
  v_limit integer;
  v_unlimited boolean := false;
  v_tier public.subscription_tiers%rowtype;
  v_next integer;
begin
  if v_user_id is null then
    raise exception 'not authenticated';
  end if;

  select * into v_quiz from public.quizzes where id = p_quiz_id;
  if not found then
    raise exception 'unknown quiz %', p_quiz_id;
  end if;

  select * into v_settings from public.payment_settings where id = 'default';

  -- Serialise concurrent submissions for this (user, quiz) pair.
  --
  -- An advisory lock rather than `select … for update`: with no attempts yet
  -- there are no rows to lock, so a row lock would let two simultaneous first
  -- submissions both see zero and both proceed. The lock is transaction-scoped
  -- and released automatically.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(v_user_id::text || ':' || p_quiz_id::text, 0)
  );

  select count(*) into v_used
  from public.user_quiz_attempts
  where user_id = v_user_id and quiz_id = p_quiz_id;

  -- The first attempt is always free — including in the paid bands, because
  -- the retake is the paid feature, not the quiz.
  if v_used = 0 then
    v_next := 1;
  else
    if not coalesce(v_settings.enforce_entitlements, false) then
      -- Gating switched off: retakes are unlimited, as they were before the
      -- entitlement system existed.
      v_unlimited := true;
    else
      select t.* into v_tier
      from public.subscriptions s
      join public.subscription_tiers t on t.plan_slug = s.plan_slug
      where s.user_id = v_user_id
        and s.language_slug = v_quiz.language_slug
        and s.status in ('active', 'past_due')
      order by t.tier_rank desc
      limit 1;

      if found then
        if v_tier.quiz_retake_limit is null then
          v_unlimited := true;
        else
          v_limit := v_tier.quiz_retake_limit;
        end if;
      else
        v_limit := coalesce(v_settings.free_quiz_retake_limit, 0);
      end if;
    end if;

    -- v_used counts the free first attempt, so the retakes already spent is
    -- one fewer than that.
    if not v_unlimited and (v_used - 1) >= v_limit then
      return jsonb_build_object(
        'ok', false,
        'reason', 'retake_limit_reached',
        'attempts_used', v_used,
        'retake_limit', v_limit
      );
    end if;

    v_next := v_used + 1;
  end if;

  insert into public.user_quiz_attempts (
    user_id, quiz_id, score, answers_json, attempt_number
  ) values (
    v_user_id, p_quiz_id, p_score, coalesce(p_answers, '{}'::jsonb), v_next
  );

  return jsonb_build_object(
    'ok', true,
    'attempt_number', v_next,
    'retake_limit', case when v_unlimited then null else v_limit end
  );
end;
$$;

grant execute on function public.record_quiz_attempt(uuid, integer, jsonb) to authenticated;

-- =========================================================================
-- 6. create_pending_payment — period selection and the sale switch
-- =========================================================================
-- Replaced rather than overloaded on purpose: leaving the old four-argument
-- version in place would leave a callable path that skips the `is_active`
-- check and can only ever buy one month.
drop function if exists public.create_pending_payment(text, text, text, text);

create or replace function public.create_pending_payment(
  p_plan_slug text,
  p_language_slug text,
  p_provider text,
  p_currency text default 'EUR',
  p_period_months integer default 1
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_plan public.subscription_plans%rowtype;
  v_settings public.payment_settings%rowtype;
  v_discount integer;
  v_list_cents bigint;
  v_net_cents bigint;
  v_paid_amount bigint;
  v_fx_rate numeric(20,4);
  v_fx_source text;
  v_payment_id uuid;
  v_title text;
begin
  if v_user_id is null then
    raise exception 'not authenticated';
  end if;

  if p_currency not in ('EUR', 'IRR') then
    raise exception 'unsupported currency %', p_currency;
  end if;

  if p_period_months not in (1, 3) then
    raise exception 'unsupported billing period % months', p_period_months;
  end if;

  select * into v_plan
  from public.subscription_plans
  where plan_slug = p_plan_slug and language_slug = p_language_slug;

  if not found then
    raise exception 'unknown plan % / %', p_plan_slug, p_language_slug;
  end if;

  -- The storefront hides inactive plans, but hiding is not authorisation.
  if not v_plan.is_active then
    raise exception 'plan % is not on sale for %', p_plan_slug, p_language_slug;
  end if;

  if p_period_months = 3 and not v_plan.quarterly_enabled then
    raise exception 'quarterly billing is not available for % / %',
      p_plan_slug, p_language_slug;
  end if;

  -- A tier with no capability row would grant nothing after settlement.
  if not exists (
    select 1 from public.subscription_tiers where plan_slug = p_plan_slug
  ) then
    raise exception 'plan % has no tier definition', p_plan_slug;
  end if;

  select * into v_settings from public.payment_settings where id = 'default';

  -- List price is the monthly price times the number of months; the quarterly
  -- discount stacks on top of the plan's own discount, capped so a
  -- misconfigured pair can never make a plan free.
  v_list_cents := round(v_plan.price_eur * 100) * p_period_months;
  v_discount := least(
    95,
    v_plan.discount_percent
      + case when p_period_months = 3 then v_plan.quarterly_discount_percent else 0 end
  );
  v_net_cents := round(v_list_cents * (100 - v_discount) / 100.0);

  v_title := coalesce(v_plan.title->>'en', p_plan_slug);

  if p_currency = 'EUR' then
    v_paid_amount := v_net_cents;
  else
    if not v_settings.irr_enabled then
      raise exception 'IRR payments are disabled';
    end if;

    if v_settings.fx_source = 'manual' then
      v_fx_rate := v_settings.fx_manual_rate;
      v_fx_source := 'manual';
    else
      select rate, source into v_fx_rate, v_fx_source
      from public.fx_rates
      where base_currency = 'EUR'
        and quote_currency = 'IRR'
        and accepted
      order by fetched_at desc
      limit 1;
    end if;

    if v_fx_rate is null or v_fx_rate <= 0 then
      raise exception 'no usable EUR/IRR rate available';
    end if;

    v_paid_amount := ceil(
      (v_net_cents / 100.0)
      * v_fx_rate
      * (1 + v_settings.fx_margin_percent / 100.0)
      / v_settings.irr_rounding
    ) * v_settings.irr_rounding;
  end if;

  insert into public.payments (
    user_id, plan_slug, language_slug, plan_title, period_months,
    list_price_eur_cents, discount_percent, discount_eur_cents, amount_eur_cents,
    paid_currency, paid_amount, fx_rate, fx_source,
    provider, status
  ) values (
    v_user_id, p_plan_slug, p_language_slug, v_title, p_period_months,
    v_list_cents, v_discount, v_list_cents - v_net_cents, v_net_cents,
    p_currency, v_paid_amount, v_fx_rate, v_fx_source,
    p_provider, 'pending'
  )
  returning id into v_payment_id;

  return v_payment_id;
end;
$$;

grant execute on function public.create_pending_payment(text, text, text, text, integer) to authenticated;

-- =========================================================================
-- 7. Stuck pending payments
-- =========================================================================

-- The gateway's own handle on the checkout — ZarinPal's `authority`, Stripe's
-- session id — recorded when the customer is handed off.
--
-- Without it a payment can only ever be verified from the callback that comes
-- back with the customer. Keeping it means we can ask the gateway about an
-- abandoned attempt at any point afterwards, which is the whole basis of
-- reconciliation. It is deliberately not `provider_payment_id`: that column
-- holds the *settled* transaction reference (Stripe reports a payment_intent
-- there, not the session), and conflating the two would corrupt the ledger.
alter table public.payments
  add column if not exists checkout_reference text;

comment on column public.payments.checkout_reference is
  'Gateway handle for the checkout attempt (ZarinPal authority / Stripe session id), used to reconcile abandoned payments.';

create index if not exists payments_checkout_reference_idx
  on public.payments (provider, checkout_reference)
  where checkout_reference is not null and status = 'pending';

-- -------------------------------------------------------------------------
-- attach_checkout_reference — records the handle, once
-- -------------------------------------------------------------------------
-- Callable by the learner because it runs during their own checkout, but
-- deliberately narrow: their own row, only while pending, and only when not
-- already set. Nothing here can move money or change an amount.
create or replace function public.attach_checkout_reference(
  p_payment_id uuid,
  p_reference text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
begin
  if v_user_id is null then
    raise exception 'not authenticated';
  end if;

  update public.payments
  set checkout_reference = p_reference,
      updated_at = now()
  where id = p_payment_id
    and user_id = v_user_id
    and status = 'pending'
    and checkout_reference is null;
end;
$$;

grant execute on function public.attach_checkout_reference(uuid, text) to authenticated;
-- The browser callback and the gateway webhook between them settle almost
-- every payment. "Almost" is the problem: a customer whose connection dies
-- during the redirect, on a gateway with no webhooks at all (ZarinPal), has
-- paid and has nothing to show for it. This lists those payments so the app
-- can ask each gateway directly whether the money actually moved.
create or replace function public.list_stale_pending_payments(p_limit integer default 50)
returns setof public.payments
language sql
security definer
set search_path = ''
as $$
  select p.*
  from public.payments p
  cross join public.payment_settings s
  where s.id = 'default'
    and p.status = 'pending'
    and p.created_at < now()
      - make_interval(mins => s.pending_payment_timeout_minutes)
  order by p.created_at asc
  limit greatest(1, coalesce(p_limit, 50));
$$;

-- Service role only: this is reconciliation plumbing, not a learner-facing
-- query, and it returns other people's payment rows.
revoke all on function public.list_stale_pending_payments(integer) from public;

-- One learner's own stuck payments, so opening the subscription page can
-- trigger recovery immediately instead of waiting for the nightly job. Safe
-- to expose: it is scoped to auth.uid() and settles nothing by itself.
create or replace function public.list_my_pending_payments()
returns setof public.payments
language sql
security definer
set search_path = ''
as $$
  select p.*
  from public.payments p
  where p.user_id = (select auth.uid())
    and p.status = 'pending'
  order by p.created_at asc
  limit 10;
$$;

grant execute on function public.list_my_pending_payments() to authenticated;
