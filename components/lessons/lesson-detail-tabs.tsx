"use client";

import { BookMarked, Languages, ListChecks } from "lucide-react";

import { GrammarRulesList } from "@/components/lessons/grammar-rules-list";
import { QuizTabContent } from "@/components/lessons/quiz-tab-content";
import { VocabularyFlashcards } from "@/components/lessons/vocabulary-flashcards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GrammarRule, Quiz, UserQuizAttempt, Vocabulary } from "@/types";

export function LessonDetailTabs({
  vocabulary,
  grammarRules,
  quiz,
  quizAttempt,
}: {
  vocabulary: Vocabulary[];
  grammarRules: GrammarRule[];
  quiz: Quiz | null;
  quizAttempt: UserQuizAttempt | null;
}) {
  return (
    <Tabs defaultValue="vocabulary" className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-3 p-1">
        <TabsTrigger value="vocabulary" className="gap-2 py-2">
          <Languages className="h-4 w-4" />
          Vocabulary
        </TabsTrigger>
        <TabsTrigger value="grammar" className="gap-2 py-2">
          <BookMarked className="h-4 w-4" />
          Grammar
        </TabsTrigger>
        <TabsTrigger value="quiz" className="gap-2 py-2">
          <ListChecks className="h-4 w-4" />
          Quiz
        </TabsTrigger>
      </TabsList>

      <TabsContent value="vocabulary" className="mt-6">
        <VocabularyFlashcards vocabulary={vocabulary} />
      </TabsContent>

      <TabsContent value="grammar" className="mt-6">
        <GrammarRulesList rules={grammarRules} />
      </TabsContent>

      <TabsContent value="quiz" className="mt-6">
        <QuizTabContent quiz={quiz} attempt={quizAttempt} />
      </TabsContent>
    </Tabs>
  );
}
