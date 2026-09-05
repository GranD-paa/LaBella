import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LearnCategoryView } from "@/components/learn/learn-category-view";
import { getLanguageWithAvailability } from "@/lib/curriculum/availability";
import { getLevel, isCategorySlug } from "@/lib/curriculum/languages";
import type { GrammarRuleWithPages } from "@/components/lessons/grammar-rules-list";
import { attachGrammarPages } from "@/lib/grammar/pages";
import { resolveLessonForLevel } from "@/lib/curriculum/resolve-lesson";
import { getDataRepository } from "@/lib/data";
import {
  cheapestTierUnlocking,
  gateForCategory,
  resolveEntitlement,
} from "@/lib/entitlements";
import { findPublishedQuizzesForLevel } from "@/lib/quiz-management/helpers";
import { getServerTranslator } from "@/lib/i18n/server-locale";

type PageProps = {
  params: Promise<{ language: string; level: string; category: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language, level, category } = await params;
  const languageDef = await getLanguageWithAvailability(getDataRepository(), language);
  const levelDef = languageDef ? getLevel(languageDef, level) : undefined;

  const { t } = await getServerTranslator();

  return {
    title:
      levelDef && languageDef
        ? `${t(`learn.categories.${category}.title`)} — ${levelDef.code} — Laparli`
        : t("meta.lessonCategory"),
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { language: languageSlug, level: levelSlug, category } = await params;

  if (!isCategorySlug(category)) {
    notFound();
  }

  const repo = getDataRepository();
  const language = await getLanguageWithAvailability(repo, languageSlug);
  if (!language || !language.available) {
    notFound();
  }

  const level = getLevel(language, levelSlug);
  if (!level) {
    notFound();
  }

  const user = await repo.getAuthUser();
  const { lesson } = await resolveLessonForLevel(repo, languageSlug, levelSlug);

  if (user) {
    try {
      await repo.upsertLearningState(user.id, {
        languageSlug: language.slug,
        levelSlug: level.slug,
        lessonId: lesson?.id ?? null,
        sectionSlug: category,
      });
    } catch {
      // Persisting the resume position is best-effort and must never block
      // rendering the learning content itself.
    }
  }

  let vocabulary: import("@/types").Vocabulary[] = [];
  let grammarRules: GrammarRuleWithPages[] = [];
  let videoLessons: import("@/types").VideoLesson[] = [];
  let levelQuizzes: import("@/types").Quiz[] = [];
  let quizAttempts: import("@/types").UserQuizAttempt[] = [];

  const [lessons, allQuizzes, allQuestions, settings, tiers, subscription, plans] =
    await Promise.all([
      repo.getLessons(),
      repo.getQuizzes(),
      repo.getAllQuizQuestions(),
      repo.getPaymentSettings(),
      repo.getSubscriptionTiers(),
      user ? repo.getEntitlingSubscription(user.id, language.slug) : null,
      repo.getSubscriptionPlans(),
    ]);

  /** The admin-authored name of a plan, in this learning language's row. */
  const planTitleFor = (planSlug: string | null | undefined) =>
    plans.find(
      (plan) =>
        plan.plan_slug === planSlug && plan.language_slug === language.slug
    )?.title ?? null;

  // What this learner may see here. With `enforce_entitlements` off — its
  // default — every gate resolves open and the page behaves exactly as it did
  // before entitlements existed.
  const entitlement = resolveEntitlement({
    settings,
    tiers,
    subscription,
    levelSlug: level.slug,
  });

  const gate = gateForCategory(category);
  const categoryLocked = gate ? !entitlement.unlocks[gate] : false;
  const requiredTier = gate ? cheapestTierUnlocking(tiers, gate) : null;

  const questionCountByQuiz = allQuestions.reduce<Record<string, number>>(
    (counts, question) => {
      counts[question.quiz_id] = (counts[question.quiz_id] ?? 0) + 1;
      return counts;
    },
    {}
  );

  levelQuizzes = findPublishedQuizzesForLevel(allQuizzes, lessons, {
    languageSlug: language.slug,
    levelSlug: level.slug,
    sectionSlug: "quiz",
    lessonId: lesson?.id ?? null,
  }).filter((entry) => (questionCountByQuiz[entry.id] ?? 0) > 0);

  if (user && levelQuizzes.length > 0) {
    const attempts = await repo.getAttemptsByUserId(user.id);
    const quizIds = new Set(levelQuizzes.map((entry) => entry.id));
    quizAttempts = attempts.filter((attempt) => quizIds.has(attempt.quiz_id));
  }

  // Locked content is not fetched at all rather than fetched and hidden: a
  // paid grammar rule must not travel to the browser inside the RSC payload
  // where anyone can read it out of the network tab.
  if (lesson) {
    const [vocabularyData, grammarData, videoData] = await Promise.all([
      entitlement.unlocks.vocabulary
        ? repo.getVocabularyByLessonId(lesson.id)
        : [],
      entitlement.unlocks.grammar
        ? repo.getGrammarRulesByLessonId(lesson.id)
        : [],
      entitlement.unlocks.video ? repo.getVideoLessonsByLessonId(lesson.id) : [],
    ]);

    vocabulary = vocabularyData.filter((item) => item.status === "published");
    // Same signing as the standalone lesson page: pages reach the learner as
    // short-lived links minted here, never as object names.
    grammarRules = await attachGrammarPages(
      repo,
      lesson.id,
      user?.id ?? null,
      grammarData.filter((item) => item.status === "published")
    );
    videoLessons = videoData.filter((item) => item.status === "published");
  }

  return (
    <LearnCategoryView
      language={language}
      level={level}
      category={category}
      lesson={lesson}
      vocabulary={vocabulary}
      grammarRules={grammarRules}
      videoLessons={videoLessons}
      quizzes={levelQuizzes}
      quizAttempts={quizAttempts}
      locked={categoryLocked}
      requiredPlanTitle={planTitleFor(requiredTier?.plan_slug)}
    />
  );
}
