import { getLevel, isLanguageSlug } from "@/lib/curriculum/languages";
import type {
  CurriculumLanguage,
  CurriculumLevel,
  LanguageSlug,
} from "@/lib/curriculum/types";
import type { Lesson, Quiz, UserLearningState } from "@/types";

export function findLevelInLanguages(
  languages: CurriculumLanguage[],
  levelSlug: string,
  preferredLanguageSlug?: string | null
): { language: CurriculumLanguage; level: CurriculumLevel } | null {
  if (preferredLanguageSlug) {
    const language = languages.find((entry) => entry.slug === preferredLanguageSlug);
    const level = language ? getLevel(language, levelSlug) : undefined;
    if (language && level) {
      return { language, level };
    }
  }

  for (const language of languages) {
    const level = getLevel(language, levelSlug);
    if (level) {
      return { language, level };
    }
  }

  return null;
}

export function findLevelByOrderNumber(
  languages: CurriculumLanguage[],
  orderNumber: number,
  preferredLanguageSlug?: string | null
): { language: CurriculumLanguage; level: CurriculumLevel } | null {
  if (preferredLanguageSlug) {
    const language = languages.find((entry) => entry.slug === preferredLanguageSlug);
    const level = language?.levels.find(
      (entry) => entry.orderNumber === orderNumber
    );
    if (language && level) {
      return { language, level };
    }
  }

  for (const language of languages) {
    const level = language.levels.find(
      (entry) => entry.orderNumber === orderNumber
    );
    if (level) {
      return { language, level };
    }
  }

  return null;
}

export function resolveLevelContext(
  languages: CurriculumLanguage[],
  levelSlug: string,
  preferredLanguageSlug?: string | null
): {
  levelSlug: string;
  levelCode: string;
  activeCourseTitle: string;
  language: CurriculumLanguage | null;
} {
  const match = findLevelInLanguages(
    languages,
    levelSlug,
    preferredLanguageSlug
  );

  if (match) {
    return {
      levelSlug: match.level.slug,
      levelCode: match.level.code,
      activeCourseTitle: match.level.title,
      language: match.language,
    };
  }

  return {
    levelSlug,
    levelCode: levelSlug.toUpperCase(),
    activeCourseTitle: levelSlug,
    language: null,
  };
}

export function getDefaultLanguageContext(languages: CurriculumLanguage[]): {
  language: CurriculumLanguage | undefined;
  level: CurriculumLevel | undefined;
} {
  const available = languages.find(
    (language) => language.available && language.levels.length > 0
  );
  const fallback =
    languages.find((language) => language.slug === "italian") ?? languages[0];
  const language = available ?? fallback;

  return {
    language,
    level: language?.levels[0],
  };
}

export function resolveLessonNavigation(params: {
  lesson: Lesson;
  languages: CurriculumLanguage[];
  quizzes: Quiz[];
  learningState?: UserLearningState | null;
}): { backHref: string; languageSlug: LanguageSlug | null } {
  const { lesson, languages, quizzes, learningState } = params;
  const lessonQuiz = quizzes.find((entry) => entry.lesson_id === lesson.id);

  if (
    lessonQuiz?.language_slug &&
    isLanguageSlug(lessonQuiz.language_slug) &&
    lessonQuiz.level_slug
  ) {
    const match = findLevelInLanguages(
      languages,
      lessonQuiz.level_slug,
      lessonQuiz.language_slug
    );
    if (match) {
      return {
        backHref: `/learn/${match.language.slug}/${match.level.slug}`,
        languageSlug: match.language.slug,
      };
    }

    return {
      backHref: `/learn/${lessonQuiz.language_slug}/${lessonQuiz.level_slug}`,
      languageSlug: lessonQuiz.language_slug,
    };
  }

  if (learningState?.language_slug && learningState.level_slug) {
    const match = findLevelInLanguages(
      languages,
      learningState.level_slug,
      learningState.language_slug
    );
    if (match && match.level.orderNumber === lesson.order_number) {
      return {
        backHref: `/learn/${match.language.slug}/${match.level.slug}`,
        languageSlug: match.language.slug,
      };
    }
  }

  const byOrder = findLevelByOrderNumber(
    languages,
    lesson.order_number,
    learningState?.language_slug ?? lessonQuiz?.language_slug
  );
  if (byOrder) {
    return {
      backHref: `/learn/${byOrder.language.slug}/${byOrder.level.slug}`,
      languageSlug: byOrder.language.slug,
    };
  }

  const preferredLanguageSlug =
    learningState?.language_slug ?? lessonQuiz?.language_slug;
  if (preferredLanguageSlug && isLanguageSlug(preferredLanguageSlug)) {
    const language = languages.find(
      (entry) => entry.slug === preferredLanguageSlug
    );
    if (language?.available) {
      return {
        backHref: `/learn/${preferredLanguageSlug}`,
        languageSlug: preferredLanguageSlug,
      };
    }
  }

  const firstAvailable = languages.find(
    (language) => language.available && language.levels.length > 0
  );
  if (firstAvailable) {
    return {
      backHref: `/learn/${firstAvailable.slug}`,
      languageSlug: firstAvailable.slug,
    };
  }

  return { backHref: "/menu", languageSlug: null };
}
