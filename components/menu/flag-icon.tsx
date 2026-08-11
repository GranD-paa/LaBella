import type { LanguageSlug } from "@/lib/curriculum/types";
import { getLanguageCode } from "@/lib/curriculum/language-codes";
import { cn } from "@/lib/utils";

/**
 * A single 5-point star, centered on the origin with outer radius 1 and the
 * classic inner radius 0.382 (1/phi²) — reused via <use> for the US flag's
 * star field instead of stamping the same path out by hand each time.
 */
const STAR_PATH =
  "M0,-1 0.2245,-0.309 0.9511,-0.309 0.3633,0.118 0.5878,0.809 0,0.382 -0.5878,0.809 -0.3633,0.118 -0.9511,-0.309 -0.2245,-0.309 Z";

const US_STRIPE_HEIGHT = 16 / 13;
// Alternating 3/2/3/2/3 columns (13 stars, one per founding colony) reads
// cleanly at icon size — the authentic 50-star grid just turns to noise
// this small.
const US_STARS = [
  { y: 1.3, xs: [1.6, 4.8, 8.0] },
  { y: 2.9, xs: [3.2, 6.4] },
  { y: 4.5, xs: [1.6, 4.8, 8.0] },
  { y: 6.1, xs: [3.2, 6.4] },
  { y: 7.7, xs: [1.6, 4.8, 8.0] },
];

/**
 * Hand-drawn flag glyphs instead of Unicode flag emoji. Windows doesn't ship
 * a color-emoji font that composes regional-indicator pairs into a flag, so
 * 🇮🇹/🇺🇸/etc. silently fall back to rendering as plain two-letter text
 * there — these SVGs look right on every platform, at any size.
 */
const FLAGS: Record<LanguageSlug, { render: () => React.ReactNode }> = {
  italian: {
    render: () => (
      <>
        <rect width="8" height="16" fill="#009246" />
        <rect x="8" width="8" height="16" fill="#ffffff" />
        <rect x="16" width="8" height="16" fill="#ce2b37" />
      </>
    ),
  },
  english: {
    render: () => (
      <>
        <defs>
          <path id="us-star" d={STAR_PATH} fill="#ffffff" />
        </defs>
        {/* Base is the red field; only the 6 white stripes are drawn on top. */}
        <rect width="24" height="16" fill="#b31942" />
        {[1, 3, 5, 7, 9, 11].map((stripeIndex) => (
          <rect
            key={stripeIndex}
            y={stripeIndex * US_STRIPE_HEIGHT}
            width="24"
            height={US_STRIPE_HEIGHT}
            fill="#ffffff"
          />
        ))}
        <rect width="10.3" height={US_STRIPE_HEIGHT * 7} fill="#0a3161" />
        {US_STARS.flatMap(({ y, xs }) =>
          xs.map((x) => (
            <use key={`${x}-${y}`} href="#us-star" transform={`translate(${x},${y}) scale(0.5)`} />
          ))
        )}
      </>
    ),
  },
  german: {
    render: () => (
      <>
        <rect width="24" height={16 / 3} fill="#000000" />
        <rect y={16 / 3} width="24" height={16 / 3} fill="#dd0000" />
        <rect y={(16 / 3) * 2} width="24" height={16 / 3} fill="#ffce00" />
      </>
    ),
  },
  turkish: {
    render: () => (
      <>
        <rect width="24" height="16" fill="#e30a17" />
        {/* Crescent: a white disc with a same-color-as-field disc offset
            toward the fly, leaving points (cusps) that open toward the
            star, i.e. away from the hoist. */}
        <circle cx="9.4" cy="8" r="3.7" fill="#ffffff" />
        <circle cx="10.7" cy="8" r="2.96" fill="#e30a17" />
        <path
          d={STAR_PATH}
          fill="#ffffff"
          transform="translate(14.6,8) scale(1.15) rotate(15)"
        />
      </>
    ),
  },
};

export function FlagIcon({
  slug,
  className,
}: {
  slug: LanguageSlug;
  className?: string;
}) {
  const flag = FLAGS[slug];

  // A language added to the curriculum before its flag is drawn here falls
  // back to its two-letter code in the same flag-shaped frame. Returning null
  // instead would leave a silent gap that nobody notices until a learner does.
  if (!flag) {
    return (
      <svg
        viewBox="0 0 24 16"
        className={cn(
          "overflow-hidden rounded-[3px] shadow-sm ring-1 ring-white/20",
          className
        )}
        role="img"
        aria-label={getLanguageCode(slug)}
      >
        <rect width="24" height="16" className="fill-white/10" />
        <text
          x="12"
          y="11.5"
          textAnchor="middle"
          className="fill-white/70"
          fontSize="9"
          fontWeight="600"
        >
          {getLanguageCode(slug)}
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 16"
      className={cn("overflow-hidden rounded-[3px] shadow-sm ring-1 ring-white/20", className)}
      role="img"
      aria-label={getLanguageCode(slug)}
    >
      {flag.render()}
    </svg>
  );
}

