"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Ban,
  Copy,
  Eye,
  Gift,
  Languages,
  MoreHorizontal,
  PenSquare,
  PlayCircle,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import { toast } from "sonner";

import {
  updateUserAdminStatus,
  updateUserStatus,
} from "@/app/admin/actions/users";
import { AssignLanguagesDialog } from "@/components/admin/users/assign-languages-dialog";
import { ChangeRoleDialog } from "@/components/admin/users/change-role-dialog";
import {
  GrantSubscriptionDialog,
  type GrantPlanOption,
} from "@/components/admin/users/grant-subscription-dialog";
import { ConfirmActionDialog } from "@/components/admin/users/confirm-action-dialog";
import { UserProfileDialog } from "@/components/admin/users/user-profile-dialog";
import type { ManagedUser } from "@/components/admin/users/types";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ActionResult } from "@/lib/action-result";
import { hasPermission } from "@/lib/permissions/admin-nav";
import {
  canChangeUserRole,
  canChangeUserStatus,
  isLanguageScopedRole,
  resolveAdminToggleRole,
  type ManagedAccount,
  type RolePermissions,
  type RoleSlug,
} from "@/lib/permissions/roles";

type PendingActionType = "promote" | "demote" | "suspend" | "activate";

export function UserRowActions({
  user,
  currentUserId,
  currentUserRole,
  currentUserPermissions,
  superAdminCount,
  plans,
  languageSlugs,
}: {
  user: ManagedUser;
  currentUserId: string;
  currentUserRole: RoleSlug;
  /** The viewer's own effective permissions, overrides already merged. */
  currentUserPermissions: RolePermissions;
  superAdminCount: number;
  plans: GrantPlanOption[];
  languageSlugs: string[];
}) {
  const { t } = useTranslations();
  const router = useRouter();
  const displayName = user.fullName || t("admin.users.unnamed");

  // The server refuses these anyway; the menu just stops offering what an
  // admin is not allowed to do to a fellow admin.
  const actor: ManagedAccount = { id: currentUserId, role: currentUserRole };
  const target: ManagedAccount = { id: user.id, role: user.role };
  const canEditRole = canChangeUserRole(
    actor,
    target,
    target.role,
    superAdminCount
  ).allowed;
  const canPromote = canChangeUserRole(
    actor,
    target,
    resolveAdminToggleRole(target.role, true),
    superAdminCount
  ).allowed;
  const canDemote = canChangeUserRole(
    actor,
    target,
    "learner",
    superAdminCount
  ).allowed;
  // Two things have to agree before a suspension is offered: the viewer holds
  // the permission at all, and the rules allow it against this particular
  // account. Support staff fail the first; a head admin facing a peer fails
  // the second.
  const maySuspend = hasPermission(currentUserPermissions, "suspendUsers");
  const canSuspend =
    maySuspend && canChangeUserStatus(actor, target, "suspended").allowed;
  const canActivate =
    maySuspend && canChangeUserStatus(actor, target, "active").allowed;

  const mayGrant = hasPermission(currentUserPermissions, "manageBilling");
  const canAssignLanguages = canEditRole && isLanguageScopedRole(target.role);

  const [profileOpen, setProfileOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [grantOpen, setGrantOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingActionType | null>(
    null
  );

  function handleCopyId() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(user.id).then(() => {
      toast.success(t("admin.users.idCopied"));
    });
  }

  function refresh() {
    router.refresh();
  }

  let pendingConfig: {
    title: string;
    description: string;
    confirmLabel: string;
    destructive: boolean;
    successMessage: string;
    onConfirm: () => Promise<ActionResult>;
    withRefresh: boolean;
  } | null = null;

  if (pendingAction === "promote") {
    pendingConfig = {
      title: t("admin.users.promoteConfirmTitle"),
      description: t("admin.users.promoteConfirmDescription", {
        name: displayName,
      }),
      confirmLabel: t("admin.users.promote"),
      destructive: false,
      successMessage: t("admin.users.promoted"),
      onConfirm: () => updateUserAdminStatus(user.id, true),
      withRefresh: true,
    };
  } else if (pendingAction === "demote") {
    pendingConfig = {
      title: t("admin.users.demoteConfirmTitle"),
      description: t("admin.users.demoteConfirmDescription", {
        name: displayName,
      }),
      confirmLabel: t("admin.users.demote"),
      destructive: true,
      successMessage: t("admin.users.demoted"),
      onConfirm: () => updateUserAdminStatus(user.id, false),
      withRefresh: true,
    };
  } else if (pendingAction === "suspend") {
    pendingConfig = {
      title: t("admin.users.suspendConfirmTitle"),
      description: t("admin.users.suspendConfirmDescription", {
        name: displayName,
      }),
      confirmLabel: t("admin.users.suspend"),
      destructive: true,
      successMessage: t("admin.users.statusUpdated"),
      onConfirm: () => updateUserStatus(user.id, "suspended"),
      withRefresh: true,
    };
  } else if (pendingAction === "activate") {
    pendingConfig = {
      title: t("admin.users.activateConfirmTitle"),
      description: t("admin.users.activateConfirmDescription", {
        name: displayName,
      }),
      confirmLabel: t("admin.users.activate"),
      destructive: false,
      successMessage: t("admin.users.statusUpdated"),
      onConfirm: () => updateUserStatus(user.id, "active"),
      withRefresh: true,
    };
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={t("admin.users.columnActions")}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => setProfileOpen(true)}>
            <Eye className="h-4 w-4" />
            {t("admin.users.viewProfile")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyId}>
            <Copy className="h-4 w-4" />
            {t("admin.users.copyId")}
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={!canEditRole}
            onClick={() => setRoleDialogOpen(true)}
          >
            <PenSquare className="h-4 w-4" />
            {t("admin.users.changeRole")}
          </DropdownMenuItem>
          {canAssignLanguages ? (
            <DropdownMenuItem onClick={() => setLanguagesOpen(true)}>
              <Languages className="h-4 w-4" />
              {t("admin.users.assignLanguages")}
            </DropdownMenuItem>
          ) : null}
          {mayGrant && !user.isAdmin ? (
            <DropdownMenuItem
              disabled={plans.length === 0}
              onClick={() => setGrantOpen(true)}
            >
              <Gift className="h-4 w-4" />
              {t("admin.users.grantSubscription")}
            </DropdownMenuItem>
          ) : null}

          <DropdownMenuSeparator />

          {user.isAdmin ? (
            <DropdownMenuItem
              disabled={!canDemote}
              onClick={() => setPendingAction("demote")}
            >
              <ShieldOff className="h-4 w-4" />
              {t("admin.users.demote")}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              disabled={!canPromote}
              onClick={() => setPendingAction("promote")}
            >
              <ShieldCheck className="h-4 w-4" />
              {t("admin.users.promote")}
            </DropdownMenuItem>
          )}

          {user.status === "suspended" ? (
            <DropdownMenuItem
              disabled={!canActivate}
              onClick={() => setPendingAction("activate")}
            >
              <PlayCircle className="h-4 w-4" />
              {t("admin.users.activate")}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              disabled={!canSuspend}
              onClick={() => setPendingAction("suspend")}
            >
              <Ban className="h-4 w-4" />
              {t("admin.users.suspend")}
            </DropdownMenuItem>
          )}

        </DropdownMenuContent>
      </DropdownMenu>

      <UserProfileDialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        user={user}
      />
      <ChangeRoleDialog
        open={roleDialogOpen}
        onOpenChange={setRoleDialogOpen}
        user={user}
        superAdminCount={superAdminCount}
      />
      {canAssignLanguages ? (
        <AssignLanguagesDialog
          open={languagesOpen}
          onOpenChange={setLanguagesOpen}
          user={user}
          languageSlugs={languageSlugs}
        />
      ) : null}
      {mayGrant ? (
        <GrantSubscriptionDialog
          open={grantOpen}
          onOpenChange={setGrantOpen}
          user={user}
          plans={plans}
          languageSlugs={languageSlugs}
        />
      ) : null}
      {pendingConfig ? (
        <ConfirmActionDialog
          open={pendingAction !== null}
          onOpenChange={(open) => !open && setPendingAction(null)}
          title={pendingConfig.title}
          description={pendingConfig.description}
          confirmLabel={pendingConfig.confirmLabel}
          destructive={pendingConfig.destructive}
          successMessage={pendingConfig.successMessage}
          onConfirm={pendingConfig.onConfirm}
          onSuccess={pendingConfig.withRefresh ? refresh : undefined}
        />
      ) : null}
    </>
  );
}
