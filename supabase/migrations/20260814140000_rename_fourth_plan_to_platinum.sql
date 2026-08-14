-- =========================================================================
-- Name the reserved fourth plan "Platinum", and repair its copy
-- =========================================================================
-- Two separate problems, one row.
--
-- 1. The slot shipped as "Elite" in 20260813120000. It is being renamed to
--    Platinum before it ever goes on sale.
--
-- 2. On the live database its Persian copy is mojibake — `Ø§Ù„ÛŒØª` rather
--    than `الیت`, the signature of UTF-8 text inserted through a client that
--    read it as Latin-1. Rewriting all three columns outright fixes that in
--    the same statement, so no separate repair is needed.
--
-- The slug stays `elite`. It is an internal key that `subscription_tiers`,
-- the entitlement checks and `create_pending_payment` all join on, and it is
-- never shown to an admin or a learner — renaming it would mean a coordinated
-- change across those joins to make no visible difference.
--
-- Safe to re-run: it is a plain update over a fixed slug, with no dependency
-- on the current contents of the row.
-- =========================================================================

update public.subscription_plans
set
  title = '{"fa":"پلاتینیوم","en":"Platinum","it":"Platino"}'::jsonb,
  description = '{"fa":"طرح ویژه‌ای که به‌زودی معرفی می‌شود.","en":"A premium plan launching soon.","it":"Un piano premium in arrivo."}'::jsonb,
  features = '[{"fa":"همه امکانات اولتیمیت","en":"Everything in Ultimate","it":"Tutto quello incluso in Ultimate"}]'::jsonb,
  -- Held back until the release that introduces it. An admin turns it on per
  -- language from the subscription panel when that lands; until then it is
  -- absent from the storefront for everyone, admins included.
  is_active = false
where plan_slug = 'elite';
