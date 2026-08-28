-- =========================================================================
-- Laparli - Supabase database schema
-- =========================================================================
-- Run this in the Supabase SQL editor (or via `supabase db push` / migrations)
-- on a fresh project. Safe to re-run thanks to IF NOT EXISTS / OR REPLACE.
-- =========================================================================

create extension if not exists pgcrypto;

-- Private schema for security-definer helper functions. Never expose this
-- schema via the Data API (Project Settings > API > Exposed schemas).
create schema if not exists private;

-- =========================================================================
-- 1. profiles
-- =========================================================================
-- One row per "user" row (Better Auth owns that table). Created by the
-- handle_new_user() trigger below whenever a new user signs up.
create table if not exists public.profiles (
  id text primary key references "user" (id) on delete cascade,
  full_name text,
  avatar_url text,
  email text,
  is_admin boolean not null default false,
  role text not null default 'learner',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  constraint profiles_role_check check (role in (
    'learner',
    'limited_admin',
    'quiz_manager',
    'content_manager',
    'admin',
    'super_admin'
  )),
  constraint profiles_status_check check (status in ('active', 'suspended'))
);

comment on table public.profiles is 'Public profile data for each authenticated user.';

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_status_idx on public.profiles (status);

-- =========================================================================
-- 2. lessons
-- =========================================================================
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  order_number integer not null default 0,
  created_at timestamptz not null default now()
);

-- =========================================================================
-- 3. vocabulary
-- =========================================================================
create table if not exists public.vocabulary (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  word text not null,
  translation text not null,
  image_url text,
  example_sentence text,
  pronunciation text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  constraint vocabulary_status_check check (status in ('draft', 'published'))
);

-- =========================================================================
-- 4. grammar_rules
-- =========================================================================
create table if not exists public.grammar_rules (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  title text not null,
  description text,
  example text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  constraint grammar_rules_status_check check (status in ('draft', 'published'))
);

-- =========================================================================
-- 5. quizzes
-- =========================================================================
create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  title text not null,
  language_slug text not null default 'italian',
  level_slug text not null default 'a1-1',
  section_slug text not null default 'quiz',
  status text not null default 'published',
  created_at timestamptz not null default now(),
  constraint quizzes_status_check check (status in ('draft', 'published'))
);

-- =========================================================================
-- 6. quiz_questions
-- =========================================================================
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes (id) on delete cascade,
  question_text text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_option text not null check (correct_option in ('a', 'b', 'c', 'd')),
  question_type text not null default 'multiple_choice',
  expected_answer text,
  explanation text,
  created_at timestamptz not null default now(),
  constraint quiz_questions_question_type_check check (question_type in ('multiple_choice', 'written'))
);

-- =========================================================================
-- 7. user_quiz_attempts
-- =========================================================================
create table if not exists public.user_quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references public.profiles (id) on delete cascade,
  quiz_id uuid not null references public.quizzes (id) on delete cascade,
  score integer not null default 0,
  answers_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- =========================================================================
