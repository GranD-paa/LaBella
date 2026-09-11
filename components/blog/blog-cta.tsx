import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { BlogLanguage } from "@/lib/blog/languages";

/**
 * The one ask in an article, at the end of it.
 *
 * Babbel puts a single line and a single button under every magazine piece —
 * no interstitial, no modal, no bar that follows the reader down the page. The
 * restraint is the strategy: a post exists to be found and read, and a reader
 * who was interrupted twice before the third paragraph does not come back for
 * the next one.
 *
 * When the post is about a language with a course behind it, the copy names
 * that language. A named offer converts and a generic one decorates — "شروع
 * ایتالیایی" is an answer to what the reader has just spent six minutes
 * reading about; "ثبت‌نام رایگان" is a button.
 */
export function BlogCta({ language }: { language?: BlogLanguage }) {
  const hasCourse = Boolean(language?.courseHref);

  return (
    <aside className="mt-14 overflow-hidden rounded-2xl border border-[hsl(var(--blog-accent)/0.3)] bg-[hsl(var(--blog-wash))] p-7 sm:p-9">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--blog-accent))]">
        لاپارلی
      </p>

      <h2 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
        {hasCourse
          ? `${language!.name} را از صفر شروع کن`
          : "زبان تازه‌ات را از همین هفته شروع کن"}
      </h2>

      <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
        {hasCourse
          ? `دوره‌های ${language!.name} لاپارلی از الفبا تا مکالمه: ویدیوی کوتاه با زیرنویس دوزبانه، دستور زبان، واژگان، و آزمونی که تا قبولش نشوی بخش بعد باز نمی‌شود.`
          : "ویدیوی کوتاه با زیرنویس دوزبانه، دستور زبان، واژگان و آزمون — مسیری که تا تمامش نکنی جلو نمی‌رود."}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/login"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          شروع رایگان
          <ArrowLeft aria-hidden className="h-4 w-4" />
        </Link>

        {hasCourse ? (
          <Link
            href={language!.courseHref!}
            className="inline-flex min-h-11 items-center rounded-full border border-[hsl(var(--blog-hairline))] px-6 text-sm font-semibold text-foreground transition-colors hover:bg-[hsl(var(--blog-wash-strong))]"
          >
            دیدن دورهٔ {language!.name}
          </Link>
        ) : null}
      </div>
    </aside>
  );
}
