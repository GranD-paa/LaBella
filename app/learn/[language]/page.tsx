import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { BandExamCard } from "@/components/learn/band-exams-section";
import { LearnLanguageView } from "@/components/learn/learn-language-view";
import { getLanguageWithAvailability } from "@/lib/curriculum/availability";
import { groupLevelExamsByBand } from "@/lib/curriculum/band-exams";
import { getDataRepository } from "@/lib/data";
import { cheapestTierUnlocking, resolveEntitlement } from "@/lib/entitlements";
import { CURRICULUM_MESSAGE_KEYS } from "@/lib/i18n/content-keys";
import { getServerTranslator } from "@/lib/i18n/server-locale";
import type { LocalizedText, UserQuizAttempt } from "@/types";

type PageProps = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language: languageSlug } = await params;
  const language = await getLanguageWithAvailability(getDataRepository(), languageSlug);
  const { t } = await getServerTranslator();
  const contentKey = language
    ? CURRICULUM_MESSAGE_KEYS[language.slug]
    : undefined;

  return {
    title: contentKey
      ? `${t(`${contentKey}.headline`)} — Laparli`
      : t("meta.languageCourse"),
  };
}

export default async function LanguageCoursePage({ params }: PageProps) {
  const { language: languageSlug } = await params;
  const repo = getDataRepository();
  const language = await getLanguageWithAvailability(repo, languageSlug);

  if (!language) {
    notFound();
  }

  // The comprehensive exams for this language, gathered per CEFR band. Only
  // fetched for an available language — a "coming soon" page has no exams.
  let bandExams: BandExamCard[] = [];
  let examAttempts: UserQuizAttempt[] = [];
  let requiredPlanTitle: LocalizedText | null = null;

  if (language.available) {
    const user = await repo.getAuthUser();
    const [quizzes, lessons, questions, settings, tiers, subscription, plans] =
      await Promise.all([
        repo.getQuizzes(),
        repo.getLessons(),
        repo.getAllQuizQuestions(),
        repo.getPaymentSettings(),
        repo.getSubscriptionTiers(),
        user ? repo.getEntitlingSubscription(user.id, language.slug) : null,
        repo.getSubscriptionPlans(),
      ]);

    const questionCountByQuiz = questions.reduce<Record<string, number>>(
      (counts, question) => {
        counts[question.quiz_id] = (counts[question.quiz_id] ?? 0) + 1;
        return counts;
      },
      {}
    );

    const grouped = groupLevelExamsByBand(
      language,
      quizzes,
      lessons,
      questionCountByQuiz
    );

    bandExams = grouped.map((exam) => ({
      band: exam.band,
      quizzes: exam.quizzes,
      locked: !resolveEntitlement({
        settings,
        tiers,
        subscription,
        levelSlug: exam.firstLevelSlug,
      }).unlocks.levelExam,
    }));

    if (user && bandExams.length > 0) {
      const examQuizIds = new Set(
        bandExams.flatMap((exam) => exam.quizzes.map((quiz) => quiz.id))
      );
      const attempts = await repo.getAttemptsByUserId(user.id);
      examAttempts = attempts.filter((attempt) =>
        examQuizIds.has(attempt.quiz_id)
      );
    }

    const requiredTier = cheapestTierUnlocking(tiers, "levelExam");
    requiredPlanTitle =
      plans.find(
        (plan) =>
          plan.plan_slug === requiredTier?.plan_slug &&
          plan.language_slug === language.slug
      )?.title ?? null;
  }

  return (
    <LearnLanguageView
      language={language}
      bandExams={bandExams}
      examAttempts={examAttempts}
      requiredPlanTitle={requiredPlanTitle}
    />
  );
}
