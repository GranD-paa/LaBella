"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, RefreshCw } from "lucide-react";

import {
  refreshFxRateAction,
  updateBillingSettingsAction,
} from "@/app/admin/actions/accounting";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatNumber } from "@/lib/billing/format";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import {
  billingSettingsSchema,
  type BillingSettingsValues,
} from "@/lib/validations/admin";
import { ToggleRow } from "@/components/admin/toggle-row";
import type { FxRate, PaymentSettings } from "@/types";

export function BillingSettingsForm({
  settings,
  fxRate,
}: {
  settings: PaymentSettings;
  fxRate: FxRate | null;
}) {
  const { t, locale, formatDate } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [isRefreshing, startRefresh] = useTransition();

  const form = useForm<BillingSettingsValues>({
    resolver: zodResolver(billingSettingsSchema),
    defaultValues: {
      irrEnabled: settings.irr_enabled,
      fxSource: settings.fx_source,
      fxMarginPercent: settings.fx_margin_percent,
      irrRounding: settings.irr_rounding,
      fxManualRate: settings.fx_manual_rate,
      fxMaxDeviationPercent: settings.fx_max_deviation_percent,
      stripeEnabled: settings.stripe_enabled,
      zarinpalEnabled: settings.zarinpal_enabled,
      manualEnabled: settings.manual_enabled,
      gracePeriodDays: settings.grace_period_days,
    },
  });

  const fxSource = form.watch("fxSource");
  const irrEnabled = form.watch("irrEnabled");

  function onSubmit(values: BillingSettingsValues) {
    startTransition(async () => {
      const result = await updateBillingSettingsAction(values);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.accounting.settings.saved"));
    });
  }

  function handleRefreshRate() {
    startRefresh(async () => {
      const result = await refreshFxRateAction();
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error), {
          description: result.reason,
        });
        return;
      }
      toast.success(t("admin.accounting.settings.rateRefreshed"));
    });
  }

  return (
    <div className="space-y-6">
      <Card className="brand-surface">
        <CardHeader className="space-y-1">
          <CardTitle className="text-base">
            {t("admin.accounting.settings.currentRate")}
          </CardTitle>
          <CardDescription>
            {fxRate
              ? t("admin.accounting.settings.rateUpdated", {
                  time: formatDate(fxRate.fetched_at, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }),
                })
              : t("admin.accounting.settings.rateNever")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="text-2xl font-bold tracking-tight">
              {fxRate
                ? t("admin.accounting.settings.tomanPerEur", {
                    amount: formatNumber(Math.round(fxRate.rate / 10), locale),
                  })
                : "—"}
            </p>
            {fxRate ? (
              <p className="text-xs text-muted-foreground">
                {t("admin.accounting.settings.rialPerEur", {
                  amount: formatNumber(fxRate.rate, locale),
                })}
                {" · "}
                {fxRate.source}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-white/20"
            disabled={isRefreshing}
            onClick={handleRefreshRate}
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {t("admin.accounting.settings.refreshRate")}
          </Button>
        </CardContent>
      </Card>

      <Card className="brand-surface">
        <CardHeader className="space-y-1">
          <CardTitle className="text-base">
            {t("admin.accounting.settings.title")}
          </CardTitle>
          <CardDescription>
            {t("admin.accounting.settings.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="irrEnabled"
                render={({ field }) => (
                  <FormItem>
                    <ToggleRow
                      label={t("admin.accounting.settings.irrEnabled")}
                      hint={t("admin.accounting.settings.irrEnabledHint")}
                      checked={field.value}
                      disabled={isPending}
                      onChange={field.onChange}
                    />
                  </FormItem>
                )}
              />

              {irrEnabled ? (
                <div className="space-y-4 rounded-xl border border-white/10 p-4">
                  <FormField
                    control={form.control}
                    name="fxSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("admin.accounting.settings.fxSource")}
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="tgju">
                              {t("admin.accounting.settings.fxSourceTgju")}
                            </SelectItem>
                            <SelectItem value="navasan">
                              {t("admin.accounting.settings.fxSourceNavasan")}
                            </SelectItem>
                            <SelectItem value="manual">
                              {t("admin.accounting.settings.fxSourceManual")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          {t("admin.accounting.settings.fxSourceHint")}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {fxSource === "manual" ? (
                    <FormField
                      control={form.control}
                      name="fxManualRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("admin.accounting.settings.fxManualRate")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              // "any" so a rate is entered exactly as quoted.
                              // step="1" rejected every fractional rate, and
                              // the column stores numeric(20,4).
                              step="any"
                              min={0}
                              disabled={isPending}
                              value={field.value ?? ""}
                              onChange={(event) =>
                                field.onChange(
                                  event.target.value === ""
                                    ? null
                                    : event.target.valueAsNumber
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : null}

                  <div className="grid gap-4 sm:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="fxMarginPercent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("admin.accounting.settings.fxMargin")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              min={0}
                              disabled={isPending}
                              {...field}
                              onChange={(event) =>
                                field.onChange(event.target.valueAsNumber)
                              }
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            {t("admin.accounting.settings.fxMarginHint")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="irrRounding"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("admin.accounting.settings.irrRounding")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              // step="1" so every whole number is valid. With a
                              // coarser step the browser validates the value
                              // against `min + n*step` and rejects anything off
                              // that ladder — which silently blocked saving the
                              // whole form for any value not of the form
                              // 1 + 1000n, including the old 10,000 default.
                              step="1"
                              min={1}
                              disabled={isPending}
                              {...field}
                              onChange={(event) =>
                                field.onChange(event.target.valueAsNumber)
                              }
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            {t("admin.accounting.settings.irrRoundingHint")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fxMaxDeviationPercent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("admin.accounting.settings.fxMaxDeviation")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="1"
                              min={1}
                              max={90}
                              disabled={isPending}
                              {...field}
                              onChange={(event) =>
                                field.onChange(event.target.valueAsNumber)
                              }
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            {t("admin.accounting.settings.fxMaxDeviationHint")}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ) : null}

              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {t("admin.accounting.settings.gateways")}
                </p>
                <FormField
                  control={form.control}
                  name="stripeEnabled"
                  render={({ field }) => (
                    <FormItem>
                      <ToggleRow
                        label={t("admin.accounting.settings.stripeEnabled")}
                        checked={field.value}
                        disabled={isPending}
                        onChange={field.onChange}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zarinpalEnabled"
                  render={({ field }) => (
                    <FormItem>
                      <ToggleRow
                        label={t("admin.accounting.settings.zarinpalEnabled")}
                        checked={field.value}
                        disabled={isPending || !irrEnabled}
                        onChange={field.onChange}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="manualEnabled"
                  render={({ field }) => (
                    <FormItem>
                      <ToggleRow
                        label={t("admin.accounting.settings.manualEnabled")}
                        checked={field.value}
                        disabled={isPending}
                        onChange={field.onChange}
                      />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gracePeriodDays"
                render={({ field }) => (
                  <FormItem className="max-w-xs">
                    <FormLabel>
                      {t("admin.accounting.settings.gracePeriod")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        min={0}
                        max={60}
                        disabled={isPending}
                        {...field}
                        onChange={(event) =>
                          field.onChange(event.target.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      {t("admin.accounting.settings.gracePeriodHint")}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("common.saving")}
                  </>
                ) : (
                  t("admin.accounting.settings.save")
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
