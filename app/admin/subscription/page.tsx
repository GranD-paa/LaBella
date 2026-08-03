import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminSubscriptionPageView } from "@/components/admin/subscription/admin-subscription-page-view";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";
import { requireAdmin } from "@/lib/supabase/admin-guard";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.admin");
}

export default async function AdminSubscriptionPage() {
  const { user, profile } = await requireAdmin();

  // Pricing is platform-wide — restricted to super admins, same as banners
  // and language availability.
  if (profile.role !== "super_admin") {
    redirect("/admin");
  }

  const repo = getDataRepository();
  const plans = await repo.getSubscriptionPlans();

  const { t } = await getServerTranslator();
  const displayName =
    profile.full_name || user.email || t("common.adminFallback");

  return <AdminSubscriptionPageView displayName={displayName} plans={plans} />;
}
