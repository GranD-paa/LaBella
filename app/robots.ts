import type { MetadataRoute } from "next";

import { getStaticSiteUrl } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
  const site = getStaticSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Everything behind the session cookie is either private to one
        // learner or an admin surface. None of it should be crawled, and the
        // middleware would only serve a login redirect anyway.
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
