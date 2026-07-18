"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { updateUserRole } from "@/app/admin/actions/users";
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
import { ROLE_DEFINITIONS, ROLE_SLUGS, type RoleSlug } from "@/lib/permissions/roles";

export function ChangeRoleDialog({
  open,
  onOpenChange,
  user,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: ManagedUser;
}) {
  const { t } = useTranslations();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedRole, setSelectedRole] = useState<RoleSlug>(user.role);

  function handleOpenChange(next: boolean) {
    if (next) {
      setSelectedRole(user.role);
    }
    onOpenChange(next);
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
                <SelectItem key={slug} value={slug}>
                  {t(ROLE_DEFINITIONS[slug].labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSave} disabled={isPending}>
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
  );
}
