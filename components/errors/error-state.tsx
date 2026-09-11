import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

/**
 * The panel every error and not-found screen is built from.
 *
 * A failed page still has to look like Laparli, so this borrows the brand's
 * surface rather than falling back to the browser's own styling — the thing a
 * visitor sees when something breaks is part of the product too.
 *
 * `role="alert"` is what makes the message reach a screen reader: these
 * screens replace the page's content after it has already rendered, and
 * without it the swap is silent.
 */
export function ErrorState({
  title,
  description,
  digest,
  actions,
}: {
  title: string;
  description: string;
  /** Next's hash for the server-side error, so a report can name the entry in the logs. */
  digest?: string;
  actions?: ReactNode;
}) {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="flex min-h-[60vh] items-center justify-center px-4 py-16"
    >
      <div
        role="alert"
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center sm:p-10"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <AlertTriangle aria-hidden className="h-7 w-7 text-primary" />
        </span>

        <h1 className="mt-6 text-2xl font-bold text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>

        {actions ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {actions}
          </div>
        ) : null}

        {digest ? (
          <p className="mt-8 border-t border-white/10 pt-5 text-xs text-muted-foreground">
            کد پیگیری:{" "}
            <code dir="ltr" className="font-mono text-foreground/70">
              {digest}
            </code>
          </p>
        ) : null}
      </div>
    </div>
  );
}
