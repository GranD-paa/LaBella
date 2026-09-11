"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { updateUserRole } from "@/app/admin/actions/users";
import { ConfirmActionDialog } from "@/components/admin/users/confirm-action-dialog";
import type { ManagedUser } from "@/components/admin/users/types";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import {
  MAX_SUPER_ADMINS,
  ROLE_DEFINITIONS,
  ROLE_SLUGS,
  type RoleSlug,
} from "@/lib/permissions/roles";

export function ChangeRoleDialog({
  open,
  onOpenChange,
  user,
  superAdminCount,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: ManagedUser;
  superAdminCount: number;
}) {
  const { t } = useTranslations();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedRole, setSelectedRole] = useState<RoleSlug>(user.role);
  const [confirmSuperAdmin, setConfirmSuperAdmin] = useState(false);

  const seatsTaken = superAdminCount >= MAX_SUPER_ADMINS;
  const escalatesToSuperAdmin =
    selectedRole === "super_admin" && user.role !== "super_admin";

  function handleOpenChange(next: boolean) {
    if (next) {
      setSelectedRole(user.role);
    }
    onOpenChange(next);
  }

  function handleSubmit() {
    // Handing out the top role is a one-way door for everyone but the holder,
    // so it always goes through its own confirmation.
    if (escalatesToSuperAdmin) {
      setConfirmSuperAdmin(true);
      return;
    }
    handleSave();
  }

  function handleSave() {
    startTransition(async () => {
      const result = await updateUserRole(user.id, selectedRole);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.users.roleUpdated"));
      onOpenChange(false);
      router.refresh();
    });
  }

  const displayName = user.fullName || t("admin.users.unnamed");

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {t("admin.users.changeRoleDialog.title", { name: displayName })}
            </DialogTitle>
            <DialogDescription>
              {t("admin.users.changeRoleDialog.description")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="role-select">
              {t("admin.users.changeRoleDialog.selectLabel")}
            </Label>
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as RoleSlug)}
            >
              <SelectTrigger id="role-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLE_SLUGS.map((slug) => (
                  <SelectItem
                    key={slug}
                    value={slug}
                    disabled={
                      slug === "super_admin" &&
                      seatsTaken &&
                      user.role !== "super_admin"
                    }
                  >
                    {t(ROLE_DEFINITIONS[slug].labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {seatsTaken
                ? t("admin.users.changeRoleDialog.superAdminSeatsFull", {
                    max: MAX_SUPER_ADMINS,
                  })
                : t("admin.users.changeRoleDialog.superAdminSeats", {
                    used: superAdminCount,
                    max: MAX_SUPER_ADMINS,
                  })}
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isPending || (escalatesToSuperAdmin && seatsTaken)}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("common.saving")}
                </>
              ) : (
                t("admin.users.changeRoleDialog.save")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmActionDialog
        open={confirmSuperAdmin}
        onOpenChange={setConfirmSuperAdmin}
        title={t("admin.users.changeRoleDialog.superAdminConfirmTitle")}
        description={t(
          "admin.users.changeRoleDialog.superAdminConfirmDescription",
          { name: displayName, max: MAX_SUPER_ADMINS }
        )}
        confirmLabel={t("admin.users.changeRoleDialog.superAdminConfirmAction")}
        destructive
        successMessage={t("admin.users.roleUpdated")}
        onConfirm={() => updateUserRole(user.id, "super_admin")}
        onSuccess={() => {
          onOpenChange(false);
          router.refresh();
        }}
      />
    </>
  );
}
