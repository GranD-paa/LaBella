-- =========================================================================
-- Banner image bytes
-- =========================================================================
-- Supabase Storage used to hold these. After the move to ArvanCloud the app
-- has no object store, and the container filesystem is not one either: the
-- image tag is pinned to a commit SHA, so every deploy starts from a fresh
-- filesystem and anything written at runtime is gone.
--
-- Banners are a bounded set — a handful of rows, capped at 5MB each by the
-- upload path — so the database holds the bytes directly. Each row is served
-- from /api/banner-images/<id> under an immutable id, which means the CDN and
-- the browser cache it and this table is read approximately once per image.
create table if not exists public.banner_images (
  id uuid primary key default gen_random_uuid(),
  content_type text not null,
  bytes bytea not null,
  created_at timestamptz not null default now(),
  constraint banner_images_content_type_check
    check (content_type in ('image/jpeg', 'image/png', 'image/webp', 'image/gif'))
);

comment on table public.banner_images is
  'Bytes for super-admin uploaded banner images, served by /api/banner-images/[id].';
