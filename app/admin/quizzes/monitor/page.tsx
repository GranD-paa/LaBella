import type { Metadata } from "next";

import { LessonsMonitorPageView } from "@/components/admin/content/lessons-monitor-page-view";
import { getLanguagesWithAvailability } from "@/lib/curriculum/availability";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { requireAdmin } from "@/lib/supabase/admin-guard";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.adminLessonsMonitor");
}

export default async function AdminLessonsMonitorPage() {
  await requireAdmin();
  const repo = getDataRepository();

  const [
    lessons,
    languages,
    quizzes,
    quizQuestions,
    grammarRules,
    vocabulary,
    videoLessons,
  ] = await Promise.all([
    repo.getLessons(),
    getLanguagesWithAvailability(repo),
    repo.getQuizzes(),
    repo.getAllQuizQuestions(),
    repo.getAllGrammarRules(),
    repo.getAllVocabulary(),
    repo.getAllVideoLessons(),
  ]);

  return (
    <LessonsMonitorPageView
      languages={languages}
      lessons={lessons}
      grammarRules={grammarRules}
      vocabulary={vocabulary}
      videoLessons={videoLessons}
      quizzes={quizzes}
      quizQuestions={quizQuestions}
    />
  );
}
