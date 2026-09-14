import { revalidatePath } from "next/cache";

/**
 * Clears the cached copy of every page a post appears on.
 *
 * A post is not one page. It is the post itself, the index, the category page
 * for each of its categories, the hub for each of its languages, the feed, and
 * the sitemap — and the blog refactor turned the categories and hubs into real
 * routes, so revalidating `/blog` alone now leaves six stale pages behind
 * instead of none. Editing a post used to be the only way to notice.
 *
 * Called with no arguments when a post is deleted: the slug is gone, and
 * everything a deletion could affect is in the list below anyway.
 *
 * Lives here rather than next to the admin action because the blog agent
 * publishes through the same repository and owes the cache the same courtesy.
 * Two copies of this list would drift, and the symptom of the drift — one
 * publishing path leaving a stale hub behind and the other not — is the kind
 * that takes a day to see.
 */
export function revalidateBlog(
  slug?: string,
  categorySlugs: string[] = [],
  languageSlugs: string[] = []
) {
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/blog/rss.xml");
  revalidatePath("/llms.txt");

  if (slug) revalidatePath(`/blog/${slug}`);

  for (const categorySlug of categorySlugs) {
    revalidatePath(`/blog/category/${categorySlug}`);
  }
  for (const languageSlug of languageSlugs) {
    revalidatePath(`/blog/language/${languageSlug}`);
  }
}
