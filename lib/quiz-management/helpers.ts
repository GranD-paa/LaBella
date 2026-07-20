import { getLanguage, getLevel } from "@/lib/curriculum/languages";
import type { Lesson, Quiz } from "@/types";

import {
  getSectionLabel,
  orderNumberToLevelSlug,
  type ExtendedQuiz,
  type QuizPathFilter,
} from "@/lib/quiz-management/types";

export function enrichQuiz(
  quiz: ExtendedQuiz,
  lessons: Lesson[]
): ExtendedQuiz & {
  lessonTitle: string;
  languageName: string;
  levelCode: string;
  sectionLabel: string;
} {
  const lesson = lessons.find((entry) => entry.id === quiz.lesson_id);
  const language = getLanguage(quiz.language_slug);
  const level =
    language && quiz.level_slug
      ? getLevel(language, quiz.level_slug)
      : undefined;

  return {
    ...quiz,
    lessonTitle: lesson?.title ?? "Unknown lesson",
    languageName: language?.name ?? quiz.language_slug,
    levelCode: level?.code ?? quiz.level_slug.toUpperCase(),
    sectionLabel: getSectionLabel(quiz.section_slug),
  };
}

export function filterQuizzes(
  quizzes: ExtendedQuiz[],
  filter: QuizPathFilter
) {
  return quizzes.filter((quiz) => {
    if (filter.languageSlug && quiz.language_slug !== filter.languageSlug) {
      return false;
    }
    if (filter.levelSlug && quiz.level_slug !== filter.levelSlug) {
      return false;
    }
    if (filter.sectionSlug) {
      const sectionMatches =
        quiz.section_slug === filter.sectionSlug ||
        (filter.sectionSlug === "quiz" &&
          (quiz.section_slug === "quiz" || quiz.section_slug === "custom"));
      if (!sectionMatches) {
        return false;
      }
    }
    if (filter.lessonId && quiz.lesson_id !== filter.lessonId) {
      return false;
    }
    if (filter.status && quiz.status !== filter.status) {
      return false;
    }
    return true;
  });
}

export function deriveQuizMetadataFromLesson(
  lesson: Lesson,
  languageSlug: ExtendedQuiz["language_slug"] = "italian",
  sectionSlug: ExtendedQuiz["section_slug"] = "quiz"
): Pick<ExtendedQuiz, "language_slug" | "level_slug" | "section_slug"> {
  return {
    language_slug: languageSlug,
    level_slug: orderNumberToLevelSlug(lesson.order_number),
    section_slug: sectionSlug,
  };
}

export function withQuizDefaults(quiz: Quiz, lessons: Lesson[]): ExtendedQuiz {
  const lesson = lessons.find((entry) => entry.id === quiz.lesson_id);
  const derived = lesson
    ? deriveQuizMetadataFromLesson(lesson)
    : {
        language_slug: "italian" as const,
        level_slug: "a1-1" as const,
        section_slug: "quiz" as const,
      };

  return {
    id: quiz.id!,
    lesson_id: quiz.lesson_id,
    title: quiz.title!,
    created_at: quiz.created_at!,
    language_slug: (quiz.language_slug as ExtendedQuiz["language_slug"]) ?? derived.language_slug,
    level_slug: (quiz.level_slug as ExtendedQuiz["level_slug"]) ?? derived.level_slug,
    section_slug: (quiz.section_slug as ExtendedQuiz["section_slug"]) ?? derived.section_slug,
    status:
      quiz.status === "draft"
        ? "draft"
        : quiz.status === "published"
          ? "published"
          : "published",
  };
}

/** Find the published quiz a learner should see for a course level. */
export function findPublishedQuizForLevel(
  quizzes: Quiz[],
  options: {
    languageSlug: string;
    levelSlug: string;
    sectionSlug?: string;
    lessonId?: string | null;
    lessons?: Lesson[];
  }
): Quiz | null {
  const matches = findPublishedQuizzesForLevel(
    quizzes,
    options.lessons ?? [],
    options
  );
  return matches[0] ?? null;
}

/** All published quizzes for a course level (newest first). */
export function findPublishedQuizzesForLevel(
  quizzes: Quiz[],
  lessons: Lesson[],
  options: {
    languageSlug: string;
    levelSlug: string;
    sectionSlug?: string;
    lessonId?: string | null;
  }
): Quiz[] {
  const targetSection = options.sectionSlug ?? "quiz";
  const levelLessonIds = new Set(
    lessons
      .filter((lesson) => {
        const derived = deriveQuizMetadataFromLesson(lesson);
        return (
          derived.language_slug === options.languageSlug &&
          derived.level_slug === options.levelSlug
        );
      })
      .map((lesson) => lesson.id)
  );

  if (options.lessonId) {
    levelLessonIds.add(options.lessonId);
  }

  return quizzes
    .map((quiz) => ({
      raw: quiz,
      normalized: withQuizDefaults(quiz, lessons),
    }))
    .filter(({ normalized }) => {
      if (normalized.status !== "published") {
        return false;
      }

      const sectionMatches =
        normalized.section_slug === targetSection ||
        (targetSection === "quiz" &&
          (normalized.section_slug === "quiz" ||
            normalized.section_slug === "custom"));

      if (!sectionMatches) {
        return false;
      }

      const pathMatch =
        normalized.language_slug === options.languageSlug &&
        normalized.level_slug === options.levelSlug;

      const lessonMatch = levelLessonIds.has(normalized.lesson_id);

      return pathMatch || lessonMatch;
    })
    .sort((a, b) =>
      b.normalized.created_at.localeCompare(a.normalized.created_at)
    )
    .map(({ raw }) => raw);
}

export async function resolveQuizCreateMetadata(
  repo: { getLessonById(id: string): Promise<Lesson | null> },
  lessonId: string,
  overrides?: {
    languageSlug?: string;
    levelSlug?: string;
    sectionSlug?: string;
  }
) {
  const lesson = await repo.getLessonById(lessonId);
  const derived = lesson
    ? deriveQuizMetadataFromLesson(lesson)
    : {
        language_slug: "italian" as const,
        level_slug: "a1-1" as const,
        section_slug: "quiz" as const,
      };

  return {
    languageSlug: overrides?.languageSlug ?? derived.language_slug,
    levelSlug: overrides?.levelSlug ?? derived.level_slug,
    sectionSlug: overrides?.sectionSlug ?? derived.section_slug,
  };
}
