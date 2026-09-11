import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogListView } from "@/components/blog/blog-list-view";
import { BlogShell } from "@/components/blog/blog-shell";
import { loadBlogList } from "@/lib/blog/load";
import {
  breadcrumbJsonLd,
  collectionJsonLd,
  jsonLdGraph,
} from "@/lib/blog/seo";
import { getDataRepository } from "@/lib/data";
import { getStaticSiteUrl } from "@/lib/seo/site-url";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

/**
 * A topic's own page, at its own address.
 *
 * This used to be `/blog?category=grammar`. A query parameter is a filter — a
 * crawler treats it as a variant of the page it hangs off and often declines to
 * index it separately, which means a site with five topics had one indexable
 * list page instead of six. `/blog/category/grammar` is a page about grammar,
 * and it can rank as one.
 */
async function findCategory(slug: string) {
  const categories = await getDataRepository()
    .getBlogCategories()
    .catch((error) => {
      console.error("[blog] failed to load categories", error);
      return [];
    });

  return {
    categories,
    category: categories.find((entry) => entry.slug === slug),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { category } = await findCategory(decodeURIComponent(slug));
  if (!category) return { title: "دسته‌بندی پیدا نشد" };

  const site = getStaticSiteUrl();
  const url = `${site}/blog/category/${encodeURIComponent(category.slug)}`;
  const description =
    category.description ??
    `مطالب وبلاگ لاپارلی در دستهٔ ${category.name} — راهنمای یادگیری زبان به زبان ساده.`;

  return {
    title: `${category.name} — وبلاگ لاپارلی`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${category.name} — وبلاگ لاپارلی`,
      description,
      url,
      siteName: "Laparli",
      locale: "fa_IR",
    },
  };
}

export default async function BlogCategoryPage({
  params,
  searchParams,
}: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const { category } = await findCategory(slug);

  // A category that is not in the table is a 404, not an empty list. An empty
  // list would invite a crawler to index one page per typo anyone ever linked.
  if (!category) notFound();

  const query = await searchParams;
  const { posts, categories, page, pageCount } = await loadBlogList({
    page: query.page,
    categorySlug: slug,
  });

  const site = getStaticSiteUrl();
  const url = `${site}/blog/category/${encodeURIComponent(slug)}`;
  const description =
    category.description ??
    `مطالب وبلاگ لاپارلی در دستهٔ ${category.name}.`;

  return (
    <BlogShell categories={categories} activeCategory={slug}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph([
            collectionJsonLd({
              site,
              url,
              name: category.name,
              description,
              posts,
            }),
            breadcrumbJsonLd([
              { name: "خانه", url: site },
              { name: "وبلاگ", url: `${site}/blog` },
              { name: category.name, url },
            ]),
          ]),
        }}
      />

      <BlogListView
        eyebrow="دسته‌بندی"
        title={category.name}
        description={description}
        posts={posts}
        categories={categories}
        page={page}
        pageCount={pageCount}
        basePath={`/blog/category/${encodeURIComponent(slug)}`}
        emptyMessage={`هنوز مطلبی در دستهٔ ${category.name} منتشر نشده است.`}
      />
    </BlogShell>
  );
}
