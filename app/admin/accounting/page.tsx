import type { Metadata } from "next";

import { AdminAccountingPageView } from "@/components/admin/accounting/admin-accounting-page-view";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";
import { requireAdminPage } from "@/lib/supabase/admin-guard";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.admin");
}

export default async function AdminAccountingPage() {
  // Revenue, customer payment records and gateway configuration are all
  // super-admin territory, the same as pricing itself: `manageBilling` is one
  // of the permissions the head-admin editor may never hand out.
  const { user, profile } = await requireAdminPage("manageBilling");

  const repo = getDataRepository();
  const snapshot = await repo.getAccountingSnapshot();

  const { t } = await getServerTranslator();
  const displayName =
    profile.full_name || user.email || t("common.adminFallback");

  return (
    <AdminAccountingPageView displayName={displayName} snapshot={snapshot} />
  );
}
