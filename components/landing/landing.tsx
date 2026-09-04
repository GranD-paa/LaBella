"use client";

import { useState } from "react";

import { useLocale } from "@/components/providers/locale-provider";

import { LandingHero, type LandingCourse } from "./hero";
import {
  PricingSection,
  PricingFallback,
} from "./pricing-section";
import {
  LandingDay,
  LandingFaq,
  LandingFeatures,
  LandingFinal,
  LandingFooter,
  LandingHurdles,
  LandingLesson,
  LandingSteps,
  LandingTicker,
} from "./sections";
import type { LanguageSlug } from "@/lib/curriculum/types";
import type { LandingCopy } from "@/lib/landing/content";
import type { CourseDeck } from "@/lib/landing/decks";
import type { LandingPricingData } from "@/lib/landing/pricing";
import type { AppLocale } from "@/lib/i18n/types";

/**
 * The whole landing page, downstream of one piece of state.
 *
 * `featured` is the course flying in the hero, and every section reads its
 * deck from it. That is the difference from the live page: there, the pricing
 * section owns its own language choice and nothing else on the page knows
 * about it; here the choice is made once, at the top, in the most visible
 * control on the screen, and the rest of the page follows.
 *
 * The whole tree is a client component because that state has to change
 * without a request. Everything it renders — copy for all four courses in the
 * reading locale, and the prices for every course — is handed down from the
 * server, so switching courses costs no round trip and quotes no price this
 * page computed itself.
 */
export function Landing({
  courses,
  decks,
  copy,
  pricing,
  locale,
  dir,
  isSignedIn,
}: {
  courses: LandingCourse[];
  decks: Record<LanguageSlug, CourseDeck>;
  copy: LandingCopy;
  /** Null when there is nothing honest to price — see `getLandingPricing`. */
  pricing: LandingPricingData | null;
  locale: AppLocale;
  dir: "rtl" | "ltr";
  isSignedIn: boolean;
}) {
  const { setLocale } = useLocale();
  const [featured, setFeatured] = useState<LanguageSlug>(
    () => courses[0]?.slug ?? "italian"
  );

  const deck = decks[featured];
  const course = courses.find((entry) => entry.slug === featured);

  return (
    <>
      <LandingHero
        courses={courses}
        featured={featured}
        onFeature={setFeatured}
        deck={deck}
        copy={copy}
        locale={locale}
        dir={dir}
        isSignedIn={isSignedIn}
        onLocaleChange={setLocale}
      />

      <main id="main" className="grain relative bg-[#090014]">
        <LandingTicker deck={deck} copy={copy} />
        <LandingHurdles deck={deck} copy={copy} />
        <LandingLesson deck={deck} copy={copy} />
        <LandingFeatures deck={deck} copy={copy} />
        <LandingSteps deck={deck} copy={copy} isSignedIn={isSignedIn} />

        {pricing ? (
          <PricingSection
            deck={deck}
            copy={copy}
            data={pricing}
            courseSlug={featured}
            available={course?.available ?? false}
            isSignedIn={isSignedIn}
            defaultToToman={locale === "fa"}
          />
        ) : (
          <PricingFallback
            deck={deck}
            copy={copy}
            isSignedIn={isSignedIn}
          />
        )}

        <LandingDay deck={deck} copy={copy} />
        <LandingFaq deck={deck} copy={copy} />
        <LandingFinal deck={deck} copy={copy} isSignedIn={isSignedIn} />
      </main>

      <LandingFooter deck={deck} copy={copy} />
    </>
  );
}
