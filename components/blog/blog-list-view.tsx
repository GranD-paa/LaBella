import Link from "next/link";

import { BlogPostCard } from "@/components/blog/blog-post-card";
import type { BlogCategory, BlogPost } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

/**
 * The body of every list page: the index, a category, a language hub.
 *
 * All three show the same thing — a headline, a sentence, and posts newest
 * first — and differ only in which posts and which sentence. Three copies of
 * this markup would be three places to fix the day the grid changes, and they
 * would drift apart long before that.
 *
 * The lead card is the index's only real layout decision. The newest (or
 * pinned) post renders at double width with its image beside the text, and
 * everything after it goes in the grid, which is what gives a magazine a front
 * page instead of a list.
 */
export function BlogListView({
  eyebrow,
  title,
  description,
  posts,
  categories,
  page,
  pageCount,
  /** Where pagination links point; page 2 becomes `${basePath}?page=2`. */
  basePath,
  emptyMessage = "هنوز مطلبی در این بخش منتشر نشده است.",
  /** Extra content between the header and the posts — a hub's course link. */
  children,
  showLead = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  posts: BlogPost[];
  categories: BlogCategory[];
  page: number;
  pageCount: number;
  basePath: string;
  emptyMessage?: string;
  children?: React.ReactNode;
  showLead?: boolean;
}) {
  // A lead card on page two would promote an arbitrary post to front-page size
  // just for being eleventh, so the treatment is reserved for the first page.
  const hasLead = showLead && page === 1 && posts.length > 0;
  const lead = hasLead ? posts[0] : null;
  const rest = hasLead ? posts.slice(1) : posts;

  return (
    <>
      <header className="border-b border-[hsl(var(--blog-hairline))] pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--blog-accent))]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
        {children}
      </header>

      {posts.length === 0 ? (
        <p className="mt-16 rounded-2xl border border-[hsl(var(--blog-hairline))] bg-[hsl(var(--blog-wash))] p-10 text-center text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <>
          {lead ? (
            <div className="mt-10">
              <BlogPostCard
                post={lead}
                categories={categories}
                variant="lead"
                priority
              />
            </div>
          ) : null}

          {rest.length > 0 ? (
            <ul
              className={cn(
                "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
                lead ? "mt-6" : "mt-10"
              )}
            >
              {rest.map((post, index) => (
                <li key={post.id}>
                  <BlogPostCard
                    post={post}
                    categories={categories}
                    // With no lead card the first grid image is the largest
                    // thing above the fold, so it takes the eager load instead.
                    priority={!lead && index === 0}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </>
      )}

      <Pagination page={page} pageCount={pageCount} basePath={basePath} />
    </>
  );
}

function Pagination({
  page,
  pageCount,
  basePath,
}: {
  page: number;
  pageCount: number;
  basePath: string;
}) {
  if (pageCount <= 1) return null;

  return (
    <nav
      aria-label="صفحه‌بندی"
      className="mt-14 flex items-center justify-center gap-2"
    >
      {Array.from({ length: pageCount }, (_, index) => index + 1).map(
        (number) => (
          <Link
            key={number}
            // Page one is the bare path, never `?page=1`: two URLs serving one
            // page is a duplicate a crawler has to be told to ignore, and not
            // creating it is cheaper than explaining it away with a canonical.
            href={number > 1 ? `${basePath}?page=${number}` : basePath}
            aria-current={number === page ? "page" : undefined}
            className={cn(
              "inline-flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm transition-colors",
              number === page
                ? "bg-[hsl(var(--blog-accent))] font-semibold text-[hsl(var(--background))]"
                : "border border-[hsl(var(--blog-hairline))] text-muted-foreground hover:text-foreground"
            )}
          >
            {number.toLocaleString("fa-IR")}
          </Link>
        )
      )}
    </nav>
  );
}
