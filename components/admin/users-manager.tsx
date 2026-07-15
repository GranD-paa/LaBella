"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Shield, ShieldOff, Users } from "lucide-react";

import { updateUserAdminStatus } from "@/app/admin/actions/users";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminDashboardData } from "@/lib/dashboard-data";

export function UsersManager({
  users,
  currentUserId,
}: {
  users: AdminDashboardData["users"];
  currentUserId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { t, formatDate } = useTranslations();

  function handleRoleChange(userId: string, promote: boolean) {
    startTransition(async () => {
      const result = await updateUserAdminStatus(userId, promote);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(promote ? t("admin.users.promoted") : t("admin.users.demoted"));
      router.refresh();
    });
  }

  return (
    <Card className="brand-surface">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-brand-accent" />
          {t("admin.users.title")}
        </CardTitle>
        <CardDescription>{t("admin.users.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="rounded-lg border border-dashed py-12 text-center text-muted-foreground">
            {t("admin.users.noUsers")}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.users.name")}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t("admin.users.role")}</TableHead>
                  <TableHead className="hidden md:table-cell">{t("admin.users.joined")}</TableHead>
                  <TableHead className="text-right">{t("admin.users.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {user.fullName || t("admin.users.unnamed")}
                        </p>
                        <p className="text-xs text-muted-foreground sm:hidden">
                          {user.isAdmin ? t("common.admin") : t("common.learner")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        className={
                          user.isAdmin
                            ? "border-brand-accent/30 bg-brand-accent/15 text-brand-accent"
                            : undefined
                        }
                        variant={user.isAdmin ? "default" : "secondary"}
                      >
                        {user.isAdmin ? t("common.admin") : t("common.learner")}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {formatDate(user.createdAt, { dateStyle: "medium" })}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        {user.isAdmin ? (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isPending || user.id === currentUserId}
                            onClick={() => handleRoleChange(user.id, false)}
                          >
                            <ShieldOff className="h-4 w-4" />
                            <span className="hidden sm:inline">{t("admin.users.demote")}</span>
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            disabled={isPending}
                            onClick={() => handleRoleChange(user.id, true)}
                          >
                            <Shield className="h-4 w-4" />
                            <span className="hidden sm:inline">{t("admin.users.promote")}</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
