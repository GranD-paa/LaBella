import Link from "next/link";

import type { BlogCategory, BlogPost } from "@/lib/blog/types";
import { formatBlogDate } from "@/lib/blog/format";

export function BlogPostCard({
  post,
  categories,
}: {
  post: BlogPost;
  categories: BlogCategory[];
}) {
  const postCategories = categories.filter((category) =>
    post.categorySlugs.includes(category.slug)
  );

  return (
    <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-primary/40">
      {post.coverImageUrl ? (
        // Covers are admin-supplied absolute URLs; next/image would need
        // every possible host allowlisted in next.config to serve them.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImageUrl}
          alt=""
          className="h-44 w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : null}

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {postCategories.length > 0 ? (
            <span className="text-primary">{postCategories[0].name}</span>
          ) : null}
          {post.publishedAt ? (
            <time dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>
          ) : null}
          {post.readingMinutes ? (
            <span>{post.readingMinutes.toLocaleString("fa-IR")} دقیقه مطالعه</span>
          ) : null}
        </div>

        <h2 className="mt-3 text-xl font-semibold leading-snug text-white">
          <Link
            href={`/blog/${post.slug}`}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {/* Stretching the link over the card keeps the whole surface
                clickable without nesting interactive elements. */}
            <span className="absolute inset-0" aria-hidden />
            {post.title}
          </Link>
        </h2>

        {post.excerpt ? (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}
      </div>
    </article>
  );
}
