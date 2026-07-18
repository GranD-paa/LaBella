"use client";

import { CheckCircle2, CircleSlash } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import type { UserStatus } from "@/lib/permissions/roles";
import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  className,
}: {
  status: UserStatus;
  className?: string;
}) {
  const { t } = useTranslations();
  const isActive = status === "active";

  return (
    <Badge
      variant="outline"
      className={cn(
        isActive
          ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
          : "border-destructive/30 bg-destructive/10 text-destructive",
        className
      )}
    >
      {isActive ? (
        <CheckCircle2 className="me-1 h-3 w-3" />
      ) : (
        <CircleSlash className="me-1 h-3 w-3" />
      )}
      {isActive ? t("admin.users.statusActive") : t("admin.users.statusSuspended")}
    </Badge>
  );
}
