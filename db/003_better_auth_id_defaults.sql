-- Better Auth's four tables were created without a default on `id`, and the
-- library does not always supply one itself: sign-up inserts into "user" with
-- an explicit id but into "account" without one. The result is not a clean
-- not-null violation — the connection stalls with the statement showing as
-- `idle in transaction` on the server while the driver waits forever for a
-- result that never comes, so sign-up hangs instead of failing.
--
-- A database-side default fixes it for every table at once and is harmless
-- where Better Auth does send an id: the default is simply not used.

alter table "user" alter column id set default gen_random_uuid()::text;
alter table "session" alter column id set default gen_random_uuid()::text;
alter table "account" alter column id set default gen_random_uuid()::text;
alter table "verification" alter column id set default gen_random_uuid()::text;
