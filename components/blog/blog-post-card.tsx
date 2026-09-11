import Link from "next/link";

import { formatBlogDate } from "@/lib/blog/format";
import { resolveBlogLanguages } from "@/lib/blog/languages";
import type { BlogCategory, BlogPost } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

/**
 * A post, as it appears in a list.
 *
 * Three sizes rather than three components, because they differ only in how
 * much of the same post they show. A magazine index that renders every entry
 * at one weight reads as a spreadsheet — the lead story earns its space by
 * being visibly larger than the eleven below it.
 *
 * - `lead`    the top of the index: wide, full-bleed image beside the text.
 * - `default` the grid.
 * - `compact` related posts and sidebars: title, date, no picture.
 */
export type BlogCardVariant = "lead" | "default" | "compact";

export function BlogPostCard({
  post,
  categories,
  variant = "default",
  /**
   * The index's first card holds the largest image above the fold, which makes
   * it the Largest Contentful Paint element on that page. Loading it eagerly at
   * high priority is the difference between LCP landing around a second and
   * landing wherever the lazy-loading queue gets to it.
   */
  priority = false,
}: {
  post: BlogPost;
  categories: BlogCategory[];
  variant?: BlogCardVariant;
  priority?: boolean;
}) {
  const postCategories = categories.filter((category) =>
    post.categorySlugs.includes(category.slug)
  );
  const languages = resolveBlogLanguages(post.languageSlugs);
  const topic = postCategories[0]?.name ?? languages[0]?.name;

  if (variant === "compact") {
    return (
      <article className="group relative">
        <Meta post={post} topic={topic} />
        <h3 className="mt-2 text-base font-semibold leading-snug text-foreground">
          <Link href={postHref(post)} className={LINK_CLASS}>
            <span className="absolute inset-0" aria-hidden />
            {post.title}
          </Link>
        </h3>
      </article>
    );
  }

  const isLead = variant === "lead";
  // The lead card's two columns are the image and the text. With no image
  // there is only text, and splitting anyway leaves half a card of empty
  // surface — so the split is conditional on there being something to fill it.
  const isSplit = isLead && Boolean(post.coverImageUrl);

  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-[hsl(var(--blog-hairline))] bg-[hsl(var(--blog-wash))] transition-colors hover:border-[hsl(var(--blog-accent)/0.45)]",
        isSplit && "sm:grid sm:grid-cols-2 sm:items-stretch"
      )}
    >
      {post.coverImageUrl ? (
        // Covers can be this app's own uploads or an absolute URL an admin
        // pasted in. next/image would need every possible host allowlisted in
        // next.config to serve the second kind, so both go through a plain
        // <img> and the sizing is done in CSS.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImageUrl}
          alt={post.coverImageAlt ?? ""}
          className={cn(
            "w-full object-cover",
            isSplit ? "h-52 sm:h-full sm:min-h-[19rem]" : "aspect-[16/9]"
          )}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      ) : null}

      <div
        className={cn(
          "p-6",
          isLead && "sm:p-8",
          isSplit && "flex flex-col justify-center"
        )}
      >
        <Meta post={post} topic={topic} />

        <h2
          className={cn(
            "mt-3 font-bold leading-snug text-foreground",
            isLead ? "text-2xl sm:text-3xl" : "text-lg"
          )}
        >
          <Link href={postHref(post)} className={LINK_CLASS}>
            {/* Stretching the link over the card keeps the whole surface
                clickable without nesting interactive elements. */}
            <span className="absolute inset-0" aria-hidden />
            {post.title}
          </Link>
        </h2>

        {post.excerpt ? (
          <p
            className={cn(
              "mt-3 text-sm leading-relaxed text-muted-foreground",
              isLead ? "line-clamp-3 sm:text-base" : "line-clamp-2"
            )}
          >
            {post.excerpt}
          </p>
        ) : null}

        {isLead && languages.length > 0 ? (
          <p className="mt-5 text-xs text-muted-foreground">
            دربارهٔ {languages.map((language) => language.name).join("، ")}
          </p>
        ) : null}
      </div>
    </article>
  );
}

const LINK_CLASS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--ring))]";

/** Percent-encoding is the browser's job on a `Link`, but not inside a string. */
function postHref(post: BlogPost): string {
  return `/blog/${encodeURIComponent(post.slug)}`;
}

function Meta({ post, topic }: { post: BlogPost; topic?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
      {topic ? (
        <span className="font-semibold text-[hsl(var(--blog-accent))]">
          {topic}
        </span>
      ) : null}
      {topic && post.publishedAt ? <span aria-hidden>·</span> : null}
      {post.publishedAt ? (
        <time dateTime={post.publishedAt}>
          {formatBlogDate(post.publishedAt)}
        </time>
      ) : null}
      {post.readingMinutes ? (
        <>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes.toLocaleString("fa-IR")} دقیقه</span>
        </>
      ) : null}
    </div>
  );
}
