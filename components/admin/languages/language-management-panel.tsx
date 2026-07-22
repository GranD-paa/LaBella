"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe2, Lock, Sparkles } from "lucide-react";

import { setLanguageAvailabilityAction } from "@/app/admin/actions/language-settings";
import { ConfirmActionDialog } from "@/components/admin/users/confirm-action-dialog";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { LanguageToggle } from "@/lib/curriculum/availability";

export function LanguageManagementPanel({
  languages,
}: {
  languages: LanguageToggle[];
}) {
  const { t } = useTranslations();
  const router = useRouter();
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  const pendingLanguage = languages.find((entry) => entry.slug === pendingSlug) ?? null;
  const nextEnabled = pendingLanguage ? !pendingLanguage.available : false;

  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          <Globe2 className="h-5 w-5 text-brand-accent" />
          {t("admin.languages.title")}
        </CardTitle>
        <CardDescription>{t("admin.languages.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border border-white/10">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-white/10 bg-muted/20 px-4 py-2 text-xs font-medium text-muted-foreground sm:grid-cols-[2fr_1fr_auto]">
            <span>{t("admin.languages.columnLanguage")}</span>
            <span>{t("admin.languages.columnStatus")}</span>
            <span className="text-end">{t("admin.languages.columnAction")}</span>
          </div>
          <div className="divide-y divide-white/10">
            {languages.map((language) => (
              <div
                key={language.slug}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-3 sm:grid-cols-[2fr_1fr_auto]"
              >
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-xl">{language.flagEmoji}</span>
                  {language.name}
                </div>
                <div>
                  {language.available ? (
                    <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
                      <Sparkles className="me-1 h-3 w-3" />
                      {t("common.available")}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">{t("common.comingSoon")}</Badge>
                  )}
                </div>
                <div className="flex justify-end">
                  {language.locked ? (
                    <Badge
                      variant="outline"
                      className="gap-1 text-muted-foreground"
                      title={t("admin.languages.lockedHint")}
                    >
                      <Lock className="h-3 w-3" />
                      {t("admin.languages.locked")}
                    </Badge>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      variant={language.available ? "outline" : "default"}
                      className={language.available ? "border-white/20" : undefined}
                      onClick={() => setPendingSlug(language.slug)}
                    >
                      {language.available
                        ? t("admin.languages.setComingSoon")
                        : t("admin.languages.open")}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      {pendingLanguage ? (
        <ConfirmActionDialog
          open={pendingSlug !== null}
          onOpenChange={(open) => !open && setPendingSlug(null)}
          title={
            nextEnabled
              ? t("admin.languages.confirmOpenTitle", { name: pendingLanguage.name })
              : t("admin.languages.confirmCloseTitle", { name: pendingLanguage.name })
          }
          description={
            nextEnabled
              ? t("admin.languages.confirmOpenDescription", {
                  name: pendingLanguage.name,
                })
              : t("admin.languages.confirmCloseDescription", {
                  name: pendingLanguage.name,
                })
          }
          confirmLabel={
            nextEnabled ? t("admin.languages.open") : t("admin.languages.setComingSoon")
          }
          destructive={!nextEnabled}
          successMessage={
            nextEnabled
              ? t("admin.languages.openedSuccess", { name: pendingLanguage.name })
              : t("admin.languages.closedSuccess", { name: pendingLanguage.name })
          }
          onConfirm={() =>
            setLanguageAvailabilityAction(pendingLanguage.slug, nextEnabled)
          }
          onSuccess={() => router.refresh()}
        />
      ) : null}
    </Card>
  );
}
