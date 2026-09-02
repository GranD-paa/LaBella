"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { BRAND_MARK } from "@/lib/landing/brand";
import type { CourseDeck } from "@/lib/landing/decks";
import { fill, type LandingCopy } from "@/lib/landing/content";
import type { LanguageSlug } from "@/lib/curriculum/types";
import type { AppLocale } from "@/lib/i18n/types";

import styles from "./hero.module.css";

/**
 * The hero: a full-viewport silk flag, a course name, and two globes cropped
 * by the screen edges.
 *
 * It is the page's course switcher. Whatever is featured here decides what
 * every section underneath renders, so the featured slug is owned by the
 * parent and this component only reports changes upward.
 *
 * The four courses sit on a ring: the left globe is always the previous course
 * and the right globe the next one, which makes every course at most two steps
 * away and the rotation reversible. On a touch screen the same ring answers to
 * a horizontal swipe.
 */

export type LandingCourse = {
  slug: LanguageSlug;
  /** Course name in the reading locale. */
  name: string;
  code: string;
  /** False for a path that is priced but has not opened yet. */
  available: boolean;
  /** 16:9 backdrop. */
  flag: string;
  /** 9:16 backdrop, for portrait viewports. */
  flagPhone: string;
  /** Circular flag for the side slots. */
  globe: string;
};

const LOCALES: { code: AppLocale; label: string }[] = [
  { code: "fa", label: "FA" },
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
];

