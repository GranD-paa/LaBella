import type { Metadata } from "next";

import { LandingHeader } from "@/components/landing/landing-header";
import {
  LandingHero,
  LandingTicker,
  LandingWhy,
} from "@/components/landing/landing-opening";
import {
  LandingFeatures,
  LandingLanguages,
  LandingLesson,
  LandingSteps,
  type JourneyLanguage,
} from "@/components/landing/landing-middle";
import {
  LandingDay,
  LandingFaq,
  LandingFinal,
  LandingFooter,
} from "@/components/landing/landing-closing";
import {
  LandingPricing,
  LandingPricingFallback,
} from "@/components/landing/landing-pricing";
import { LatticeRule } from "@/components/landing/lattice";
import { ScrollEffects } from "@/components/landing/scroll-effects";
import { getServerLocale } from "@/lib/i18n/server-locale";
import {
  getLandingCopy,
  getLandingLanguageCopy,
} from "@/lib/landing/content";
import { getLandingPricing } from "@/lib/landing/pricing";
import { getVisibleLandingLanguages } from "@/lib/landing/visibility";
import { getDataRepository } from "@/lib/data";
import { getSiteUrl } from "@/lib/seo/site-url";

/**
 * The public landing page.
 *
 * A server component from top to bottom. Every heading, paragraph, answer and
 * link is in the HTML the server sends; the only client JavaScript is the
 * header's drawer, the hero's WebGL scene, and a scroll module that decorates
 * markup already on the page. That ordering is what keeps the page indexable
 * and its LCP honest.
 */

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const copy = getLandingCopy(locale);
  const siteUrl = await getSiteUrl();

  return {
    title: `${copy.hero.title} — Laparli`,
    description: copy.hero.sub,
    alternates: { canonical: siteUrl },
    openGraph: {
      title: `${copy.hero.title} — Laparli`,
      description: copy.hero.sub,
      url: siteUrl,
      type: "website",
    },
  };
}

export default async function Home() {
  const repo = getDataRepository();
  const locale = await getServerLocale();
  const copy = getLandingCopy(locale);

  const [user, definitions, pricing, siteUrl] = await Promise.all([
    repo.getAuthUser().catch(() => null),
    getVisibleLandingLanguages(repo),
    // Null when there is nothing to price — a fresh install with no plans, or
    // a database this process cannot reach. Either way the section falls back
    // to copy rather than an empty grid.
    getLandingPricing(repo, locale).catch(() => null),
    getSiteUrl(),
  ]);

  const isSignedIn = Boolean(user);
  const languageCopy = getLandingLanguageCopy(locale);

  // A language with no copy entry is dropped rather than rendered blank — the
  // rail is the one place a half-configured language would be visible.
  const languages: JourneyLanguage[] = definitions.flatMap((definition) => {
    const entry = languageCopy[definition.slug];
    return entry ? [{ ...definition, copy: entry }] : [];
  });

  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <>
      <JsonLd siteUrl={siteUrl} copy={copy} languages={languages} />

      <LandingHeader copy={copy} isSignedIn={isSignedIn} dir={dir} />

      <main id="main" className="grain relative bg-[#090014]">
        <LandingHero copy={copy} isSignedIn={isSignedIn} />
        <LandingTicker copy={copy} />
        <LandingWhy copy={copy} />
        <LatticeRule />
        <LandingLesson copy={copy} />
        <LandingFeatures copy={copy} />
        <LatticeRule />
        <LandingSteps copy={copy} />
        <LandingLanguages copy={copy} languages={languages} />
        {pricing ? (
          <LandingPricing
            copy={copy}
            data={pricing}
            isSignedIn={isSignedIn}
            defaultToToman={locale === "fa"}
          />
        ) : (
          <LandingPricingFallback copy={copy} isSignedIn={isSignedIn} />
        )}
        <LandingDay copy={copy} />
        <LatticeRule />
        <LandingFaq copy={copy} />
        <LandingFinal copy={copy} isSignedIn={isSignedIn} />
      </main>

      <LandingFooter copy={copy} />

      <ScrollEffects />
    </>
  );
}

/**
 * Structured data for the organisation, the course catalogue and the FAQ.
 *
 * Each open language is emitted as a `Course`, which is what lets a result
 * carry the provider and the course name rather than a bare page title. Paths
 * with no curriculum are left out — marking up a course nobody can enrol in is
 * the kind of thing that earns a manual action.
 */
function JsonLd({
  siteUrl,
  copy,
  languages,
}: {
  siteUrl: string;
  copy: ReturnType<typeof getLandingCopy>;
  languages: JourneyLanguage[];
}) {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Laparli",
      url: siteUrl,
      description: copy.hero.sub,
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
      mainEntity: copy.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    ...languages
      .filter((language) => language.href)
      .map((language) => ({
        "@type": "Course",
        name: language.copy.title,
        description: language.copy.body,
        url: `${siteUrl}${language.href}`,
        inLanguage: "fa-IR",
        teaches: language.nativeName,
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
