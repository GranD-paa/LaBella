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

export async function GET() {
  const site = await getSiteUrl();
  const { posts } = await getDataRepository().getPublishedBlogPosts({
    limit: 50,
  });

  const items = posts
    .filter((post) => !post.noindex)
    .map((post) => {
      const url = `${site}/blog/${encodeURIComponent(post.slug)}`;
      const description =
        post.excerpt ?? markdownToPlainText(post.content, 300);

      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid isPermaLink="true">${xmlEscape(url)}</guid>
      <description>${xmlEscape(description)}</description>
      ${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ""}
      ${post.authorName ? `<dc:creator>${xmlEscape(post.authorName)}</dc:creator>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>وبلاگ لاپارلی</title>
    <link>${xmlEscape(`${site}/blog`)}</link>
    <description>مقاله‌های کاربردی دربارهٔ یادگیری زبان.</description>
    <language>fa-IR</language>
    <atom:link href="${xmlEscape(`${site}/blog/rss.xml`)}" rel="self" type="application/rss+xml" />
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
