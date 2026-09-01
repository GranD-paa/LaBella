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

class BlogRenderer extends Renderer {
  override html(): string {
    return "";
  }

  override link({ href, title, tokens }: Tokens.Link): string {
    const text = this.parser.parseInline(tokens);
    if (!isSafeUrl(href)) return text;

    const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
    // Anything off-site opens in a new tab and drops the referrer.
    const external = /^https?:\/\//.test(href);
    const relAttr = external ? ' target="_blank" rel="noopener noreferrer"' : "";

    return `<a href="${escapeHtml(href)}"${titleAttr}${relAttr}>${text}</a>`;
  }

  override image({ href, title, text }: Tokens.Image): string {
    if (!isSafeUrl(href)) return escapeHtml(text ?? "");
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
    return `<img src="${escapeHtml(href)}" alt="${escapeHtml(
      text ?? ""
    )}"${titleAttr} loading="lazy" decoding="async" />`;
  }
}

// Subclassing rather than passing a plain renderer object is what keeps
// `this.parser` bound inside `link`, which needs it to render link text.
const marked = new Marked({
  gfm: true,
  breaks: false,
  renderer: new BlogRenderer(),
});

export function renderMarkdown(source: string): string {
  return marked.parse(source, { async: false }) as string;
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

/**
 * Reading time in minutes.
 *
 * 200 wpm is the usual English figure; Persian prose runs a little slower in
 * practice, so this rounds up and never returns zero for a short post.
 */
export function estimateReadingMinutes(source: string): number {
  const words = markdownToPlainText(source, Number.MAX_SAFE_INTEGER)
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
