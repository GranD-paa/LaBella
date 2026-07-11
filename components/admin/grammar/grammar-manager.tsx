"use client";

import { useState } from "react";

import { GrammarForm } from "@/components/admin/grammar/grammar-form";
import { GrammarTable } from "@/components/admin/grammar/grammar-table";
import type { GrammarRule, Lesson } from "@/types";

export function GrammarManager({
  lessons,
  grammarRules,
}: {
  lessons: Lesson[];
  grammarRules: GrammarRule[];
}) {
  const sortedLessons = [...lessons].sort(
    (a, b) => a.order_number - b.order_number
  );
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>(
    sortedLessons[0]?.id
  );

  if (lessons.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">
        Create a lesson first in the Lessons tab before adding grammar rules.
      </div>
    );
  }

  const filtered = grammarRules.filter(
    (rule) => rule.lesson_id === selectedLessonId
  );

  return (
    <div className="space-y-6">
      <GrammarForm
        lessons={lessons}
        defaultLessonId={selectedLessonId}
        onLessonChange={setSelectedLessonId}
      />
      <GrammarTable grammarRules={filtered} lessons={lessons} />
    </div>
  );
}
