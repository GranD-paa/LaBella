"use client";

import { Check, Minus } from "lucide-react";

import { RoleBadge } from "@/components/admin/users/role-badge";
import { StatusBadge } from "@/components/admin/users/status-badge";
import { useTranslations } from "@/components/providers/locale-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ROLE_DEFINITIONS } from "@/lib/permissions/roles";
import { UserQuizAttemptsPanel } from "@/components/admin/users/user-quiz-attempts-panel";
import type { ManagedUser } from "@/components/admin/users/types";

const PERMISSION_ROWS = [
  { key: "manageContent", labelKey: "admin.users.profileDialog.permissionContent" },
  { key: "manageQuizzes", labelKey: "admin.users.profileDialog.permissionQuizzes" },
  { key: "manageUsers", labelKey: "admin.users.profileDialog.permissionUsers" },
  { key: "manageRoles", labelKey: "admin.users.profileDialog.permissionRoles" },
  { key: "fullAccess", labelKey: "admin.users.profileDialog.permissionFull" },
] as const;

export function UserProfileDialog({
  open,
  onOpenChange,
  user,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: ManagedUser;
}) {
  const { t, formatDate } = useTranslations();
  const definition = ROLE_DEFINITIONS[user.role];
  const displayName = user.fullName || t("admin.users.unnamed");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("admin.users.profileDialog.title")}</DialogTitle>
          <DialogDescription>{displayName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2 rounded-lg border border-white/10 p-3 text-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("admin.users.profileDialog.accountInfo")}
            </p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
              <dt className="text-muted-foreground">
                {t("admin.users.profileDialog.fullName")}
              </dt>
              <dd className="font-medium">{displayName}</dd>

              <dt className="text-muted-foreground">
                {t("admin.users.profileDialog.email")}
              </dt>
              <dd className="break-all font-medium">
                {user.email || t("admin.users.noEmail")}
              </dd>

              <dt className="text-muted-foreground">
                {t("admin.users.profileDialog.role")}
              </dt>
              <dd>
                <RoleBadge role={user.role} />
              </dd>

              <dt className="text-muted-foreground">
                {t("admin.users.profileDialog.status")}
              </dt>
              <dd>
                <StatusBadge status={user.status} />
              </dd>

              <dt className="text-muted-foreground">
                {t("admin.users.profileDialog.joined")}
              </dt>
              <dd className="font-medium">
                {formatDate(user.createdAt, { dateStyle: "medium" })}
              </dd>

              <dt className="text-muted-foreground">
                {t("admin.users.profileDialog.userId")}
              </dt>
              <dd className="break-all font-mono text-xs text-muted-foreground">
                {user.id}
              </dd>
            </dl>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("admin.users.profileDialog.permissions")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t(definition.descriptionKey)}
            </p>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {PERMISSION_ROWS.map((row) => {
                const granted = definition.permissions[row.key];
                return (
                  <li
                    key={row.key}
                    className="flex items-center gap-2 rounded-md border border-white/10 px-2 py-1.5"
                  >
                    {granted ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    ) : (
                      <Minus className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                    )}
                    <span className={granted ? "" : "text-muted-foreground"}>
                      {t(row.labelKey)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t("admin.users.profileDialog.quizAttempts")}
            </p>
            <UserQuizAttemptsPanel userId={user.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
