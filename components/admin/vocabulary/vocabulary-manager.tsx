"use client";

import { useState } from "react";

import { VocabularyForm } from "@/components/admin/vocabulary/vocabulary-form";
import { VocabularyTable } from "@/components/admin/vocabulary/vocabulary-table";
import type { Lesson, Vocabulary } from "@/types";

export function VocabularyManager({
  lessons,
  vocabulary,
}: {
  lessons: Lesson[];
  vocabulary: Vocabulary[];
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
        Create a lesson first in the Lessons tab before adding vocabulary.
      </div>
    );
  }

  const filtered = vocabulary.filter(
    (item) => item.lesson_id === selectedLessonId
  );

  return (
    <div className="space-y-6">
      <VocabularyForm
        lessons={lessons}
        defaultLessonId={selectedLessonId}
        onLessonChange={setSelectedLessonId}
      />
      <VocabularyTable vocabulary={filtered} lessons={lessons} />
    </div>
  );
}
