import type { Metadata } from "next";

import { requireAdminPage } from "@/lib/supabase/admin-guard";
import { RolePermissionsProvider } from "@/components/admin/users/role-permissions-context";
import {
  RolesPermissionsPanel,
  type TierReference,
} from "@/components/admin/users/roles-permissions-panel";
import { UserManagementPanel } from "@/components/admin/users/user-management-panel";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { getDataRepository } from "@/lib/data";
import { fetchAdminDashboardData } from "@/lib/dashboard-data";
import { LANGUAGES } from "@/lib/curriculum/languages";
import { hasPermission, visibleAdminNav } from "@/lib/permissions/admin-nav";
import type { RolePermissionOverrides } from "@/lib/permissions/roles";

import { createPageMetadata } from "@/lib/i18n/metadata";
import { getServerTranslator } from "@/lib/i18n/server-locale";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.admin");
}

export default async function AdminPage() {
  const { user, profile, role, permissions } =
    await requireAdminPage("viewUsers");
  const repo = getDataRepository();

  const [adminData, subscriptions, plans, tiers, overrides] = await Promise.all([
    fetchAdminDashboardData(repo),
    repo.getLiveSubscriptionSummaries(),
    repo.getSubscriptionPlans(),
    repo.getSubscriptionTiers(),
    repo.getRolePermissionOverrides(),
  ]);

  const { t } = await getServerTranslator();
  const displayName =
    profile.full_name || user.email || t("common.adminFallback");

  // Plans are stored once per (plan, language); the panel only ever needs the
  // plan side of that, so collapse to one entry per plan and hang the tier's
  // rank off it for ordering and for "which plan is this account's best".
  const tierByPlan = new Map(tiers.map((tier) => [tier.plan_slug, tier]));
  const planOptions = Array.from(
    new Map(
      plans
        .filter((plan) => tierByPlan.has(plan.plan_slug))
        .map((plan) => [
          plan.plan_slug,
          {
            planSlug: plan.plan_slug,
            title: plan.title,
            tierRank: tierByPlan.get(plan.plan_slug)?.tier_rank ?? 0,
          },
        ])
    ).values()
  ).sort((a, b) => a.tierRank - b.tierRank);

  // The paid half of the roles reference: read from the subscription panel so
  // it keeps telling the truth when the plans change.
  const tierReference: TierReference[] = planOptions.map((plan) => {
    const tier = tierByPlan.get(plan.planSlug);
    return {
      planSlug: plan.planSlug,
      title: plan.title,
      tierRank: plan.tierRank,
      unlocks: {
        vocabulary: Boolean(tier?.unlocks_vocabulary),
        grammar: Boolean(tier?.unlocks_grammar),
        video: Boolean(tier?.unlocks_video),
        levelExam: Boolean(tier?.unlocks_level_exam),
      },
    };
  });

  return (
    <RolePermissionsProvider overrides={overrides as RolePermissionOverrides}>
      <div className="space-y-8">
        <AdminDashboard
          data={adminData}
          displayName={displayName}
          currentUserId={user.id}
          navItems={visibleAdminNav(permissions)}
          permissions={permissions}
          showFullManagement
        />

        <div className="space-y-6">
          <UserManagementPanel
            users={adminData.users}
            currentUserId={user.id}
            currentUserRole={role}
            currentUserPermissions={permissions}
            subscriptions={subscriptions}
            plans={planOptions}
            languageSlugs={LANGUAGES.map((language) => language.slug)}
          />
          <RolesPermissionsPanel
            canEdit={hasPermission(permissions, "manageAdminPermissions")}
            tiers={tierReference}
          />
        </div>
      </div>
    </RolePermissionsProvider>
  );
}
