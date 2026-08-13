import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { UserDashboard } from "@/components/dashboard/user-dashboard";
import type { MySubscriptionEntry } from "@/components/subscription/my-subscriptions-card";
import { getLanguagesWithAvailability } from "@/lib/curriculum/availability";
import { getDataRepository } from "@/lib/data";
import {
  fetchAdminDashboardData,
  fetchUserDashboardData,
} from "@/lib/dashboard-data";
import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.dashboard");
}

export default async function DashboardPage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const { t } = await getServerTranslator();
  const profile = await repo.getProfileById(user.id);
  const displayName =
    profile?.full_name || user.email || t("common.guestName");

  if (profile?.is_admin) {
    const adminData = await fetchAdminDashboardData(repo);
    return (
      <AdminDashboard
        data={adminData}
        displayName={displayName}
        currentUserId={user.id}
        isSuperAdmin={profile.role === "super_admin"}
      />
    );
  }

  const [userData, subscriptions, tiers, plans, languages] = await Promise.all([
    fetchUserDashboardData(repo, user.id, user.email),
    repo.getSubscriptionsForUser(user.id),
    repo.getSubscriptionTiers(),
    repo.getSubscriptionPlans(),
    getLanguagesWithAvailability(repo),
  ]);

  // Only the subscriptions that currently grant something. Expired and
  // cancelled rows belong in billing history, not on the dashboard.
  const liveSubscriptions: MySubscriptionEntry[] = subscriptions
    .filter(
      (subscription) =>
        subscription.status === "active" || subscription.status === "past_due"
    )
    .map((subscription) => ({
      subscription,
      tier:
        tiers.find((tier) => tier.plan_slug === subscription.plan_slug) ?? null,
      planTitle:
        plans.find(
          (plan) =>
            plan.plan_slug === subscription.plan_slug &&
            plan.language_slug === subscription.language_slug
        )?.title ?? null,
      languageName:
        languages.find(
          (language) => language.slug === subscription.language_slug
        )?.name ?? subscription.language_slug,
    }));

  return (
    <UserDashboard
      data={userData}
      displayName={displayName}
      subscriptions={liveSubscriptions}
    />
  );
}
