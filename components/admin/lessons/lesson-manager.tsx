import { LessonForm } from "@/components/admin/lessons/lesson-form";
import { LessonsTable } from "@/components/admin/lessons/lessons-table";
import type { Lesson } from "@/types";

export function LessonManager({
  lessons,
  languageSlug,
}: {
  lessons: Lesson[];
  languageSlug: "italian" | "english" | "german" | "turkish";
}) {
  return (
    <div className="space-y-6">
      <LessonForm languageSlug={languageSlug} />
      <LessonsTable lessons={lessons} />
    </div>
  );
}