-- 8. video_lessons
-- =========================================================================
create table if not exists public.video_lessons (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
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

-- =========================================================================
-- 9. user_learning_state
-- =========================================================================
-- One row per learner: their last active language, level, lesson, and
-- section. Used to resume the course automatically right after login.
create table if not exists public.user_learning_state (
  user_id text primary key references public.profiles (id) on delete cascade,
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

-- =========================================================================
-- 10. language_settings
-- =========================================================================
-- Super-admin controlled overrides for whether a language (beyond the
-- default Italian course) is "coming soon" or fully active/open to
-- learners. Missing rows fall back to the static default in
-- `lib/curriculum/languages.ts` (currently only Italian is active).
create table if not exists public.language_settings (
  language_slug text primary key,
  enabled boolean not null default false,
  updated_at timestamptz not null default now()
);

comment on table public.language_settings is
  'Super-admin toggles for opening additional language courses (e.g. German, Turkish, English) from "coming soon" to active.';

-- =========================================================================
-- 11. curriculum_level_overrides
-- =========================================================================
-- Super-admin customization of a language's curriculum structure: renaming
-- a default level's title/description (is_custom = false), or adding a
-- brand-new level for a later CEFR stage such as A2/B1/B2 (is_custom =
-- true). Missing rows simply mean "use the static default" from
-- `lib/curriculum/{italian,english,german,turkish}.ts`.
create table if not exists public.curriculum_level_overrides (
  id uuid primary key default gen_random_uuid(),
  language_slug text not null,
  slug text not null,
  code text not null,
  title text not null,
  description text not null default '',
  order_number integer not null,
  is_custom boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (language_slug, slug)
);

comment on table public.curriculum_level_overrides is
  'Super-admin renames of default curriculum levels and brand-new levels (e.g. A2/B1/B2) added per language.';

-- =========================================================================
-- 12. banners
-- =========================================================================
-- Super-admin managed promotional slides shown in the carousel at the top
-- of the learner Main Menu. `image_url` points at a file in the public
-- `banners` Storage bucket (see policies below). `link_href` is optional —
-- when set, clicking the slide navigates there.
create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  title text,
  link_href text,
  order_number integer not null default 0,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  constraint banners_status_check check (status in ('draft', 'published'))
);

comment on table public.banners is
  'Super-admin managed promotional banners shown in the Main Menu carousel.';

-- =========================================================================
-- 13. subscription_plans / subscription_page_content
-- =========================================================================
-- Admin-editable pricing, discount, and per-language (fa/en/it) copy for
-- each subscription tier — one row per (plan, learning-language) pair, since
-- a learner picks which language they're subscribing to learn before seeing
-- its plans — plus a singleton row for the subscription page's hero/footer
-- text.
create table if not exists public.subscription_plans (
  plan_slug text not null,
  language_slug text not null,
  price_eur numeric(10,2) not null,
  discount_percent integer not null default 0,
  title jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  features jsonb not null default '[]'::jsonb,
  order_number integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (plan_slug, language_slug),
  constraint subscription_plans_discount_check check (discount_percent >= 0 and discount_percent <= 95),
  constraint subscription_plans_price_check check (price_eur >= 0),
  constraint subscription_plans_language_check
    check (language_slug in ('italian', 'english', 'german', 'turkish'))
);

comment on table public.subscription_plans is
  'Super-admin managed pricing, discounts, and localized copy for each subscription tier.';

create table if not exists public.subscription_page_content (
  id text primary key default 'default',
  hero_title jsonb not null default '{}'::jsonb,
  hero_subtitle jsonb not null default '{}'::jsonb,
  footer_note jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.subscription_page_content is
  'Singleton row holding the editable hero and footer copy for the subscription page.';

-- =========================================================================
-- Indexes on foreign keys / common lookup columns
-- =========================================================================
create index if not exists vocabulary_lesson_id_idx on public.vocabulary (lesson_id);
create index if not exists grammar_rules_lesson_id_idx on public.grammar_rules (lesson_id);
create index if not exists quizzes_lesson_id_idx on public.quizzes (lesson_id);
create index if not exists quiz_questions_quiz_id_idx on public.quiz_questions (quiz_id);
create index if not exists user_quiz_attempts_user_id_idx on public.user_quiz_attempts (user_id);
create index if not exists user_quiz_attempts_quiz_id_idx on public.user_quiz_attempts (quiz_id);
create unique index if not exists user_quiz_attempts_user_quiz_unique on public.user_quiz_attempts (user_id, quiz_id);
create index if not exists lessons_order_number_idx on public.lessons (order_number);
create index if not exists user_learning_state_language_idx on public.user_learning_state (language_slug);
create index if not exists video_lessons_lesson_id_idx on public.video_lessons (lesson_id);
create index if not exists grammar_rules_status_idx on public.grammar_rules (status);
create index if not exists vocabulary_status_idx on public.vocabulary (status);
create index if not exists quizzes_language_level_section_idx on public.quizzes (language_slug, level_slug, section_slug);
create index if not exists quizzes_status_idx on public.quizzes (status);
create index if not exists banners_status_order_idx on public.banners (status, order_number);

-- -------------------------------------------------------------------------
-- user_quiz_attempts policies: users only see/insert their own attempts;

-- =========================================================================
-- Seed: default subscription plans and page content
-- =========================================================================
insert into public.subscription_plans (plan_slug, language_slug, price_eur, discount_percent, title, description, features, order_number)
values
  ('basic', 'italian', 2.99, 0,
   '{"fa":"بیسیک","en":"Basic","it":"Base"}'::jsonb,
   '{"fa":"مناسب یادگیرندگانی که روی یک زبان تمرکز دارند.","en":"Perfect for focused learners starting one language.","it":"Perfetto per studenti concentrati su una lingua."}'::jsonb,
   '[{"fa":"۱ زبان فعال در هر زمان","en":"1 active language at a time","it":"1 lingua attiva alla volta"},{"fa":"درس‌ها، واژگان و گرامر اصلی","en":"Core lessons, vocabulary & grammar","it":"Lezioni, vocabolario e grammatica di base"},{"fa":"تا ۳ بار تلاش مجدد برای هر آزمون","en":"Up to 3 quiz retakes per lesson","it":"Fino a 3 tentativi per quiz"},{"fa":"پیگیری پیشرفت در داشبورد","en":"Progress tracking on your dashboard","it":"Monitoraggio dei progressi sulla dashboard"}]'::jsonb,
   1),
  ('pro', 'italian', 4.99, 0,
   '{"fa":"پرو","en":"Pro","it":"Pro"}'::jsonb,
   '{"fa":"محبوب‌ترین طرح برای تمرین روزانه جدی.","en":"Our most popular plan for serious daily practice.","it":"Il piano più popolare per una pratica quotidiana seria."}'::jsonb,
   '[{"fa":"همه امکانات بیسیک","en":"Everything in Basic","it":"Tutto quello incluso nel piano Base"},{"fa":"همه زبان‌های فعال فعلی","en":"All currently active languages","it":"Tutte le lingue attualmente attive"},{"fa":"تلاش مجدد نامحدود آزمون","en":"Unlimited quiz retakes","it":"Tentativi illimitati per i quiz"},{"fa":"گرامر پیشرفته و عمیق","en":"Extended grammar deep-dives","it":"Approfondimenti grammaticali avanzati"},{"fa":"پشتیبانی ایمیلی اولویت‌دار","en":"Priority email support","it":"Supporto email prioritario"}]'::jsonb,
   2),
  ('ultimate', 'italian', 5.99, 0,
   '{"fa":"اولتیمیت","en":"Ultimate","it":"Ultimate"}'::jsonb,
   '{"fa":"حداکثر دسترسی برای یادگیرندگان حرفه‌ای.","en":"Maximum access for power learners and early adopters.","it":"Accesso massimo per utenti esperti e primi utilizzatori."}'::jsonb,
   '[{"fa":"همه امکانات پرو","en":"Everything in Pro","it":"Tutto quello incluso nel piano Pro"},{"fa":"همه زبان‌های آینده پس از انتشار","en":"All future languages as they launch","it":"Tutte le lingue future al lancio"},{"fa":"دسترسی آفلاین به درس‌ها (PWA)","en":"Offline lesson access (PWA)","it":"Accesso offline alle lezioni (PWA)"},{"fa":"دسترسی زودهنگام به سطوح و ویژگی‌های جدید","en":"Early access to new levels & features","it":"Accesso anticipato a nuovi livelli e funzionalità"},{"fa":"پیشنهاد مسیر یادگیری شخصی‌سازی‌شده","en":"Personalized learning path suggestions","it":"Suggerimenti di percorso di apprendimento personalizzati"}]'::jsonb,
   3)
on conflict (plan_slug, language_slug) do nothing;

-- Clone the Italian defaults above as the starting point for the other
-- three languages, so every plan has a row for every language from the
-- start — admins customize each language's pricing/copy independently.
insert into public.subscription_plans
  (plan_slug, language_slug, price_eur, discount_percent, title, description, features, order_number)
select plan_slug, lang, price_eur, discount_percent, title, description, features, order_number
from public.subscription_plans, unnest(array['english', 'german', 'turkish']) as lang
where language_slug = 'italian'
on conflict (plan_slug, language_slug) do nothing;

insert into public.subscription_page_content (id, hero_title, hero_subtitle, footer_note)
values (
  'default',
  '{"fa":"طرح یادگیری خود را انتخاب کنید","en":"Choose your learning plan","it":"Scegli il tuo piano di apprendimento"}'::jsonb,
  '{"fa":"{name}، با اشتراک ماهانه‌ای متناسب با اهدافتان، تجربه کامل لاپارلی را باز کنید.","en":"{name}, unlock the full Laparli experience with a monthly subscription tailored to your goals.","it":"{name}, sblocca l''esperienza completa di Laparli con un abbonamento su misura per i tuoi obiettivi."}'::jsonb,
  '{"fa":"اشتراک هر ۳۰ روز تمدید می‌شود. پس از فعال شدن پرداخت، هر زمان می‌توانید طرح را تغییر دهید یا لغو کنید. قیمت‌ها به یورو نمایش داده می‌شوند.","en":"Subscriptions renew every 30 days. You can change or cancel your plan anytime once payments go live. Prices are shown in EUR.","it":"Gli abbonamenti si rinnovano ogni 30 giorni. Puoi cambiare o annullare il piano in qualsiasi momento una volta attivati i pagamenti. I prezzi sono in EUR."}'::jsonb
)
on conflict (id) do nothing;

-- =========================================================================
-- Billing & accounting core
-- =========================================================================
-- Adds the subscription lifecycle and the money ledger behind it.
--
-- Design rules encoded here, because they are the ones that are expensive to
-- retrofit later:
--
--  * `payments` is an append-only ledger. Rows snapshot the price, discount,
--    currency and FX rate *as they were at the moment of purchase*, so that a
--    later admin price change can never rewrite historical revenue. There is
--    deliberately no DELETE policy on it.
--
--  * Money is stored in integer minor units (euro cents, whole Rial). No
--    floats anywhere in the money path.
--
--  * Amounts are computed inside `create_pending_payment` from the plan table,
--    never accepted from the client. A checkout call says *which plan*, not
--    *how much*.
--
--  * Settlement is one atomic security-definer function so a payment can
--    never be marked paid without the matching subscription period being
--    extended, or vice versa.
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. payment_settings — singleton, non-secret configuration
-- -------------------------------------------------------------------------
-- Gateway API keys live in environment variables, never in the database.
-- This table only holds operational knobs an admin needs to change without a
-- deploy.
create table if not exists public.payment_settings (
  id text primary key default 'default',
  base_currency text not null default 'EUR',
  irr_enabled boolean not null default true,
  -- Which FX adapter feeds the EUR->IRR rate: 'tgju' | 'navasan' | 'manual'.
  fx_source text not null default 'tgju',
  -- Business margin applied on top of the market rate (spread + gateway fees).
  fx_margin_percent numeric(5,2) not null default 2.5,
  -- Rial prices are rounded up to a multiple of this, so they end in zeros.
  irr_rounding integer not null default 10000,
  -- Used only when fx_source = 'manual'.
  fx_manual_rate numeric(20,4),
  -- An hourly refresh whose rate jumps more than this is parked for review
  -- instead of auto-applied. Catches a feed switching Rial->Toman (a 10x
  -- error) or returning garbage.
  fx_max_deviation_percent numeric(5,2) not null default 20,
  stripe_enabled boolean not null default false,
  zarinpal_enabled boolean not null default false,
  manual_enabled boolean not null default true,
  -- Days of continued access after a period ends before access is cut.
  grace_period_days integer not null default 3,
  updated_at timestamptz not null default now(),
  constraint payment_settings_fx_source_check
    check (fx_source in ('tgju', 'navasan', 'manual')),
  constraint payment_settings_margin_check
    check (fx_margin_percent >= 0 and fx_margin_percent <= 100),
  constraint payment_settings_rounding_check check (irr_rounding >= 1),
  constraint payment_settings_grace_check
    check (grace_period_days >= 0 and grace_period_days <= 60)
);

comment on table public.payment_settings is
  'Singleton, non-secret billing configuration. Gateway credentials live in env vars.';

insert into public.payment_settings (id) values ('default')
on conflict (id) do nothing;

-- -------------------------------------------------------------------------
-- 2. fx_rates — append-only history of fetched exchange rates
-- -------------------------------------------------------------------------
-- Kept as history rather than a single mutable row so that every payment can
-- point at the exact rate it was priced with, and so a bad rate can be
-- audited after the fact.
create table if not exists public.fx_rates (
  id uuid primary key default gen_random_uuid(),
  base_currency text not null default 'EUR',
  quote_currency text not null default 'IRR',
  -- How many Rial one euro buys, as reported by the source (before margin).
  rate numeric(20,4) not null,
  source text not null,
  -- False when the deviation guard rejected it: stored for audit, not used
  -- for pricing.
  accepted boolean not null default true,
  rejection_reason text,
  fetched_at timestamptz not null default now(),
  constraint fx_rates_rate_check check (rate > 0)
);

comment on table public.fx_rates is
  'Append-only log of EUR->IRR rates fetched from the configured source.';

create index if not exists fx_rates_lookup_idx
  on public.fx_rates (base_currency, quote_currency, accepted, fetched_at desc);

-- -------------------------------------------------------------------------
-- 3. subscriptions — one row per (user, language) subscription lifecycle
-- -------------------------------------------------------------------------
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references "user" (id) on delete cascade,
  plan_slug text not null,
  language_slug text not null,
  status text not null default 'active',
  current_period_start timestamptz not null default now(),
  current_period_end timestamptz not null,
  -- Day-of-month the subscription originally started on. Renewals anchor to
  -- this so a subscription starting on the 31st does not permanently drift to
  -- the 28th after passing through February.
  anchor_day integer not null,
  period_months integer not null default 1,
  cancel_at_period_end boolean not null default false,
  started_at timestamptz not null default now(),
  canceled_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subscriptions_status_check
    check (status in ('active', 'past_due', 'canceled', 'expired')),
  constraint subscriptions_language_check
    check (language_slug in ('italian', 'english', 'german', 'turkish')),
  constraint subscriptions_anchor_check check (anchor_day between 1 and 31),
  constraint subscriptions_months_check check (period_months >= 1)
);

comment on table public.subscriptions is
  'Subscription lifecycle per user and language. Access is granted by status.';

-- A user can hold at most one live subscription per language. Terminal rows
-- are excluded so the history of past subscriptions is still retained.
create unique index if not exists subscriptions_one_live_per_language
  on public.subscriptions (user_id, language_slug)
  where status in ('active', 'past_due');

create index if not exists subscriptions_user_idx on public.subscriptions (user_id);
create index if not exists subscriptions_status_period_idx
  on public.subscriptions (status, current_period_end);

-- -------------------------------------------------------------------------
-- 4. payments — the ledger
-- -------------------------------------------------------------------------
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references "user" (id) on delete restrict,
  subscription_id uuid references public.subscriptions (id) on delete set null,

  -- Snapshot of what was bought. Denormalised on purpose: reporting must not
  -- depend on the plan tables, which admins edit freely.
  plan_slug text not null,
  language_slug text not null,
  period_months integer not null default 1,
  plan_title text,

  -- Price snapshot, in euro cents. list = net + discount, always.
  list_price_eur_cents bigint not null,
  discount_percent integer not null default 0,
  discount_eur_cents bigint not null default 0,
  amount_eur_cents bigint not null,

  -- What the customer actually paid, in the currency they paid in.
  paid_currency text not null default 'EUR',
  -- Minor units of paid_currency: cents for EUR, whole Rial for IRR.
  paid_amount bigint not null,
  -- Rial per euro at purchase time. Null for EUR payments.
  fx_rate numeric(20,4),
  fx_source text,

  provider text not null,
  provider_payment_id text,
  provider_ref text,
  status text not null default 'pending',
  failure_reason text,

  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,

  constraint payments_status_check
    check (status in ('pending', 'succeeded', 'failed', 'refunded', 'canceled')),
  constraint payments_provider_check
    check (provider in ('stripe', 'zarinpal', 'manual')),
  constraint payments_currency_check check (paid_currency in ('EUR', 'IRR')),
  constraint payments_amounts_check check (
    list_price_eur_cents >= 0
    and amount_eur_cents >= 0
    and discount_eur_cents >= 0
    and paid_amount >= 0
    and list_price_eur_cents = amount_eur_cents + discount_eur_cents
  ),
  -- An IRR payment without the rate it was priced at cannot be reconciled.
  constraint payments_fx_required_for_irr
    check (paid_currency <> 'IRR' or fx_rate is not null)
);

