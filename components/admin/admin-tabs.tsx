"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonManager } from "@/components/admin/lessons/lesson-manager";
import { VocabularyManager } from "@/components/admin/vocabulary/vocabulary-manager";
import { GrammarManager } from "@/components/admin/grammar/grammar-manager";
import { QuizManager } from "@/components/admin/quizzes/quiz-manager";
import { UsersManager } from "@/components/admin/users-manager";
import type { AdminDashboardData } from "@/lib/dashboard-data";
import type { GrammarRule, Lesson, Quiz, QuizQuestion, Vocabulary } from "@/types";

export const ADMIN_TAB_VALUES = [
  "lessons",
  "vocabulary",
  "grammar",
  "quizzes",
  "users",
] as const;

export type AdminTabValue = (typeof ADMIN_TAB_VALUES)[number];

export function AdminTabs({
  defaultTab = "quizzes",
  lessons,
  vocabulary,
  grammarRules,
  quizzes,
  quizQuestions,
  users,
  currentUserId,
}: {
  defaultTab?: AdminTabValue;
  lessons: Lesson[];
  vocabulary: Vocabulary[];
  grammarRules: GrammarRule[];
  quizzes: Quiz[];
  quizQuestions: QuizQuestion[];
  users: AdminDashboardData["users"];
  currentUserId: string;
}) {
  return (
    <Tabs defaultValue={defaultTab} className="space-y-6">
      <TabsList className="grid h-auto w-full grid-cols-2 gap-2 p-1 sm:grid-cols-5">
        <TabsTrigger value="lessons" className="py-2">
          Lessons
        </TabsTrigger>
        <TabsTrigger value="vocabulary" className="py-2">
          Vocabulary
        </TabsTrigger>
        <TabsTrigger value="grammar" className="py-2">
          Grammar
        </TabsTrigger>
        <TabsTrigger value="quizzes" className="py-2">
          Quizzes
        </TabsTrigger>
        <TabsTrigger value="users" className="py-2">
          Users
        </TabsTrigger>
      </TabsList>

      <TabsContent value="lessons">
        <LessonManager lessons={lessons} />
      </TabsContent>

      <TabsContent value="vocabulary">
        <VocabularyManager lessons={lessons} vocabulary={vocabulary} />
      </TabsContent>

      <TabsContent value="grammar">
        <GrammarManager lessons={lessons} grammarRules={grammarRules} />
      </TabsContent>

      <TabsContent value="quizzes">
        <QuizManager
          lessons={lessons}
          quizzes={quizzes}
          quizQuestions={quizQuestions}
        />
      </TabsContent>

      <TabsContent value="users">
        <UsersManager users={users} currentUserId={currentUserId} />
      </TabsContent>
    </Tabs>
  );
}
