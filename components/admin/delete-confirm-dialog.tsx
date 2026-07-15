"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { useTranslations } from "@/components/providers/locale-provider";
import type { ActionResult } from "@/lib/action-result";

export function DeleteConfirmDialog({
  title,
  description,
  onConfirm,
  successMessage,
}: {
  title?: string;
  description?: string;
  onConfirm: () => Promise<ActionResult>;
  successMessage?: string;
}) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();

  const resolvedTitle = title ?? t("common.delete");
  const resolvedDescription = description ?? "";
  const resolvedSuccessMessage =
    successMessage ?? t("common.deletedSuccess");

  function handleConfirm() {
    startTransition(async () => {
      const result = await onConfirm();
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
      } else {
        toast.success(resolvedSuccessMessage);
      }
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          aria-label={t("admin.delete.ariaLabel")}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{resolvedTitle}</AlertDialogTitle>
          {resolvedDescription ? (
            <AlertDialogDescription>{resolvedDescription}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("common.deleting")}
              </>
            ) : (
              t("common.delete")
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
