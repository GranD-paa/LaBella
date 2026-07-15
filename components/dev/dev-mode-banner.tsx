"use client";

import { isLocalDataMode } from "@/lib/config/data-source";
import { LOCAL_DEV_CREDENTIALS } from "@/lib/data/local/seed";
import { useTranslations } from "@/components/providers/locale-provider";

export function DevModeBanner() {
  const { t } = useTranslations();

  if (!isLocalDataMode()) {
    return null;
  }

  return (
    <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-xs text-amber-100">
      {t("dev.banner", {
        adminEmail: LOCAL_DEV_CREDENTIALS.admin.email,
        userEmail: LOCAL_DEV_CREDENTIALS.user.email,
      })}
    </div>
  );
}