comment on table public.payments is
  'Append-only money ledger. One row per payment attempt, with the price and FX rate snapshotted at purchase time.';

-- Idempotency: a provider replaying the same webhook must not create or
-- settle a second payment.
create unique index if not exists payments_provider_payment_unique
  on public.payments (provider, provider_payment_id)
  where provider_payment_id is not null;

create index if not exists payments_user_idx on public.payments (user_id);
create index if not exists payments_status_paid_at_idx
  on public.payments (status, paid_at desc);
create index if not exists payments_reporting_idx
  on public.payments (language_slug, plan_slug, paid_at desc);
create index if not exists payments_subscription_idx
  on public.payments (subscription_id);

-- -------------------------------------------------------------------------
-- 5. refunds — a refund is its own event, never an edit to the payment
-- -------------------------------------------------------------------------
create table if not exists public.refunds (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid not null references public.payments (id) on delete restrict,
  amount_eur_cents bigint not null,
  reason text,
  created_by text references "user" (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint refunds_amount_check check (amount_eur_cents > 0)
);

create index if not exists refunds_payment_idx on public.refunds (payment_id);
create index if not exists refunds_created_at_idx on public.refunds (created_at desc);

-- -------------------------------------------------------------------------
-- 6. subscription_events — audit timeline
-- -------------------------------------------------------------------------
create table if not exists public.subscription_events (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid references public.subscriptions (id) on delete cascade,
  user_id text not null references "user" (id) on delete cascade,
  type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint subscription_events_type_check check (type in (
    'created', 'renewed', 'payment_failed', 'past_due',
    'canceled', 'expired', 'reactivated', 'refunded', 'plan_changed'
  ))
);

create index if not exists subscription_events_subscription_idx
  on public.subscription_events (subscription_id, created_at desc);
create index if not exists subscription_events_user_idx
  on public.subscription_events (user_id, created_at desc);

-- -------------------------------------------------------------------------
-- 7. webhook_events — provider callback idempotency + audit
-- -------------------------------------------------------------------------
create table if not exists public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  provider_event_id text not null,
  event_type text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'received',
  error text,
  created_at timestamptz not null default now(),
  processed_at timestamptz,
  constraint webhook_events_status_check
    check (status in ('received', 'processed', 'failed', 'ignored'))
);

