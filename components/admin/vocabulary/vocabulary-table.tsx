"use client";

import Image from "next/image";
import { Languages } from "lucide-react";

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
import { deleteVocabulary } from "@/app/admin/actions/vocabulary";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { VocabularyEditDialog } from "@/components/admin/vocabulary/vocabulary-edit-dialog";
import { useTranslations } from "@/components/providers/locale-provider";
import type { Lesson, Vocabulary } from "@/types";

export function VocabularyTable({
  vocabulary,
  lessons,
}: {
  vocabulary: Vocabulary[];
  lessons: Lesson[];
}) {
  const { t } = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin.vocabulary.tableTitle")}</CardTitle>
        <CardDescription>
          {t("admin.vocabulary.wordCount", { count: vocabulary.length })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {vocabulary.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
            <Languages className="h-8 w-8" />
            <p>{t("admin.vocabulary.empty")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-14">{t("common.image")}</TableHead>
                  <TableHead>{t("admin.fields.word")}</TableHead>
                  <TableHead>{t("admin.fields.translation")}</TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t("common.example")}
                  </TableHead>
                  <TableHead className="w-24 text-right">
                    {t("common.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vocabulary.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.word}
                          width={32}
                          height={32}
                          className="h-8 w-8 rounded object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="h-8 w-8 rounded bg-muted" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.word}</TableCell>
                    <TableCell>{item.translation}</TableCell>
                    <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">
                      {item.example_sentence || t("common.noValue")}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <VocabularyEditDialog
                          vocabulary={item}
                          lessons={lessons}
                        />
                        <DeleteConfirmDialog
                          title={t("admin.vocabulary.deleteTitle")}
                          description={t("admin.vocabulary.deleteDescription", {
                            word: item.word,
                          })}
                          successMessage={t("admin.vocabulary.deleted")}
                          onConfirm={() => deleteVocabulary(item.id)}
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
