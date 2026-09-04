import type { MetadataRoute } from "next";

import { isSiteIndexable } from "@/lib/seo/indexing";
import { getStaticSiteUrl } from "@/lib/seo/site-url";

/**
 * Rendered per request, not at build time, so `SITE_INDEXABLE` can be flipped
 * on the container without rebuilding the image.
 */
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const site = getStaticSiteUrl();

  // Closed until launch. The sitemap is left unadvertised on purpose — there
  // is no point handing a crawler a list of pages it is being asked not to
  // fetch. The `X-Robots-Tag` set in `middleware.ts` is what actually keeps
  // these pages out of the index; this file only asks politely.
  if (!isSiteIndexable()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      host: site,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Everything behind the session cookie is either private to one
        // learner or an admin surface. None of it should be crawled, and the
        // middleware would only serve a sign-up redirect anyway.
        disallow: [
          "/admin",
          "/api",
          "/dashboard",
          "/menu",
          "/profile",
          "/lesson",
          "/quiz",
          "/learn",
          "/login",
          "/sign-up",
        ],
      },
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
