"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonManager } from "@/components/admin/lessons/lesson-manager";
import { VocabularyManager } from "@/components/admin/vocabulary/vocabulary-manager";
import { GrammarManager } from "@/components/admin/grammar/grammar-manager";
import { QuizManager } from "@/components/admin/quizzes/quiz-manager";
import type { GrammarRule, Lesson, Quiz, QuizQuestion, Vocabulary } from "@/types";

export function AdminTabs({
  lessons,
  vocabulary,
  grammarRules,
  quizzes,
  quizQuestions,
}: {
  lessons: Lesson[];
  vocabulary: Vocabulary[];
  grammarRules: GrammarRule[];
  quizzes: Quiz[];
  quizQuestions: QuizQuestion[];
}) {
  return (
    <Tabs defaultValue="lessons" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
        <TabsTrigger value="lessons">Lessons</TabsTrigger>
        <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
        <TabsTrigger value="grammar">Grammar</TabsTrigger>
        <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
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
    </Tabs>
  );
}
