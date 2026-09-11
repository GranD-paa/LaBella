"use client";

import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";

import {
  AccountTierCell,
  type AccountTierCellData,
} from "@/components/admin/users/account-tier-cell";
import type { GrantPlanOption } from "@/components/admin/users/grant-subscription-dialog";
import { RoleBadge } from "@/components/admin/users/role-badge";
import { StatusBadge } from "@/components/admin/users/status-badge";
import type { ManagedUser } from "@/components/admin/users/types";
import { UserRowActions } from "@/components/admin/users/user-row-actions";
import { useTranslations } from "@/components/providers/locale-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROLE_DEFINITIONS, ROLE_SLUGS, type RoleSlug } from "@/lib/permissions/roles";
import type { RolePermissions, UserStatus } from "@/lib/permissions/roles";
import type { AdminSubscriptionSummary } from "@/lib/data/repository";

function getInitials(name: string | null, email: string | null) {
  const source = name?.trim() || email?.trim() || "?";
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

export function UserManagementPanel({
  users,
  currentUserId,
  currentUserRole,
  currentUserPermissions,
  subscriptions,
  plans,
  languageSlugs,
}: {
  users: ManagedUser[];
  currentUserId: string;
  currentUserRole: RoleSlug;
  currentUserPermissions: RolePermissions;
  /** Every live subscription, so the tier column costs one pass, not one query per row. */
  subscriptions: AdminSubscriptionSummary[];
  plans: GrantPlanOption[];
  languageSlugs: string[];
}) {
  const { t, formatDate } = useTranslations();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleSlug | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");

  const superAdminCount = useMemo(
    () => users.filter((user) => user.role === "super_admin").length,
    [users]
  );

  // The biggest plan each learner holds, plus the languages it covers. Ranked
  // by the plan's own tier_rank so "what is this customer on at their best" is
  // answered the same way the entitlement code answers it.
  const tierByUser = useMemo(() => {
    const rankOf = (planSlug: string) =>
      plans.find((plan) => plan.planSlug === planSlug)?.tierRank ?? 0;
    const titleOf = (planSlug: string) =>
      plans.find((plan) => plan.planSlug === planSlug)?.title ?? null;

    const map = new Map<string, AccountTierCellData>();
    for (const entry of subscriptions) {
      const current = map.get(entry.userId);
      const languages = current
        ? Array.from(new Set([...current.languages, entry.languageSlug])).sort()
        : [entry.languageSlug];

      const better =
        !current || rankOf(entry.planSlug) > rankOf(current.planSlug);
      const best = better ? entry.planSlug : current!.planSlug;

      map.set(entry.userId, {
        planSlug: best,
        title: titleOf(best),
        languages,
        gift:
          // Any gifted subscription is worth flagging, even when a bought one
          // on another language is the bigger plan.
          current?.gift ??
          (entry.grantedBy
            ? { byName: entry.grantedByName, note: null }
            : null),
      });
    }
    return map;
  }, [subscriptions, plans]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) => {
      if (roleFilter !== "all" && user.role !== roleFilter) return false;
      if (statusFilter !== "all" && user.status !== statusFilter) return false;
      if (!query) return true;
      return (
        (user.fullName ?? "").toLowerCase().includes(query) ||
        (user.email ?? "").toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query)
      );
    });
  }, [users, search, roleFilter, statusFilter]);

  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-accent" />
              {t("admin.users.title")}
            </CardTitle>
            <CardDescription>{t("admin.users.description")}</CardDescription>
          </div>
          <Badge variant="outline" className="font-normal">
            {t("admin.users.totalUsers", { count: users.length })}
          </Badge>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground rtl:left-auto rtl:right-3" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("admin.users.searchPlaceholder")}
              className="ps-9"
            />
          </div>
          <Select
            value={roleFilter}
            onValueChange={(value) => setRoleFilter(value as RoleSlug | "all")}
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder={t("admin.users.filterRole")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("admin.users.allRoles")}</SelectItem>
              {ROLE_SLUGS.map((slug) => (
                <SelectItem key={slug} value={slug}>
                  {t(ROLE_DEFINITIONS[slug].labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as UserStatus | "all")}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder={t("admin.users.filterStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("admin.users.allStatuses")}</SelectItem>
              <SelectItem value="active">{t("admin.users.statusActive")}</SelectItem>
              <SelectItem value="suspended">
                {t("admin.users.statusSuspended")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="rounded-lg border border-dashed py-12 text-center text-muted-foreground">
            {t("admin.users.noUsers")}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed py-12 text-center text-muted-foreground">
            {t("admin.users.noResults")}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.users.columnUser")}</TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t("admin.users.columnEmail")}
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {t("admin.users.columnStatus")}
                  </TableHead>
                  <TableHead>{t("admin.users.columnRole")}</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    {t("admin.users.columnTier")}
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    {t("admin.users.columnJoined")}
                  </TableHead>
                  <TableHead className="text-right">
                    {t("admin.users.columnActions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => {
                  const displayName = user.fullName || t("admin.users.unnamed");
                  const isSelf = user.id === currentUserId;

                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-white/10">
                            <AvatarFallback className="text-xs font-semibold">
                              {getInitials(user.fullName, user.email)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 space-y-0.5">
                            <div className="flex items-center gap-1.5 truncate font-medium">
                              {displayName}
                              {isSelf ? (
                                <Badge variant="secondary" className="text-[10px]">
                                  {t("admin.users.you")}
                                </Badge>
                              ) : null}
                            </div>
                            <p className="truncate text-xs text-muted-foreground md:hidden">
                              {user.email || t("admin.users.noEmail")}
                            </p>
                            <div className="flex items-center gap-1.5 sm:hidden">
                              <StatusBadge status={user.status} />
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden max-w-[220px] truncate text-muted-foreground md:table-cell">
                        {user.email || t("admin.users.noEmail")}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <StatusBadge status={user.status} />
                      </TableCell>
                      <TableCell>
                        <RoleBadge role={user.role} />
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <AccountTierCell tier={tierByUser.get(user.id) ?? null} />
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground md:table-cell">
                        {formatDate(user.createdAt, { dateStyle: "medium" })}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <UserRowActions
                            user={user}
                            currentUserId={currentUserId}
                            currentUserRole={currentUserRole}
                            currentUserPermissions={currentUserPermissions}
                            superAdminCount={superAdminCount}
                            plans={plans}
                            languageSlugs={languageSlugs}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
