import { LANGUAGES } from "@/lib/curriculum/languages";
import { ITALIAN_LEVELS } from "@/lib/curriculum/italian";
import type { Quiz, UserQuizAttempt } from "@/types";

export type ContinueLearningCategory = "grammar" | "vocabulary" | "quiz" | "visual";

export type ContinueLearningSnapshot = {
  languageSlug: string;
  flagEmoji: string;
  levelCode: string;
  levelSlug: string;
  activeCourseTitle: string;
  lastActivityCategory: ContinueLearningCategory;
  lastActivityTopic: string;
  progressPercent: number;
  continueHref: string;
};

/** Placeholder metrics for future gamification (streak, goals, XP). */
export type LearnerEngagementMetrics = {
  streakDays: number | null;
  dailyGoalProgress: number | null;
  xpPoints: number | null;
};

type BuildContinueLearningInput = {
  quizzes: Quiz[];
  attempts: UserQuizAttempt[];
  completedQuizDetails: Array<{
    quizId: string;
    quizTitle: string;
    completedAt: string;
  }>;
  completedQuizzes: number;
  totalQuizzes: number;
};

export function buildContinueLearningSnapshot(
  input: BuildContinueLearningInput
): ContinueLearningSnapshot {
  const italian = LANGUAGES.find((language) => language.slug === "italian");
  const defaultLevel = ITALIAN_LEVELS[0];

  const progressPercent =
    input.totalQuizzes > 0
      ? Math.round((input.completedQuizzes / input.totalQuizzes) * 100)
      : 0;

  const mostRecent = [...input.completedQuizDetails].sort((a, b) =>
    b.completedAt.localeCompare(a.completedAt)
  )[0];

  let levelSlug: string = defaultLevel?.slug ?? "a1-1";
  let levelCode = defaultLevel?.code ?? "A1-1";
  let activeCourseTitle = defaultLevel?.title ?? "Foundations & Greetings";
  let lastActivityCategory: ContinueLearningCategory = "grammar";
  let lastActivityTopic = "";

  if (mostRecent) {
    const quiz = input.quizzes.find((entry) => entry.id === mostRecent.quizId);
    if (quiz?.level_slug) {
      levelSlug = quiz.level_slug;
      const matchedLevel = ITALIAN_LEVELS.find(
        (level) => level.slug === quiz.level_slug
      );
      levelCode = matchedLevel?.code ?? levelCode;
      activeCourseTitle = matchedLevel?.title ?? activeCourseTitle;
    }
    lastActivityCategory = "quiz";
    lastActivityTopic = mostRecent.quizTitle;
  }

  const continueHref = `/learn/${italian?.slug ?? "italian"}/${levelSlug}`;

  return {
    languageSlug: italian?.slug ?? "italian",
    flagEmoji: italian?.flagEmoji ?? "🇮🇹",
    levelCode,
    levelSlug,
    activeCourseTitle,
    lastActivityCategory,
    lastActivityTopic,
    progressPercent,
    continueHref,
  };
}

export function buildLearnerEngagementMetrics(): LearnerEngagementMetrics {
  return {
    streakDays: null,
    dailyGoalProgress: null,
    xpPoints: null,
  };
}
