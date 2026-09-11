import type { Metadata } from "next";

import { AdminBannersPageView } from "@/components/admin/banners/admin-banners-page-view";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";
import { requireAdminPage } from "@/lib/supabase/admin-guard";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.admin");
}

export default async function AdminBannersPage() {
  // Banners are a platform-wide, first-impression surface. A head admin can
  // hand this one to the admin tier; by default only a super admin has it.
  const { user, profile } = await requireAdminPage("manageBanners");

  const repo = getDataRepository();
  const banners = await repo.getAllBanners();

  const { t } = await getServerTranslator();
  const displayName =
    profile.full_name || user.email || t("common.adminFallback");

  return <AdminBannersPageView displayName={displayName} banners={banners} />;
}
