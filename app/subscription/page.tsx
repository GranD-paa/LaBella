import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SubscriptionView } from "@/components/subscription/subscription-view";
import { getAvailableProviders } from "@/lib/billing/providers";
import { getLanguagesWithAvailability } from "@/lib/curriculum/availability";
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
  const [languages, plans, pageContent, settings, fxRate] = await Promise.all([
    getLanguagesWithAvailability(repo),
    repo.getSubscriptionPlans(),
    repo.getSubscriptionPageContent(),
    repo.getPaymentSettings(),
    repo.getLatestFxRate(),
  ]);

  // Which gateways can take each currency is decided on the server: the
  // client should never be the one deciding what it is allowed to pay with.
  const providersByCurrency = {
    EUR: getAvailableProviders(settings, "EUR").map((provider) => provider.slug),
    IRR: getAvailableProviders(settings, "IRR").map((provider) => provider.slug),
  };

  return (
    <SubscriptionView
      isAdmin={profile?.is_admin ?? false}
      displayName={displayName}
      languages={languages}
      plans={plans}
      pageContent={pageContent}
      settings={settings}
      fxRate={fxRate}
      providersByCurrency={providersByCurrency}
    />
  );
}
