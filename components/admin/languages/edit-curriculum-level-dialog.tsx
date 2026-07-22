"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Pencil, RotateCcw, Trash2 } from "lucide-react";

import {
  deleteCurriculumLevelAction,
  renameCurriculumLevelAction,
  resetCurriculumLevelAction,
} from "@/app/admin/actions/curriculum-levels";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/components/providers/locale-provider";
import type { CurriculumLevel } from "@/lib/curriculum/types";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import {
  createCurriculumLevelSchema,
  type CurriculumLevelValues,
} from "@/lib/validations/i18n/admin-schemas";

export function EditCurriculumLevelDialog({
  languageSlug,
  languageName,
  level,
  onChanged,
}: {
  languageSlug: string;
  languageName: string;
  level: CurriculumLevel;
  onChanged?: () => void;
}) {
  const { t } = useTranslations();
  const [open, setOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"delete" | "reset" | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isConfirmPending, startConfirmTransition] = useTransition();

  const schema = useMemo(() => createCurriculumLevelSchema(t), [t]);

  const form = useForm<CurriculumLevelValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: level.title, description: level.description },
  });

  function onSubmit(values: CurriculumLevelValues) {
    startTransition(async () => {
      const result = await renameCurriculumLevelAction(
        languageSlug,
        level.slug,
        values.title,
        values.description ?? ""
      );
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(
        t("admin.languages.curriculum.levelUpdated", { code: level.code })
      );
      setOpen(false);
      onChanged?.();
    });
  }

  function handleConfirm() {
    startConfirmTransition(async () => {
      const result =
        confirmAction === "delete"
          ? await deleteCurriculumLevelAction(languageSlug, level.slug)
          : await resetCurriculumLevelAction(languageSlug, level.slug);

      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        setConfirmAction(null);
        return;
      }

      toast.success(
        confirmAction === "delete"
          ? t("admin.languages.curriculum.levelDeleted", { code: level.code })
          : t("admin.languages.curriculum.levelReset", { code: level.code })
      );
      setConfirmAction(null);
      setOpen(false);
      onChanged?.();
    });
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (next) {
            form.reset({ title: level.title, description: level.description });
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t("admin.languages.curriculum.editAriaLabel")}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("admin.languages.curriculum.editLevelTitle")}</DialogTitle>
            <DialogDescription>
              {t("admin.languages.curriculum.editLevelDescription", {
                code: level.code,
              })}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("admin.languages.curriculum.levelTitleLabel")}
                    </FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("admin.languages.curriculum.levelDescriptionLabel")}
                    </FormLabel>
                    <FormControl>
                      <Textarea disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex-wrap gap-2 sm:justify-between">
                <div className="flex gap-2">
                  {level.isCustom ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-destructive/30 text-destructive hover:bg-destructive/10"
                      disabled={isPending}
                      onClick={() => setConfirmAction("delete")}
                    >
                      <Trash2 className="h-4 w-4" />
                      {t("common.delete")}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/20"
                      disabled={isPending}
                      onClick={() => setConfirmAction("reset")}
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t("admin.languages.curriculum.resetToDefault")}
                    </Button>
                  )}
                </div>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("common.saving")}
                    </>
                  ) : (
                    t("admin.languages.curriculum.saveChanges")
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={confirmAction !== null}
        onOpenChange={(next) => !next && setConfirmAction(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction === "delete"
                ? t("admin.languages.curriculum.deleteLevelTitle", { code: level.code })
                : t("admin.languages.curriculum.resetConfirmTitle", { code: level.code })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction === "delete"
                ? t("admin.languages.curriculum.deleteLevelDescription", {
                    code: level.code,
                    language: languageName,
                  })
                : t("admin.languages.curriculum.resetConfirmDescription", {
                    code: level.code,
                  })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isConfirmPending}>
              {t("common.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                handleConfirm();
              }}
              disabled={isConfirmPending}
              className={
                confirmAction === "delete"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : undefined
              }
            >
              {isConfirmPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("common.saving")}
                </>
              ) : confirmAction === "delete" ? (
                t("common.delete")
              ) : (
                t("admin.languages.curriculum.resetToDefault")
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
