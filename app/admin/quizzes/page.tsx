import type { Metadata } from "next";

import { AdminQuizzesPageView } from "@/components/admin/quizzes/admin-quizzes-page-view";
import { getLanguagesWithAvailability } from "@/lib/curriculum/availability";
import { getDataRepository } from "@/lib/data";
import { fetchEnrichedQuizzes } from "@/lib/quiz-management/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";
import { requireAdmin } from "@/lib/supabase/admin-guard";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.adminQuizzes");
}

export default async function AdminQuizzesPage() {
  const { profile, user } = await requireAdmin();
  const repo = getDataRepository();

  const [quizzes, quizQuestions, attempts, lessons, languages] = await Promise.all([
    fetchEnrichedQuizzes(repo),
    repo.getAllQuizQuestions(),
    repo.getAllAttempts(),
    repo.getLessons(),
    getLanguagesWithAvailability(repo),
  ]);

  const { t } = await getServerTranslator();
  const displayName =
    profile.full_name || user.email || t("common.adminFallback");

  return (
    <AdminQuizzesPageView
      displayName={displayName}
      quizzes={quizzes}
      quizQuestions={quizQuestions}
      attempts={attempts}
      lessons={lessons}
      languages={languages}
    />
  );
}
