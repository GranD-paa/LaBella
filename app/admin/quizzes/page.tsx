import type { Metadata } from "next";

import { AdminQuizzesPageView } from "@/components/admin/quizzes/admin-quizzes-page-view";
import { getDataRepository } from "@/lib/data";
import {
  fetchEnrichedQuizzes,
  fetchQuizManagementStats,
} from "@/lib/quiz-management/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";
import { requireAdmin } from "@/lib/supabase/admin-guard";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.adminQuizzes");
}

export default async function AdminQuizzesPage() {
  const { profile, user } = await requireAdmin();
  const repo = getDataRepository();

  const [stats, quizzes, quizQuestions, attempts, lessons] = await Promise.all([
    fetchQuizManagementStats(repo),
    fetchEnrichedQuizzes(repo),
    repo.getAllQuizQuestions(),
    repo.getAllAttempts(),
    repo.getLessons(),
  ]);

  const { t } = await getServerTranslator();
  const displayName =
    profile.full_name || user.email || t("common.adminFallback");

  return (
    <AdminQuizzesPageView
      displayName={displayName}
      stats={stats}
      quizzes={quizzes}
      quizQuestions={quizQuestions}
      attempts={attempts}
      lessons={lessons}
    />
  );
}
