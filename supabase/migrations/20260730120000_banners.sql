-- Super-admin managed promotional banners for the Main Menu carousel, plus
-- a public Storage bucket to hold the uploaded images.

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

create index if not exists banners_status_order_idx on public.banners (status, order_number);

alter table public.banners enable row level security;
alter table public.banners force row level security;

drop policy if exists "Banners viewable by authenticated" on public.banners;
create policy "Banners viewable by authenticated"
  on public.banners for select
  to authenticated
  using (status = 'published' or private.is_admin());

drop policy if exists "Admins can manage banners" on public.banners;
create policy "Admins can manage banners"
  on public.banners for all
  to authenticated
  using (private.is_admin())
  with check (private.is_admin());

insert into storage.buckets (id, name, public)
values ('banners', 'banners', true)
on conflict (id) do nothing;

drop policy if exists "Admins can upload banner images" on storage.objects;
create policy "Admins can upload banner images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'banners' and private.is_admin());

drop policy if exists "Admins can update banner images" on storage.objects;
create policy "Admins can update banner images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'banners' and private.is_admin())
  with check (bucket_id = 'banners' and private.is_admin());

drop policy if exists "Admins can delete banner images" on storage.objects;
create policy "Admins can delete banner images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'banners' and private.is_admin());
