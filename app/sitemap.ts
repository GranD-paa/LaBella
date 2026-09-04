import type { MetadataRoute } from "next";

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

  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const { posts } = await getDataRepository().getPublishedBlogPosts({
      limit: 1000,
    });
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
    // routes are still worth serving.
  }

  return [...staticRoutes, ...postRoutes];
}
