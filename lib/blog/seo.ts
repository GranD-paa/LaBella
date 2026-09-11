import { countWords, markdownToPlainText } from "@/lib/blog/markdown";
import { resolveBlogLanguages } from "@/lib/blog/languages";
import type { BlogCategory, BlogPost } from "@/lib/blog/types";

/**
 * Structured data for the blog.
 *
 * ## What this targets, as of 2026
 *
 * The market these pages compete in stopped being ten blue links. A Persian
 * query about Italian articles is answered above the results by a generated
 * summary that cites a handful of sources, and being one of those citations is
 * worth more than the fourth organic position underneath it. What decides
 * whether a page gets cited is, in order: whether a machine can tell what the
 * page is, who wrote it, and which passage answers the question.
 *
 * So the emphasis here is deliberate:
 *
 * - **`BlogPosting` with a real author and publisher.** The single highest-value
 *   markup left. It is what carries the experience-and-authorship signals into
 *   an answer engine, and it survived every deprecation round.
 * - **`abstract`.** The post's own two-sentence answer, written by the author.
 *   A model quoting a page prefers a short self-contained statement to a
 *   paragraph it has to cut down itself.
 * - **`speakable`.** No rich result attached to it, no visible reward in the
 *   SERP — it is a pure machine signal marking the passages that stand on
 *   their own, and pages carrying it get quoted rather than paraphrased.
 * - **`BreadcrumbList`.** Still rendered, still one of the surviving core types.
 * - **Entities with stable `@id`s.** The organisation is declared once and
 *   referenced by id everywhere else, so a crawler resolves one publisher
 *   across the whole site rather than a new one per page.
 *
 * What is deliberately absent is as considered as what is here. There is no
 * `FAQPage`: Google stopped rendering FAQ rich results in May 2026, and marking
 * up questions the article does not actually ask is how a site ends up with
 * structured data that contradicts its own page — the one thing guaranteed to
 * cost more than it earns.
 */

/** Anything with an `@type`, which is everything here. */
type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = (site: string) => `${site}/#organization`;
const BLOG_ID = (site: string) => `${site}/blog#blog`;

/**
 * The publisher, declared once.
 *
 * Emitted in full on the blog index and referenced by `@id` from every post,
 * which is what lets a crawler treat the organisation behind two hundred posts
 * as one entity instead of two hundred identically-named ones.
 */
export function organizationJsonLd(site: string): JsonLd {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID(site),
    name: "Laparli",
    alternateName: "لاپارلی",
    url: site,
    logo: {
      "@type": "ImageObject",
      url: `${site}/icons/icon-192.svg`,
    },
    description:
      "آموزش آنلاین زبان برای فارسی‌زبان‌ها: ویدیوی کوتاه با زیرنویس دوزبانه، دستور زبان، واژگان و آزمون.",
  };
}

export function blogEntityJsonLd(site: string): JsonLd {
  return {
    "@type": "Blog",
    "@id": BLOG_ID(site),
    name: "وبلاگ لاپارلی",
    url: `${site}/blog`,
    inLanguage: "fa-IR",
    publisher: { "@id": ORGANIZATION_ID(site) },
  };
}

export type BreadcrumbStep = { name: string; url: string };

export function breadcrumbJsonLd(steps: BreadcrumbStep[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: steps.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: step.url,
    })),
  };
}

export function postUrl(site: string, post: BlogPost): string {
  return post.canonicalUrl ?? `${site}/blog/${encodeURIComponent(post.slug)}`;
}

/** The description a post shows in a search result, in preference order. */
export function postDescription(post: BlogPost): string {
  return (
    post.metaDescription ??
    post.summary ??
    post.excerpt ??
    markdownToPlainText(post.content, 160)
  );
}

export function postImage(post: BlogPost): string | null {
  return post.ogImageUrl ?? post.coverImageUrl ?? null;
}

/**
 * Everything a machine should know about one post.
 *
 * `wordCount` and `timeRequired` both appear because they answer different
 * questions — how substantial the piece is, and how long it asks for — and
 * because a thin post that claims otherwise is easy to catch, which is exactly
 * why the numbers are computed from the content rather than typed in.
 */
export function blogPostingJsonLd({
  post,
  site,
  categories,
}: {
  post: BlogPost;
  site: string;
  categories: BlogCategory[];
}): JsonLd {
  const url = postUrl(site, post);
  const image = postImage(post);
  const languages = resolveBlogLanguages(post.languageSlugs);

  const sections = categories
    .filter((category) => post.categorySlugs.includes(category.slug))
    .map((category) => category.name);

  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    name: post.title,
    description: postDescription(post),
    ...(post.summary ? { abstract: post.summary } : {}),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(image ? { image: [image] } : {}),
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt,
    inLanguage: "fa-IR",
    wordCount: countWords(post.content),
    ...(post.readingMinutes
      ? // ISO 8601 duration. "PT7M" is how a machine reads "seven minutes".
        { timeRequired: `PT${post.readingMinutes}M` }
      : {}),
    ...(sections.length > 0
      ? { articleSection: sections.length === 1 ? sections[0] : sections }
      : {}),
    ...(languages.length > 0
      ? {
          // What the post is *about*, as opposed to what it is written in.
          // `inLanguage` above is Persian for every post on this blog; these
          // are the languages the post teaches.
          about: languages.map((language) => ({
            "@type": "Language",
            name: language.name,
            alternateName: language.nativeName,
          })),
          keywords: [...sections, ...languages.map((l) => l.name)].join("، "),
        }
      : sections.length > 0
        ? { keywords: sections.join("، ") }
        : {}),
    author: post.authorName
      ? { "@type": "Person", name: post.authorName }
      : { "@id": ORGANIZATION_ID(site) },
    publisher: { "@id": ORGANIZATION_ID(site) },
    isPartOf: { "@id": BLOG_ID(site) },
    // The two passages that are safe to read aloud or quote whole: the
    // headline, and the summary box under it. Everything below them is prose
    // that depends on what came before.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: post.summary
        ? ["#post-title", "#post-summary"]
        : ["#post-title"],
    },
  };
}

/**
 * A list page — the index, a category, a language hub.
 *
 * `ItemList` rather than a bare `CollectionPage` because the order is real:
 * these pages are sorted newest-first (or featured-first on the index), and
 * saying so is what stops a crawler treating the ten links as an unordered
 * pile and guessing which one leads.
 */
export function collectionJsonLd({
  site,
  url,
  name,
  description,
  posts,
}: {
  site: string;
  url: string;
  name: string;
  description: string;
  posts: BlogPost[];
}): JsonLd {
  return {
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name,
    description,
    inLanguage: "fa-IR",
    isPartOf: { "@id": BLOG_ID(site) },
    publisher: { "@id": ORGANIZATION_ID(site) },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListOrder: "https://schema.org/ItemListOrderDescending",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: postUrl(site, post),
        name: post.title,
      })),
    },
  };
}

/**
 * Wraps a set of entities into one `@graph` document.
 *
 * One script tag holding a graph, rather than four tags holding four islands:
 * inside a graph the `@id` references above actually resolve, so "this post's
 * publisher" and "this blog's publisher" are demonstrably the same node rather
 * than two that happen to share a name.
 */
export function jsonLdGraph(entities: JsonLd[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": entities,
  });
}
