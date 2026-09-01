import Link from "next/link";

import {
  Arrow,
  LESSON_ICONS,
  SectionHead,
} from "@/components/landing/landing-bits";
import { LatticeField } from "@/components/landing/lattice";
import type { LandingCopy, LandingLanguageCopy } from "@/lib/landing/content";
import type { LandingLanguageDefinition } from "@/lib/landing/languages";
import { cn } from "@/lib/utils";

export type JourneyLanguage = LandingLanguageDefinition & {
  copy: LandingLanguageCopy;
};

/** Anatomy of a module, the four parts numbered and iconed. */
export function LandingLesson({ copy }: { copy: LandingCopy }) {
  return (
    <section
      id="lesson"
      className="relative scroll-mt-24 py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(ellipse_45%_60%_at_50%_0%,rgba(114,9,183,0.18),transparent)]"
      />

      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <SectionHead
          eyebrow={copy.nav.method}
          title={copy.lesson.title}
          sub={copy.lesson.sub}
        />

        <ol
          data-reveal-group
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {copy.lesson.parts.map((part, index) => (
            <li
              key={part.title}
              data-reveal-item
              className="glass glass-hover edge-light relative overflow-hidden rounded-3xl p-7"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {LESSON_ICONS[index]}
                </span>
                <span
                  aria-hidden
                  className="font-display text-3xl leading-none text-white/10"
                  dir="ltr"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                {part.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.85] text-white/55">
                {part.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function LandingFeatures({ copy }: { copy: LandingCopy }) {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <SectionHead title={copy.features.title} sub={copy.features.sub} />

        {/* A hairline grid rather than separated cards: the 1px gap over a
            lighter backing draws the rules for free and keeps the block
            reading as one table of capabilities. */}
        <div
          data-reveal-group
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
        >
          {copy.features.items.map((item) => (
            <article
              key={item.title}
              data-reveal-item
              className="group relative bg-[#0a0117] p-7 transition-colors duration-500 hover:bg-[#0e021f] sm:p-8"
            >
              <h3 className="text-base font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.85] text-white/55">
                {item.body}
              </p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary/70 transition-transform duration-500 group-hover:scale-x-100"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingSteps({ copy }: { copy: LandingCopy }) {
  return (
    <section className="relative py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <SectionHead title={copy.steps.title} sub={copy.steps.sub} />

        <ol data-reveal-group className="relative mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {/* The connector only exists on wide screens, where the three steps
              actually sit in a row. Stacked, it would point nowhere. */}
          <span
            aria-hidden
            className="absolute inset-x-8 top-6 hidden h-px bg-gradient-to-r from-primary/45 via-primary/20 to-transparent lg:block"
          />

          {copy.steps.items.map((step, index) => (
            <li key={step.title} data-reveal-item className="relative">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-[#0a0117] font-display text-lg text-primary">
                {index + 1}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-[1.85] text-white/55">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * The language rail.
 *
 * Built to grow: the grid reflows on its own, and a card carries no photograph
 * at all — its identity is its accent, its endonym, and the letters that
 * language has and Persian does not. That means a new path can go live the day
 * its curriculum does, with nothing to commission.
 */
export function LandingLanguages({
  copy,
  languages,
}: {
  copy: LandingCopy;
  languages: JourneyLanguage[];
}) {
  return (
    <section
      id="languages"
      className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      {/* Mirrored against the one in the method section and hung on the
          opposite edge, so the two do not stack the page's weight on one side. */}
      <LatticeField
        className="-z-10 start-0 top-0 hidden h-[25rem] w-[24rem] -translate-x-1/4 -scale-x-100 lg:block rtl:translate-x-1/4"
        opacity={0.22}
      />

      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <SectionHead title={copy.languages.title} sub={copy.languages.sub} />

        <ul
          data-reveal-group
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {languages.map((language) => (
            <li key={language.slug} data-reveal-item>
              <LanguageCard copy={copy} language={language} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LanguageCard({
  copy,
  language,
}: {
  copy: LandingCopy;
  language: JourneyLanguage;
}) {
  const { region, title, letters, body } = language.copy;
  const available = Boolean(language.href);

  const inner = (
    <>
      {/* The one place a language's own colour appears at full strength. As a
          surface it would fight the brand; as a 2px edge it reads as a label. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: language.accent }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 transition-opacity duration-700 group-hover:opacity-70"
        style={{
          background: `radial-gradient(ellipse 90% 55% at 50% 0%, ${language.accent}26, transparent 72%)`,
        }}
      />

      <p className="text-[0.66rem] uppercase tracking-[0.3em] text-white/35">
        {region}
      </p>

      <h3 className="mt-4 text-2xl font-bold text-white">{title}</h3>
      <p className="mt-1 font-display text-lg italic text-white/35" dir="ltr">
        {language.nativeName}
      </p>

      {/* The letters do the work a photograph would have: they are instantly
          recognisable as that language, and unlike a stock monument they teach
          the reader something true before they click. */}
      <div className="mt-6">
        <p className="text-[0.62rem] uppercase tracking-[0.22em] text-white/25">
          {copy.languages.lettersLabel}
        </p>
        <p
          dir="ltr"
          className="mt-2 font-display text-3xl leading-none tracking-wide transition-colors duration-500"
          style={{ color: language.accent }}
        >
          {letters}
        </p>
      </div>

      <p className="mt-6 flex-1 text-sm leading-[1.85] text-white/55">{body}</p>

      <span
        className={cn(
          "mt-7 inline-flex items-center gap-2 text-sm font-semibold",
          available ? "text-primary" : "text-white/35"
        )}
      >
        {available ? copy.languages.start : copy.languages.comingSoon}
        {available && <Arrow />}
      </span>
    </>
  );

  const shell =
    "group glass edge-light relative isolate flex h-full flex-col overflow-hidden rounded-3xl p-7";

  return available ? (
    <Link
      href={language.href!}
      className={cn(
        shell,
        "glass-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      )}
    >
      {inner}
    </Link>
  ) : (
    <div className={cn(shell, "opacity-70")} aria-disabled>
      {inner}
    </div>
  );
}
