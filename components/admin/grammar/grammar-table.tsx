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
import type { GrammarRule, Lesson } from "@/types";

export function GrammarTable({
  grammarRules,
  lessons,
}: {
  grammarRules: GrammarRule[];
  lessons: Lesson[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grammar rules for this lesson</CardTitle>
        <CardDescription>{grammarRules.length} rules</CardDescription>
      </CardHeader>
      <CardContent>
        {grammarRules.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
            <BookOpenCheck className="h-8 w-8" />
            <p>No grammar rules for this lesson yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Description
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Example
                  </TableHead>
                  <TableHead className="w-24 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grammarRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.title}</TableCell>
                    <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">
                      {rule.description || "—"}
                    </TableCell>
                    <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">
                      {rule.example || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <GrammarEditDialog
                          grammarRule={rule}
                          lessons={lessons}
                        />
                        <DeleteConfirmDialog
                          title="Delete this grammar rule?"
                          description={`This will permanently delete "${rule.title}".`}
                          successMessage="Grammar rule deleted"
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
