"use client";

import { BookOpen } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteLesson } from "@/app/admin/actions/lessons";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { LessonEditDialog } from "@/components/admin/lessons/lesson-edit-dialog";
import { useTranslations } from "@/components/providers/locale-provider";
import type { Lesson } from "@/types";

export function LessonsTable({ lessons }: { lessons: Lesson[] }) {
  const { t } = useTranslations();
  const sorted = [...lessons].sort((a, b) => a.order_number - b.order_number);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin.lessons.existingTitle")}</CardTitle>
        <CardDescription>
          {t("admin.lessons.total", { count: lessons.length })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
            <BookOpen className="h-8 w-8" />
            <p>{t("admin.lessons.empty")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">{t("common.order")}</TableHead>
                  <TableHead>{t("common.title")}</TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t("common.description")}
                  </TableHead>
                  <TableHead className="w-24 text-right">
                    {t("common.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell className="font-medium">
                      {lesson.order_number}
                    </TableCell>
                    <TableCell>{lesson.title}</TableCell>
                    <TableCell className="hidden max-w-sm truncate text-muted-foreground md:table-cell">
                      {lesson.description || t("common.noValue")}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <LessonEditDialog lesson={lesson} />
                        <DeleteConfirmDialog
                          title={t("admin.lessons.deleteTitle")}
                          description={t("admin.lessons.deleteDescription", {
                            title: lesson.title,
                          })}
                          successMessage={t("admin.lessons.deleted")}
                          onConfirm={() => deleteLesson(lesson.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
