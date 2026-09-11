import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { BlogListView } from "@/components/blog/blog-list-view";
import { BlogShell } from "@/components/blog/blog-shell";
import { getBlogLanguage } from "@/lib/blog/languages";
import { loadBlogList } from "@/lib/blog/load";
import {
  breadcrumbJsonLd,
  collectionJsonLd,
  jsonLdGraph,
} from "@/lib/blog/seo";
import { getStaticSiteUrl } from "@/lib/seo/site-url";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

/**
 * One page per language the site teaches.
 *
 * This is the piece of Babbel's magazine worth copying most. Their topics —
 * Learn, Culture, Fun — are how an existing reader browses; their language
 * hubs are how a stranger arrives. Nobody searches for "culture"; people
 * search for "یادگیری ایتالیایی", and a hub is a page that can answer that
 * query with a headline, a real description, and thirty posts underneath it.
 *
 * The hubs exist whether or not they have posts yet, and are listed in the
 * navigation from day one, which is what lets each one accumulate links and
 * history while the posts are still being written.
 *
 * ## Rendered per request, like the rest of the blog
 *
 * The obvious move here is `generateStaticParams` — six known slugs, six pages
 * that could be built once. It is the wrong one. The list of posts on a hub
 * comes out of the database, so a build-time render captures whatever was
 * published the moment the image was built; and this app's container runs an
 * image pinned to a commit SHA, so "until the next build" means "until someone
 * deploys", not "until the next visitor". Publishing a post about German would
 * leave the German hub showing the posts from the last deploy, silently and
 * indefinitely.
 *
 * So the slug list stays a runtime lookup and the page is dynamic. The static
 * half — that these six hubs exist and what they are called — is still known
 * at build time, and `sitemap.ts` is where that belongs.
 */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const language = getBlogLanguage(decodeURIComponent(slug));
  if (!language) return { title: "زبان پیدا نشد" };

  const site = getStaticSiteUrl();
  const url = `${site}/blog/language/${language.slug}`;
  const title = `یادگیری ${language.name} — وبلاگ لاپارلی`;

  return {
    title,
    description: language.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description: language.description,
      url,
      siteName: "Laparli",
      locale: "fa_IR",
    },
  };
}

export default async function BlogLanguagePage({ params, searchParams }: Props) {
  const { slug: rawSlug } = await params;
  const language = getBlogLanguage(decodeURIComponent(rawSlug));
  if (!language) notFound();

  const query = await searchParams;
  const { posts, categories, page, pageCount } = await loadBlogList({
    page: query.page,
    languageSlug: language.slug,
  });

  const site = getStaticSiteUrl();
  const url = `${site}/blog/language/${language.slug}`;
  const title = `یادگیری ${language.name}`;

  return (
    <BlogShell categories={categories} activeLanguage={language.slug}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph([
            {
              ...collectionJsonLd({
                site,
                url,
                name: title,
                description: language.description,
                posts,
              }),
              // What the page is about, as an entity rather than a word in a
              // sentence — the difference between a crawler reading "ایتالیایی"
              // and a crawler resolving the Italian language.
              about: {
                "@type": "Language",
                name: language.name,
                alternateName: language.nativeName,
              },
            },
            breadcrumbJsonLd([
              { name: "خانه", url: site },
              { name: "وبلاگ", url: `${site}/blog` },
              { name: language.name, url },
            ]),
          ]),
        }}
      />

      <BlogListView
        eyebrow={language.nativeName}
        title={title}
        description={language.description}
        posts={posts}
        categories={categories}
        page={page}
        pageCount={pageCount}
        basePath={`/blog/language/${language.slug}`}
        emptyMessage={`هنوز مطلبی دربارهٔ ${language.name} منتشر نشده است. به‌زودی.`}
      >
        {language.courseHref ? (
          <Link
            href={language.courseHref}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            دیدن دورهٔ {language.name}
            <ArrowLeft aria-hidden className="h-4 w-4" />
          </Link>
        ) : (
          <p className="mt-6 inline-flex items-center rounded-full border border-[hsl(var(--blog-hairline))] px-4 py-2 text-sm text-muted-foreground">
            دورهٔ {language.name} هنوز باز نشده — فعلاً مطالب وبلاگ.
          </p>
        )}
      </BlogListView>
    </BlogShell>
  );
}
