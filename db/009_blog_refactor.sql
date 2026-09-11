-- =========================================================================
-- 009: the blog grows up
-- =========================================================================
-- Three things the blog could not do before:
--
--   1. Hold its own images. Covers and in-body pictures were absolute URLs
--      typed into a text field, which meant every picture on the blog lived on
--      somebody else's server and broke when that server did.
--   2. Say which language a post is about. The site teaches six; a post about
--      Italian articles and a post about German cases were equally "grammar"
--      and nothing more, so neither could be gathered into a page worth
--      ranking for "یادگیری ایتالیایی".
--   3. Answer a question in its first two lines. Search results and the
--      assistants reading them quote a short, self-contained answer far more
--      readily than they quote a paragraph that warms up first.
--
-- Additive and idempotent, like the migrations before it. Run after 008.
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. blog_images
--
-- The same bargain `banner_images` struck in 006, for the same reason: the
-- container's filesystem is rebuilt from the image on every deploy, so an
-- upload written to disk survives until the next one and no longer. Bytes go
-- in the database and are served from /api/blog-images/<id> under an
-- immutable id, so the CDN and the browser answer for them after the first
-- request and this table is read roughly once per picture.
--
-- Unlike banners, these carry their own alt text and pixel dimensions. Alt
-- text because a blog picture is content rather than decoration and a reader
-- using a screen reader is owed a description of it; dimensions because the
-- browser needs them to reserve the right space before the bytes arrive,
-- which is the difference between a page that settles and a page that jumps.
-- -------------------------------------------------------------------------
create table if not exists public.blog_images (
  id uuid primary key default gen_random_uuid(),
  content_type text not null,
  bytes bytea not null,
  byte_size integer not null,
  width integer,
  height integer,
  alt_text text,
  original_name text,
  uploaded_by text references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint blog_images_content_type_check
    check (content_type in ('image/jpeg', 'image/png', 'image/webp', 'image/gif'))
);

comment on table public.blog_images is
  'Bytes for images used in blog posts, served by /api/blog-images/[id].';

-- The picker in the editor lists newest first and nothing else, so index that.
create index if not exists blog_images_created_idx
  on public.blog_images (created_at desc);

-- -------------------------------------------------------------------------
-- 2. blog_post_languages
--
-- Which of the site's languages a post is about. A join table rather than a
-- column because a post can legitimately belong to several — "the five
-- hardest sounds for Persian speakers" is about German and Turkish both — and
-- because it mirrors `blog_post_categories` exactly, so one shape of code
-- reads them both.
--
-- No foreign key to a languages table: there isn't one. `language_slug`
-- matches the slugs in lib/blog/languages.ts, the same list the landing page
-- showcases, and an unknown slug is simply not rendered.
-- -------------------------------------------------------------------------
create table if not exists public.blog_post_languages (
  post_id uuid not null references public.blog_posts (id) on delete cascade,
  language_slug text not null,
  primary key (post_id, language_slug)
);

create index if not exists blog_post_languages_language_idx
  on public.blog_post_languages (language_slug);

comment on table public.blog_post_languages is
  'Which taught language each post is about. Drives the /blog/language/<slug> hubs.';

-- -------------------------------------------------------------------------
-- 3. New columns on blog_posts
-- -------------------------------------------------------------------------

-- The answer, in two or three sentences, before the article starts making its
-- case. Rendered as a box at the top of the post and published as `abstract`
-- in the post's structured data — which is the part an AI answer is most
-- likely to lift verbatim instead of paraphrasing.
alter table public.blog_posts
  add column if not exists summary text;

-- A cover is content, not decoration, so it gets described. Null falls back to
-- an empty alt, which is the correct reading of a picture nobody bothered to
-- describe: skip it rather than read out a filename.
alter table public.blog_posts
  add column if not exists cover_image_alt text;

-- Sorting a handful of posts to the top of the index without touching their
-- dates. `false` for everything that exists, which is the previous behaviour.
alter table public.blog_posts
  add column if not exists featured boolean not null default false;

comment on column public.blog_posts.summary is
  'Short answer-first abstract shown above the article and published as schema.org abstract.';

-- The index query gained "featured first", so the index it reads gains the
-- same leading column. Without this the planner sorts the whole table.
create index if not exists blog_posts_featured_published_idx
  on public.blog_posts (status, featured desc, published_at desc nulls last);
