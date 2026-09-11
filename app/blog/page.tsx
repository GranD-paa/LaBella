import type { Metadata } from "next";

import { BlogListView } from "@/components/blog/blog-list-view";
import { BlogShell } from "@/components/blog/blog-shell";
import { loadBlogList } from "@/lib/blog/load";
import {
  blogEntityJsonLd,
  breadcrumbJsonLd,
  collectionJsonLd,
  jsonLdGraph,
  organizationJsonLd,
} from "@/lib/blog/seo";
import { getStaticSiteUrl } from "@/lib/seo/site-url";

const TITLE = "وبلاگ لاپارلی — راهنمای یادگیری زبان";
const DESCRIPTION =
  "مقاله‌های کاربردی دربارهٔ یادگیری زبان: روش مطالعه، دستور زبان، واژگان و نکته‌های سفر — به زبان ساده و بدون کلیشه.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${getStaticSiteUrl()}/blog`,
    types: {
      "application/rss+xml": `${getStaticSiteUrl()}/blog/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: `${getStaticSiteUrl()}/blog`,
    siteName: "Laparli",
    locale: "fa_IR",
  },
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;

  const { posts, categories, page, pageCount } = await loadBlogList({
    page: params.page,
    // `?category=` was the old shape of this page and links to it are out
    // there. The filter still works, so an old bookmark shows the right posts;
    // new links are paths under /blog/category, which is the shape a crawler
    // indexes properly and a reader can read.
    categorySlug: params.category,
    featuredFirst: true,
  });

  const site = getStaticSiteUrl();

  return (
    <BlogShell categories={categories} activeCategory={params.category}>
      <script
        type="application/ld+json"
        // Built from our own database above, never from user input, and
        // JSON.stringify escapes every value it writes.
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph([
            organizationJsonLd(site),
            blogEntityJsonLd(site),
            collectionJsonLd({
              site,
              url: `${site}/blog`,
              name: "وبلاگ لاپارلی",
              description: DESCRIPTION,
              posts,
            }),
            breadcrumbJsonLd([
              { name: "خانه", url: site },
              { name: "وبلاگ", url: `${site}/blog` },
            ]),
          ]),
        }}
      />

      <BlogListView
        eyebrow="وبلاگ"
        title="راهنمای یادگیری زبان"
        description="هرچه در مسیر یادگیری زبان به کارت می‌آید — روش مطالعه، قاعده‌های دستوری، واژگان و نکته‌های سفر."
        posts={posts}
        categories={categories}
        page={page}
        pageCount={pageCount}
        basePath="/blog"
      />
    </BlogShell>
  );
}
