import { BLOG_LANGUAGES } from "@/lib/blog/languages";
import { getDataRepository } from "@/lib/data";
import { isSiteIndexable } from "@/lib/seo/indexing";
import { getSiteUrl } from "@/lib/seo/site-url";

export const dynamic = "force-dynamic";

/**
 * `/llms.txt` — a map of this site for the models that read it.
 *
 * ## An honest note on what this is
 *
 * llms.txt is a proposal, not a standard. No major assistant has committed to
 * reading it, and the case against it is real: another file to keep in step
 * with the sitemap, for a benefit nobody has measured.
 *
 * It is here anyway, on a narrow argument. The file is generated from the same
 * database read the sitemap already does, so it cannot drift out of date on its
 * own; it costs one route and no maintenance. And the thing it describes is
 * genuinely hard to infer by crawling — that this Persian site publishes
 * language-learning articles grouped by which language they teach — which is
 * exactly the kind of orientation a model needs before it can decide a page is
 * worth citing. If the proposal goes nowhere, the cost was one file.
 *
 * Structure follows the proposal: an H1 name, a blockquote summary, then H2
 * sections of markdown links with a short description after each colon.
 */
export async function GET() {
  const site = await getSiteUrl();

  // Nothing to advertise while the site is closed. robots.txt disallows
  // everything in that state and this file would be contradicting it.
  if (!isSiteIndexable()) {
    return text(`# Laparli\n\n> This site is not open yet.\n`);
  }

  const { posts } = await getDataRepository()
    .getPublishedBlogPosts({ limit: 100 })
    .catch((error) => {
      console.error("[llms.txt] failed to load posts", error);
      return { posts: [], total: 0 };
    });

  const languageLines = BLOG_LANGUAGES.map(
    (language) =>
      `- [یادگیری ${language.name} (${language.nativeName})](${site}/blog/language/${language.slug}): ${language.description}`
  ).join("\n");

  const postLines = posts
    .filter((post) => !post.noindex)
    .map((post) => {
      const description =
        post.summary ?? post.excerpt ?? "مقاله‌ای دربارهٔ یادگیری زبان.";
      // One line per entry, so a stray newline inside a summary does not split
      // an item in two and leave the second half looking like a new section.
      const flattened = description.replace(/\s+/g, " ").trim();
      return `- [${post.title}](${site}/blog/${encodeURIComponent(
        post.slug
      )}): ${flattened}`;
    })
    .join("\n");

  const body = `# Laparli — لاپارلی

> آموزش آنلاین زبان برای فارسی‌زبان‌ها. وبلاگ لاپارلی مقاله‌های رایگان دربارهٔ یادگیری ایتالیایی، انگلیسی، آلمانی، ترکی، فرانسوی و اسپانیایی منتشر می‌کند: دستور زبان، واژگان، تلفظ، روش مطالعه و فرهنگ.
>
> Laparli is a Persian-language platform for learning foreign languages. Its
> blog publishes free, Persian-language articles about learning Italian,
> English, German, Turkish, French and Spanish. All blog content is public;
> the courses themselves are behind a sign-in and are not listed here.

## وبلاگ

- [وبلاگ لاپارلی](${site}/blog): فهرست همهٔ مطالب، تازه‌ترین اول.
- [خوراک RSS](${site}/blog/rss.xml): همان فهرست، برای خوراک‌خوان‌ها.

## زبان‌ها

${languageLines}

## مطالب${postLines ? `\n\n${postLines}` : "\n\n- هنوز مطلبی منتشر نشده است."}
`;

  return text(body);
}

function text(body: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