export function LandingHero({
  courses,
  featured,
  onFeature,
  deck,
  copy,
  locale,
  dir,
  isSignedIn,
  onLocaleChange,
}: {
  courses: LandingCourse[];
  featured: LanguageSlug;
  onFeature: (slug: LanguageSlug) => void;
  deck: CourseDeck;
  copy: LandingCopy;
  locale: AppLocale;
  dir: "rtl" | "ltr";
  isSignedIn: boolean;
  onLocaleChange: (locale: AppLocale) => void;
}) {
  const stageRef = useRef<HTMLElement | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [anim, setAnim] = useState<"on" | "play" | null>(null);

  // Only the featured backdrop is fetched up front; the others arrive on
  // intent. Four full-bleed photographs on first paint is not a hero, it is a
  // download.
  const [warmed, setWarmed] = useState<Set<string>>(() => new Set([featured]));
  const [portrait, setPortrait] = useState(false);

  const index = courses.findIndex((course) => course.slug === featured);
  const count = courses.length;
  const previous = courses[(index - 1 + count) % count];
  const next = courses[(index + 1) % count];

  const warm = useCallback((slug: string) => {
    setWarmed((current) =>
      current.has(slug) ? current : new Set(current).add(slug)
    );
  }, []);

  /* A 16:9 flag centred in a portrait viewport shows the Italian flag's white
     middle band and nothing else, so those get a 9:16 render instead.
     The test is the viewport's shape, not its width: a 900x1400 desktop window
     is as badly cropped as a phone, and a width breakpoint would hand it the
     landscape file anyway. */
  useEffect(() => {
    const query = window.matchMedia("(max-aspect-ratio: 5/4)");
    const sync = () => setPortrait(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* The entrance runs once on mount and then removes itself, leaving the hero
     in its authored static state. Skipped entirely for reduced motion. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setAnim("on");
    let done: ReturnType<typeof setTimeout>;
    const play = () =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnim("play");
          done = setTimeout(() => setAnim(null), 2150);
        })
      );

    // A font stall must not hold the opening frame hostage.
    const guard = setTimeout(play, 500);
    void document.fonts?.ready.then(() => {
      clearTimeout(guard);
      play();
    });

    return () => {
      clearTimeout(guard);
      clearTimeout(done);
    };
  }, []);

  const select = useCallback(
    (slug: LanguageSlug) => {
      warm(slug);
      onFeature(slug);
    },
    [onFeature, warm]
  );

  /* ------------------------------------------------------------- swipe ---
     Touch only; a mouse keeps the click-a-globe behaviour. Dragging left
     pulls the right-hand globe in and dragging right pulls the left-hand one
     in — the same physical mapping in both reading directions, because the
     globes are pinned to physical edges rather than to the text direction. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pointer: number | null = null;
    let startX = 0;
    let startY = 0;
    let offset = 0;
    let horizontal = false;
    let swiped = false;

    const clamp = (value: number, max: number) =>
      value < -max ? -max : value > max ? max : value;

    const follow = (dx: number) => {
      if (reduced.matches) return;
      stage.style.setProperty("--drag", `${clamp(dx * 0.55, 70)}px`);
      stage.style.setProperty("--drag-bg", `${clamp(dx * 0.12, 26)}px`);
    };

    const settle = () => {
      stage.dataset.swipe = "settling";
      stage.style.setProperty("--drag", "0px");
      stage.style.setProperty("--drag-bg", "0px");
      setTimeout(() => delete stage.dataset.swipe, 400);
    };

    const down = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || navOpen) return;
      pointer = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      offset = 0;
      horizontal = false;
    };

    const move = (event: PointerEvent) => {
      if (event.pointerId !== pointer) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      if (!horizontal) {
        if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.3) {
          horizontal = true;
        } else {
          if (Math.abs(dy) > 12) pointer = null;
          return;
        }
      }

      offset = dx;
      follow(dx);
    };

    const up = (event: PointerEvent) => {
      if (event.pointerId !== pointer) return;
      const dx = offset;
      pointer = null;
      horizontal = false;
      offset = 0;

      if (Math.abs(dx) >= Math.max(44, window.innerWidth * 0.13)) {
        select(dx < 0 ? next.slug : previous.slug);
        // A drag that ends on a link must not also fire its click.
        swiped = true;
        setTimeout(() => {
          swiped = false;
        }, 320);
      }
      settle();
    };

    const swallow = (event: MouseEvent) => {
      if (!swiped) return;
      event.preventDefault();
      event.stopPropagation();
    };

    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    stage.addEventListener("pointerleave", up);
    document.addEventListener("click", swallow, true);

    return () => {
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
      stage.removeEventListener("pointerleave", up);
      document.removeEventListener("click", swallow, true);
    };
  }, [navOpen, next.slug, previous.slug, select]);

  /* Close the menu on an outside click or Escape. */
  useEffect(() => {
    if (!navOpen) return;

    const outside = (event: MouseEvent) => {
      const row = stageRef.current?.querySelector(`.${styles.navrow}`);
      if (row && !row.contains(event.target as Node)) setNavOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };

    document.addEventListener("click", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("click", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [navOpen]);

  const href = isSignedIn ? "/dashboard" : "/sign-up";

  return (
    <section
      ref={stageRef}
      className={styles.stage}
      data-fa={locale === "fa"}
      data-rtl={dir === "rtl"}
      data-anim={anim ?? undefined}
    >
      <div className={styles.sky}>
        {courses.map((course) => (
          <div
            key={course.slug}
            className={`${styles.flag} ${course.slug === featured ? styles.flagActive : ""}`}
            style={
              warmed.has(course.slug)
                ? {
                    backgroundImage: `url(${portrait ? course.flagPhone : course.flag})`,
                  }
                : undefined
            }
            aria-hidden
          />
        ))}
      </div>
      <div className={styles.scrim} aria-hidden />

      <div className={styles.ui}>
        <header className={styles.navbar}>
          <div className={styles.navrow} data-open={navOpen}>
            <Link className={styles.brand} href="/" aria-label="Laparli">
              {BRAND_MARK ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.logoMark}
                  src={BRAND_MARK.src}
                  alt={BRAND_MARK.alt}
                  style={{ height: `calc(${BRAND_MARK.height} * var(--u))` }}
                />
              ) : (
                // Holds the mark's exact footprint until the file lands, so
                // adding it later moves nothing else on the bar.
                <span className={styles.logoSlot} aria-hidden />
              )}
              {!BRAND_MARK?.replacesWordmark && (
                <span className={styles.logo}>
                  lapar<i>li</i>
                </span>
              )}
            </Link>

            <nav className={styles.links} id="landing-nav">
              <a href="#pricing">{copy.nav.pricing}</a>
              <a href="#faq">{copy.nav.faq}</a>
              <Link className={styles.enroll} href={href}>
                {isSignedIn ? copy.nav.dashboard : copy.nav.signUp}
              </Link>
              <span className={styles.langtoggle} role="group" aria-label="Language">
                {LOCALES.map((entry) => (
                  <a
                    key={entry.code}
                    href="#"
                    className={entry.code === locale ? styles.langActive : undefined}
                    aria-current={entry.code === locale ? "true" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      onLocaleChange(entry.code);
                    }}
                  >
                    {entry.label}
                  </a>
                ))}
              </span>
            </nav>

            <button
              className={styles.burger}
              type="button"
              aria-label={navOpen ? copy.nav.menuClose : copy.nav.menuOpen}
              aria-expanded={navOpen}
              aria-controls="landing-nav"
              onClick={(event) => {
                event.stopPropagation();
                setNavOpen((open) => !open);
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        <div className={styles.copy}>
          <div className={`${styles.col} ${styles.eyebrow}`}>
            <span className={styles.mask}>
              <span className={styles.line}>{copy.hero.eyebrow}</span>
            </span>
          </div>

          <h1 className={`${styles.col} ${styles.title}`}>
            <span className={styles.mask}>
              <span className={styles.line}>{deck.name}</span>
            </span>
          </h1>

          <div className={`${styles.col} ${styles.rule}`}>
            <span />
          </div>

          <p className={`${styles.col} ${styles.lede}`}>{deck.intro}</p>

          <div className={`${styles.col} ${styles.cta}`}>
            <GlobeSlot
              className={styles.planetL}
              courses={courses}
              target={previous}
              label={fill(copy.hero.showCourse, { course: previous.name })}
              onSelect={select}
              onWarm={warm}
            />
            <GlobeSlot
              className={styles.planetR}
              courses={courses}
              target={next}
              label={fill(copy.hero.showCourse, { course: next.name })}
              onSelect={select}
              onWarm={warm}
            />

            <Link href={href}>{copy.hero.cta}</Link>

            <span className={`${styles.label} ${styles.labelL}`}>
              {previous.name}
            </span>
            <span className={`${styles.label} ${styles.labelR}`}>
              {next.name}
            </span>
          </div>
        </div>
      </div>

      <button
        className={styles.cue}
        type="button"
        aria-label={copy.hero.scrollLabel}
        onClick={() =>
          document
            .getElementById("method")
            ?.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      >
        <span className={styles.cueLine} aria-hidden />
        <span className={styles.cueDot} aria-hidden>
          <svg viewBox="0 0 26 33" fill="none">
            <path
              d="M13 1.5 V31.5 M1.9 20.4 L13 31.5 L24.1 20.4"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="square"
            />
          </svg>
        </span>
        <span className={styles.cueText}>
          {fill(copy.hero.scrollHint, { course: deck.name })}
        </span>
      </button>
    </section>
  );
}

/**
 * One side slot.
 *
 * Every course's globe is rendered into both slots and revealed with a class,
 * never by reassigning `src` — otherwise the browser keeps painting the old
 * flag until the new file has been fetched, and the switch flashes.
 */
function GlobeSlot({
  className,
  courses,
  target,
  label,
  onSelect,
  onWarm,
}: {
  className: string;
  courses: LandingCourse[];
  target: LandingCourse;
  label: string;
  onSelect: (slug: LanguageSlug) => void;
  onWarm: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.planet} ${className}`}
      aria-label={label}
      onClick={() => onSelect(target.slug)}
      onPointerEnter={() => onWarm(target.slug)}
      onFocus={() => onWarm(target.slug)}
    >
      {courses.map((course) => (
        <span
          key={course.slug}
          className={`${styles.globe} ${course.slug === target.slug ? styles.globeShown : ""}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={course.globe} alt="" />
        </span>
      ))}
    </button>
  );
}
