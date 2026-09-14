import { slugExists } from "@/lib/blog/agent/store";
import { getBlogLanguage } from "@/lib/blog/languages";
import { estimateReadingMinutes, markdownToPlainText } from "@/lib/blog/markdown";
import { slugifyTitle } from "@/lib/blog/types";
import { getDataRepository } from "@/lib/data";

/**
 * The last few steps every article goes through, whoever wrote it.
 *
 * There are two writers now — the in-container pipeline, and whatever is on
 * the other end of `/api/agent/blog/ingest` — and they must not each have
 * their own idea of how a post is stored. The parts that are easy to get
 * subtly wrong live here: making the slug unique, deriving the fields that
 * are functions of the content, and filtering the taxonomies against the
 * site's real lists.
 */

export type PublishableArticle = {
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  coverImageAlt: string | null;
  categorySlugs: string[];
  languageSlugs: string[];
};

/**
 * Makes the proposed slug unique.
 *
 * `blog_posts.slug` is unique, and comparing two models on one subject
 * deliberately produces several articles that all want the same slug — that
 * is the normal case here, not the edge case. Suffixing beats failing: the
 * duplicate is visible in the URL and the losers get deleted anyway.
 */
export async function uniqueSlug(
  proposed: string,
  notes: string[]
): Promise<string> {
  let candidate = proposed;
  for (let suffix = 2; suffix <= 20; suffix += 1) {
    if (!(await slugExists(candidate))) return candidate;
    candidate = `${proposed}-${suffix}`;
  }
  notes.push("نشانی یکتا پیدا نشد؛ از نشانی تصادفی استفاده شد.");
  return `${proposed}-${Date.now().toString(36)}`;
}

/**
 * Keeps only taxonomy slugs the site actually has.
 *
 * `lib/blog/languages.ts` drops an unknown language silently on the way out,
 * so an invented slug would not error — the post would simply never appear on
 * any hub, which is a bug that takes a week to notice. A category is worse:
 * with none at all the post is unreachable from every category page, so an
 * empty result falls back to the first real category rather than to nothing.
 */
export function resolveTaxonomies(
  categorySlugs: string[],
  languageSlugs: string[],
  known: { categories: { slug: string }[] },
  notes: string[]
): { categorySlugs: string[]; languageSlugs: string[] } {
  const valid = new Set(known.categories.map((category) => category.slug));
  const categories = categorySlugs.filter((slug) => valid.has(slug));

  if (categories.length === 0) {
    categories.push(known.categories[0]?.slug ?? "learning-tips");
    notes.push("دسته‌ی معتبری داده نشده بود؛ دسته‌ی پیش‌فرض اعمال شد.");
  }

  return {
    categorySlugs: categories,
    languageSlugs: languageSlugs.filter((slug) => Boolean(getBlogLanguage(slug))),
  };
}

/**
 * Writes the post.
 *
 * `excerpt` and `readingMinutes` are derived here rather than accepted from
 * the caller, exactly as `saveBlogPostAction` derives them rather than taking
 * them from the form: they are functions of the content and must never be
 * able to disagree with it. Neither of these paths goes through that action —
 * there is no signed-in admin behind a cron tick or a webhook — so the
 * derivation has to live somewhere both can reach.
 */
export async function publishArticle({
  article,
  slug,
  coverUrl,
  status,
  noindex,
  authorId,
}: {
  article: PublishableArticle;
  slug: string;
  coverUrl: string | null;
  status: "draft" | "published";
  noindex: boolean;
  authorId: string | null;
}): Promise<string> {
  const result = await getDataRepository().upsertBlogPost({
    slug,
    title: article.title,
    excerpt: markdownToPlainText(article.content, 180),
    summary: article.summary,
    content: article.content,
    coverImageUrl: coverUrl,
    coverImageAlt: coverUrl ? article.coverImageAlt : null,
    featured: false,
    status,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    canonicalUrl: null,
    ogImageUrl: coverUrl,
    noindex,
    categorySlugs: article.categorySlugs,
    languageSlugs: article.languageSlugs,
    authorId,
    readingMinutes: estimateReadingMinutes(article.content),
  });

  if (result.error || !result.id) {
    throw new Error(`ذخیره‌ی مطلب ناموفق بود: ${result.error ?? "unknown"}`);
  }

  return result.id;
}

/**
 * Strips the leading H1 a model tends to put at the top of its own body.
 *
 * The page already renders the title above the prose, so a repeated `# Title`
 * shows it twice and puts two H1s in the document.
 */
export function stripLeadingHeading(content: string): string {
  return content.replace(/^\s*#\s+.+\n+/, "");
}

/** Builds a URL-safe slug from whatever the caller offered. */
export function deriveSlug(proposed: string | null, title: string): string {
  return slugifyTitle(proposed ?? "") || slugifyTitle(title);
}
