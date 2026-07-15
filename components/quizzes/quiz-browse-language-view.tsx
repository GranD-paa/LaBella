"use client";

import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

export function QuizBrowseLanguageView({
  language,
}: {
  language: CurriculumLanguage;
}) {
  const { t } = useTranslations();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="-ms-2 w-fit">
          <Link href="/quizzes/browse">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("quiz.browse.backToLanguages")}
          </Link>
        </Button>
        <div className="space-y-2">
          <Badge variant="outline" className="border-brand-accent/30 text-brand-accent">
            <Layers className="me-1 h-3 w-3" />
            {t("quiz.browse.stepLevel")}
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            {language.flagEmoji}{" "}
            {t("quiz.browse.levelsTitle", { name: language.name })}
          </h1>
          <p className="text-muted-foreground">{t("quiz.browse.levelsSubtitle")}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {language.levels.map((level) => (
          <Card
            key={level.slug}
            className={cn(
              "brand-surface transition-all hover:border-brand-accent/40 hover:shadow-md"
            )}
          >
            <Link href={`/quizzes/browse/${language.slug}/${level.slug}`}>
              <CardHeader>
                <CardTitle>{level.code}</CardTitle>
                <CardDescription>{level.title}</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
