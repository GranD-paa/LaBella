import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminBannersPageView } from "@/components/admin/banners/admin-banners-page-view";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";
import { requireAdmin } from "@/lib/supabase/admin-guard";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.admin");
}

export default async function AdminBannersPage() {
  const { user, profile } = await requireAdmin();

  // Banners are a platform-wide, first-impression surface — restricted to
  // super admins, same as language availability and curriculum levels.
  if (profile.role !== "super_admin") {
    redirect("/admin");
  }

  const repo = getDataRepository();
  const banners = await repo.getAllBanners();

  const { t } = await getServerTranslator();
  const displayName =
    profile.full_name || user.email || t("common.adminFallback");

  return <AdminBannersPageView displayName={displayName} banners={banners} />;
}
