import Link from "next/link";

import { HeroScene } from "@/components/landing/hero-scene";
import { Arrow, Check, Cross, Eyebrow } from "@/components/landing/landing-bits";
import { LatticeField } from "@/components/landing/lattice";
import type { LandingCopy } from "@/lib/landing/content";

/**
 * The opening act: the hero, the phrase marquee under it, and the
 * before/after that states the argument.
 */

export function LandingHero({
  copy,
  isSignedIn,
}: {
  copy: LandingCopy;
  isSignedIn: boolean;
}) {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:min-h-screen lg:pb-28">
      {/* Order matters: aurora paints the field, the WebGL horizon sits over
          it, and both are behind the copy. Without WebGL the aurora alone
          still reads as a designed background rather than a bare colour. */}
      <div aria-hidden className="aurora -z-20" />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-90">
        <HeroScene />
      </div>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-[linear-gradient(to_top,#090014,transparent)]"
      />

      <div className="mx-auto w-full max-w-[80rem] px-5 sm:px-8">
        <span
          data-reveal
          className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.07] py-1.5 ps-2.5 pe-4 text-[0.78rem] font-medium text-primary"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          {copy.hero.badge}
        </span>

        <h1
          data-line-mask
          className="mt-8 max-w-[20ch] text-[clamp(2.4rem,6.6vw,5.2rem)] font-bold leading-[1.06] tracking-tight text-white"
        >
          <span className="block overflow-hidden pb-[0.22em] -mb-[0.12em]">
            <span data-line className="block">
              {copy.hero.title}
            </span>
          </span>
        </h1>

        <p
          data-reveal
          className="mt-7 max-w-xl text-base leading-[1.9] text-white/60 sm:text-lg"
        >
          {copy.hero.sub}
        </p>

        <div
          data-reveal
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link
            href={isSignedIn ? "/menu" : "/sign-up"}
            className="group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_16px_44px_-12px_rgba(251,191,36,0.5)] transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {copy.hero.ctaPrimary}
            <Arrow />
          </Link>

          <a
            href="#lesson"
            className="glass glass-hover inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-medium text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
              className="h-3.5 w-3.5"
            >
              <path d="M8 5.5v13l11-6.5-11-6.5Z" />
            </svg>
            {copy.hero.ctaSecondary}
          </a>
        </div>

        <ul
          data-reveal
          className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2.5"
        >
          {copy.hero.trust.map((item) => (
            <li
              key={item}
              className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-white/65"
            >
              <Check className="h-3.5 w-3.5 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * The phrase marquee.
 *
 * SignalYar runs live market rates here and leaves them blank until the API
 * answers, on the principle that invented numbers on a financial tool are
 * worse than a gap. The same principle points somewhere different for a
 * language school: these phrases are real sentences with real translations, so
 * they can be static and still be true.
 */
export function LandingTicker({ copy }: { copy: LandingCopy }) {
  // Two identical passes, so the -50% keyframe lands exactly on the start of
  // the second and the loop has no seam.
  const lane = [...copy.ticker, ...copy.ticker];

  return (
    <div
      aria-hidden
      className="ticker-mask relative overflow-hidden border-y border-white/[0.07] bg-white/[0.015] py-4"
    >
      <div className="ticker-track flex w-max items-center gap-10">
        {lane.map((entry, index) => (
          <span
            key={`${entry.phrase}-${index}`}
            className="flex shrink-0 items-center gap-3 text-sm"
          >
            <span className="rounded border border-white/15 px-1.5 py-0.5 font-display text-[0.65rem] tracking-wider text-primary/80">
              {entry.lang}
            </span>
            <span className="font-display text-white/85" dir="ltr">
              {entry.phrase}
            </span>
            <span className="text-white/35">{entry.meaning}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function LandingWhy({ copy }: { copy: LandingCopy }) {
  return (
    <section
      id="method"
      className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      {/* Hung in the gap beside the heading, which is capped at max-w-2xl and
          leaves the far half of the row empty on wide screens. Off-screen on
          narrow ones, where there is no gap to fill. */}
      <LatticeField
        className="-z-10 end-0 top-0 hidden h-[27rem] w-[26rem] translate-x-1/4 lg:block rtl:-translate-x-1/4"
        opacity={0.26}
      />

      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <div className="max-w-2xl">
          <div data-reveal>
            <Eyebrow>{copy.why.beforeLabel} ← {copy.why.afterLabel}</Eyebrow>
          </div>
          <h2
            data-reveal
            className="mt-6 text-[clamp(2rem,4.8vw,3.6rem)] font-bold leading-[1.08] tracking-tight text-white"
          >
            {copy.why.title}
          </h2>
          <p data-reveal className="mt-5 text-base leading-[1.9] text-white/55">
            {copy.why.sub}
          </p>
        </div>

        {/* One row per claim, split into the two columns. Two separate lists
            would make the reader hold five items in their head to compare
            them; paired rows do the comparing for them. */}
        <div data-reveal-group className="mt-14 lg:mt-20">
          <div className="mb-4 hidden grid-cols-2 gap-4 px-6 lg:grid">
            <span className="text-xs uppercase tracking-[0.28em] text-white/30">
              {copy.why.beforeLabel}
            </span>
            <span className="text-xs uppercase tracking-[0.28em] text-primary/70">
              {copy.why.afterLabel}
            </span>
          </div>

          <ul className="overflow-hidden rounded-3xl border border-white/[0.08]">
            {copy.why.rows.map((row, index) => (
              <li
                key={row.after}
                data-reveal-item
                className={
                  index % 2 === 0 ? "bg-white/[0.018]" : "bg-transparent"
                }
              >
                <div className="grid gap-3 p-6 lg:grid-cols-2 lg:gap-4 lg:p-6">
                  <div className="flex items-start gap-3">
                    <Cross className="mt-0.5 h-4 w-4 shrink-0 text-white/25" />
                    <span className="text-[0.95rem] leading-relaxed text-white/40 line-through decoration-white/15">
                      {row.before}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-[0.95rem] leading-relaxed text-white/85">
                      {row.after}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
