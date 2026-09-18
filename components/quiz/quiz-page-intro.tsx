"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Plate } from "@/components/layout/plate";
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

      <Plate tone="reading">
        <div className="plate-zone px-6 pb-8 pt-7 sm:px-10 sm:pb-9">
          <p className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-foreground/80">
            <span className="plate-dot" aria-hidden />
            {t("quiz.label")}
          </p>
          <h1 className="plate-title mt-4">{title}</h1>
          <p className="mt-3.5 max-w-[52ch] text-[0.9375rem]/[1.9] text-muted-foreground">
            {hasCompleted ? t("quiz.alreadyCompleted") : t("quiz.takeHint")}
          </p>
        </div>
      </Plate>
    </div>
  );
}

export function NoQuestionsMessage() {
  const { t } = useTranslations();
  return <p>{t("quiz.noQuestions")}</p>;
}
