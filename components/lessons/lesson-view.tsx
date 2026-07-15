"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

import { LessonDetailTabs } from "@/components/lessons/lesson-detail-tabs";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import type { GrammarRule, Lesson, Quiz, UserQuizAttempt, Vocabulary } from "@/types";

type LessonViewProps = {
  lesson: Lesson;
  vocabulary: Vocabulary[];
  grammarRules: GrammarRule[];
  quiz: Quiz | null;
  quizAttempt: UserQuizAttempt | null;
};

export function LessonView({
  lesson,
  vocabulary,
  grammarRules,
  quiz,
  quizAttempt,
}: LessonViewProps) {
  const { t } = useTranslations();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="-ms-2 w-fit">
          <Link href="/learn/italian">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("lesson.backToItalian")}
          </Link>
        </Button>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm font-medium">{t("lesson.badge")}</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{lesson.title}</h1>
          {lesson.description ? (
            <p className="max-w-2xl text-muted-foreground">{lesson.description}</p>
          ) : null}
        </div>
      </div>

      <LessonDetailTabs
        vocabulary={vocabulary}
        grammarRules={grammarRules}
        quiz={quiz}
        quizAttempt={quizAttempt}
      />
    </div>
  );
}
