"use client";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { ROLE_DEFINITIONS, type RoleSlug } from "@/lib/permissions/roles";
import { cn } from "@/lib/utils";

export function RoleBadge({
  role,
  className,
}: {
  role: RoleSlug;
  className?: string;
}) {
  const { t } = useTranslations();
  const definition = ROLE_DEFINITIONS[role];

  return (
    <Badge className={cn(definition.badgeClassName, className)}>
      {t(definition.labelKey)}
    </Badge>
  );
}
