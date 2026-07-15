"use client";

import Link from "next/link";
import { ArrowLeft, Globe } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LANGUAGES } from "@/lib/curriculum/languages";
import { cn } from "@/lib/utils";

export function QuizBrowseHome() {
  const { t } = useTranslations();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="-ms-2 w-fit">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("quiz.browse.backToDashboard")}
          </Link>
        </Button>
        <div className="space-y-2">
          <Badge variant="outline" className="border-brand-accent/30 text-brand-accent">
            <Globe className="me-1 h-3 w-3" />
            {t("quiz.browse.stepLanguage")}
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            {t("quiz.browse.chooseLanguage")}
          </h1>
          <p className="text-muted-foreground">{t("quiz.browse.browseSubtitle")}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {LANGUAGES.map((language) => (
          <Card
            key={language.slug}
            className={cn(
              "brand-surface transition-all",
              language.available
                ? "hover:border-brand-accent/40 hover:shadow-md"
                : "opacity-60"
            )}
          >
            {language.available ? (
              <Link href={`/quizzes/browse/${language.slug}`}>
                <CardHeader>
                  <p className="text-3xl">{language.flagEmoji}</p>
                  <CardTitle>{language.name}</CardTitle>
                  <CardDescription>{language.description}</CardDescription>
                </CardHeader>
              </Link>
            ) : (
              <CardHeader>
                <p className="text-3xl">{language.flagEmoji}</p>
                <CardTitle>{language.name}</CardTitle>
                <CardDescription>{t("common.comingSoon")}</CardDescription>
              </CardHeader>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
