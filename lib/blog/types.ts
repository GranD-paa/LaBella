export type BlogPostStatus = "draft" | "published";

export type BlogCategory = {
  slug: string;
  name: string;
  description: string | null;
  orderNumber: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  /** Markdown source. Render with `renderMarkdown` — never inject directly. */
  content: string;
  coverImageUrl: string | null;
  status: BlogPostStatus;
  publishedAt: string | null;
  authorId: string | null;
  authorName: string | null;

  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
  noindex: boolean;

  readingMinutes: number | null;
  createdAt: string;
  updatedAt: string;
  categorySlugs: string[];
};

/**
 * The shape the server action hands the repository. `id` absent means
 * "create". `authorId` and `readingMinutes` are filled in server-side, not by
 * the form — the author is the signed-in admin, and reading time is derived
 * from the content so it can never disagree with it.
 */
export type BlogPostInput = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  status: BlogPostStatus;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
  noindex: boolean;
  categorySlugs: string[];
  authorId?: string | null;
  readingMinutes?: number | null;
};

/**
 * Builds a URL-safe slug.
 *
 * Persian letters are kept as-is rather than transliterated: Google indexes
 * percent-encoded UTF-8 paths fine, and a Persian slug is far more meaningful
 * in a search result than a romanised approximation of it.
 */
export function slugifyTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    // Persian/Arabic block, latin alphanumerics, spaces and hyphens survive.
    .replace(/[^؀-ۿ‌a-z0-9\s-]/g, "")
    .replace(/[\s‌]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
