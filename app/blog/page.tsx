import type { Metadata } from "next";
import Link from "next/link";

import { BlogPostCard } from "@/components/blog/blog-post-card";
import { BlogShell } from "@/components/blog/blog-shell";
import { getDataRepository } from "@/lib/data";
import { getStaticSiteUrl } from "@/lib/seo/site-url";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export const metadata: Metadata = {
  title: "وبلاگ لاپارلی — راهنمای یادگیری زبان",
  description:
    "مقاله‌های کاربردی دربارهٔ یادگیری زبان: روش مطالعه، دستور زبان، واژگان و نکته‌های سفر — به زبان ساده و بدون کلیشه.",
  alternates: {
    canonical: `${getStaticSiteUrl()}/blog`,
    types: {
      "application/rss+xml": `${getStaticSiteUrl()}/blog/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    title: "وبلاگ لاپارلی",
    description: "مقاله‌های کاربردی دربارهٔ یادگیری زبان.",
    url: `${getStaticSiteUrl()}/blog`,
  },
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const categorySlug = params.category;

  const repo = getDataRepository();

  // `/blog` is linked from the landing header, so it must not 500 on a
  // database that has not had db/004_landing_and_blog.sql run against it yet.
  // The error still reaches the container logs; the page just degrades to its
  // empty state instead of taking a public route down.
  const [{ posts, total }, categories] = await Promise.all([
    repo
      .getPublishedBlogPosts({
        categorySlug,
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
      })
      .catch((error) => {
        console.error("[blog] failed to load posts", error);
        return { posts: [], total: 0 };
      }),
    repo.getBlogCategories().catch((error) => {
      console.error("[blog] failed to load categories", error);
      return [];
    }),
  ]);

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <BlogShell>
      <header className="border-b border-white/10 pb-10">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">
          وبلاگ
        </p>
        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
          {activeCategory ? activeCategory.name : "راهنمای یادگیری زبان"}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {activeCategory?.description ??
            "هرچه در مسیر یادگیری زبان به کارت می‌آید — روش مطالعه، قاعده‌های دستوری، واژگان و نکته‌های سفر."}
        </p>
      </header>

      <nav aria-label="دسته‌بندی‌ها" className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={cn(
            "inline-flex min-h-9 items-center rounded-full px-4 text-sm transition-colors",
            !categorySlug
              ? "bg-primary text-primary-foreground"
              : "border border-white/15 text-muted-foreground hover:text-white"
          )}
        >
          همه
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog?category=${category.slug}`}
            className={cn(
              "inline-flex min-h-9 items-center rounded-full px-4 text-sm transition-colors",
              categorySlug === category.slug
                ? "bg-primary text-primary-foreground"
                : "border border-white/15 text-muted-foreground hover:text-white"
            )}
          >
            {category.name}
          </Link>
        ))}
      </nav>

      {posts.length === 0 ? (
        <p className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-muted-foreground">
          هنوز مطلبی در این بخش منتشر نشده است.
        </p>
      ) : (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <BlogPostCard post={post} categories={categories} />
            </li>
          ))}
        </ul>
      )}

      {pageCount > 1 ? (
        <nav
          aria-label="صفحه‌بندی"
          className="mt-14 flex items-center justify-center gap-2"
        >
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (number) => {
              const href = new URLSearchParams();
              if (categorySlug) href.set("category", categorySlug);
              if (number > 1) href.set("page", String(number));
              const query = href.toString();

              return (
                <Link
                  key={number}
                  href={query ? `/blog?${query}` : "/blog"}
                  aria-current={number === page ? "page" : undefined}
                  className={cn(
                    "inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm transition-colors",
                    number === page
                      ? "bg-primary text-primary-foreground"
                      : "border border-white/15 text-muted-foreground hover:text-white"
                  )}
                >
                  {number.toLocaleString("fa-IR")}
                </Link>
              );
            }
          )}
        </nav>
      ) : null}
    </BlogShell>
  );
}
