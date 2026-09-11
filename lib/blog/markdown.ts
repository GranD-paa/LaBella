import { Marked, Renderer, type Tokens } from "marked";

/**
 * Markdown → HTML for blog posts.
 *
 * ## Trust model
 *
 * Posts are written by super admins, but "the author is trusted" is not a
 * reason to render whatever they paste. Two rules close the gap without
 * pulling in a DOM-based sanitiser (which would mean jsdom on the server):
 *
 * 1. **Raw HTML is dropped, not escaped.** The `html` renderers return an
 *    empty string, so a `<script>` or `<iframe>` pasted into a post never
 *    reaches the page. Posts are markdown; that is the whole vocabulary.
 * 2. **Link and image URLs are allowlisted** to http, https, mailto and
 *    site-relative paths, which is what stops `javascript:` URLs — marked
 *    does not filter those on its own.
 */
function isSafeUrl(href: string | null | undefined): boolean {
  if (!href) return false;
  const value = href.trim();

  // Site-relative and anchor links.
  if (value.startsWith("/") || value.startsWith("#")) return true;

  try {
    const protocol = new URL(value).protocol;
    return protocol === "http:" || protocol === "https:" || protocol === "mailto:";
  } catch {
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * What a heading becomes in a URL fragment.
 *
 * Persian letters survive rather than being transliterated, for the same
 * reason post slugs keep them: `#زمان-گذشته` is a fragment a reader can look
 * at and understand, and browsers percent-encode it correctly on their own.
 */
function slugifyHeading(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/[^؀-ۿ‌a-z0-9\s-]/g, "")
      .replace(/[\s‌]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "بخش"
  );
}

export type TocEntry = {
  id: string;
  text: string;
  level: 2 | 3;
};

/** What the renderer needs to know that the markdown source cannot tell it. */
export type MarkdownContext = {
  /**
   * Pixel sizes for images this site hosts, keyed by URL.
   *
   * Without `width` and `height` on an `<img>`, the browser cannot reserve
   * space for a picture before its bytes arrive, so every paragraph below it
   * jumps downward as the article loads. That jump is Cumulative Layout Shift
   * — one of the three Core Web Vitals — and these two integers are the whole
   * fix. Images hosted elsewhere are not in this map and simply go without.
   */
  imageDimensions?: Map<string, { width: number | null; height: number | null }>;
};

/**
 * Builds the renderer overrides for one render, plus the headings it collects.
 *
 * ## Why this is a plain object and not a `Renderer` subclass
 *
 * Because a subclass does not work, and fails silently when it doesn't.
 *
 * `marked` installs a renderer by walking the object it is handed with
 * `for...in` and copying what it finds onto a `Renderer` of its own. `for...in`
 * visits *enumerable* properties — and methods declared in a `class` body are
 * non-enumerable, so a subclass hands over an object that walk sees as empty.
 * No error is raised: marked simply keeps its default renderer and the
 * overrides never run. This code used to be a subclass, and the rules below —
 * dropping raw HTML, refusing `javascript:` URLs — were quietly not in effect
 * for as long as it was. The tests in markdown.test.ts are what caught it, and
 * they are what will catch it if anyone converts this back to a class.
 *
 * The methods take a typed `this` because marked calls them with its own
 * renderer as the receiver — which is what makes `this.parser` available,
 * the thing the subclass was originally chosen for. Per-render state lives in
 * the closure instead of on the object, which also keeps it out of that
 * `for...in` walk, where an unexpected key is a thrown error.
 */
function createBlogRenderer(context: MarkdownContext) {
  const headings: TocEntry[] = [];
  const usedIds = new Set<string>();

  const renderer = {
    html(): string {
      return "";
    },

    /**
     * Headings get stable ids, which buys three things at once: the table of
     * contents above the article can link to them, a reader can copy a link to
     * the exact section they want to share, and a search engine can deep-link
     * into the passage that answers a query rather than the top of the page.
     */
    heading(this: Renderer, { tokens, depth }: Tokens.Heading): string {
      const text = this.parser.parseInline(tokens);
      const plain = text.replace(/<[^>]*>/g, "");

      let id = slugifyHeading(plain);
      // Two sections can legitimately be called the same thing. The first one
      // to appear keeps the clean id; the rest get a suffix, so no fragment
      // ever points at two places.
      if (usedIds.has(id)) {
        let suffix = 2;
        while (usedIds.has(`${id}-${suffix}`)) suffix += 1;
        id = `${id}-${suffix}`;
      }
      usedIds.add(id);

      if (depth === 2 || depth === 3) {
        headings.push({ id, text: plain, level: depth });
      }

      return `<h${depth} id="${escapeHtml(
        id
      )}"><a class="blog-anchor" href="#${escapeHtml(
        id
      )}" aria-hidden="true" tabindex="-1">#</a>${text}</h${depth}>`;
    },

    link(this: Renderer, { href, title, tokens }: Tokens.Link): string {
      const text = this.parser.parseInline(tokens);
      if (!isSafeUrl(href)) return text;

      const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
      // Anything off-site opens in a new tab and drops the referrer.
      const external = /^https?:\/\//.test(href);
      const relAttr = external
        ? ' target="_blank" rel="noopener noreferrer"'
        : "";

      return `<a href="${escapeHtml(href)}"${titleAttr}${relAttr}>${text}</a>`;
    },

    image({ href, title, text }: Tokens.Image): string {
      if (!isSafeUrl(href)) return escapeHtml(text ?? "");

      const alt = text ?? "";
      const size = context.imageDimensions?.get(href);
      const dimensions =
        size?.width && size?.height
          ? ` width="${size.width}" height="${size.height}"`
          : "";

      const img = `<img src="${escapeHtml(href)}" alt="${escapeHtml(
        alt
      )}"${dimensions} loading="lazy" decoding="async" />`;

      // A title on an image is the author writing a caption, so it is rendered
      // as one — visible under the picture — instead of hidden in a tooltip
      // that touch devices never show.
      if (!title) return img;

      return `<figure>${img}<figcaption>${escapeHtml(
        title
      )}</figcaption></figure>`;
    },
  };

  return { renderer, headings };
}

export type RenderedPost = {
  html: string;
  /** H2s and H3s in document order, for the table of contents. */
  toc: TocEntry[];
};

/**
 * Renders a post and reports its section headings in one pass.
 *
 * One pass rather than two because the ids have to match: a table of contents
 * built by parsing the markdown separately would have to re-implement the
 * de-duplication in `heading` above and would drift from it the first time
 * either one changed.
 *
 * A renderer per call, rather than one shared instance that gets reset. The
 * renderer accumulates state as it walks the document — the headings it saw,
 * the ids it has already handed out — and a shared one would be correct only
 * for as long as every render stayed synchronous and uninterrupted. That
 * happens to be true of `marked.parse` today, and it is not a property worth
 * depending on: the cost of a fresh instance is an object allocation, and the
 * cost of being wrong is two posts blending their tables of contents under
 * load.
 */
export function renderPost(
  source: string,
  context: MarkdownContext = {}
): RenderedPost {
  const { renderer, headings } = createBlogRenderer(context);
  const marked = new Marked({ gfm: true, breaks: false, renderer });
  const html = marked.parse(source, { async: false }) as string;
  return { html, toc: headings };
}

/** When only the markup is wanted — the editor preview, mostly. */
export function renderMarkdown(source: string): string {
  return renderPost(source).html;
}

/**
 * Every image URL a post references.
 *
 * Used to look up the dimensions above without loading the whole image table:
 * an article cites a handful of pictures, so this is the shortlist to ask the
 * database about.
 */
export function extractImageUrls(source: string): string[] {
  const urls = new Set<string>();
  const pattern = /!\[[^\]]*\]\(\s*([^)\s]+)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(source)) !== null) {
    urls.add(match[1]);
  }

  // `Array.from` rather than a spread: the build targets an ES version whose
  // iteration protocol TypeScript will not down-level without a flag.
  return Array.from(urls);
}

/**
 * Plain text for excerpts and meta descriptions — markdown syntax stripped
 * rather than rendered, so a description never leaks `**` or `[]()`.
 */
export function markdownToPlainText(source: string, limit = 300): string {
  const text = source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= limit) return text;
  return `${text.slice(0, limit).replace(/\s+\S*$/, "")}…`;
}

/** Words in a post, for `wordCount` in its structured data. */
export function countWords(source: string): number {
  return markdownToPlainText(source, Number.MAX_SAFE_INTEGER)
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * Reading time in minutes.
 *
 * 200 wpm is the usual English figure; Persian prose runs a little slower in
 * practice, so this rounds up and never returns zero for a short post.
 */
export function estimateReadingMinutes(source: string): number {
  return Math.max(1, Math.round(countWords(source) / 200));
}
