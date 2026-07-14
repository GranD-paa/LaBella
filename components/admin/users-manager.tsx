"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Shield, ShieldOff, Users } from "lucide-react";

import { updateUserAdminStatus } from "@/app/admin/actions/users";
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

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(dateString)
  );
}

export function UsersManager({
  users,
  currentUserId,
}: {
  users: AdminDashboardData["users"];
  currentUserId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRoleChange(userId: string, promote: boolean) {
    startTransition(async () => {
      const result = await updateUserAdminStatus(userId, promote);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success(promote ? "User promoted to admin" : "Admin access removed");
      router.refresh();
    });
  }

  return (
    <Card className="brand-surface">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-brand-accent" />
          User Management
        </CardTitle>
        <CardDescription>
          View registered users and manage admin permissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="rounded-lg border border-dashed py-12 text-center text-muted-foreground">
            No users registered yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Role</TableHead>
                  <TableHead className="hidden md:table-cell">Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {user.fullName || "Unnamed user"}
                        </p>
                        <p className="text-xs text-muted-foreground sm:hidden">
                          {user.isAdmin ? "Admin" : "Learner"}
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
                        {user.isAdmin ? "Admin" : "Learner"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {formatDate(user.createdAt)}
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
                            <span className="hidden sm:inline">Demote</span>
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            disabled={isPending}
                            onClick={() => handleRoleChange(user.id, true)}
                          >
                            <Shield className="h-4 w-4" />
                            <span className="hidden sm:inline">Promote</span>
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
