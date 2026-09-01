-- =========================================================================
-- 004: landing page showcase + the blog
--
-- Run against the ArvanCloud cluster after 003. Everything here is additive
-- and idempotent, so re-running it is safe.
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. landing_language_settings
--
-- Which languages appear in the 3D stage on `/`. Deliberately separate from
-- `language_settings`: that one says whether a *course* is open, this one says
-- whether the language is *shown on the landing page*. A language can be a
-- landing teaser while its course is still closed, and French and Spanish have
-- landmarks built with no curriculum behind them at all.
--
-- Missing rows fall back to `defaultVisible` in lib/landing/languages.ts.
-- -------------------------------------------------------------------------
create table if not exists public.landing_language_settings (
  language_slug text primary key,
  visible boolean not null default false,
  updated_at timestamptz not null default now()
);

comment on table public.landing_language_settings is
  'Super-admin toggles for which languages appear in the landing page 3D showcase.';

-- -------------------------------------------------------------------------
-- 2. blog_categories
-- -------------------------------------------------------------------------
create table if not exists public.blog_categories (
  slug text primary key,
  name text not null,
  description text,
  order_number integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.blog_categories is
  'Blog taxonomy. Persian-only, matching the blog itself.';

-- -------------------------------------------------------------------------
-- 3. blog_posts
--
-- Persian-only by decision, so there is no locale column and no translation
-- group — adding one later means a migration, which was the accepted
-- trade-off for shipping the SEO layer sooner.
-- -------------------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  -- Markdown. Rendered server-side so posts stay crawlable without JS.
  content text not null default '',
  cover_image_url text,
  status text not null default 'draft',
  published_at timestamptz,
  author_id text references public.profiles (id) on delete set null,

  -- SEO overrides. Null means "derive from title/excerpt", which is the
  -- common case; these exist for the posts where the on-page headline and the
  -- search result should read differently.
  meta_title text,
  meta_description text,
  canonical_url text,
  og_image_url text,
  noindex boolean not null default false,

  reading_minutes integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint blog_posts_status_check check (status in ('draft', 'published'))
);

comment on table public.blog_posts is
  'Public blog. `status = published` plus a non-null published_at is what the site shows.';

-- The list query is always "published, newest first", so index exactly that.
create index if not exists blog_posts_published_idx
  on public.blog_posts (status, published_at desc nulls last);

create index if not exists blog_posts_slug_idx
  on public.blog_posts (slug);

-- -------------------------------------------------------------------------
-- 4. blog_post_categories
-- -------------------------------------------------------------------------
create table if not exists public.blog_post_categories (
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  category_slug text not null references public.blog_categories (slug) on delete cascade,
  primary key (post_id, category_slug)
);

create index if not exists blog_post_categories_category_idx
  on public.blog_post_categories (category_slug);

-- -------------------------------------------------------------------------
-- 5. Seed a starting taxonomy so the admin form has something to pick from.
-- -------------------------------------------------------------------------
insert into public.blog_categories (slug, name, description, order_number)
values
  ('learning-tips', 'روش یادگیری', 'تکنیک‌ها و عادت‌هایی که یادگیری زبان را سریع‌تر می‌کنند.', 1),
  ('grammar', 'دستور زبان', 'توضیح قاعده‌ها با مثال، بدون اصطلاح اضافه.', 2),
  ('vocabulary', 'واژگان', 'کلمه‌ها و اصطلاح‌های پرکاربرد، دسته‌بندی‌شده.', 3),
  ('culture', 'فرهنگ و سفر', 'زندگی روزمره، آداب و نکته‌های سفر در کشورهای مقصد.', 4),
  ('news', 'اخبار لاپارلی', 'دوره‌های تازه و تغییرهای پلتفرم.', 5)
on conflict (slug) do nothing;
