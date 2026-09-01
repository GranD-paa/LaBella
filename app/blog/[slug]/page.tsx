import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogShell } from "@/components/blog/blog-shell";
import { formatBlogDate } from "@/lib/blog/format";
import { markdownToPlainText, renderMarkdown } from "@/lib/blog/markdown";
import { getDataRepository } from "@/lib/data";
import { getStaticSiteUrl } from "@/lib/seo/site-url";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDataRepository().getPublishedBlogPostBySlug(
    decodeURIComponent(slug)
  );

  if (!post) return { title: "مطلب پیدا نشد" };

  const site = getStaticSiteUrl();
  const url = post.canonicalUrl ?? `${site}/blog/${post.slug}`;
  const title = post.metaTitle ?? post.title;
  const description =
    post.metaDescription ??
    post.excerpt ??
    markdownToPlainText(post.content, 160);
  const image = post.ogImageUrl ?? post.coverImageUrl ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    // `noindex` is the admin's own switch for posts that shouldn't rank —
    // landing-page duplicates, thin announcements, anything time-boxed.
    robots: post.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: post.authorName ? [post.authorName] : undefined,
      images: image ? [image] : undefined,
      siteName: "Laparli",
      locale: "fa_IR",
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const repo = getDataRepository();

  const post = await repo.getPublishedBlogPostBySlug(decodeURIComponent(slug));
  if (!post) notFound();

  const [categories, related] = await Promise.all([
    repo.getBlogCategories(),
    repo.getPublishedBlogPosts({
      categorySlug: post.categorySlugs[0],
      limit: 4,
    }),
  ]);

  const site = getStaticSiteUrl();
  const url = post.canonicalUrl ?? `${site}/blog/${post.slug}`;
  const html = renderMarkdown(post.content);
  const postCategories = categories.filter((category) =>
    post.categorySlugs.includes(category.slug)
  );

  // Article + breadcrumb structured data. Google uses these to render the
  // byline, date and breadcrumb trail in results instead of guessing them.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description:
        post.metaDescription ??
        post.excerpt ??
        markdownToPlainText(post.content, 160),
      image: post.ogImageUrl ?? post.coverImageUrl ?? undefined,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      inLanguage: "fa-IR",
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      author: {
        "@type": post.authorName ? "Person" : "Organization",
        name: post.authorName ?? "Laparli",
      },
      publisher: {
        "@type": "Organization",
        name: "Laparli",
        logo: { "@type": "ImageObject", url: `${site}/logo-mark.svg` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "خانه", item: site },
        {
          "@type": "ListItem",
          position: 2,
          name: "وبلاگ",
          item: `${site}/blog`,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  const relatedPosts = related.posts.filter((entry) => entry.id !== post.id);

  return (
    <BlogShell>
      <script
        type="application/ld+json"
        // Structured data is built from our own database above, not from user
        // input, and JSON.stringify escapes the values it contains.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="مسیر" className="text-sm text-muted-foreground">
        <Link href="/blog" className="hover:text-white">
          وبلاگ
        </Link>
        {postCategories[0] ? (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/blog?category=${postCategories[0].slug}`}
              className="hover:text-white"
            >
              {postCategories[0].name}
            </Link>
          </>
        ) : null}
      </nav>

      <article className="mt-8">
        <header>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {post.authorName ? <span>{post.authorName}</span> : null}
            {post.publishedAt ? (
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt)}
              </time>
            ) : null}
            {post.readingMinutes ? (
              <span>
                {post.readingMinutes.toLocaleString("fa-IR")} دقیقه مطالعه
              </span>
            ) : null}
          </div>

          {post.excerpt ? (
            <p className="mt-7 border-s-2 border-primary ps-5 text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          ) : null}

          {post.coverImageUrl ? (
            // See blog-post-card.tsx: arbitrary admin-supplied hosts.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImageUrl}
              alt=""
              className="mt-9 w-full rounded-2xl border border-white/10 object-cover"
            />
          ) : null}
        </header>

        <div
          className="blog-prose mt-10"
          // `renderMarkdown` drops raw HTML and allowlists link/image URLs, so
          // what reaches here is markdown-derived markup only.
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {postCategories.length > 0 ? (
        <div className="mt-14 flex flex-wrap gap-2 border-t border-white/10 pt-8">
          {postCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog?category=${category.slug}`}
              className="inline-flex min-h-9 items-center rounded-full border border-white/15 px-4 text-sm text-muted-foreground transition-colors hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </div>
      ) : null}

      {relatedPosts.length > 0 ? (
        <section className="mt-16 border-t border-white/10 pt-12">
          <h2 className="text-xl font-semibold text-white">مطالب مرتبط</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedPosts.slice(0, 2).map((entry) => (
              <li key={entry.id}>
                <Link
                  href={`/blog/${entry.slug}`}
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-primary/40"
                >
                  <h3 className="font-semibold text-white">{entry.title}</h3>
                  {entry.excerpt ? (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {entry.excerpt}
                    </p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </BlogShell>
  );
}
