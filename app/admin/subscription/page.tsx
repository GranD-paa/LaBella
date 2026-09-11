import type { Metadata } from "next";

import { AdminSubscriptionPageView } from "@/components/admin/subscription/admin-subscription-page-view";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";
import { requireAdminPage } from "@/lib/supabase/admin-guard";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.admin");
}

export default async function AdminSubscriptionPage() {
  // Pricing decides what every paid tier unlocks, so it stays with the super
  // admin: `manageSubscriptions` is locked out of the head-admin editor.
  const { user, profile } = await requireAdminPage("manageSubscriptions");

  const repo = getDataRepository();
  const [plans, tiers, settings] = await Promise.all([
    repo.getSubscriptionPlans(),
    repo.getSubscriptionTiers(),
    repo.getPaymentSettings(),
  ]);

  const { t } = await getServerTranslator();
  const displayName =
    profile.full_name || user.email || t("common.adminFallback");

  return (
    <AdminSubscriptionPageView
      displayName={displayName}
      plans={plans}
      tiers={tiers}
      settings={settings}
    />
  );
}
