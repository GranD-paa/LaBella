import {
  getDefaultLanguageContext,
  resolveLevelContext,
} from "@/lib/curriculum/resolve-navigation";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type { Quiz, UserLearningState, UserQuizAttempt } from "@/types";

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
  languages: CurriculumLanguage[];
  quizzes: Quiz[];
  attempts: UserQuizAttempt[];
  completedQuizDetails: Array<{
    quizId: string;
    quizTitle: string;
    completedAt: string;
  }>;
  completedQuizzes: number;
  totalQuizzes: number;
  learningState?: UserLearningState | null;
};

export function buildContinueLearningSnapshot(
  input: BuildContinueLearningInput
): ContinueLearningSnapshot {
  const { language: defaultLanguage, level: defaultLevel } =
    getDefaultLanguageContext(input.languages);

  const progressPercent =
    input.totalQuizzes > 0
      ? Math.round((input.completedQuizzes / input.totalQuizzes) * 100)
      : 0;

  const mostRecent = [...input.completedQuizDetails].sort((a, b) =>
    b.completedAt.localeCompare(a.completedAt)
  )[0];

  let levelSlug = defaultLevel?.slug ?? "a1-1";
  let levelCode = defaultLevel?.code ?? "A1-1";
  let activeCourseTitle = defaultLevel?.title ?? "Foundations & Greetings";
  let languageSlug = defaultLanguage?.slug ?? "italian";
  let flagEmoji = defaultLanguage?.flagEmoji ?? "🇮🇹";
  let lastActivityCategory: ContinueLearningCategory = "grammar";
  let lastActivityTopic = "";

  if (input.learningState?.level_slug) {
    const resolved = resolveLevelContext(
      input.languages,
      input.learningState.level_slug,
      input.learningState.language_slug
    );
    levelSlug = resolved.levelSlug;
    levelCode = resolved.levelCode;
    activeCourseTitle = resolved.activeCourseTitle;

    if (resolved.language) {
      languageSlug = resolved.language.slug;
      flagEmoji = resolved.language.flagEmoji;
    } else if (input.learningState.language_slug) {
      const language = input.languages.find(
        (entry) => entry.slug === input.learningState?.language_slug
      );
      if (language) {
        languageSlug = language.slug;
        flagEmoji = language.flagEmoji;
      }
    }

    if (
      input.learningState.section_slug === "grammar" ||
      input.learningState.section_slug === "vocabulary" ||
      input.learningState.section_slug === "quiz" ||
      input.learningState.section_slug === "visual"
    ) {
      lastActivityCategory = input.learningState.section_slug;
    }
  } else if (mostRecent) {
    const quiz = input.quizzes.find((entry) => entry.id === mostRecent.quizId);
    if (quiz?.level_slug) {
      const resolved = resolveLevelContext(
        input.languages,
        quiz.level_slug,
        quiz.language_slug
      );
      levelSlug = resolved.levelSlug;
      levelCode = resolved.levelCode;
      activeCourseTitle = resolved.activeCourseTitle;

      if (resolved.language) {
        languageSlug = resolved.language.slug;
        flagEmoji = resolved.language.flagEmoji;
      }
    }

    if (quiz?.language_slug) {
      const language = input.languages.find(
        (entry) => entry.slug === quiz.language_slug
      );
      if (language) {
        languageSlug = language.slug;
        flagEmoji = language.flagEmoji;
      }
    }

    lastActivityCategory = "quiz";
    lastActivityTopic = mostRecent.quizTitle;
  }

  const continueHref = `/learn/${languageSlug}/${levelSlug}`;

  return {
    languageSlug,
    flagEmoji,
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
