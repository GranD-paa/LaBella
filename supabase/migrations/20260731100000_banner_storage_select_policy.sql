-- Admin-side Storage operations (list, replace, remove) go through the
-- Storage API, which needs to SELECT a row before it can update/delete it.
-- Without a SELECT policy on storage.objects, RLS silently hides every row
-- from that lookup, so update/remove calls report success while actually
-- affecting zero rows — this fixes banner deletion leaving orphaned files.

drop policy if exists "Admins can view banner image objects" on storage.objects;
create policy "Admins can view banner image objects"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'banners' and private.is_admin());
