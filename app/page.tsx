import type { Metadata } from "next";

import { Landing } from "@/components/landing/landing";
import type { LandingCourse } from "@/components/landing/hero";
import { getLanguagesWithAvailability } from "@/lib/curriculum/availability";
import { getLanguageCode } from "@/lib/curriculum/language-codes";
import { LANGUAGES } from "@/lib/curriculum/languages";
import type { LanguageSlug } from "@/lib/curriculum/types";
import { getDataRepository } from "@/lib/data";
import { getLocaleDefinition } from "@/lib/i18n/config";
import { getServerLocale } from "@/lib/i18n/server-locale";
import { getLandingCopy, type LandingCopy } from "@/lib/landing/content";
import {
  COURSE_ORDER,
  getCourseDecks,
  type CourseDeck,
} from "@/lib/landing/decks";
import { LANDING_LANGUAGES } from "@/lib/landing/languages";
import { getLandingPricing } from "@/lib/landing/pricing";
import { getVisibleLandingLanguages } from "@/lib/landing/visibility";
import { getSiteUrl } from "@/lib/seo/site-url";

/**
 * The public landing page.
 *
 * The hero is a course switcher, and everything below it follows whatever is
 * flying at the top: the phrases, the difficulties, the questions and the
 * price all belong to one course at a time. Everything the client needs to
 * make that switch — four decks of copy in the reading locale, and the prices
 * for every course — is resolved here on the server and handed down, so
 * changing course costs no request and no price is ever computed in a browser.
 *
 * The server-rendered HTML carries the default course in full, which is what
 * keeps the page indexable; the structured data below describes it.
 */

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const copy = getLandingCopy(locale);
  const siteUrl = await getSiteUrl();

  return {
    title: `${copy.seo.title} — Laparli`,
    description: copy.seo.description,
    alternates: { canonical: siteUrl },
    openGraph: {
      title: `${copy.seo.title} — Laparli`,
      description: copy.seo.description,
      url: siteUrl,
      type: "website",
    },
  };
}

/** Backdrops and globes live in `public/landing/`, keyed by flag code. */
const FLAG_CODE: Record<LanguageSlug, string> = {
  italian: "it",
  english: "us",
  german: "de",
  turkish: "tr",
};

export default async function Home() {
  const repo = getDataRepository();
  const locale = await getServerLocale();

  const [user, visible, languages, pricing, siteUrl] = await Promise.all([
    repo.getAuthUser().catch(() => null),
    // Which courses appear at all is a super-admin toggle, so a path can be
    // revealed or hidden without a deploy.
    getVisibleLandingLanguages(repo).catch(() => LANDING_LANGUAGES),
    // Whether a course is *open* is a different toggle, and drives the
    // "not open yet" note in the pricing section rather than hiding anything.
    getLanguagesWithAvailability(repo).catch(() => LANGUAGES),
    // Null when there is nothing honest to price — a fresh install with no
    // plans, or a database this process cannot reach. The section falls back
    // to copy rather than an empty grid.
    getLandingPricing(repo, locale).catch(() => null),
    getSiteUrl(),
  ]);

  const decks = getCourseDecks(locale);
  const copy = getLandingCopy(locale);

  const shown = new Set(visible.map((language) => language.slug));
  const open = new Set(
    languages.filter((language) => language.available).map((l) => l.slug)
  );

  // The ring order comes from `COURSE_ORDER`, not from the toggle list, so the
  // hero's left and right neighbours stay put as paths open and close. A
  // course the admin has hidden, or one with no copy written for it, is
  // dropped rather than rendered as a blank flag.
  const courses: LandingCourse[] = COURSE_ORDER.filter(
    (slug) => shown.has(slug) && decks[slug]
  ).map((slug) => ({
    slug,
    name: decks[slug].name,
    code: getLanguageCode(slug),
    available: open.has(slug),
    flag: `/landing/bg-${FLAG_CODE[slug]}.webp`,
    flagPhone: `/landing/bgm-${FLAG_CODE[slug]}.webp`,
    globe: `/landing/circle-${FLAG_CODE[slug]}.svg`,
  }));

  return (
    <>
      <JsonLd
        siteUrl={siteUrl}
        copy={copy}
        decks={decks}
        courses={courses}
        featured={courses[0]?.slug ?? "italian"}
      />

      <Landing
        courses={courses}
        decks={decks}
        copy={copy}
        pricing={pricing}
        locale={locale}
        dir={getLocaleDefinition(locale).dir}
        isSignedIn={Boolean(user)}
      />
    </>
  );
}

/**
 * Structured data for the organisation, the course catalogue and the FAQ.
 *
 * The questions marked up are the ones the server actually rendered — the
 * default course's own, followed by the shared ones. Marking up all four
 * courses' questions would describe a page no visitor is looking at.
 *
 * Each open course is emitted as a `Course`, which is what lets a result carry
 * the provider and the course name rather than a bare page title. Paths with
 * no curriculum behind them are left out; marking up a course nobody can enrol
 * in is the kind of thing that earns a manual action.
 */
function JsonLd({
  siteUrl,
  copy,
  decks,
  courses,
  featured,
}: {
  siteUrl: string;
  copy: LandingCopy;
  decks: Record<LanguageSlug, CourseDeck>;
  courses: LandingCourse[];
  featured: LanguageSlug;
}) {
  const href = (slug: LanguageSlug) =>
    LANDING_LANGUAGES.find((language) => language.slug === slug)?.href ?? null;

  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Laparli",
      url: siteUrl,
      description: copy.seo.description,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Laparli",
      inLanguage: "fa-IR",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [...decks[featured].faq, ...copy.faq.items].map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    ...courses
      .filter((course) => course.available && href(course.slug))
      .map((course) => ({
        "@type": "Course",
        name: decks[course.slug].name,
        description: decks[course.slug].intro,
        url: `${siteUrl}${href(course.slug)}`,
        inLanguage: "fa-IR",
        teaches: decks[course.slug].nativeName,
        provider: { "@id": `${siteUrl}/#organization` },
      })),
  ];

  return (
    <script
      type="application/ld+json"
      // Built entirely from our own constants, never from user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
