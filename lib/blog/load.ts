import { getDataRepository } from "@/lib/data";
import type { BlogCategory, BlogPost } from "@/lib/blog/types";

export const BLOG_PAGE_SIZE = 12;

export type BlogListResult = {
  posts: BlogPost[];
  categories: BlogCategory[];
  page: number;
  pageCount: number;
  total: number;
};

/**
 * Reads one page of the blog, and refuses to take a public route down doing it.
 *
 * `/blog` is linked from the landing header and from every search result the
 * site has, so it must not answer with a 500 on a database that has not had
 * `db/004_landing_and_blog.sql` — or now `db/009_blog_refactor.sql` — run
 * against it. The error still reaches the container logs; the page degrades to
 * its empty state instead.
 *
 * The three list pages share this so they cannot disagree about what a broken
 * read looks like: one of them catching and two of them throwing is the bug
 * that shows up as "the blog works but the category pages 500".
 */
export async function loadBlogList({
  page: rawPage,
  categorySlug,
  languageSlug,
  featuredFirst = false,
}: {
  page?: string;
  categorySlug?: string;
  languageSlug?: string;
  featuredFirst?: boolean;
}): Promise<BlogListResult> {
  // `Number("abc")` is NaN and NaN fails `>= 1`, so `Math.max` with a `|| 1`
  // in front of it turns every junk value — negative, fractional, missing —
  // into page one rather than into an offset the query cannot use.
  const page = Math.max(1, Math.floor(Number(rawPage) || 1));
  const repo = getDataRepository();

  const [listing, categories] = await Promise.all([
    repo
      .getPublishedBlogPosts({
        categorySlug,
        languageSlug,
        featuredFirst,
        limit: BLOG_PAGE_SIZE,
        offset: (page - 1) * BLOG_PAGE_SIZE,
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

  return {
    posts: listing.posts,
    categories,
    page,
    pageCount: Math.max(1, Math.ceil(listing.total / BLOG_PAGE_SIZE)),
    total: listing.total,
  };
}
