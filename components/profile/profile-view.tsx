"use client";

import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

import { QuizHistoryTable, type QuizAttemptHistoryRow } from "@/components/profile/quiz-history-table";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProfileViewProps = {
  fullName: string | null | undefined;
  email: string;
  historyRows: QuizAttemptHistoryRow[];
};

export function ProfileView({ fullName, email, historyRows }: ProfileViewProps) {
  const { t } = useTranslations();

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="-ms-2 w-fit">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("profile.backToDashboard")}
          </Link>
        </Button>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">{t("profile.badge")}</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{t("profile.title")}</h1>
          <p className="text-muted-foreground">{t("profile.subtitle")}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("profile.account")}</CardTitle>
          <CardDescription>{t("profile.accountDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">{t("profile.fullName")}</p>
            <p className="font-medium">{fullName || t("profile.notSet")}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t("profile.email")}</p>
            <p className="font-medium">{email}</p>
          </div>
        </CardContent>
      </Card>

      <section className="brand-surface space-y-5 rounded-2xl border border-white/10 p-6 shadow-brand sm:p-8">
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {t("profile.quizHistory")}
          </h2>
          <p className="mx-auto max-w-lg text-sm text-muted-foreground">
            {t("profile.quizHistoryHint")}
          </p>
        </div>
        <QuizHistoryTable attempts={historyRows} />
      </section>
    </div>
  );
}
