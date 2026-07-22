"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

import { addCurriculumLevelAction } from "@/app/admin/actions/curriculum-levels";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/components/providers/locale-provider";
import { computeNextCodeForBand } from "@/lib/curriculum/level-overrides";
import { CEFR_BANDS, type CefrBand, type CurriculumLevel } from "@/lib/curriculum/types";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import {
  createAddCurriculumLevelSchema,
  type AddCurriculumLevelValues,
} from "@/lib/validations/i18n/admin-schemas";

export function AddCurriculumLevelDialog({
  languageSlug,
  languageName,
  levels,
  defaultBand,
  onCreated,
}: {
  languageSlug: string;
  languageName: string;
  levels: CurriculumLevel[];
  defaultBand: CefrBand;
  onCreated?: (level: { slug: string; code: string }) => void;
}) {
  const { t } = useTranslations();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const schema = useMemo(() => createAddCurriculumLevelSchema(t), [t]);

  const form = useForm<AddCurriculumLevelValues>({
    resolver: zodResolver(schema),
    defaultValues: { band: defaultBand, title: "", description: "" },
  });

  const selectedBand = form.watch("band");
  const preview = useMemo(
    () => computeNextCodeForBand(levels, selectedBand),
    [levels, selectedBand]
  );

  function onSubmit(values: AddCurriculumLevelValues) {
    startTransition(async () => {
      const result = await addCurriculumLevelAction(
        languageSlug,
        values.band,
        values.title,
        values.description ?? ""
      );
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(
        t("admin.languages.curriculum.levelAdded", {
          code: result.code,
          language: languageName,
        })
      );
      setOpen(false);
      onCreated?.(result);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          form.reset({ band: defaultBand, title: "", description: "" });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" size="sm">
          <Plus className="h-4 w-4" />
          {t("admin.languages.curriculum.addLevel")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("admin.languages.curriculum.addLevelTitle")}</DialogTitle>
          <DialogDescription>
            {t("admin.languages.curriculum.addLevelDescription", {
              language: languageName,
            })}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="band"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.languages.curriculum.band")}</FormLabel>
                  <Select
                    disabled={isPending}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CEFR_BANDS.map((band) => (
                        <SelectItem key={band} value={band}>
                          {band}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-lg border border-dashed border-brand-accent/30 bg-brand-accent/5 px-3 py-2 text-sm">
              <span className="text-muted-foreground">
                {t("admin.languages.curriculum.levelCodePreview")}:{" "}
              </span>
              <span className="font-semibold text-brand-accent">{preview.code}</span>
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.languages.curriculum.levelTitleLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder={t("admin.languages.curriculum.levelTitlePlaceholder")}
                      {...field}
                    />
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
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("common.saving")}
                  </>
                ) : (
                  t("admin.languages.curriculum.create")
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
