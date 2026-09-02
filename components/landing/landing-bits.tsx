import { cn } from "@/lib/utils";

/**
 * The small shared pieces every section on the landing page reaches for.
 *
 * Kept in one file so the icons stay a single visual family — same 24px grid,
 * same 1.8 stroke, same round caps. Mixing icon sets is the fastest way to make
 * a page that is otherwise consistent feel assembled from parts.
 */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.34em] text-primary">
      <span className="h-px w-8 bg-primary/50" aria-hidden />
      {children}
    </p>
  );
}

/** Section heading block — eyebrow, title, and an optional line of body. */
export function SectionHead({
  eyebrow,
  title,
  sub,
  className,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <div data-reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        data-reveal
        className="mt-6 text-[clamp(2rem,4.8vw,3.6rem)] font-bold leading-[1.08] tracking-tight text-white"
      >
        {title}
      </h2>
      {sub && (
        <p data-reveal className="mt-5 text-base leading-[1.9] text-white/55">
          {sub}
        </p>
      )}
    </div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(
        "h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1",
        className
      )}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("h-4 w-4", className)}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Cross({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      aria-hidden
      className={cn("h-4 w-4", className)}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/**
 * The four module icons, drawn on the same grid as everything else.
 * Indexed by position so the lesson section can stay pure copy.
 */
export const LESSON_ICONS = [
  // Video
  <svg
    key="video"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="h-5 w-5"
  >
    <rect x="2.5" y="5.5" width="14" height="13" rx="3" />
    <path d="m16.5 10.5 5-2.6v8.2l-5-2.6z" />
  </svg>,
  // Grammar
  <svg
    key="grammar"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="h-5 w-5"
  >
    <path d="M4 5.5A2 2 0 0 1 6 3.5h13v17H6a2 2 0 0 0-2 2Z" />
    <path d="M8 8h7M8 12h5" />
  </svg>,
  // Vocabulary
  <svg
    key="vocabulary"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="h-5 w-5"
  >
    <path d="M4 6h9M4 11h6" />
    <path d="M13.5 20.5 18 8l4.5 12.5M15.2 16.8h5.6" />
  </svg>,
  // Quiz
  <svg
    key="quiz"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="h-5 w-5"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M9.3 9.3a2.8 2.8 0 1 1 3.4 3.9v1.1" />
    <path d="M12 17.4h.01" />
  </svg>,
];

/**
 * The three moments the day section names, in the same hand as the module
 * icons: a sun on the horizon, a sun overhead, a moon. Indexed by position so
 * that section can stay pure copy too.
 */
export const DAY_ICONS = [
  // Morning — sun on the horizon
  <svg
    key="morning"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="h-4 w-4"
  >
    <path d="M4 18h16M2 21h20" />
    <path d="M7.5 18a4.5 4.5 0 0 1 9 0" />
    <path d="M12 5.5V3.5M5.6 8.1 4.2 6.7M18.4 8.1l1.4-1.4" />
  </svg>,
  // Midday — sun overhead
  <svg
    key="midday"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="h-4 w-4"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
  </svg>,
  // Night — moon
  <svg
    key="night"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    className="h-4 w-4"
  >
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
  </svg>,
];
