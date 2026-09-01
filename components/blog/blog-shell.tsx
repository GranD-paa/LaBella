import Link from "next/link";

import { LaparliLogo } from "@/components/brand/laparli-logo";

/**
 * Chrome shared by the blog index and every post.
 *
 * The blog is a server-rendered, Persian-only surface — it deliberately does
 * not mount the landing page's locale provider or its WebGL stage, so a post
 * arriving from a search result paints immediately and stays readable with no
 * JavaScript at all.
 */
export function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#090014]" dir="rtl" lang="fa">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4 sm:px-6 lg:h-20">
          <Link
            href="/"
            className="flex items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <LaparliLogo className="h-9 w-auto lg:h-10" />
          </Link>

          <nav className="ms-auto flex items-center gap-1">
            <Link
              href="/blog"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
            >
              وبلاگ
            </Link>
            <Link
              href="/#languages"
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
            >
              زبان‌ها
            </Link>
            <Link
              href="/sign-up"
              className="ms-2 inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              ثبت‌نام رایگان
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
        {children}
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Laparli. تمام حقوق محفوظ است.</p>
          <div className="flex gap-5">
            <Link href="/about" className="hover:text-white">
              دربارهٔ ما
            </Link>
            <Link href="/contact" className="hover:text-white">
              تماس
            </Link>
            <a href="/blog/rss.xml" className="hover:text-white">
              RSS
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
