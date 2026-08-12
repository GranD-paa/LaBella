-- =========================================================================
-- Export the live site's CONTENT for local development
-- =========================================================================
-- Run this in the Supabase SQL editor, then save the single value it returns
-- to .local-data/production-export.json and run:
--
--   node scripts/sync-local-content.mjs
--
-- Only content is exported — the curriculum, quizzes, banners and pricing.
-- Accounts, payments, subscriptions and quiz attempts are deliberately left
-- out: they are real people's personal data and are not needed to work on the
-- interface. Local development keeps its own test sign-in accounts.
--
-- Safe to run as often as you like. It reads and changes nothing.
-- =========================================================================

select jsonb_pretty(jsonb_build_object(
  'lessons',
    (select coalesce(jsonb_agg(to_jsonb(t) order by t.order_number), '[]'::jsonb)
     from public.lessons t),

  'vocabulary',
    (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from public.vocabulary t),

  'grammar_rules',
    (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from public.grammar_rules t),

  'video_lessons',
    (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from public.video_lessons t),

  'quizzes',
    (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from public.quizzes t),

  'quiz_questions',
    (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from public.quiz_questions t),

  'banners',
    (select coalesce(jsonb_agg(to_jsonb(t) order by t.order_number), '[]'::jsonb)
     from public.banners t),

  'subscription_plans',
    (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from public.subscription_plans t),

  'subscription_page_content',
    (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from public.subscription_page_content t),

  'language_settings',
    (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from public.language_settings t),

  'curriculum_level_overrides',
    (select coalesce(jsonb_agg(to_jsonb(t) order by t.order_number), '[]'::jsonb)
     from public.curriculum_level_overrides t),

  'payment_settings',
    (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from public.payment_settings t),

  -- The newest *accepted* rate must be included explicitly: pricing reads only
  -- accepted rows, and a run of rejections can push the last good rate well
  -- outside the recent history. Taking just "the last 5 rows" left local
  -- pricing with no usable rate at all.
  'fx_rates',
    (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from (
       (select * from public.fx_rates where accepted order by fetched_at desc limit 3)
       union
       (select * from public.fx_rates order by fetched_at desc limit 5)
     ) t)
)) as export;
