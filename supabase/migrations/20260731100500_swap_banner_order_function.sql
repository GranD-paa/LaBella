-- Swaps two banners' order_number atomically in one transaction — doing this
-- as two separate client-side updates risks leaving the order inconsistent
-- if the second update fails after the first succeeds (e.g. a dropped
-- connection mid-reorder).
create or replace function public.swap_banner_order(banner_id_a uuid, banner_id_b uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  order_a integer;
  order_b integer;
begin
  if not private.is_admin() then
    raise exception 'forbidden';
  end if;

  select order_number into order_a from public.banners where id = banner_id_a;
  select order_number into order_b from public.banners where id = banner_id_b;

  if order_a is null or order_b is null then
    raise exception 'banner not found';
  end if;

  update public.banners set order_number = order_b where id = banner_id_a;
  update public.banners set order_number = order_a where id = banner_id_b;
end;
$$;

grant execute on function public.swap_banner_order(uuid, uuid) to authenticated;
