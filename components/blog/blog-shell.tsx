import Link from "next/link";

import { LaparliLogo } from "@/components/brand/laparli-logo";
import { BlogThemeScript, BlogThemeToggle } from "@/components/blog/blog-theme";
import { BLOG_LANGUAGES } from "@/lib/blog/languages";
import type { BlogCategory } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

/**
 * Chrome shared by the blog index, the hubs and every post.
 *
 * The blog is a server-rendered, Persian-only surface — it deliberately does
 * not mount the landing page's locale provider or its WebGL stage, so a post
 * arriving from a search result paints immediately and stays readable with no
 * JavaScript at all. The one client component in here is the theme toggle,
 * and the page is complete without it.
 *
 * ## The navigation is the taxonomy
 *
 * Babbel's magazine puts two rows above every article: its topics, and a hub
 * per language it teaches. That is not decoration — it is how a visitor who
 * arrived for one post finds the eleven others on the same subject, and how a
 * crawler discovers that a hub page exists at all. Categories and languages
 * are passed in rather than fetched here so the shell stays synchronous and
 * every page decides for itself whether a failed read should empty the rail
 * or take the page down.
 */
export function BlogShell({
  children,
  categories = [],
  activeCategory,
  activeLanguage,
  /** Renders the scroll-linked reading gauge. Articles only. */
  showProgress = false,
}: {
  children: React.ReactNode;
  categories?: BlogCategory[];
  activeCategory?: string;
  activeLanguage?: string;
  showProgress?: boolean;
}) {
  return (
    <div className="blog-root" dir="rtl" lang="fa">
      <BlogThemeScript />
      {showProgress ? <div className="blog-progress" aria-hidden /> : null}

      <a
        href="#blog-content"
        className="sr-only focus:not-sr-only focus:absolute focus:inset-inline-start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        رفتن به متن
      </a>

      <header className="sticky top-0 z-40 border-b border-[hsl(var(--blog-hairline))] bg-[hsl(var(--background)/0.85)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:h-[4.5rem]">
          <Link
            href="/"
            className="flex items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--ring))]"
            aria-label="لاپارلی — صفحهٔ اصلی"
          >
            <LaparliLogo className="h-9 w-auto lg:h-10" />
          </Link>

          <span
            aria-hidden
            className="hidden h-5 w-px bg-[hsl(var(--blog-hairline))] sm:block"
          />
          <Link
            href="/blog"
            className="hidden text-sm font-semibold text-foreground sm:block"
          >
            وبلاگ
          </Link>

          <div className="ms-auto flex items-center gap-2">
            <BlogThemeToggle />
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              شروع رایگان
            </Link>
          </div>
        </div>

        {/* Topics, then the language hubs. Both scroll sideways on a phone
            rather than wrapping into a three-line wall above the article. */}
        <nav
          aria-label="بخش‌های وبلاگ"
          className="mx-auto max-w-6xl border-t border-[hsl(var(--blog-hairline))] px-4 sm:px-6"
        >
          <ul className="flex items-center gap-1 overflow-x-auto py-2 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <NavChip href="/blog" active={!activeCategory && !activeLanguage}>
              همه
            </NavChip>
            {categories.map((category) => (
              <NavChip
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                active={activeCategory === category.slug}
              >
                {category.name}
              </NavChip>
            ))}

            <li aria-hidden className="px-2">
              <span className="block h-4 w-px bg-[hsl(var(--blog-hairline))]" />
            </li>

            {BLOG_LANGUAGES.map((language) => (
              <NavChip
                key={language.slug}
                href={`/blog/language/${language.slug}`}
                active={activeLanguage === language.slug}
              >
                {language.name}
              </NavChip>
            ))}
          </ul>
        </nav>
      </header>

      <main id="blog-content" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {children}
      </main>

      <footer className="mt-8 border-t border-[hsl(var(--blog-hairline))] py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Laparli. تمام حقوق محفوظ است.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/about" className="hover:text-foreground">
              دربارهٔ ما
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              تماس
            </Link>
            <Link href="/blog" className="hover:text-foreground">
              همهٔ مطالب
            </Link>
            <a href="/blog/rss.xml" className="hover:text-foreground">
              RSS
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="shrink-0">
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "inline-flex min-h-9 items-center rounded-full px-3.5 transition-colors",
          active
            ? "bg-[hsl(var(--blog-accent))] font-semibold text-[hsl(var(--background))]"
            : "text-muted-foreground hover:bg-[hsl(var(--blog-wash))] hover:text-foreground"
        )}
      >
        {children}
      </Link>
    </li>
  );
}
