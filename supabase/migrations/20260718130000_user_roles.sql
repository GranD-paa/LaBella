-- User management: role tiers, account status, and stored email for the
-- admin user-management UI. `is_admin` remains the sole flag enforced by
-- application authorization (`requireAdmin()`); `role` is forward-looking
-- metadata for a future fine-grained permission system and is kept in sync
-- with `is_admin` (any role other than 'learner' implies `is_admin = true`).

alter table public.profiles
  add column if not exists email text,
  add column if not exists role text not null default 'learner',
  add column if not exists status text not null default 'active';

alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in (
    'learner',
    'limited_admin',
    'quiz_manager',
    'content_manager',
    'admin',
    'super_admin'
  ));

alter table public.profiles
  drop constraint if exists profiles_status_check;

alter table public.profiles
  add constraint profiles_status_check
  check (status in ('active', 'suspended'));

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_status_idx on public.profiles (status);

-- Backfill email for existing rows from auth.users.
update public.profiles p
set email = u.email
from auth.users u
where u.id = p.id and p.email is null;

-- Backfill role for accounts that were already admins before roles existed.
update public.profiles
set role = 'admin'
where is_admin = true and role = 'learner';

-- Store the signup email on the profile going forward.
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url',
    new.email
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Defense in depth: the original trigger only protected `is_admin` from
-- self-escalation. Replace it with one that also protects `role` and
-- `status`, so a non-admin can never grant themselves a privileged role or
-- lift their own suspension via the "update own profile" policy.
drop trigger if exists protect_profile_admin_flag on public.profiles;
drop function if exists private.protect_profile_admin_flag();

create or replace function private.protect_profile_privileged_fields()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then
    if new.is_admin is distinct from old.is_admin then
      new.is_admin := old.is_admin;
    end if;
    if new.role is distinct from old.role then
      new.role := old.role;
    end if;
    if new.status is distinct from old.status then
      new.status := old.status;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_privileged_fields on public.profiles;
create trigger protect_profile_privileged_fields
  before update on public.profiles
  for each row
  execute function private.protect_profile_privileged_fields();
