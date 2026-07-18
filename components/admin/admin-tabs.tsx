"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonManager } from "@/components/admin/lessons/lesson-manager";
import { VocabularyManager } from "@/components/admin/vocabulary/vocabulary-manager";
import { GrammarManager } from "@/components/admin/grammar/grammar-manager";
import { QuizManager } from "@/components/admin/quizzes/quiz-manager";
import { UserManagementPanel } from "@/components/admin/users/user-management-panel";
import { RolesPermissionsPanel } from "@/components/admin/users/roles-permissions-panel";
import { useTranslations } from "@/components/providers/locale-provider";
import type { AdminTabValue } from "@/lib/admin-constants";
import type { AdminDashboardData } from "@/lib/dashboard-data";
import type { GrammarRule, Lesson, Quiz, QuizQuestion, Vocabulary } from "@/types";

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
  const { t } = useTranslations();

  return (
    <Tabs defaultValue={defaultTab} className="space-y-6">
      <TabsList className="grid h-auto w-full grid-cols-2 gap-2 p-1 sm:grid-cols-5">
        <TabsTrigger value="lessons" className="py-2">
          {t("admin.tabs.lessons")}
        </TabsTrigger>
        <TabsTrigger value="vocabulary" className="py-2">
          {t("admin.tabs.vocabulary")}
        </TabsTrigger>
        <TabsTrigger value="grammar" className="py-2">
          {t("admin.tabs.grammar")}
        </TabsTrigger>
        <TabsTrigger value="quizzes" className="py-2">
          {t("admin.tabs.quizzes")}
        </TabsTrigger>
        <TabsTrigger value="users" className="py-2">
          {t("admin.tabs.users")}
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

      <TabsContent value="users" className="space-y-6">
        <UserManagementPanel users={users} currentUserId={currentUserId} />
        <RolesPermissionsPanel />
      </TabsContent>
    </Tabs>
  );
}
