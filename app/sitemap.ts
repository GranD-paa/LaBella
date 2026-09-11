import type { MetadataRoute } from "next";

import { BLOG_LANGUAGES } from "@/lib/blog/languages";
import { getDataRepository } from "@/lib/data";
import { getStaticSiteUrl } from "@/lib/seo/site-url";

/**
 * The sitemap is generated per request rather than at build time, because the
 * blog is edited from the admin panel — a build-time sitemap would go stale the
 * moment a post is published and only refresh on the next deploy.
 */
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getStaticSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${site}/subscription`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/about`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${site}/contact`, changeFrequency: "yearly", priority: 0.4 },
  ];

  // The course pages under `/learn` are deliberately absent. They are the
  // product itself: robots.txt disallows them and the middleware redirects
  // anyone without a session, so listing them here only ever offered a
  // crawler a door it is told not to open.

  // The language hubs are listed whether or not they have posts yet. They are
  // real pages with real copy — each one describes learning that language —
  // and a hub that has been known and crawled for months before its first post
  // lands is a hub with history behind it when the posts arrive.
  const languageRoutes: MetadataRoute.Sitemap = BLOG_LANGUAGES.map(
    (language) => ({
      url: `${site}/blog/language/${language.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  let categoryRoutes: MetadataRoute.Sitemap = [];
  let postRoutes: MetadataRoute.Sitemap = [];

  try {
    const repo = getDataRepository();
    const [{ posts }, categories] = await Promise.all([
      repo.getPublishedBlogPosts({ limit: 1000 }),
      repo.getBlogCategories(),
    ]);

    categoryRoutes = categories.map((category) => ({
      url: `${site}/blog/category/${encodeURIComponent(category.slug)}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    postRoutes = posts
      .filter((post) => !post.noindex)
      .map((post) => ({
        url: `${site}/blog/${encodeURIComponent(post.slug)}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch {
    // A database hiccup shouldn't take the whole sitemap down; the static
    // routes and the hubs are still worth serving.
  }

  return [...staticRoutes, ...languageRoutes, ...categoryRoutes, ...postRoutes];
}
