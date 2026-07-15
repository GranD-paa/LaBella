"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CurriculumLanguage, CurriculumLevel } from "@/lib/curriculum/types";
import {
  getQuizSectionDescriptionKey,
  getQuizSectionTitleKey,
} from "@/lib/i18n/quiz-sections";
import { QUIZ_SECTIONS } from "@/lib/quiz-management/types";
import type { Lesson } from "@/types";
import { cn } from "@/lib/utils";

export function QuizBrowseLevelView({
  language,
  level,
  lesson,
}: {
  language: CurriculumLanguage;
  level: CurriculumLevel;
  lesson: Lesson | null;
}) {
  const { t } = useTranslations();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="-ms-2 w-fit">
          <Link href={`/quizzes/browse/${language.slug}`}>
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("quiz.browse.backToLevels")}
          </Link>
        </Button>
        <div className="space-y-2">
          <Badge variant="outline" className="border-brand-accent/30 text-brand-accent">
            <BookOpen className="me-1 h-3 w-3" />
            {t("quiz.browse.stepLesson")}
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            {level.code} · {level.title}
          </h1>
          <p className="text-muted-foreground">{t("quiz.browse.chooseSection")}</p>
        </div>
      </div>

      <Card className="brand-surface">
        <CardHeader>
          <CardTitle className="text-lg">
            {lesson?.title ?? t("quiz.browse.unitFallback", { code: level.code })}
          </CardTitle>
          <CardDescription>
            {lesson?.description ?? t("quiz.browse.lessonPreparing")}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brand-accent" />
          <h2 className="text-lg font-semibold">{t("quiz.browse.stepSection")}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {QUIZ_SECTIONS.map((section) => {
            const titleKey = getQuizSectionTitleKey(section.slug);
            const descriptionKey = getQuizSectionDescriptionKey(section.slug);

            return (
              <Card
                key={section.slug}
                className={cn(
                  "brand-surface transition-all hover:border-brand-accent/40 hover:shadow-md"
                )}
              >
                <Link
                  href={`/quizzes/browse/${language.slug}/${level.slug}/${section.slug}`}
                >
                  <CardHeader>
                    <CardTitle>
                      {titleKey ? t(titleKey) : section.title}
                    </CardTitle>
                    <CardDescription>
                      {descriptionKey ? t(descriptionKey) : section.description}
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
