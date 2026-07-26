-- Optional: bake profiles.status into the JWT so lib/supabase/middleware.ts
-- can check suspension without a DB round trip on every request.
--
-- This function is safe to apply on its own — it does nothing until you
-- also enable it in the Supabase Dashboard under
-- Authentication > Hooks > "Customize Access Token (JWT) Claims Hook",
-- selecting `public.custom_access_token_hook`. Until that dashboard step is
-- done, the app keeps using its current (already cheap, single indexed-row)
-- per-request query and behaves exactly as before.
--
-- After enabling the hook, update lib/supabase/middleware.ts to read the
-- `user_status` claim from the session's access token instead of querying
-- `profiles` directly, with a fallback to the DB query if the claim is
-- absent (e.g. for sessions issued before the hook was enabled).

create or replace function public.custom_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
declare
  claims jsonb;
  user_status text;
begin
  select status into user_status
  from public.profiles
  where id = (event ->> 'user_id')::uuid;

  claims := coalesce(event -> 'claims', '{}'::jsonb);
  claims := jsonb_set(claims, '{user_status}', to_jsonb(coalesce(user_status, 'active')));

  return jsonb_set(event, '{claims}', claims);
end;
$$;

grant usage on schema public to supabase_auth_admin;
grant execute on function public.custom_access_token_hook to supabase_auth_admin;
revoke execute on function public.custom_access_token_hook from authenticated, anon, public;
