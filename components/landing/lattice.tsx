import { cn } from "@/lib/utils";

/**
 * The lattice: hairline squares turned on their corner, strung along diagonals.
 *
 * Drawn from a supplied reference. Four things carry that drawing, and all four
 * are worth stating because losing any one turns it into wallpaper:
 *
 *  1. Outline only. Never a fill — the moment a square becomes a surface it
 *     competes with the CTAs, which are the only solid gold on the page.
 *  2. Sizes that disagree loudly. A 76-unit square sits next to a 9-unit one.
 *     Evenly-sized squares read as a grid; this reads as a composition.
 *  3. Everything hangs off 45° axes, and the axes are drawn — thin lines that
 *     run *through* the squares and overshoot them at both ends, so the shapes
 *     look threaded onto something rather than scattered.
 *  4. Mostly emptiness. Roughly a tenth of the frame has ink in it.
 *
 * Geometry is data below rather than forty hand-written path coordinates, so
 * the rhythm can be read at a glance and tuned in one place.
 */

type Diamond = {
  /** Centre, in the 580×660 space the reference was measured in. */
  x: number;
  y: number;
  /** Half-diagonal — the distance from centre to any corner. */
  s: number;
  /** 0–1, multiplied into the layer's own opacity. */
  o?: number;
};

/** A square standing on its corner. */
function diamond({ x, y, s }: Diamond) {
  return `M${x},${y - s}L${x + s},${y}L${x},${y + s}L${x - s},${y}Z`;
}

/**
 * The reference composition, measured off the drawing.
 *
 * Two clusters strung on a shared diagonal, a long axis running under all of
 * it, and one deliberately absurd small square tucked against a large one —
 * that size clash is the detail that makes the pattern look drawn rather than
 * generated.
 */
const FIELD: Diamond[] = [
  { x: 297, y: 100, s: 58 },
  { x: 420, y: 242, s: 62, o: 0.85 },
  { x: 315, y: 264, s: 46 },
  // The size clash. A 9 against a 46, corners almost touching — this one pair
  // is what stops the composition reading as a generated grid.
  { x: 317, y: 300, s: 9 },
  { x: 345, y: 340, s: 17, o: 0.9 },
  { x: 35, y: 285, s: 57, o: 0.7 },
  { x: 192, y: 425, s: 78 },
  { x: 12, y: 462, s: 28, o: 0.7 },
  { x: 387, y: 478, s: 52, o: 0.85 },
  { x: 276, y: 565, s: 20, o: 0.9 },
];

/**
 * The axes the squares hang from.
 *
 * All three run at exactly 45°, parallel to the squares' own edges — that is
 * what makes the shapes look threaded onto the lines rather than laid over
 * them. Each overshoots the shapes at both ends, and the third crosses the
 * spine near the lower-left corner, which is the detail that keeps the drawing
 * from resolving into a single tidy diagonal.
 */
const AXES = [
  "M-20,637 L500,117",
  "M245,368 L333,280",
  "M-15,455 L85,555",
];

export function LatticeField({
  className,
  opacity = 0.26,
}: {
  className?: string;
  /** The whole layer's strength. Fields sit far lower than rules. */
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 580 660"
      fill="none"
      stroke="rgb(251 191 36)"
      strokeWidth="1.1"
      // Without this the stroke scales with the viewBox, so the same motif is
      // a hairline in one placement and a drawn line in another.
      vectorEffect="non-scaling-stroke"
      className={cn("pointer-events-none absolute [&_path]:[vector-effect:non-scaling-stroke]", className)}
      style={{ opacity }}
    >
      {AXES.map((axis) => (
        <path key={axis} d={axis} strokeOpacity="0.55" />
      ))}

      {FIELD.map((shape) => (
        <path
          key={`${shape.x}-${shape.y}-${shape.s}`}
          d={diamond(shape)}
          strokeOpacity={shape.o ?? 1}
        />
      ))}
    </svg>
  );
}

/**
 * The horizontal variant, for the gaps between sections.
 *
 * Same vocabulary turned on its side: a hairline with squares threaded onto
 * it, clustered off-centre rather than symmetrically. A centred ornament would
 * read as a fleuron in a book; an off-centre cluster keeps it a fragment of
 * the larger pattern.
 */
const RULE: Diamond[] = [
  { x: 96, y: 20, s: 15 },
  { x: 126, y: 20, s: 6, o: 0.85 },
  { x: 160, y: 20, s: 10, o: 0.9 },
  { x: 196, y: 20, s: 4, o: 0.8 },
];

export function LatticeRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "mx-auto w-full max-w-[80rem] px-5 sm:px-8",
        className
      )}
    >
      <svg
        viewBox="0 0 320 40"
        fill="none"
        stroke="rgb(251 191 36)"
        strokeWidth="1"
        preserveAspectRatio="none"
        className="h-10 w-full"
      >
        {/* The rule fades in from nothing and back out, so it never reads as a
            border between two boxes. */}
        <defs>
          <linearGradient id="lattice-rule-fade" x1="0" x2="320" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="rgb(251 191 36)" stopOpacity="0" />
            <stop offset="0.28" stopColor="rgb(251 191 36)" stopOpacity="0.42" />
            <stop offset="0.72" stopColor="rgb(251 191 36)" stopOpacity="0.42" />
            <stop offset="1" stopColor="rgb(251 191 36)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d="M0,20 H320" stroke="url(#lattice-rule-fade)" />
      </svg>

      {/* The squares ride in their own SVG so `preserveAspectRatio="none"` on
          the rule above cannot stretch them out of square. */}
      <svg
        viewBox="0 0 320 40"
        fill="none"
        stroke="rgb(251 191 36)"
        strokeWidth="1"
        className="-mt-10 h-10 w-full"
      >
        {RULE.map((shape) => (
          <path
            key={shape.x}
            d={diamond(shape)}
            strokeOpacity={(shape.o ?? 1) * 0.6}
          />
        ))}
      </svg>
    </div>
  );
}
