"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { updateUserAssignedLanguages } from "@/app/admin/actions/users";
import { ToggleRow } from "@/components/admin/toggle-row";
import type { ManagedUser } from "@/components/admin/users/types";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LANGUAGE_LABEL_KEYS } from "@/lib/i18n/language-labels";
import { resolveMessage } from "@/lib/i18n/resolve-message";

/**
 * Which curricula a teacher may edit.
 *
 * An empty selection is a real answer, not an unfinished one: it leaves the
 * teacher able to edit nothing. That is the safe direction — the alternative,
 * reading "no languages" as "every language", would hand a brand-new teacher
 * the whole platform the moment somebody forgot this dialog existed.
 */
export function AssignLanguagesDialog({
  open,
  onOpenChange,
  user,
  languageSlugs,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: ManagedUser;
  languageSlugs: string[];
}) {
  const { t } = useTranslations();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<string[]>(user.assignedLanguages);

  // Reopening after a save elsewhere should show what is stored now, not the
  // draft this dialog was last left holding.
  useEffect(() => {
    if (open) setSelected(user.assignedLanguages);
  }, [open, user.assignedLanguages]);

  function toggle(slug: string, next: boolean) {
    setSelected((current) =>
      next ? [...current, slug] : current.filter((entry) => entry !== slug)
    );
  }

  function handleSave() {
    startTransition(async () => {
      const result = await updateUserAssignedLanguages(user.id, selected);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.users.languagesUpdated"));
      onOpenChange(false);
      router.refresh();
    });
  }

  const displayName = user.fullName || t("admin.users.unnamed");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {t("admin.users.assignLanguagesDialog.title", { name: displayName })}
          </DialogTitle>
          <DialogDescription>
            {t("admin.users.assignLanguagesDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {languageSlugs.map((slug) => {
            const labelKey = LANGUAGE_LABEL_KEYS[slug];
            return (
              <ToggleRow
                key={slug}
                label={labelKey ? t(labelKey) : slug}
                checked={selected.includes(slug)}
                disabled={isPending}
                onChange={(next) => toggle(slug, next)}
              />
            );
          })}
          {selected.length === 0 ? (
            <p className="text-xs text-amber-300">
              {t("admin.users.assignLanguagesDialog.emptyWarning")}
            </p>
          ) : null}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("common.saving")}
              </>
            ) : (
              t("admin.users.assignLanguagesDialog.save")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
