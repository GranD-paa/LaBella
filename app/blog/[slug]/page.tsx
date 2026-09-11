import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { BlogCta } from "@/components/blog/blog-cta";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { BlogShare } from "@/components/blog/blog-share";
import { BlogShell } from "@/components/blog/blog-shell";
import { BlogToc } from "@/components/blog/blog-toc";
import { formatBlogDate } from "@/lib/blog/format";
import { resolveBlogLanguages } from "@/lib/blog/languages";
import { extractImageUrls, renderPost } from "@/lib/blog/markdown";
import {
  blogEntityJsonLd,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  jsonLdGraph,
  organizationJsonLd,
  postDescription,
  postImage,
  postUrl,
} from "@/lib/blog/seo";
import { getDataRepository } from "@/lib/data";
import { blogImageIdFromUrl } from "@/lib/data/blog-image";
import { getStaticSiteUrl } from "@/lib/seo/site-url";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDataRepository().getPublishedBlogPostBySlug(
    decodeURIComponent(slug)
  );

  if (!post) return { title: "مطلب پیدا نشد" };

  const site = getStaticSiteUrl();
  const url = postUrl(site, post);
  const title = post.metaTitle ?? post.title;
  const description = postDescription(post);
  const image = postImage(post);

  return {
    title,
    description,
    alternates: { canonical: url },
    /**
     * `noindex` is the admin's own switch for posts that shouldn't rank —
     * landing-page duplicates, thin announcements, anything time-boxed.
     *
     * Spread-or-nothing, never `robots: undefined`. Next merges child metadata
     * over the parent's by key, and a key that is *present* wins even when its
     * value is undefined — so `robots: undefined` here does not mean "inherit",
     * it means "delete whatever the root layout said". The root layout is what
     * puts `noindex` on every page while the site is closed before launch, and
     * writing it that way silently took that tag off every article: the index
     * and the landing page carried it, article pages did not.
     *
     * The `X-Robots-Tag` header from middleware.ts still covered them, and
     * that is the signal that actually binds. But the meta tag is the layer a
     * reader can see in View Source, and losing it by accident is not a thing
     * to leave standing.
     */
    ...(post.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: post.authorName ? [post.authorName] : undefined,
      // The dimensions matter: a card without them is a link preview the
      // network has to guess the aspect of, and most guess wrong and crop.
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: post.coverImageAlt ?? post.title }]
        : undefined,
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

  // The images this post's markdown references, so each one can be rendered at
  // its true size. Only ids this app hosts — an image on someone else's server
  // has no row here and simply goes without dimensions.
  const referencedIds = extractImageUrls(post.content)
    .map(blogImageIdFromUrl)
    .filter((id): id is string => Boolean(id));

  const [categories, related, images] = await Promise.all([
    repo.getBlogCategories(),
    repo.getPublishedBlogPosts({
      categorySlug: post.categorySlugs[0],
      languageSlug: post.categorySlugs[0] ? undefined : post.languageSlugs[0],
      excludeId: post.id,
      limit: 3,
    }),
    repo.getBlogImagesByIds(referencedIds).catch((error) => {
      console.error("[blog] failed to load image dimensions", error);
      return [];
    }),
  ]);

  const imageDimensions = new Map(
    images.map((image) => [
      image.url,
      { width: image.width, height: image.height },
    ])
  );

  const site = getStaticSiteUrl();
  const url = postUrl(site, post);
  const { html, toc } = renderPost(post.content, { imageDimensions });

  const postCategories = categories.filter((category) =>
    post.categorySlugs.includes(category.slug)
  );
  const languages = resolveBlogLanguages(post.languageSlugs);
  const primaryCategory = postCategories[0];

  return (
    <BlogShell
      categories={categories}
      activeCategory={primaryCategory?.slug}
      showProgress
    >
      <script
        type="application/ld+json"
        // Built from our own database above, not from user input, and
        // JSON.stringify escapes every value it writes.
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph([
            organizationJsonLd(site),
            blogEntityJsonLd(site),
            blogPostingJsonLd({ post, site, categories }),
            breadcrumbJsonLd([
              { name: "خانه", url: site },
              { name: "وبلاگ", url: `${site}/blog` },
              ...(primaryCategory
                ? [
                    {
                      name: primaryCategory.name,
                      url: `${site}/blog/category/${encodeURIComponent(
                        primaryCategory.slug
                      )}`,
                    },
                  ]
                : []),
              { name: post.title, url },
            ]),
          ]),
        }}
      />

      {/* Visible breadcrumbs, matching the markup above. A trail a reader can
          see and a trail a crawler is told about should be the same trail. */}
      <nav aria-label="مسیر" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/blog" className="hover:text-foreground">
              وبلاگ
            </Link>
          </li>
          {primaryCategory ? (
            <li className="flex items-center gap-1">
              <ChevronLeft aria-hidden className="h-3.5 w-3.5 opacity-50" />
              <Link
                href={`/blog/category/${encodeURIComponent(
                  primaryCategory.slug
                )}`}
                className="hover:text-foreground"
              >
                {primaryCategory.name}
              </Link>
            </li>
          ) : null}
        </ol>
      </nav>

      {/*
        The magazine layout. One narrow reading column centred in the page, with
        the share rail parked in the margin beside it on a wide screen and
        folded above the article on a narrow one. The column is the whole
        design decision: an article body that runs the full width of a desktop
        window is the most reliable way to lose a reader halfway down it.
      */}
      <div className="mt-8 lg:grid lg:grid-cols-[3.5rem_minmax(0,1fr)] lg:gap-8">
        <div className="mb-8 lg:order-first lg:mb-0">
          <BlogShare title={post.title} url={url} />
        </div>

        <article className="mx-auto w-full max-w-[46rem]">
          {/*
            The masthead is centred and the article body is not, which is the
            oldest trick in magazine layout: a centred block reads as a title
            page and everything under it reads as the piece itself. Centring
            the prose too would be the mistake — a centred paragraph gives the
            eye no fixed edge to return to at the end of each line.
          */}
          <header className="text-center">
            {postCategories.length > 0 || languages.length > 0 ? (
              <div className="mb-5 flex flex-wrap justify-center gap-2">
                {postCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/blog/category/${encodeURIComponent(category.slug)}`}
                    className="inline-flex min-h-8 items-center rounded-full bg-[hsl(var(--blog-accent)/0.12)] px-3.5 text-xs font-semibold text-[hsl(var(--blog-accent))] transition-colors hover:bg-[hsl(var(--blog-accent)/0.2)]"
                  >
                    {category.name}
                  </Link>
                ))}
                {languages.map((language) => (
                  <Link
                    key={language.slug}
                    href={`/blog/language/${language.slug}`}
                    className="inline-flex min-h-8 items-center rounded-full border border-[hsl(var(--blog-hairline))] px-3.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {language.name}
                  </Link>
                ))}
              </div>
            ) : null}

            <h1
              id="post-title"
              className="text-3xl font-bold leading-[1.25] tracking-tight text-foreground sm:text-4xl lg:text-[2.9rem]"
            >
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="mx-auto mt-5 max-w-[36rem] text-lg leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-y border-[hsl(var(--blog-hairline))] py-4 text-sm text-muted-foreground">
              {post.authorName ? (
                <span className="font-medium text-foreground">
                  {post.authorName}
                </span>
              ) : null}
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

            {post.coverImageUrl ? (
              // Admin-supplied host, so a plain <img> rather than next/image —
              // see blog-post-card.tsx. Eager and high priority because this is
              // the Largest Contentful Paint element on an article page, and
              // the metric is measured on exactly this element.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImageUrl}
                alt={post.coverImageAlt ?? ""}
                className="mt-8 aspect-[16/9] w-full rounded-2xl border border-[hsl(var(--blog-hairline))] object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            ) : null}
          </header>

          {/*
            The answer, before the argument for it. A reader who wanted one
            fact has it in two lines; a machine summarising the page has a
            self-contained statement to quote rather than a paragraph it must
            cut down itself. The id is what `speakable` in the structured data
            points at.
          */}
          {post.summary ? (
            <div
              id="post-summary"
              // `text-start` explicitly: this sits directly under the centred
              // header, and inheriting its alignment would centre a paragraph.
              className="mt-9 rounded-2xl border-s-[3px] border-[hsl(var(--blog-accent))] bg-[hsl(var(--blog-wash))] p-5 text-start sm:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--blog-accent))]">
                خلاصه
              </p>
              <p className="mt-2.5 text-[1.05rem] leading-relaxed text-foreground">
                {post.summary}
              </p>
            </div>
          ) : null}

          <BlogToc entries={toc} />

          <div
            className="blog-prose mt-10"
            // `renderPost` drops raw HTML and allowlists link/image URLs, so
            // what reaches here is markdown-derived markup only.
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <BlogCta language={languages[0]} />

          {related.posts.length > 0 ? (
            <section className="mt-16 border-t border-[hsl(var(--blog-hairline))] pt-10">
              <h2 className="text-lg font-bold text-foreground">
                مطالب مرتبط
              </h2>
              <ul className="mt-6 grid gap-6 sm:grid-cols-3">
                {related.posts.map((entry) => (
                  <li key={entry.id}>
                    <BlogPostCard
                      post={entry}
                      categories={categories}
                      variant="compact"
                    />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </div>
    </BlogShell>
  );
}
