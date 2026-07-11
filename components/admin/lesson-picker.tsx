"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Lesson } from "@/types";

export function LessonPicker({
  lessons,
  value,
  onChange,
  placeholder = "Select a lesson",
}: {
  lessons: Lesson[];
  value: string | undefined;
  onChange: (lessonId: string) => void;
  placeholder?: string;
}) {
  const sorted = [...lessons].sort((a, b) => a.order_number - b.order_number);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {sorted.length === 0 ? (
          <div className="px-2 py-1.5 text-sm text-muted-foreground">
            Create a lesson first
          </div>
        ) : (
          sorted.map((lesson) => (
            <SelectItem key={lesson.id} value={lesson.id}>
              {lesson.title}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
