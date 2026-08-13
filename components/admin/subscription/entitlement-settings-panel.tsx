"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, ShieldAlert } from "lucide-react";

import { updateEntitlementSettingsAction } from "@/app/admin/actions/subscription";
import { ToggleRow } from "@/components/admin/toggle-row";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CEFR_BANDS } from "@/lib/curriculum/types";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { cn } from "@/lib/utils";
import {
  entitlementSettingsSchema,
  type EntitlementSettingsValues,
} from "@/lib/validations/admin";
import type { PaymentSettings } from "@/types";

/**
 * The platform-wide gating controls.
 *
 * Kept as its own panel rather than folded into the plan editors because the
 * master switch decides whether *any* of the plan configuration has an effect.
 * An admin needs to see the state of that switch without having to open a plan.
 */
export function EntitlementSettingsPanel({
  settings,
}: {
  settings: PaymentSettings;
}) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();

  const form = useForm<EntitlementSettingsValues>({
    resolver: zodResolver(entitlementSettingsSchema),
    defaultValues: {
      enforceEntitlements: settings.enforce_entitlements,
      freeCefrBands: (settings.free_cefr_bands ?? []).filter(
        (band): band is (typeof CEFR_BANDS)[number] =>
          (CEFR_BANDS as readonly string[]).includes(band)
      ),
      freeQuizRetakeLimit: settings.free_quiz_retake_limit,
    },
  });

  const enforcing = form.watch("enforceEntitlements");
  const freeBands = form.watch("freeCefrBands");

  function toggleBand(band: (typeof CEFR_BANDS)[number], next: boolean) {
    const current = form.getValues("freeCefrBands");
    form.setValue(
      "freeCefrBands",
      next
        ? [...current, band].filter(
            (entry, index, all) => all.indexOf(entry) === index
          )
        : current.filter((entry) => entry !== band),
      { shouldDirty: true }
    );
  }

  function onSubmit(values: EntitlementSettingsValues) {
    startTransition(async () => {
      const result = await updateEntitlementSettingsAction(values);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.subscription.access.saved"));
    });
  }

  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-amber-400" />
          {t("admin.subscription.access.title")}
        </CardTitle>
        <CardDescription>
          {t("admin.subscription.access.description")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ToggleRow
            emphasis
            label={t("admin.subscription.access.enforceLabel")}
            hint={t("admin.subscription.access.enforceHint")}
            checked={enforcing}
            onChange={(next) =>
              form.setValue("enforceEntitlements", next, { shouldDirty: true })
            }
          />

          {!enforcing ? (
            <p className="rounded-xl border border-white/10 bg-muted/10 p-3 text-xs text-muted-foreground">
              {t("admin.subscription.access.offNotice")}
            </p>
          ) : null}

          <div className="space-y-2">
            <Label>{t("admin.subscription.access.freeBandsLabel")}</Label>
            <p className="text-xs text-muted-foreground">
              {t("admin.subscription.access.freeBandsHint")}
            </p>
            <div className="flex flex-wrap gap-2">
              {CEFR_BANDS.map((band) => {
                const selected = freeBands.includes(band);
                return (
                  <button
                    key={band}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleBand(band, !selected)}
                    className={cn(
                      "rounded-lg border px-4 py-2 text-sm font-semibold transition-colors",
                      selected
                        ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                        : "border-white/10 bg-white/5 text-muted-foreground hover:border-brand-accent/40"
                    )}
                  >
                    {band}
                  </button>
                );
              })}
            </div>
            {freeBands.length === 0 ? (
              <p className="text-xs text-amber-300">
                {t("admin.subscription.access.noFreeBandsWarning")}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="freeQuizRetakeLimit">
              {t("admin.subscription.access.freeRetakesLabel")}
            </Label>
            <Input
              id="freeQuizRetakeLimit"
              type="number"
              min={0}
              max={99}
              step={1}
              className="max-w-32"
              {...form.register("freeQuizRetakeLimit", { valueAsNumber: true })}
            />
            <p className="text-xs text-muted-foreground">
              {t("admin.subscription.access.freeRetakesHint")}
            </p>
          </div>

          <Button type="submit" disabled={isPending} className="gap-2">
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {isPending ? t("common.saving") : t("common.saveChanges")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
