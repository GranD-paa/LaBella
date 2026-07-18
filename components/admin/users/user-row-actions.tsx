"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Ban,
  Copy,
  Eye,
  KeyRound,
  MoreHorizontal,
  PenSquare,
  PlayCircle,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import { toast } from "sonner";

import {
  sendPasswordResetEmail,
  updateUserAdminStatus,
  updateUserStatus,
} from "@/app/admin/actions/users";
import { ChangeRoleDialog } from "@/components/admin/users/change-role-dialog";
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

type PendingActionType = "promote" | "demote" | "suspend" | "activate" | "resetPassword";

export function UserRowActions({
  user,
  currentUserId,
}: {
  user: ManagedUser;
  currentUserId: string;
}) {
  const { t } = useTranslations();
  const router = useRouter();
  const isSelf = user.id === currentUserId;
  const displayName = user.fullName || t("admin.users.unnamed");

  const [profileOpen, setProfileOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
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
  } else if (pendingAction === "resetPassword") {
    const email = user.email ?? "";
    const isLocalMode = process.env.NEXT_PUBLIC_DATA_SOURCE === "local";
    pendingConfig = {
      title: t("admin.users.resetPasswordConfirmTitle"),
      description: t("admin.users.resetPasswordConfirmDescription", { email }),
      confirmLabel: t("admin.users.resetPassword"),
      destructive: false,
      successMessage: isLocalMode
        ? t("admin.users.resetPasswordSimulated", { email })
        : t("admin.users.resetPasswordSent", { email }),
      onConfirm: () => sendPasswordResetEmail(email),
      withRefresh: false,
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
            disabled={isSelf}
            onClick={() => setRoleDialogOpen(true)}
          >
            <PenSquare className="h-4 w-4" />
            {t("admin.users.changeRole")}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {user.isAdmin ? (
            <DropdownMenuItem
              disabled={isSelf}
              onClick={() => setPendingAction("demote")}
            >
              <ShieldOff className="h-4 w-4" />
              {t("admin.users.demote")}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setPendingAction("promote")}>
              <ShieldCheck className="h-4 w-4" />
              {t("admin.users.promote")}
            </DropdownMenuItem>
          )}

          {user.status === "suspended" ? (
            <DropdownMenuItem onClick={() => setPendingAction("activate")}>
              <PlayCircle className="h-4 w-4" />
              {t("admin.users.activate")}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              disabled={isSelf}
              onClick={() => setPendingAction("suspend")}
            >
              <Ban className="h-4 w-4" />
              {t("admin.users.suspend")}
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={!user.email}
            onClick={() => setPendingAction("resetPassword")}
          >
            <KeyRound className="h-4 w-4" />
            {t("admin.users.resetPassword")}
          </DropdownMenuItem>
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
      />
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
