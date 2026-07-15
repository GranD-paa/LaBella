import type { DataRepository } from "@/lib/data/repository";
import type { Lesson, Profile, Quiz, UserQuizAttempt } from "@/types";

export type UserDashboardData = {
  profile: Pick<Profile, "full_name" | "avatar_url"> | null;
  email: string | null;
  lessons: Lesson[];
  quizzes: Quiz[];
  attempts: UserQuizAttempt[];
  stats: {
    completedQuizzes: number;
    availableQuizzes: number;
    averageScore: number;
    lessonsCount: number;
    totalQuizzes: number;
  };
  completedQuizDetails: Array<{
    attemptId: string;
    quizId: string;
    quizTitle: string;
    lessonTitle: string;
    lessonId: string;
    score: number;
    completedAt: string;
  }>;
  availableQuizDetails: Array<{
    quizId: string;
    quizTitle: string;
    lessonTitle: string;
    lessonId: string;
    questionCount: number;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    earned: boolean;
    icon: "trophy" | "star" | "zap" | "target" | "flame";
  }>;
};

export type AdminDashboardData = {
  stats: {
    totalUsers: number;
    totalQuizzes: number;
    totalAttempts: number;
    completionRate: number;
    averageScore: number;
    totalLessons: number;
  };
  quizPerformance: Array<{
    quizId: string;
    quizTitle: string;
    lessonTitle: string;
    attemptCount: number;
    averageScore: number;
  }>;
  recentActivity: Array<{
    id: string;
    userName: string;
    quizTitle: string;
    score: number;
    createdAt: string;
  }>;
  users: Array<{
    id: string;
    fullName: string | null;
    isAdmin: boolean;
    createdAt: string;
  }>;
};

export async function fetchUserDashboardData(
  repo: DataRepository,
  userId: string,
  email: string | null
): Promise<UserDashboardData> {
  const [profile, lessons, quizzes, attempts, quizQuestions] =
    await Promise.all([
      repo.getProfileById(userId),
      repo.getLessons(),
      repo.getQuizzes(),
      repo.getAttemptsByUserId(userId),
      Promise.all(
        (await repo.getQuizzes()).map(async (quiz) => {
          const questions = await repo.getQuizQuestionsByQuizId(quiz.id);
          return questions.map((question) => ({
            id: question.id,
            quiz_id: quiz.id,
          }));
        })
      ).then((groups) => groups.flat()),
    ]);

  const lessonMap = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  const attemptedQuizIds = new Set(attempts.map((attempt) => attempt.quiz_id));

  const questionCountByQuiz = quizQuestions.reduce<Record<string, number>>(
    (acc, question) => {
      acc[question.quiz_id] = (acc[question.quiz_id] ?? 0) + 1;
      return acc;
    },
    {}
  );

  const completedQuizDetails = attempts.map((attempt) => {
    const quiz = quizzes.find((entry) => entry.id === attempt.quiz_id);
    const lesson = quiz ? lessonMap.get(quiz.lesson_id) : undefined;
    return {
      attemptId: attempt.id,
      quizId: attempt.quiz_id,
      quizTitle: quiz?.title ?? "Unknown quiz",
      lessonTitle: lesson?.title ?? "Unknown lesson",
      lessonId: quiz?.lesson_id ?? "",
      score: attempt.score,
      completedAt: attempt.created_at,
    };
  });

  const availableQuizDetails = quizzes
    .filter((quiz) => !attemptedQuizIds.has(quiz.id))
    .map((quiz) => {
      const lesson = lessonMap.get(quiz.lesson_id);
      return {
        quizId: quiz.id,
        quizTitle: quiz.title,
        lessonTitle: lesson?.title ?? "Unknown lesson",
        lessonId: quiz.lesson_id,
        questionCount: questionCountByQuiz[quiz.id] ?? 0,
      };
    });

  const scores = attempts.map((attempt) => attempt.score);
  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
      : 0;

  const achievements = buildAchievements(
    completedQuizDetails.length,
    averageScore,
    scores
  );

  return {
    profile: profile
      ? { full_name: profile.full_name, avatar_url: profile.avatar_url }
      : null,
    email,
    lessons,
    quizzes,
    attempts,
    stats: {
      completedQuizzes: completedQuizDetails.length,
      availableQuizzes: availableQuizDetails.length,
      averageScore,
      lessonsCount: lessons.length,
      totalQuizzes: quizzes.length,
    },
    completedQuizDetails,
    availableQuizDetails,
    achievements,
  };
}

