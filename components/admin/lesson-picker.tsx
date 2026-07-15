"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "@/components/providers/locale-provider";
import type { Lesson } from "@/types";

export function LessonPicker({
  lessons,
  value,
  onChange,
  placeholder,
}: {
  lessons: Lesson[];
  value: string | undefined;
  onChange: (lessonId: string) => void;
  placeholder?: string;
}) {
  const { t } = useTranslations();
  const sorted = [...lessons].sort((a, b) => a.order_number - b.order_number);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue
          placeholder={placeholder ?? t("admin.lessonPicker.selectLesson")}
        />
      </SelectTrigger>
      <SelectContent>
        {sorted.length === 0 ? (
          <div className="px-2 py-1.5 text-sm text-muted-foreground">
            {t("admin.lessonPicker.createLessonFirst")}
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
