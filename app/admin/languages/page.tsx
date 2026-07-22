import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLanguagesPageView } from "@/components/admin/languages/admin-languages-page-view";
import { getLanguageToggles } from "@/lib/curriculum/availability";
import { getAdminCurriculumLevelsByLanguage } from "@/lib/curriculum/level-overrides";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";
import { requireAdmin } from "@/lib/supabase/admin-guard";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.admin");
}

export default async function AdminLanguagesPage() {
  const { user, profile } = await requireAdmin();

  // Opening/closing language courses is a platform-wide switch, restricted
  // to super admins — regular admins are sent back to their own panel.
  if (profile.role !== "super_admin") {
    redirect("/admin");
  }

  const repo = getDataRepository();
  const [languages, levelsByLanguage] = await Promise.all([
    getLanguageToggles(repo),
    getAdminCurriculumLevelsByLanguage(repo),
  ]);

  const { t } = await getServerTranslator();
  const displayName =
    profile.full_name || user.email || t("common.adminFallback");

  return (
    <AdminLanguagesPageView
      displayName={displayName}
      languages={languages}
      levelsByLanguage={levelsByLanguage}
    />
  );
}
