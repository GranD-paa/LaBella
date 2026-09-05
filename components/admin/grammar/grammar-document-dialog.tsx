"use client";

import { useRef, useState, useTransition } from "react";
import { FileText, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import {
  removeGrammarDocument,
  uploadGrammarDocument,
} from "@/app/admin/actions/grammar";
import { useTranslations } from "@/components/providers/locale-provider";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { GrammarDocumentSummary } from "@/lib/grammar/types";

const MAX_PAGES = 80;
const MAX_MEGABYTES = 60;

/**
 * Manages the PDFs behind one grammar title.
 *
 * Uploading renders every page server-side, which takes real time on a long
 * document — the button says so rather than appearing to hang, because the
 * work cannot be moved off the request without a queue this app does not have.
 */
export function GrammarDocumentDialog({
  ruleId,
  lessonId,
  title,
  documents,
}: {
  ruleId: string;
  lessonId: string;
  title: string;
  documents: GrammarDocumentSummary[];
}) {
  const { t } = useTranslations();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const pageTotal = documents.reduce((sum, doc) => sum + doc.pageCount, 0);

  function upload(file: File) {
    const formData = new FormData();
    formData.set("ruleId", ruleId);
    formData.set("lessonId", lessonId);
    formData.set("document", file);

    startTransition(async () => {
      const result = await uploadGrammarDocument(formData);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.grammar.document.uploaded"));
      if (inputRef.current) inputRef.current.value = "";
    });
  }

  function remove(sourceDocument: string) {
    if (!window.confirm(t("admin.grammar.document.removeConfirm"))) return;

    startTransition(async () => {
      const result = await removeGrammarDocument(
        ruleId,
        lessonId,
        sourceDocument
      );
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.grammar.document.removed"));
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("admin.grammar.document.heading")}
        >
          <FileText className="h-4 w-4" />
          {pageTotal > 0 ? (
            <span className="sr-only">
              {t("admin.grammar.document.pages", { count: pageTotal })}
            </span>
          ) : null}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle dir="auto">{title}</DialogTitle>
          <DialogDescription>
            {t("admin.grammar.document.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {documents.length === 0 ? (
            <p className="rounded-lg border border-dashed px-3 py-6 text-center text-sm text-muted-foreground">
              {t("admin.grammar.document.empty")}
            </p>
          ) : (
            <ul className="space-y-2">
              {documents.map((doc) => (
                <li
                  key={doc.sourceDocument}
                  className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
                >
                  <div className="min-w-0">
                    <p dir="auto" className="truncate text-sm font-medium">
                      {doc.sourceDocument}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("admin.grammar.document.pages", {
                        count: doc.pageCount,
                      })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={pending}
                    onClick={() => remove(doc.sourceDocument)}
                    aria-label={t("admin.grammar.document.removeButton")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}

          <div className="space-y-2">
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) upload(file);
              }}
            />
            <Button
              className="w-full"
              disabled={pending}
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
              {pending
                ? t("admin.grammar.document.uploading")
                : t("admin.grammar.document.uploadButton")}
            </Button>
            <p className="text-xs text-muted-foreground">
              {t("admin.grammar.document.limits", {
                pages: MAX_PAGES,
                size: MAX_MEGABYTES,
              })}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
