"use client";

import { BookOpenCheck } from "lucide-react";

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
import { deleteGrammarRule } from "@/app/admin/actions/grammar";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { GrammarEditDialog } from "@/components/admin/grammar/grammar-edit-dialog";
import { useTranslations } from "@/components/providers/locale-provider";
import type { GrammarRule, Lesson } from "@/types";

export function GrammarTable({
  grammarRules,
  lessons,
}: {
  grammarRules: GrammarRule[];
  lessons: Lesson[];
}) {
  const { t } = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin.grammar.tableTitle")}</CardTitle>
        <CardDescription>
          {t("admin.grammar.ruleCount", { count: grammarRules.length })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {grammarRules.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
            <BookOpenCheck className="h-8 w-8" />
            <p>{t("admin.grammar.empty")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("common.title")}</TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t("common.description")}
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t("common.example")}
                  </TableHead>
                  <TableHead className="w-24 text-right">
                    {t("common.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grammarRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.title}</TableCell>
                    <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">
                      {rule.description || t("common.noValue")}
                    </TableCell>
                    <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">
                      {rule.example || t("common.noValue")}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <GrammarEditDialog
                          grammarRule={rule}
                          lessons={lessons}
                        />
                        <DeleteConfirmDialog
                          title={t("admin.grammar.deleteTitle")}
                          description={t("admin.grammar.deleteDescription", {
                            title: rule.title,
                          })}
                          successMessage={t("admin.grammar.deleted")}
                          onConfirm={() => deleteGrammarRule(rule.id)}
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