create unique index if not exists webhook_events_provider_event_unique
  on public.webhook_events (provider, provider_event_id);

-- =========================================================================
-- Functions
-- =========================================================================

-- -------------------------------------------------------------------------
-- create_pending_payment — starts a checkout.
-- -------------------------------------------------------------------------
-- The caller passes *which plan*, never *how much*. The amount is derived
-- here from public.subscription_plans, so a tampered client cannot buy a
-- €7.99 plan for €0.01. The Rial amount is likewise computed from the stored
-- rate and margin rather than trusted from the browser.
create or replace function public.create_pending_payment(
  p_user_id text,
  p_plan_slug text,
  p_language_slug text,
  p_provider text,
  p_currency text default 'EUR'
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id text := p_user_id;
  v_plan public.subscription_plans%rowtype;
  v_settings public.payment_settings%rowtype;
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

  select * into v_plan
  from public.subscription_plans
  where plan_slug = p_plan_slug and language_slug = p_language_slug;

  if not found then
    raise exception 'unknown plan % / %', p_plan_slug, p_language_slug;
  end if;

  select * into v_settings from public.payment_settings where id = 'default';

  -- Price in euro cents, rounding the charge (not the discount) so that
  -- list = net + discount holds, matching lib/billing/money.ts.
  v_list_cents := round(v_plan.price_eur * 100);
  v_net_cents := round(v_list_cents * (100 - v_plan.discount_percent) / 100.0);

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

    -- Round *up* to the configured step so a rounding step can never
    -- undercharge. Mirrors convertEurCentsToRial() in lib/billing/money.ts.
    v_paid_amount := ceil(
      (v_net_cents / 100.0)
      * v_fx_rate
      * (1 + v_settings.fx_margin_percent / 100.0)
      / v_settings.irr_rounding
    ) * v_settings.irr_rounding;
  end if;

  insert into public.payments (
    user_id, plan_slug, language_slug, plan_title,
    list_price_eur_cents, discount_percent, discount_eur_cents, amount_eur_cents,
    paid_currency, paid_amount, fx_rate, fx_source,
    provider, status
  ) values (
    v_user_id, p_plan_slug, p_language_slug, v_title,
    v_list_cents, v_plan.discount_percent, v_list_cents - v_net_cents, v_net_cents,
    p_currency, v_paid_amount, v_fx_rate, v_fx_source,
    p_provider, 'pending'
  )
  returning id into v_payment_id;

  return v_payment_id;
end;
$$;

-- -------------------------------------------------------------------------
-- settle_payment — marks a payment paid and moves the subscription forward,
-- atomically.
-- -------------------------------------------------------------------------
-- Idempotent: calling it twice for the same payment is a no-op, because a
-- gateway that retries its webhook must not buy the customer two months.
create or replace function public.settle_payment(
  p_payment_id uuid,
  p_provider_payment_id text default null,
  p_provider_ref text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_payment public.payments%rowtype;
  v_subscription public.subscriptions%rowtype;
  v_now timestamptz := now();
  v_start timestamptz;
  v_end timestamptz;
  v_anchor integer;
  v_is_renewal boolean := false;
  -- Period maths is done on naive UTC timestamps so the result never depends
  -- on the session timezone of whoever happens to call this.
  v_start_utc timestamp;
  v_month_start timestamp;
  v_days_in_month integer;
begin
  select * into v_payment from public.payments where id = p_payment_id for update;

  if not found then
    raise exception 'unknown payment %', p_payment_id;
  end if;

  -- Already settled: return the subscription we created the first time.
  if v_payment.status = 'succeeded' then
    return v_payment.subscription_id;
  end if;

  if v_payment.status <> 'pending' then
    raise exception 'payment % is % and cannot be settled', p_payment_id, v_payment.status;
  end if;

  select * into v_subscription
  from public.subscriptions
  where user_id = v_payment.user_id
    and language_slug = v_payment.language_slug
    and status in ('active', 'past_due')
  for update;

  if found then
    v_is_renewal := true;
    v_anchor := v_subscription.anchor_day;
    -- Paying while still inside the period stacks on top of it, so paying
    -- early never burns days already bought.
    v_start := greatest(v_subscription.current_period_end, v_now);
  else
    v_anchor := extract(day from v_now)::integer;
    v_start := v_now;
  end if;

  -- Anchor-preserving month addition, clamped to the length of the target
  -- month. Mirrors addBillingMonths() in lib/billing/period.ts: a
  -- subscription anchored on the 31st goes 31 Jan -> 28 Feb -> 31 Mar rather
  -- than collapsing to the 28th forever.
  v_start_utc := v_start at time zone 'UTC';
  v_month_start := date_trunc('month', v_start_utc)
                   + make_interval(months => v_payment.period_months);
  v_days_in_month := extract(
    day from (v_month_start + interval '1 month' - interval '1 day')
  )::integer;

  v_end := (
    v_month_start
    + make_interval(days => least(v_anchor, v_days_in_month) - 1)
    + (v_start_utc - date_trunc('day', v_start_utc))
  ) at time zone 'UTC';

  if v_is_renewal then
    update public.subscriptions
    set status = 'active',
        plan_slug = v_payment.plan_slug,
        current_period_start = v_start,
        current_period_end = v_end,
        period_months = v_payment.period_months,
        cancel_at_period_end = false,
        updated_at = v_now
    where id = v_subscription.id;
  else
    insert into public.subscriptions (
      user_id, plan_slug, language_slug, status,
      current_period_start, current_period_end,
      anchor_day, period_months
    ) values (
      v_payment.user_id, v_payment.plan_slug, v_payment.language_slug, 'active',
      v_start, v_end,
      v_anchor, v_payment.period_months
    )
    returning * into v_subscription;
  end if;

  update public.payments
  set status = 'succeeded',
      subscription_id = v_subscription.id,
      provider_payment_id = coalesce(p_provider_payment_id, provider_payment_id),
      provider_ref = coalesce(p_provider_ref, provider_ref),
      paid_at = v_now,
      updated_at = v_now
  where id = p_payment_id;

  insert into public.subscription_events (subscription_id, user_id, type, payload)
  values (
    v_subscription.id,
    v_payment.user_id,
    case when v_is_renewal then 'renewed' else 'created' end,
    jsonb_build_object(
      'payment_id', p_payment_id,
      'plan_slug', v_payment.plan_slug,
      'language_slug', v_payment.language_slug,
      'amount_eur_cents', v_payment.amount_eur_cents,
      'paid_currency', v_payment.paid_currency,
      'paid_amount', v_payment.paid_amount,
      'period_end', v_end
    )
  );

  return v_subscription.id;
end;
$$;

-- -------------------------------------------------------------------------
-- fail_payment — records a declined/abandoned attempt.
-- -------------------------------------------------------------------------
create or replace function public.fail_payment(
  p_payment_id uuid,
  p_reason text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_payment public.payments%rowtype;
begin
  select * into v_payment from public.payments where id = p_payment_id for update;
  if not found then
    raise exception 'unknown payment %', p_payment_id;
  end if;

  -- Never walk back a settled payment.
  if v_payment.status <> 'pending' then
    return;
  end if;

  update public.payments
  set status = 'failed', failure_reason = p_reason, updated_at = now()
  where id = p_payment_id;

  insert into public.subscription_events (subscription_id, user_id, type, payload)
  values (
    v_payment.subscription_id,
    v_payment.user_id,
    'payment_failed',
    jsonb_build_object('payment_id', p_payment_id, 'reason', p_reason)
  );
end;
$$;

-- -------------------------------------------------------------------------
-- cancel_my_subscription — self-service cancellation.
-- -------------------------------------------------------------------------
-- Cancels at period end rather than immediately: the customer paid for the
-- rest of the month and keeps it. Exposed as a function so a learner can only
-- flip this one flag, not edit dates or status directly.
create or replace function public.cancel_my_subscription(
  p_user_id text,
  p_subscription_id uuid
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id text := p_user_id;
  v_subscription public.subscriptions%rowtype;
begin
  if v_user_id is null then
    raise exception 'not authenticated';
  end if;

  select * into v_subscription
  from public.subscriptions
  where id = p_subscription_id and user_id = v_user_id
  for update;

  if not found then
    raise exception 'subscription not found';
  end if;

  update public.subscriptions
  set cancel_at_period_end = true, canceled_at = now(), updated_at = now()
  where id = p_subscription_id;

  insert into public.subscription_events (subscription_id, user_id, type, payload)
  values (p_subscription_id, v_user_id, 'canceled',
          jsonb_build_object('effective_at', v_subscription.current_period_end));
end;
$$;

-- -------------------------------------------------------------------------
-- sweep_subscriptions — reconciles stored status against the clock.
-- -------------------------------------------------------------------------
-- Run nightly. Deriving lapse from dates rather than from "did the cron fire"
-- keeps the churn reporting correct even after a missed webhook or a skipped
-- night.
create or replace function public.sweep_subscriptions()
returns table (moved_to_past_due integer, moved_to_expired integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_grace integer;
  v_past_due integer := 0;
  v_expired integer := 0;
begin
  select grace_period_days into v_grace from public.payment_settings where id = 'default';
  v_grace := coalesce(v_grace, 3);

  with moved as (
    update public.subscriptions
    set status = 'past_due', updated_at = now()
    where status = 'active'
      and current_period_end < now()
      and current_period_end + make_interval(days => v_grace) >= now()
    returning id, user_id
  ),
  logged as (
    insert into public.subscription_events (subscription_id, user_id, type, payload)
    select id, user_id, 'past_due', '{}'::jsonb from moved
    returning 1
  )
  select count(*)::integer into v_past_due from logged;

  with moved as (
    update public.subscriptions
    set status = 'expired', ended_at = now(), updated_at = now()
    where status in ('active', 'past_due')
      and current_period_end + make_interval(days => v_grace) < now()
    returning id, user_id
  ),
  logged as (
    insert into public.subscription_events (subscription_id, user_id, type, payload)
    select id, user_id, 'expired', '{}'::jsonb from moved
    returning 1
  )
  select count(*)::integer into v_expired from logged;

  return query select v_past_due, v_expired;
end;
$$;

-- =========================================================================
-- Profile creation, rebuilt for Better Auth
-- =========================================================================
-- Supabase fired this off auth.users and read the name out of
-- raw_user_meta_data. Better Auth owns the identity table now and stores the
-- display name in a plain "name" column, so the trigger simply follows it.
-- Kept in the database rather than in app code so no sign-up path can produce
-- a user row without its profile.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email)
  values (new.id, new."name", new.image, new.email)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_user_created on "user";
create trigger on_user_created
  after insert on "user"
  for each row
  execute function public.handle_new_user();
