import { cn } from "@/lib/utils";

/**
 * Thin gold line-work for the page's empty stretches.
 *
 * The sections are deliberately spacious, which leaves long dark gaps between
 * them. These fill the gaps without adding weight: hairline strokes at low
 * opacity, in the brand's own gold, drawn rather than filled. Nothing here is
 * ever a surface — the moment gold becomes an area it stops being a grace note
 * and starts competing with the CTAs, which are the only solid gold on the page.
 *
 * Used sparingly on purpose: three dividers and one watermark across the whole
 * page. A motif that appears between every section is wallpaper.
 */

/**
 * The rule that sits between two sections: a hairline that fades up from
 * nothing, a small centred ornament, and a hairline that fades back out.
 *
 * Built from two gradient rules and one SVG rather than a single stretched
 * SVG, so the ornament keeps its proportions at any width.
 */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "mx-auto flex w-full max-w-[80rem] items-center gap-5 px-5 sm:px-8",
        className
      )}
    >
      <span className="h-px flex-1 bg-[linear-gradient(to_right,transparent,rgba(251,191,36,0.28))]" />

      <svg
        viewBox="0 0 64 16"
        fill="none"
        stroke="rgba(251,191,36,0.55)"
        strokeWidth="0.8"
        strokeLinecap="round"
        className="h-4 w-16 shrink-0"
      >
        {/* A diamond between two tapering strokes. Simple enough to read at
            16px tall, which is the only size it is ever drawn at. */}
        <path d="M4 8h14M46 8h14" strokeOpacity="0.5" />
        <path d="M32 3.2 36.8 8 32 12.8 27.2 8Z" />
        <circle cx="32" cy="8" r="1.1" fill="rgba(251,191,36,0.6)" stroke="none" />
      </svg>

      <span className="h-px flex-1 bg-[linear-gradient(to_left,transparent,rgba(251,191,36,0.28))]" />
    </div>
  );
}

/**
 * A large geometric rosette, drawn in hairlines and set very faint behind a
 * section. The twelve-fold construction is the one Persian tiling starts from,
 * which is a quiet nod that costs nothing and reads as pattern rather than
 * decoration at this opacity.
 *
 * The points are computed rather than hand-written so the construction is
 * legible and the fold count is a number instead of forty path coordinates.
 */
export function GoldRosette({
  className,
  points = 12,
}: {
  className?: string;
  points?: number;
}) {
  const centre = 100;
  const outer = 92;
  const inner = 54;

  // Alternating outer and inner vertices — the star polygon.
  const star = Array.from({ length: points * 2 }, (_, index) => {
    const radius = index % 2 === 0 ? outer : inner;
    const angle = (Math.PI * index) / points - Math.PI / 2;
    return `${(centre + radius * Math.cos(angle)).toFixed(2)},${(
      centre +
      radius * Math.sin(angle)
    ).toFixed(2)}`;
  }).join(" ");

  // The chords that turn a star outline into a woven rosette: every outer
  // vertex joined to the one three steps round.
  const chords = Array.from({ length: points }, (_, index) => {
    const from = (Math.PI * 2 * index) / points - Math.PI / 2;
    const to = (Math.PI * 2 * ((index + 3) % points)) / points - Math.PI / 2;
    return `M${(centre + outer * Math.cos(from)).toFixed(2)},${(
      centre +
      outer * Math.sin(from)
    ).toFixed(2)}L${(centre + outer * Math.cos(to)).toFixed(2)},${(
      centre +
      outer * Math.sin(to)
    ).toFixed(2)}`;
  }).join("");

  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      fill="none"
      stroke="rgb(251 191 36)"
      strokeWidth="0.4"
      className={cn("pointer-events-none absolute", className)}
    >
      <circle cx={centre} cy={centre} r={outer} strokeOpacity="0.5" />
      <circle cx={centre} cy={centre} r={inner} strokeOpacity="0.35" />
      <circle cx={centre} cy={centre} r={inner * 0.5} strokeOpacity="0.25" />
      <polygon points={star} strokeOpacity="0.6" />
      <path d={chords} strokeOpacity="0.3" />
    </svg>
  );
}

/**
 * Hairline brackets at the corners of a panel. Two strokes per corner, never a
 * full frame — a complete gold border would read as a button.
 */
export function GoldCorners({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {[
        "start-0 top-0",
        "end-0 top-0 -scale-x-100",
        "start-0 bottom-0 -scale-y-100",
        "end-0 bottom-0 -scale-x-100 -scale-y-100",
      ].map((position) => (
        <svg
          key={position}
          viewBox="0 0 28 28"
          fill="none"
          stroke="rgba(251,191,36,0.4)"
          strokeWidth="1"
          strokeLinecap="round"
          className={cn("absolute h-7 w-7", position)}
        >
          <path d="M1 11V4a3 3 0 0 1 3-3h7" />
        </svg>
      ))}
    </span>
  );
}
