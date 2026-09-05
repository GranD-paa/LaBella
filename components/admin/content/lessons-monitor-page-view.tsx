"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { LessonsMonitor } from "@/components/admin/content/lessons-monitor";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ContentWizardTarget } from "@/lib/content-management/categories";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type {
  GrammarRule,
  Lesson,
  Quiz,
  QuizQuestion,
  VideoLesson,
  Vocabulary,
} from "@/types";

export function LessonsMonitorPageView({
  languages,
  lessons,
  grammarRules,
  vocabulary,
  videoLessons,
  quizzes,
  quizQuestions,
}: {
  languages: CurriculumLanguage[];
  lessons: Lesson[];
  grammarRules: GrammarRule[];
  vocabulary: Vocabulary[];
  videoLessons: VideoLesson[];
  quizzes: Quiz[];
  quizQuestions: QuizQuestion[];
}) {
  const { t } = useTranslations();
  const router = useRouter();

  // The wizard lives on the quizzes page, so a click on a square leaves this
  // page carrying the slot in the query string rather than opening a form here.
  function openSlot(target: Omit<ContentWizardTarget, "nonce">) {
    const query = new URLSearchParams({
      language: target.languageSlug,
      level: target.levelSlug,
      type: target.category,
    });
    router.push(`/admin/quizzes?${query.toString()}`);
  }

  return (
    <div className="space-y-8">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/15">
              CMS
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("admin.content.monitor.title")}
            </h1>
            <p className="max-w-3xl text-pretty text-muted-foreground">
              {t("admin.content.monitor.description")}
            </p>
          </div>
          <Button variant="outline" className="border-white/20" asChild>
            <Link href="/admin/quizzes">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {t("admin.content.monitor.backToContent")}
            </Link>
          </Button>
        </div>
      </section>

      <LessonsMonitor
        languages={languages}
        lessons={lessons}
        grammarRules={grammarRules}
        vocabulary={vocabulary}
        videoLessons={videoLessons}
        quizzes={quizzes}
        quizQuestions={quizQuestions}
        onOpenSlot={openSlot}
      />
    </div>
  );
}