export async function fetchAdminDashboardData(
  repo: DataRepository
): Promise<AdminDashboardData> {
  const [profiles, quizzes, lessons, allAttempts] = await Promise.all([
    repo.getAllProfiles(),
    repo.getQuizzes(),
    repo.getLessons(),
    repo.getAllAttempts(),
  ]);

  const lessonMap = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  const profileMap = new Map(
    profiles.map((profile) => [profile.id, profile.full_name])
  );
  const quizMap = new Map(quizzes.map((quiz) => [quiz.id, quiz]));

  const averageScore =
    allAttempts.length > 0
      ? Math.round(
          allAttempts.reduce((sum, attempt) => sum + attempt.score, 0) /
            allAttempts.length
        )
      : 0;

  const uniqueCompletions = new Set(allAttempts.map((attempt) => attempt.quiz_id))
    .size;
  const completionRate =
    quizzes.length > 0
      ? Math.round((uniqueCompletions / quizzes.length) * 100)
      : 0;

  const quizPerformanceMap = allAttempts.reduce<
    Record<string, { total: number; count: number }>
  >((acc, attempt) => {
    if (!acc[attempt.quiz_id]) {
      acc[attempt.quiz_id] = { total: 0, count: 0 };
    }
    acc[attempt.quiz_id].total += attempt.score;
    acc[attempt.quiz_id].count += 1;
    return acc;
  }, {});

  const quizPerformance = quizzes.map((quiz) => {
    const lesson = lessonMap.get(quiz.lesson_id);
    const perf = quizPerformanceMap[quiz.id];
    return {
      quizId: quiz.id,
      quizTitle: quiz.title,
      lessonTitle: lesson?.title ?? "Unknown lesson",
      attemptCount: perf?.count ?? 0,
      averageScore: perf ? Math.round(perf.total / perf.count) : 0,
    };
  });

  const recentActivity = [...allAttempts]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 20)
    .map((attempt) => {
      const quiz = quizMap.get(attempt.quiz_id);
      return {
        id: attempt.id,
        userName: profileMap.get(attempt.user_id) ?? "Learner",
        quizTitle: quiz?.title ?? "Unknown quiz",
        score: attempt.score,
        createdAt: attempt.created_at,
      };
    });

  return {
    stats: {
      totalUsers: profiles.length,
      totalQuizzes: quizzes.length,
      totalAttempts: allAttempts.length,
      completionRate,
      averageScore,
      totalLessons: lessons.length,
    },
    quizPerformance,
    recentActivity,
    users: profiles.map((profile) => ({
      id: profile.id,
      fullName: profile.full_name,
      isAdmin: profile.is_admin,
      createdAt: profile.created_at,
    })),
  };
}

function buildAchievements(
  completedCount: number,
  averageScore: number,
  scores: number[]
) {
  const hasPerfect = scores.some((score) => score === 100);
  const hasHighScore = scores.some((score) => score >= 80);

  return [
    {
      id: "first-quiz",
      title: "First Steps",
      description: "Complete your first quiz",
      earned: completedCount >= 1,
      icon: "star" as const,
    },
    {
      id: "quiz-explorer",
      title: "Quiz Explorer",
      description: "Complete 3 quizzes",
      earned: completedCount >= 3,
      icon: "target" as const,
    },
    {
      id: "high-achiever",
      title: "High Achiever",
      description: "Score 80% or higher on a quiz",
      earned: hasHighScore,
      icon: "trophy" as const,
    },
    {
      id: "perfect-score",
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      earned: hasPerfect,
      icon: "zap" as const,
    },
    {
      id: "dedicated",
      title: "Dedicated Learner",
      description: "Complete 5 quizzes",
      earned: completedCount >= 5,
      icon: "flame" as const,
    },
  ];
}
