-- =========================================================================
-- 008: phone authentication
--
-- Run against the ArvanCloud cluster after 007. Additive and idempotent
-- except for the wipe at the bottom, which is fenced off and commented out.
--
-- The product used to prove an account with an email and a password and send
-- an SMS code nobody could type in anywhere. Now the number is the account:
-- one field, one code, and the branch between "sign in" and "sign up" is
-- decided by whether the number is already here.
--
-- That moves the SMS trigger out from behind a five-field form and into a
-- single public, unauthenticated field — which is the shape an SMS bomber
-- looks for. Most of this file exists to make that cheap for us and
-- expensive for them.
-- =========================================================================

-- -------------------------------------------------------------------------
-- Who the account belongs to
-- -------------------------------------------------------------------------

alter table public.profiles
  add column if not exists first_name text,
  add column if not exists last_name  text,
  add column if not exists birth_date date,
  add column if not exists phone      text,
  add column if not exists profile_completed_at timestamptz;

comment on column public.profiles.first_name is
  'Latin only, collected on /welcome. Kept apart from last_name because certificates and the Italian course material want them separately.';
comment on column public.profiles.phone is
  'E.164, mirrored from "user"."phoneNumber" by the trigger below so the admin panel and every report can read it without joining to the auth table.';
comment on column public.profiles.profile_completed_at is
  'Null until /welcome is finished. The middleware gate is a cookie; this column is the truth behind it.';

-- Two accounts cannot share a number: it is the credential.
create unique index if not exists profiles_phone_key
  on public.profiles (phone) where phone is not null;

-- -------------------------------------------------------------------------
-- Carry the number onto the profile row
--
-- Better Auth writes "phoneNumber" on "user"; nothing in the app ever read
-- it. Widening the existing trigger is cheaper than a second one, and keeps
-- profile creation a single statement.
-- -------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email, phone)
  values (new.id, new."name", new.image, new.email, new."phoneNumber")
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_user_created on public."user";
create trigger on_user_created
  after insert on public."user"
  for each row execute function public.handle_new_user();

-- -------------------------------------------------------------------------
-- What each send was aimed at
--
-- The per-IP rule that matters is not "how many messages" — a shared carrier
-- NAT sends plenty — it is "how many DIFFERENT numbers". A pumping script
-- walking a number range is invisible to a plain count and obvious to a
-- distinct count. That needs the target recorded on the IP row, which it
-- was not.
-- -------------------------------------------------------------------------

alter table public.send_attempts
  add column if not exists target text;

comment on column public.send_attempts.target is
  'The recipient this send was aimed at, recorded on every row including the ip and global ones, so distinct-recipient-per-IP can be counted.';

create index if not exists send_attempts_distinct_target_idx
  on public.send_attempts (channel, scope, subject, target, created_at desc);

-- -------------------------------------------------------------------------
-- Wrong codes
--
-- Better Auth's own allowedAttempts resets the moment a fresh code is
-- issued, so "request a code, guess three times, request another" walks a
-- six-digit space unimpeded. This table does not reset.
--
-- Separate from send_attempts on purpose: a failed guess is not a send, the
-- windows differ, and mixing them would make both counts lie.
-- -------------------------------------------------------------------------

create table if not exists public.otp_attempts (
  id bigserial primary key,
  phone text not null,
  succeeded boolean not null,
  created_at timestamptz not null default now()
);

comment on table public.otp_attempts is
  'One row per code entered, right or wrong. Wrong ones inside the window lock the number regardless of how many new codes were requested.';

create index if not exists otp_attempts_lookup_idx
  on public.otp_attempts (phone, created_at desc);

create index if not exists otp_attempts_created_at_idx
  on public.otp_attempts (created_at);

-- -------------------------------------------------------------------------
-- Spent challenges
--
-- The proof-of-work nonce is signed, so it needs no storage to be trusted —
-- but a signature it can present twice is a signature it can present a
-- thousand times. Inserting the nonce IS the check: the primary key makes
-- the second attempt fail, with no read and no race.
-- -------------------------------------------------------------------------

create table if not exists public.otp_challenges (
  nonce text primary key,
  used_at timestamptz not null default now()
);

comment on table public.otp_challenges is
  'Nonces already spent on an OTP request. Rows outlive the 120s challenge window by a wide margin and are swept with everything else.';

create index if not exists otp_challenges_used_at_idx
  on public.otp_challenges (used_at);

-- -------------------------------------------------------------------------
-- Clearing out the password era
--
-- Email-and-password sign-in is gone: there is no form for it, no action
-- behind it, and `emailAndPassword` is disabled in the Better Auth config.
-- Any account left over predates the phone rule and cannot sign in, so it
-- would sit there forever holding a unique email hostage.
--
-- Deliberately commented out. Deleting every user is not something a
-- migration file should do because someone re-ran it. Uncomment, run once,
-- comment back.
--
--   begin;
--   truncate public."session", public."account", public."verification";
--   delete from public."user";   -- profiles follow via on delete cascade
--   commit;
-- -------------------------------------------------------------------------
