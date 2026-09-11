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
  /**
   * The answer, before the article starts arguing for it. Shown as a box above
   * the prose and published as `abstract` in the post's structured data, which
   * is the field an AI answer lifts verbatim rather than paraphrasing.
   */
  summary: string | null;
  /** Markdown source. Render with `renderMarkdown` — never inject directly. */
  content: string;
  coverImageUrl: string | null;
  /** Describes the cover for anyone who cannot see it. Null renders empty. */
  coverImageAlt: string | null;
  /** Pinned above the rest of the index without moving its date. */
  featured: boolean;
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
  /** Slugs from `lib/blog/languages.ts`. Empty means "not about one language". */
  languageSlugs: string[];
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
  summary: string | null;
  content: string;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  featured: boolean;
  status: BlogPostStatus;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
  noindex: boolean;
  categorySlugs: string[];
  languageSlugs: string[];
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

/**
 * An image the blog owns, rather than one it borrows from another site.
 *
 * The bytes live in the database and are served from `/api/blog-images/<id>`;
 * see `lib/data/blog-image.ts` for the URL shape and `db/009_blog_refactor.sql`
 * for why they are not on disk.
 */
export type BlogImage = {
  id: string;
  url: string;
  contentType: string;
  byteSize: number;
  /** Null when the dimensions could not be read out of the file's header. */
  width: number | null;
  height: number | null;
  altText: string | null;
  originalName: string | null;
  createdAt: string;
};
