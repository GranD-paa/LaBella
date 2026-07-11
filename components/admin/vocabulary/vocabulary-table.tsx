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
import type { Lesson, Vocabulary } from "@/types";

export function VocabularyTable({
  vocabulary,
  lessons,
}: {
  vocabulary: Vocabulary[];
  lessons: Lesson[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vocabulary for this lesson</CardTitle>
        <CardDescription>{vocabulary.length} words</CardDescription>
      </CardHeader>
      <CardContent>
        {vocabulary.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
            <Languages className="h-8 w-8" />
            <p>No vocabulary for this lesson yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-14">Image</TableHead>
                  <TableHead>Word</TableHead>
                  <TableHead>Translation</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Example
                  </TableHead>
                  <TableHead className="w-24 text-right">Actions</TableHead>
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
                      {item.example_sentence || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <VocabularyEditDialog
                          vocabulary={item}
                          lessons={lessons}
                        />
                        <DeleteConfirmDialog
                          title="Delete this vocabulary word?"
                          description={`This will permanently delete "${item.word}".`}
                          successMessage="Vocabulary deleted"
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
