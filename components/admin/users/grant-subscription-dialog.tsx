"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { grantSubscriptionAction } from "@/app/admin/actions/grants";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGE_LABEL_KEYS } from "@/lib/i18n/language-labels";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { BILLING_PERIOD_MONTHS } from "@/types";
import type { LocalizedText } from "@/types";

export type GrantPlanOption = {
  planSlug: string;
  title: LocalizedText;
  tierRank: number;
};

/**
 * Puts a learner on a paid plan without a payment.
 *
 * The plans offered are the ones the subscription panel actually sells, read
 * from the database rather than listed here — so when the three paid tiers
 * become two, this dialog follows without being touched.
 *
 * The note is for the admin side only. Nothing the recipient sees says the
 * subscription was a gift, which is deliberate: they get the plan, not the
 * story of how they got it.
 */
export function GrantSubscriptionDialog({
  open,
  onOpenChange,
  user,
  plans,
  languageSlugs,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: ManagedUser;
  plans: GrantPlanOption[];
  languageSlugs: string[];
}) {
  const { t, locale } = useTranslations();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [planSlug, setPlanSlug] = useState(plans[0]?.planSlug ?? "");
  const [languageSlug, setLanguageSlug] = useState(languageSlugs[0] ?? "");
  const [months, setMonths] = useState<number>(BILLING_PERIOD_MONTHS[0]);
  const [note, setNote] = useState("");

  const displayName = user.fullName || t("admin.users.unnamed");
  const ready = Boolean(planSlug && languageSlug);

  function handleSave() {
    startTransition(async () => {
      const result = await grantSubscriptionAction({
        userId: user.id,
        planSlug,
        languageSlug,
        periodMonths: months,
        note: note.trim() || undefined,
      });
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.users.grantDialog.granted"));
      setNote("");
      onOpenChange(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {t("admin.users.grantDialog.title", { name: displayName })}
          </DialogTitle>
          <DialogDescription>
            {t("admin.users.grantDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="grant-plan">
              {t("admin.users.grantDialog.planLabel")}
            </Label>
            <Select value={planSlug} onValueChange={setPlanSlug}>
              <SelectTrigger id="grant-plan">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan) => (
                  <SelectItem key={plan.planSlug} value={plan.planSlug}>
                    {plan.title[locale] ?? plan.planSlug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grant-language">
              {t("admin.users.grantDialog.languageLabel")}
            </Label>
            <Select value={languageSlug} onValueChange={setLanguageSlug}>
              <SelectTrigger id="grant-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageSlugs.map((slug) => (
                  <SelectItem key={slug} value={slug}>
                    {LANGUAGE_LABEL_KEYS[slug]
                      ? t(LANGUAGE_LABEL_KEYS[slug])
                      : slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grant-months">
              {t("admin.users.grantDialog.periodLabel")}
            </Label>
            <Select
              value={String(months)}
              onValueChange={(value) => setMonths(Number(value))}
            >
              <SelectTrigger id="grant-months">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BILLING_PERIOD_MONTHS.map((value) => (
                  <SelectItem key={value} value={String(value)}>
                    {t("admin.users.grantDialog.months", { count: value })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grant-note">
              {t("admin.users.grantDialog.noteLabel")}
            </Label>
            <Input
              id="grant-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder={t("admin.users.grantDialog.notePlaceholder")}
              maxLength={300}
            />
            <p className="text-xs text-muted-foreground">
              {t("admin.users.grantDialog.noteHint")}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSave} disabled={isPending || !ready}>
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("common.saving")}
              </>
            ) : (
              t("admin.users.grantDialog.save")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
