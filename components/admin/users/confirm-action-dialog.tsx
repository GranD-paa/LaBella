"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { useTranslations } from "@/components/providers/locale-provider";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import type { ActionResult } from "@/lib/action-result";
import { cn } from "@/lib/utils";

export function ConfirmActionDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  destructive = false,
  onConfirm,
  successMessage,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => Promise<ActionResult>;
  successMessage: string;
  onSuccess?: () => void;
}) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      const result = await onConfirm();
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(successMessage);
      onOpenChange(false);
      onSuccess?.();
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("common.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              handleConfirm();
            }}
            disabled={isPending}
            className={cn(
              destructive &&
                "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("common.saving")}
              </>
            ) : (
              confirmLabel
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
