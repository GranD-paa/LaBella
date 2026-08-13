"use client";

import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";

import { updateSubscriptionPlanAction } from "@/app/admin/actions/subscription";
import { ToggleRow } from "@/components/admin/toggle-row";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import {
  subscriptionPlanSchema,
  type SubscriptionPlanValues,
} from "@/lib/validations/admin";
import type { SubscriptionPlanRow } from "@/types";

const LOCALES = [
  { code: "fa", label: "فارسی" },
  { code: "en", label: "English" },
  { code: "it", label: "Italiano" },
] as const;

export function SubscriptionPlanEditDialog({ plan }: { plan: SubscriptionPlanRow }) {
  const { t, locale } = useTranslations();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<SubscriptionPlanValues>({
    resolver: zodResolver(subscriptionPlanSchema),
    defaultValues: {
      priceEur: plan.price_eur,
      discountPercent: plan.discount_percent,
      title: plan.title,
      description: plan.description,
      features: plan.features,
      isActive: plan.is_active,
      quarterlyEnabled: plan.quarterly_enabled,
      quarterlyDiscountPercent: plan.quarterly_discount_percent,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  function onSubmit(values: SubscriptionPlanValues) {
    startTransition(async () => {
      const result = await updateSubscriptionPlanAction(
        plan.plan_slug,
        plan.language_slug,
        values
      );
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.subscription.planUpdated"));
      setOpen(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          form.reset({
            priceEur: plan.price_eur,
            discountPercent: plan.discount_percent,
            title: plan.title,
            description: plan.description,
            features: plan.features,
            isActive: plan.is_active,
            quarterlyEnabled: plan.quarterly_enabled,
            quarterlyDiscountPercent: plan.quarterly_discount_percent,
          });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-white/20">
          <Pencil className="h-4 w-4" />
          {t("common.edit")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("admin.subscription.editPlanTitle", { plan: plan.title[locale] })}
          </DialogTitle>
          <DialogDescription>
            {t("admin.subscription.editPlanDescription")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="priceEur"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin.subscription.priceLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min={0}
                        disabled={isPending}
                        {...field}
                        onChange={(event) => field.onChange(event.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discountPercent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin.subscription.discountLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        min={0}
                        max={95}
                        disabled={isPending}
                        {...field}
                        onChange={(event) => field.onChange(event.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3 rounded-xl border border-white/10 bg-muted/10 p-4">
              <ToggleRow
                emphasis
                label={t("admin.subscription.onSaleLabel")}
                hint={t("admin.subscription.onSaleHint")}
                checked={form.watch("isActive")}
                disabled={isPending}
                onChange={(next) =>
                  form.setValue("isActive", next, { shouldDirty: true })
                }
              />

              <ToggleRow
                label={t("admin.subscription.quarterlyEnabledLabel")}
                hint={t("admin.subscription.quarterlyEnabledHint")}
                checked={form.watch("quarterlyEnabled")}
                disabled={isPending}
                onChange={(next) =>
                  form.setValue("quarterlyEnabled", next, { shouldDirty: true })
                }
              />

              <FormField
                control={form.control}
                name="quarterlyDiscountPercent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("admin.subscription.quarterlyDiscountLabel")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        min={0}
                        max={95}
                        className="max-w-32"
                        disabled={isPending || !form.watch("quarterlyEnabled")}
                        {...field}
                        onChange={(event) =>
                          field.onChange(event.target.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      {t("admin.subscription.quarterlyDiscountHint", {
                        price: (
                          plan.price_eur *
                          3 *
                          (1 -
                            Math.min(
                              95,
                              (form.watch("discountPercent") || 0) +
                                (form.watch("quarterlyDiscountPercent") || 0)
                            ) /
                              100)
                        ).toFixed(2),
                      })}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Tabs defaultValue="fa">
              <TabsList>
                {LOCALES.map((locale) => (
                  <TabsTrigger key={locale.code} value={locale.code}>
                    {locale.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {LOCALES.map((locale) => (
                <TabsContent key={locale.code} value={locale.code} className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`title.${locale.code}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common.title")}</FormLabel>
                        <FormControl>
                          <Input disabled={isPending} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`description.${locale.code}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("common.description")}</FormLabel>
                        <FormControl>
                          <Textarea disabled={isPending} rows={2} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label>{t("admin.subscription.featuresLabel")}</Label>
                    {fields.map((fieldItem, index) => (
                      <div key={fieldItem.id} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`features.${index}.${locale.code}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input disabled={isPending} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          disabled={isPending || fields.length <= 1}
                          onClick={() => remove(index)}
                          aria-label={t("common.delete")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-white/20"
              disabled={isPending}
              onClick={() => append({ fa: "", en: "", it: "" })}
            >
              <Plus className="h-4 w-4" />
              {t("admin.subscription.addFeature")}
            </Button>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("common.saving")}
                  </>
                ) : (
                  t("common.saveChanges")
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
