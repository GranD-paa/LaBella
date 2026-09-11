import { resolveBlogLanguages } from "@/lib/blog/languages";
import { markdownToPlainText } from "@/lib/blog/markdown";
import { getDataRepository } from "@/lib/data";
import { getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-dynamic";

/** XML text escaping — the five predefined entities, nothing else. */
function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Absolute, because a feed is read somewhere else by definition.
 *
 * Covers are stored as site-relative paths (`/api/blog-images/…`), and a reader
 * app resolving that against its own origin gets nothing.
 */
function absolute(site: string, url: string): string {
  return url.startsWith("/") ? `${site}${url}` : url;
}

export async function GET() {
  const site = await getSiteUrl();

  // Feed readers and crawlers poll this on their own schedule, so a database
  // without the blog tables should answer with an empty but valid feed rather
  // than a 500 — the same call at `/blog` already degrades this way, and a
  // feed that errors can get dropped from a reader for good.
  const { posts } = await getDataRepository()
    .getPublishedBlogPosts({ limit: 50 })
    .catch((error) => {
      console.error("[blog] failed to load posts for the feed", error);
      return { posts: [], total: 0 };
    });

  const visible = posts.filter((post) => !post.noindex);

  const items = visible
    .map((post) => {
      const url = `${site}/blog/${encodeURIComponent(post.slug)}`;
      const description =
        post.summary ?? post.excerpt ?? markdownToPlainText(post.content, 300);

      // Both taxonomies become <category> elements. A reader that groups by
      // category, and a crawler reading the feed as a discovery surface, both
      // learn what the post is about without opening it.
      const categories = [
        ...post.categorySlugs,
        ...resolveBlogLanguages(post.languageSlugs).map(
          (language) => language.name
        ),
      ]
        .map((name) => `      <category>${xmlEscape(name)}</category>`)
        .join("\n");

      const cover = post.ogImageUrl ?? post.coverImageUrl;

      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid isPermaLink="true">${xmlEscape(url)}</guid>
      <description>${xmlEscape(description)}</description>
${post.publishedAt ? `      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>\n` : ""}${
        post.authorName
          ? `      <dc:creator>${xmlEscape(post.authorName)}</dc:creator>\n`
          : ""
      }${
        cover
          ? `      <media:content url="${xmlEscape(
              absolute(site, cover)
            )}" medium="image" />\n`
          : ""
      }${categories}${categories ? "\n" : ""}    </item>`;
    })
    .join("\n");

  // `lastBuildDate` is the newest post's date rather than "now": a feed that
  // claims to have changed every time it is fetched teaches every reader
  // polling it to stop trusting the field.
  const newest = visible.find((post) => post.publishedAt)?.publishedAt;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>وبلاگ لاپارلی</title>
    <link>${xmlEscape(`${site}/blog`)}</link>
    <description>مقاله‌های کاربردی دربارهٔ یادگیری زبان.</description>
    <language>fa-IR</language>
${newest ? `    <lastBuildDate>${new Date(newest).toUTCString()}</lastBuildDate>\n` : ""}    <atom:link href="${xmlEscape(`${site}/blog/rss.xml`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
