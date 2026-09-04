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
  const navRef = useRef<HTMLElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  /**
   * Where the bar is relative to the page.
   *
   * `top` is the hero's own bar, drawn exactly as composed. Past the first few
   * pixels it detaches and rides the viewport, because the two section links
   * and the language switcher are worth reaching from halfway down the page
   * without scrolling back up for them.
   *
   * Once detached there are two states, and the direction of travel picks
   * between them: scrolling down takes everything off the bar but the logo and
   * pulls what is left into a small floating pill, and any scroll upward hands
   * the whole bar back — someone scrolling up is looking for something, and
   * the bar is usually it.
   */
  const [nav, setNav] = useState<"top" | "compact" | "full">("top");

  /**
   * Which cell the switcher's thumb sits under.
   *
   * `locale` is the truth, but it arrives from a server re-render: the click
   * writes a cookie and asks for a refresh, and the prop only changes once
   * that round trip lands. A control that stays put for a second after being
   * pressed reads as broken rather than slow, so the press moves it at once
   * and the prop reconciles when it catches up — including when it disagrees,
   * which is what a failed switch should look like.
   */
  const [shownLocale, setShownLocale] = useState<AppLocale>(locale);

  useEffect(() => {
    setShownLocale(locale);
  }, [locale]);
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

  /* ------------------------------------------------------------ scrolling ---
     The scroll state, read once per frame rather than per event.

     The direction test carries a dead zone. Without it a trackpad's own
     jitter, or the rubber-banding at the end of a fling, flips the bar open
     and shut while the page is effectively standing still — and a bar that
     twitches is worse than one that does not move at all. Small moves
     accumulate instead of being thrown away, so a slow deliberate scroll
     still registers; it just has to mean it. */
  useEffect(() => {
    const TOP = 24;
    const DEAD = 6;

    let last = window.scrollY;
    let frame = 0;

    const read = () => {
      frame = 0;
      const y = window.scrollY;

      /* How much of the page is behind you, for the fill inside the pane. It
         is written on every frame, including the ones the state machine below
         decides to ignore — the bar's shape is a question about direction,
         but the fill is only ever a question about position. */
      const runway = document.documentElement.scrollHeight - window.innerHeight;
      navRef.current?.style.setProperty(
        "--read",
        `${runway > 0 ? Math.min(100, (y / runway) * 100).toFixed(2) : 0}%`
      );

      if (y <= TOP) {
        last = y;
        setNav("top");
        return;
      }

      const delta = y - last;
      if (Math.abs(delta) < DEAD) {
        /* Not a deliberate move — but a page restored mid-scroll by the
           browser has to leave the top state on the first read anyway. */
        setNav((state) => (state === "top" ? "compact" : state));
        return;
      }

      last = y;
      setNav(delta > 0 ? "compact" : "full");
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* The logo's own width in pixels, published to CSS as `--mark`. The compact
     pill is that width and its padding and nothing else.

     Measured rather than authored, because the logo is not one fixed object:
     the wordmark is a different width in three locales, and it gives up its
     place entirely once a brand file lands. A written-down width would be
     right for exactly one of those states. `offsetWidth` and not the painted
     rectangle, because the compact bar shrinks the logo with a transform —
     asking for the painted size would return the shrunken one, which would
     shrink the pill, which would be measured again.

     The stylesheet clamps it, so an absent or absurd measurement just leaves
     the bar at full width rather than collapsing it to nothing. */
  useEffect(() => {
    const brand = rowRef.current?.querySelector<HTMLElement>(`.${styles.brand}`);
    if (!brand || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      navRef.current?.style.setProperty("--mark", `${brand.offsetWidth}px`);
    });

    observer.observe(brand);
    return () => observer.disconnect();
  }, []);

  /* ------------------------------------------------------------ in-page ---
     The two section links glide down the page instead of teleporting.

     Done here rather than with `scroll-behavior: smooth` on the document,
     which would apply to every anchor on every page this app renders — including
     the ones inside the app, where a jump is the right answer. This is the same
     move the scroll cue at the bottom of the hero already makes. */
  const jump = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const target = document.getElementById(id);
      // Nothing to scroll to: let the browser do whatever it would have done.
      if (!target) return;

      event.preventDefault();
      setNavOpen(false);

      /* The bar floats over the page, so the section has to stop below it
         rather than under it. The offset is the bar's own outer box, which
         stands one notch taller than the pane inside it: tall enough to clear
         the pane at its full height even when the trip down compacts it, with
         that notch left over as breathing room. Measured, so it holds at any
         viewport — the whole hero is drawn in units derived from the screen,
         and a written-down number would only be right on one. */
      const offset = navRef.current?.getBoundingClientRect().height ?? 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
      // The address bar should still say where we ended up. Replaced rather
      // than pushed: a link that scrolls is not a page the Back button owes
      // anyone a way out of.
      window.history.replaceState(null, "", `#${id}`);
    },
    []
  );

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
        {/* The open menu holds the bar at full width. The sheet is anchored to
            the pane's end edge, and a pane that narrows out from under it
            while the visitor is reading it is not a transition, it is a
            moving target. */}
        <header
          ref={navRef}
          className={styles.navbar}
          data-nav={navOpen && nav === "compact" ? "full" : nav}
        >
          <div className={styles.navrow} ref={rowRef} data-open={navOpen}>
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
              <a href="#pricing" onClick={(event) => jump(event, "pricing")}>
                {copy.nav.pricing}
              </a>
              <a href="#faq" onClick={(event) => jump(event, "faq")}>
                {copy.nav.faq}
              </a>

              {/* Splits the bar into what you read and what you press. Without
                  it the two links, the switcher and the call to action are one
                  undifferentiated run of controls. */}
              <span className={styles.navsplit} aria-hidden />

              {/*
                A segmented control, not three chips.
                
                Three separately outlined pills read as three choices to weigh;
                one track with a thumb reads as one setting with a current
                value, which is what a language switcher is. The thumb is
                positioned from `--lang-i` rather than measured, because the
                three cells are equal fractions of the track — no layout read,
                nothing to resynchronise on resize or a late webfont.

                Buttons, not anchors: these change a setting in place and go
                nowhere, and `aria-pressed` is what says which one is on.
              */}
              <span
                className={styles.langtoggle}
                role="group"
                aria-label={copy.nav.language}
                style={
                  {
                    "--lang-i": Math.max(
                      0,
                      LOCALES.findIndex((entry) => entry.code === shownLocale)
                    ),
                  } as React.CSSProperties
                }
              >
                <span className={styles.langThumb} aria-hidden />
                {LOCALES.map((entry) => (
                  <button
                    key={entry.code}
                    type="button"
                    aria-pressed={entry.code === shownLocale}
                    onClick={() => {
                      setShownLocale(entry.code);
                      onLocaleChange(entry.code);
                    }}
                  >
                    {entry.label}
                  </button>
                ))}
              </span>

              {/*
                Two doors, not one. A visitor who already has an account was
                being offered nothing but "sign up", and the honest reading of
                that bar is that this is the only way through — so they either
                make a second account or go looking for the link.

                They are a pair and are spaced as one: the outlined pill takes
                the bar's separation from the switcher, and only eight units
                sit between the two of them, so they read as one decision with
                two answers rather than two unrelated controls. The filled one
                stays the loud one, because signing up is still what we want
                from someone who has no account.
              */}
              {!isSignedIn && (
                <Link className={styles.signin} href="/login">
                  {copy.nav.signIn}
                </Link>
              )}

              <Link className={styles.enroll} href={href}>
                {isSignedIn ? copy.nav.dashboard : copy.nav.signUp}
              </Link>
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
