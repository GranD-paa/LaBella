import { cn } from "@/lib/utils";

/**
 * The Laparli mark — the purple "b/D" monogram wrapping a gold speech bubble.
 *
 * The artwork lives here and nowhere else, so replacing it (for example with
 * an exact trace of the source PNG) is a one-file change. Per the brand rule
 * the mark is always used on its own; the "Laparli" wordmark underneath the
 * mark in the source file is deliberately not reproduced.
 */
export function LaparliLogo({
  className,
  title = "Laparli",
}: {
  className?: string;
  /** Pass `null` for decorative use next to a visible "Laparli" label. */
  title?: string | null;
}) {
  const decorative = title === null;

  return (
    <svg
      viewBox="0 0 440 512"
      className={cn("h-8 w-auto", className)}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative || undefined}
      focusable="false"
    >
      <defs>
        <linearGradient
          id="laparli-violet"
          gradientUnits="userSpaceOnUse"
          x1="20"
          y1="20"
          x2="410"
          y2="490"
        >
          <stop offset="0" stopColor="#A87BE8" />
          <stop offset="0.55" stopColor="#7E43C4" />
          <stop offset="1" stopColor="#4C2080" />
        </linearGradient>
        <linearGradient
          id="laparli-gold"
          gradientUnits="userSpaceOnUse"
          x1="140"
          y1="215"
          x2="320"
          y2="412"
        >
          <stop offset="0" stopColor="#FBC838" />
          <stop offset="1" stopColor="#E89D1C" />
        </linearGradient>
      </defs>
      <g fill="url(#laparli-violet)">
        <rect x="0" y="5" width="115" height="500" rx="57.5" />
        <path
          fillRule="evenodd"
          d="M60 105h140c130 0 240 90 240 200s-110 200-240 200H60Z M115 220c0-22 18-40 40-40h45c85 0 155 56 155 125s-70 125-155 125h-45c-22 0-40-18-40-40Z"
        />
      </g>
      <path
        fill="url(#laparli-gold)"
        d="M232 215c49 0 88 37 88 82s-39 82-88 82h-28c-10 20-32 31-58 33 17-13 24-28 20-43-17-16-28-41-28-67 0-45 42-87 94-87Z"
      />
    </svg>
  );
}
