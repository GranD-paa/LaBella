"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Check, LESSON_ICONS, SectionHead } from "@/components/landing/landing-bits";
import type { CourseDeck } from "@/lib/landing/decks";
import { fill, type LandingCopy } from "@/lib/landing/content";
import { cn } from "@/lib/utils";

import styles from "./sections.module.css";

/**
 * Everything under the hero.
 *
 * Each section takes the featured course's deck, so switching the flag at the
 * top rewrites the page beneath it — the phrases, the sample lesson, the
 * difficulties, the questions and the price all belong to one course at a
 * time. The method sections take the course name by interpolation rather than
 * being written four times; see `lib/landing/content.ts`.
 *
 * The small shared pieces (`SectionHead`, `Check`, the module icons) come from
 * the live landing page on purpose. The dependency only runs that way — this
 * page borrows from `components/landing/`, never the reverse — so nothing here
 * can affect what `/` renders.
 */

/** Fades a block in the first time it comes into view, then stops watching. */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(styles.reveal, shown && styles.revealed, className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ ticker */

/** How fast the phrases travel, in CSS pixels a second. */
const TICKER_SPEED = 55;

export function LandingTicker({
  deck,
  copy,
}: {
  deck: CourseDeck;
  copy: LandingCopy;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const setRef = useRef<HTMLSpanElement | null>(null);
  const [copies, setCopies] = useState(2);
  const [duration, setDuration] = useState(0);

  /**
   * A marquee that slides half its own width is seamless only if that half is
   * wider than the viewport. One set of eight phrases is not, on a desktop —
   * which is why the run used to show a gap and then appear to start over. So
   * measure one set, repeat it until half the run covers the screen with a set
   * to spare, and derive the duration from the distance to keep the speed the
   * same whatever the course or the window size.
   */
  useEffect(() => {
    const measure = () => {
      const set = setRef.current;
      const track = trackRef.current;
      if (!set || !track) return;

      const setWidth = set.getBoundingClientRect().width;
      if (!setWidth) return;

      const viewport = track.parentElement?.clientWidth ?? window.innerWidth;
      const half = Math.ceil(viewport / setWidth) + 1;
      setCopies(half * 2);
      setDuration((half * setWidth) / TICKER_SPEED);
    };

    measure();
    window.addEventListener("resize", measure);
    // A webfont landing late changes every width, so measure again after it.
    void document.fonts?.ready.then(measure);

    return () => window.removeEventListener("resize", measure);
  }, [deck]);

  return (
    <section
      // Forced LTR whatever the page direction. A `max-content` box inside an
      // RTL block is anchored by its right edge and grows leftwards, so
      // translating it negatively walks the entire run off the left of the
      // screen and the band goes blank after a few phrases. Anchoring the rail
      // left keeps the geometry identical in every locale; which way the
      // phrases travel is the animation's job, not the layout's.
      dir="ltr"
      className="relative overflow-hidden border-y border-white/[0.07] bg-white/[0.02] py-7"
    >
      <h2 className="sr-only">
        {fill(copy.ticker.title, { course: deck.name })}
      </h2>
      <div
        ref={trackRef}
        className={styles.marquee}
        style={
          duration
            ? { animationDuration: `${duration}s` }
            : // Held still until the first measurement, which is one frame
              // away — moving at a guessed speed would be a visible jump.
              { animationPlayState: "paused" }
        }
      >
        {Array.from({ length: copies }, (_, index) => (
          <span
            key={index}
            ref={index === 0 ? setRef : undefined}
            className={styles.set}
            // The phrases are read once; the repeats are there to fill the
            // screen, and a screen reader should not hear them again.
            aria-hidden={index > 0}
          >
            {deck.ticker.map((entry) => (
              <span
                key={entry.phrase}
                className="flex shrink-0 items-baseline gap-3 px-8 text-sm"
              >
                <span className={cn(styles.line, "font-medium text-white/90")}>
                  {entry.phrase}
                </span>
                <span className="text-white/35">{entry.meaning}</span>
                <span className="px-4 text-primary/40" aria-hidden>
                  ·
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- hurdles */

export function LandingHurdles({
  deck,
  copy,
}: {
  deck: CourseDeck;
  copy: LandingCopy;
}) {
  return (
    <section id="method" className="scroll-mt-24 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <Reveal>
          <SectionHead
            eyebrow={deck.code}
            title={fill(copy.hurdles.title, { course: deck.name })}
            sub={fill(copy.hurdles.sub, { course: deck.name })}
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-3">
          {deck.hurdles.map((hurdle, index) => (
            <Reveal key={hurdle.title} delay={index * 90}>
              <div className="h-full bg-[#0b0320] p-7 sm:p-8">
                <span className="text-[0.68rem] font-semibold tracking-[0.2em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {hurdle.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.9] text-white/55">
                  {hurdle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ lesson */

export function LandingLesson({
  deck,
  copy,
}: {
  deck: CourseDeck;
  copy: LandingCopy;
}) {
  return (
    <section className="relative border-y border-white/[0.07] bg-white/[0.015] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <Reveal>
          <SectionHead
            title={copy.lesson.title}
            sub={fill(copy.lesson.sub, { course: deck.name })}
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.lesson.parts.map((part, index) => (
            <Reveal key={part.title} delay={index * 70}>
              <div className="h-full rounded-2xl border border-white/[0.08] bg-[#0b0320] p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {LESSON_ICONS[index]}
                </span>
                <h3 className="mt-5 text-base font-semibold text-white">
                  {part.title}
                </h3>
                <p className="mt-2.5 text-sm leading-[1.9] text-white/55">
                  {fill(part.body, { course: deck.name })}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- features */

export function LandingFeatures({
  deck,
  copy,
}: {
  deck: CourseDeck;
  copy: LandingCopy;
}) {
  return (
    <section className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <Reveal>
          <SectionHead
            title={copy.features.title}
            sub={fill(copy.features.sub, { course: deck.name })}
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {copy.features.items.map((item, index) => (
            <Reveal key={item.title} delay={(index % 3) * 80}>
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.9] text-white/55">
                  {fill(item.body, { course: deck.name })}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- steps */

export function LandingSteps({
  deck,
  copy,
  isSignedIn,
}: {
  deck: CourseDeck;
  copy: LandingCopy;
  isSignedIn: boolean;
}) {
  return (
    <section className="border-y border-white/[0.07] bg-white/[0.015] py-24 sm:py-32">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <Reveal>
          <SectionHead
            title={fill(copy.steps.title, { course: deck.name })}
            sub={copy.steps.sub}
          />
        </Reveal>

        <ol className="mt-14 grid gap-8 sm:grid-cols-3">
          {copy.steps.items.map((step, index) => (
            <Reveal key={step.title} delay={index * 90}>
              <li className="list-none">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {fill(step.title, { course: deck.name })}
                </h3>
                <p className="mt-3 text-sm leading-[1.9] text-white/55">
                  {fill(step.body, { course: deck.name })}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12">
          <Link
            href={isSignedIn ? "/dashboard" : "/sign-up"}
            className="inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-semibold text-[#071227]"
          >
            {copy.final.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- day */

export function LandingDay({
  deck,
  copy,
}: {
  deck: CourseDeck;
  copy: LandingCopy;
}) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <Reveal>
          <SectionHead
            title={fill(copy.day.title, { course: deck.name })}
            sub={copy.day.sub}
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {copy.day.items.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <span className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-primary">
                  {item.when}
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.9] text-white/55">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- faq */

export function LandingFaq({
  deck,
  copy,
}: {
  deck: CourseDeck;
  copy: LandingCopy;
}) {
  // The course's own questions first — they are the ones a visitor looking at
  // this flag actually came with.
  const items = [...deck.faq, ...copy.faq.items];

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-white/[0.07] py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <Reveal>
          <SectionHead title={copy.faq.title} sub={copy.faq.sub} />
        </Reveal>

        <div className="mt-14 grid gap-3 lg:max-w-4xl">
          {items.map((item, index) => (
            <Reveal key={item.q} delay={Math.min(index, 4) * 60}>
              <details className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 open:bg-white/[0.04]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-medium text-white marker:content-none">
                  {item.q}
                  <span
                    aria-hidden
                    className="shrink-0 text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 text-sm leading-[1.95] text-white/55">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- final */

export function LandingFinal({
  deck,
  copy,
  isSignedIn,
}: {
  deck: CourseDeck;
  copy: LandingCopy;
  isSignedIn: boolean;
}) {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[26rem] bg-[radial-gradient(ellipse_50%_70%_at_50%_100%,rgba(114,9,183,0.2),transparent)]"
      />
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.1] tracking-tight text-white">
            {deck.final.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-[1.9] text-white/55">
            {deck.final.sub}
          </p>
          <Link
            href={isSignedIn ? "/dashboard" : "/sign-up"}
            className="mt-10 inline-flex h-14 items-center rounded-full bg-white px-9 text-sm font-semibold text-[#071227]"
          >
            {copy.final.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ footer */

export function LandingFooter({
  deck,
  copy,
}: {
  deck: CourseDeck;
  copy: LandingCopy;
}) {
  return (
    <footer className="border-t border-white/[0.07] py-12">
      <div className="mx-auto flex max-w-[80rem] flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-lg font-semibold text-white">
            lapar<span className="text-primary">li</span>
          </p>
          <p className="mt-1 text-sm text-white/40">{copy.footer.tagline}</p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/50">
          <Link href="/about">{copy.footer.about}</Link>
          <Link href="/contact">{copy.footer.contact}</Link>
          <Link href="/blog">{copy.footer.blog}</Link>
          <span className="flex items-center gap-2 text-white/30">
            <Check className="h-3.5 w-3.5" />
            {deck.nativeName}
          </span>
        </nav>
      </div>

      <p className="mx-auto mt-8 max-w-[80rem] px-5 text-xs text-white/25 sm:px-8">
        © {new Date().getFullYear()} Laparli — {copy.footer.rights}
      </p>
    </footer>
  );
}
