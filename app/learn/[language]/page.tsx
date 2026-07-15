import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  ComingSoonLanguage,
  CourseLevelAccordion,
} from "@/components/learn/course-level-accordion";
import { Button } from "@/components/ui/button";
import { getLanguage } from "@/lib/curriculum/languages";

type PageProps = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language: languageSlug } = await params;
  const language = getLanguage(languageSlug);
  return {
    title: language
      ? `${language.headline} — LaBella`
      : "Language Course — LaBella",
  };
}

export default async function LanguageCoursePage({ params }: PageProps) {
  const { language: languageSlug } = await params;
  const language = getLanguage(languageSlug);

  if (!language) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <Link href="/menu">
          <ArrowLeft className="h-4 w-4" />
          Back to Main Menu
        </Link>
      </Button>

      {language.available ? (
        <>
          <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-0 bg-brand-gradient opacity-20" />
            <div className="relative space-y-3">
              <span className="text-4xl">{language.flagEmoji}</span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {language.headline}
              </h1>
              <p className="max-w-2xl text-muted-foreground">
                {language.description}
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Course levels</h2>
              <p className="text-sm text-muted-foreground">
                Expand a module and open its grammar, vocabulary, visual, and
                quiz sections.
              </p>
            </div>
            <CourseLevelAccordion language={language} />
          </section>
        </>
      ) : (
        <ComingSoonLanguage language={language} />
      )}
    </div>
  );
}
