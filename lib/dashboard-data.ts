import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database.types";
import type { Lesson, Profile, Quiz, UserQuizAttempt } from "@/types";

type Client = SupabaseClient<Database>;

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
  supabase: Client,
  userId: string,
  email: string | null
): Promise<UserDashboardData> {
  const [
    { data: profile },
    { data: lessons },
    { data: quizzes },
    { data: attempts },
    { data: quizQuestions },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", userId)
      .single(),
    supabase.from("lessons").select("*").order("order_number", { ascending: true }),
    supabase.from("quizzes").select("*").order("created_at"),
    supabase
      .from("user_quiz_attempts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
    supabase.from("quiz_questions").select("id, quiz_id"),
  ]);

  const lessonMap = new Map((lessons ?? []).map((l) => [l.id, l]));
  const attemptedQuizIds = new Set((attempts ?? []).map((a) => a.quiz_id));

  const questionCountByQuiz = (quizQuestions ?? []).reduce<Record<string, number>>(
    (acc, q) => {
      acc[q.quiz_id] = (acc[q.quiz_id] ?? 0) + 1;
      return acc;
    },
    {}
  );

  const completedQuizDetails = (attempts ?? []).map((attempt) => {
    const quiz = (quizzes ?? []).find((q) => q.id === attempt.quiz_id);
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

  const availableQuizDetails = (quizzes ?? [])
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

  const scores = (attempts ?? []).map((a) => a.score);
  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length)
      : 0;

  const achievements = buildAchievements(
    completedQuizDetails.length,
    averageScore,
    scores
  );

  return {
    profile: profile ?? null,
    email,
    lessons: lessons ?? [],
    quizzes: quizzes ?? [],
    attempts: attempts ?? [],
    stats: {
      completedQuizzes: completedQuizDetails.length,
      availableQuizzes: availableQuizDetails.length,
      averageScore,
      lessonsCount: lessons?.length ?? 0,
      totalQuizzes: quizzes?.length ?? 0,
    },
    completedQuizDetails,
    availableQuizDetails,
    achievements,
  };
}

export async function fetchAdminDashboardData(
  supabase: Client
): Promise<AdminDashboardData> {
  const [
    { data: profiles },
    { data: quizzes },
    { data: attempts },
    { data: lessons },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, is_admin, created_at")
      .order("created_at", { ascending: false }),
    supabase.from("quizzes").select("*, lessons(title)").order("created_at"),
    supabase
      .from("user_quiz_attempts")
      .select("id, score, created_at, user_id, quiz_id, profiles(full_name), quizzes(title)")
      .order("created_at", { ascending: false })
      .limit(20),
    supabase.from("lessons").select("id"),
  ]);

  const totalUsers = profiles?.length ?? 0;
  const totalQuizzes = quizzes?.length ?? 0;
  const totalLessons = lessons?.length ?? 0;

  const allAttempts = await supabase
    .from("user_quiz_attempts")
    .select("score, quiz_id");

  const attemptRows = allAttempts.data ?? [];
  const averageScore =
    attemptRows.length > 0
      ? Math.round(
          attemptRows.reduce((sum, row) => sum + row.score, 0) /
            attemptRows.length
        )
      : 0;

  const uniqueCompletions = new Set(
    attemptRows.map((row) => `${row.quiz_id}`)
  ).size;
  const completionRate =
    totalQuizzes > 0
      ? Math.round((uniqueCompletions / totalQuizzes) * 100)
      : 0;

  const quizPerformanceMap = attemptRows.reduce<
    Record<string, { total: number; count: number }>
  >((acc, row) => {
    if (!acc[row.quiz_id]) {
      acc[row.quiz_id] = { total: 0, count: 0 };
    }
    acc[row.quiz_id].total += row.score;
    acc[row.quiz_id].count += 1;
    return acc;
  }, {});

  const quizPerformance = (quizzes ?? []).map((quiz) => {
    const lesson = quiz.lessons as { title: string } | null | undefined;
    const perf = quizPerformanceMap[quiz.id];
    return {
      quizId: quiz.id,
      quizTitle: quiz.title,
      lessonTitle: lesson?.title ?? "Unknown lesson",
      attemptCount: perf?.count ?? 0,
      averageScore: perf ? Math.round(perf.total / perf.count) : 0,
    };
  });

  const recentActivity = (attempts ?? []).map((attempt) => {
    const profile = attempt.profiles as { full_name: string | null } | null;
    const quiz = attempt.quizzes as { title: string } | null;
    return {
      id: attempt.id,
      userName: profile?.full_name ?? "Learner",
      quizTitle: quiz?.title ?? "Unknown quiz",
      score: attempt.score,
      createdAt: attempt.created_at,
    };
  });

  return {
    stats: {
      totalUsers,
      totalQuizzes,
      totalAttempts: attemptRows.length,
      completionRate,
      averageScore,
      totalLessons,
    },
    quizPerformance,
    recentActivity,
    users: (profiles ?? []).map((p) => ({
      id: p.id,
      fullName: p.full_name,
      isAdmin: p.is_admin,
      createdAt: p.created_at,
    })),
  };
}

function buildAchievements(
  completedCount: number,
  averageScore: number,
  scores: number[]
) {
  const hasPerfect = scores.some((s) => s === 100);
  const hasHighScore = scores.some((s) => s >= 80);

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
