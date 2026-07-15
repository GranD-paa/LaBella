"use client";

import Link from "next/link";
import { ArrowLeft, ListChecks } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";

export function QuizPageIntro({
  title,
  backHref,
  hasCompleted,
}: {
  title: string;
  backHref: string;
  hasCompleted: boolean;
}) {
  const { t } = useTranslations();

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" asChild className="-ms-2 w-fit">
        <Link href={backHref}>
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("quiz.backToQuizzes")}
        </Link>
      </Button>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <ListChecks className="h-5 w-5" />
          <span className="text-sm font-medium">{t("quiz.label")}</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          {hasCompleted ? t("quiz.alreadyCompleted") : t("quiz.answerAll")}
        </p>
      </div>
    </div>
  );
}

export function NoQuestionsMessage() {
  const { t } = useTranslations();
  return <p>{t("quiz.noQuestions")}</p>;
}
