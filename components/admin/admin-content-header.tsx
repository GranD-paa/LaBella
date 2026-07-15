"use client";

import { useTranslations } from "@/components/providers/locale-provider";

export function AdminContentHeader() {
  const { t } = useTranslations();

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">
        {t("dashboard.admin.contentManagement")}
      </h2>
      <p className="text-muted-foreground">
        {t("dashboard.admin.contentManagementHint")}
      </p>
    </div>
  );
}
