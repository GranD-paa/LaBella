import { LessonForm } from "@/components/admin/lessons/lesson-form";
import { LessonsTable } from "@/components/admin/lessons/lessons-table";
import type { Lesson } from "@/types";

export function LessonManager({ lessons }: { lessons: Lesson[] }) {
  return (
    <div className="space-y-6">
      <LessonForm />
      <LessonsTable lessons={lessons} />
    </div>
  );
}
