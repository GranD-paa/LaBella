"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { GrammarRuleWithPages } from "@/components/lessons/grammar-rules-list";
import { LessonDetailTabs } from "@/components/lessons/lesson-detail-tabs";
import { useTranslations } from "@/components/providers/locale-provider";
import { Plate } from "@/components/layout/plate";
import { Button } from "@/components/ui/button";
import {
  getLocalizedLanguageName,
} from "@/lib/curriculum/localize";
import type { LanguageSlug } from "@/lib/curriculum/types";
import type { Lesson, Quiz, UserQuizAttempt, Vocabulary } from "@/types";

type LessonViewProps = {
  lesson: Lesson;
  vocabulary: Vocabulary[];
  grammarRules: GrammarRuleWithPages[];
  quiz: Quiz | null;
  quizAttempt: UserQuizAttempt | null;
  backHref: string;
  languageSlug: LanguageSlug | null;
};

export function LessonView({
  lesson,
  vocabulary,
  grammarRules,
  quiz,
  quizAttempt,
  backHref,
  languageSlug,
}: LessonViewProps) {
  const { t } = useTranslations();

  const backLabel = languageSlug
    ? t("lesson.backToCourse", {
        language: getLocalizedLanguageName(languageSlug, t),
      })
    : t("menu.backToMenu");

  return (
    <div className="space-y-8">
      <Button variant="ghost" size="sm" asChild className="-ms-2 w-fit">
        <Link href={backHref}>
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {backLabel}
        </Link>
      </Button>

      {/* Reading tone: a lesson is a surface someone settles into, so the lamp
          comes down and the measure stays short. */}
      <Plate tone="reading">
        <div className="plate-zone px-6 pb-8 pt-7 sm:px-10 sm:pb-9">
          <p className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-foreground/80">
            <span className="plate-dot" aria-hidden />
            {t("lesson.badge")}
          </p>
          <h1 className="plate-title mt-4">{lesson.title}</h1>
          {lesson.description ? (
            <p className="mt-3.5 max-w-[52ch] text-[0.9375rem]/[1.9] text-muted-foreground">
              {lesson.description}
            </p>
          ) : null}
        </div>
      </Plate>

      <LessonDetailTabs
        vocabulary={vocabulary}
        grammarRules={grammarRules}
        quiz={quiz}
        quizAttempt={quizAttempt}
      />
    </div>
  );
}
