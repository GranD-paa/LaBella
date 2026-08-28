-- =========================================================================
-- Restore swap_banner_order
-- =========================================================================
-- Dropped along with the Supabase-only statements because its body called
-- private.is_admin(), an RLS helper that has no meaning once the app connects
-- as a single role. The swap itself is still worth keeping in the database:
-- doing it as two client-side updates leaves the order inconsistent if the
-- second one fails after the first succeeded.
--
-- The admin check is gone, not replaced. Only server code reaches this
-- function, and that code already passes through lib/auth/action-guards.ts.
create or replace function public.swap_banner_order(
  banner_id_a uuid,
  banner_id_b uuid
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  order_a integer;
  order_b integer;
begin
  select order_number into order_a from public.banners where id = banner_id_a;
  select order_number into order_b from public.banners where id = banner_id_b;

  if order_a is null or order_b is null then
    raise exception 'banner not found';
  end if;

  update public.banners set order_number = order_b where id = banner_id_a;
  update public.banners set order_number = order_a where id = banner_id_b;
end;
$$;
