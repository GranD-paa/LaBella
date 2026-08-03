-- Subscription pricing/discounts now vary per language (a learner picks a
-- language on the subscription page before seeing plans for it), so
-- subscription_plans moves from one row per tier to one row per
-- (tier, language) pair.

alter table public.subscription_plans
  add column if not exists language_slug text not null default 'italian';

alter table public.subscription_plans
  drop constraint if exists subscription_plans_pkey;

alter table public.subscription_plans
  rename column id to plan_slug;

alter table public.subscription_plans
  add constraint subscription_plans_pkey primary key (plan_slug, language_slug);

alter table public.subscription_plans
  add constraint subscription_plans_language_check
  check (language_slug in ('italian', 'english', 'german', 'turkish'));

-- Every existing row is implicitly the Italian pricing (the only language
-- that had a subscription page before this change) — clone it as the
-- starting point for the other three languages so every plan has a row for
-- every language. Admins can then customize each language independently.
insert into public.subscription_plans
  (plan_slug, language_slug, price_eur, discount_percent, title, description, features, order_number)
select plan_slug, lang, price_eur, discount_percent, title, description, features, order_number
from public.subscription_plans, unnest(array['english', 'german', 'turkish']) as lang
where language_slug = 'italian'
on conflict (plan_slug, language_slug) do nothing;
