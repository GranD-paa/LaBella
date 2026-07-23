import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SubscriptionView } from "@/components/subscription/subscription-view";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata(
    "meta.subscription",
    "meta.subscriptionDescription"
  );
}

export default async function SubscriptionPage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const { t } = await getServerTranslator();
  const profile = await repo.getProfileById(user.id);
  const displayName =
    profile?.full_name || user.email?.split("@")[0] || t("common.guestName");

  return (
    <SubscriptionView
      isAdmin={profile?.is_admin ?? false}
      displayName={displayName}
    />
  );
}
