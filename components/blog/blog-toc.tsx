import type { TocEntry } from "@/lib/blog/markdown";
import { cn } from "@/lib/utils";

/**
 * The article's sections, linked.
 *
 * Server-rendered and made of plain anchors, so it works before — and
 * without — JavaScript, and so a crawler reads it as a set of links into the
 * page rather than as a widget it has to execute to understand. That second
 * part is the SEO half of this component: the headings each carry an id (see
 * `renderPost`), and a list of links to them is how a search engine learns
 * which passage answers which question, which is what it needs to deep-link
 * into a section instead of dropping the reader at the top.
 *
 * Renders nothing below three sections. A two-item contents list on a short
 * post is furniture: it takes the space where the article should have started.
 */
export function BlogToc({ entries }: { entries: TocEntry[] }) {
  if (entries.length < 3) return null;

  return (
    <nav
      aria-labelledby="toc-heading"
      className="my-10 rounded-2xl border border-[hsl(var(--blog-hairline))] bg-[hsl(var(--blog-wash))] p-5 sm:p-6"
    >
      <h2
        id="toc-heading"
        className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--blog-accent))]"
      >
        در این مطلب
      </h2>
      <ol className="mt-4 space-y-2.5 text-sm">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={cn(entry.level === 3 && "ps-5 text-muted-foreground")}
          >
            <a
              href={`#${entry.id}`}
              className="text-foreground/85 underline-offset-4 transition-colors hover:text-[hsl(var(--blog-accent))] hover:underline"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
