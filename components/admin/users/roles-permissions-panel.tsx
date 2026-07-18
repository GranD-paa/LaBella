"use client";

import { Check, Minus, ShieldQuestion, Sparkles } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROLE_DEFINITIONS, ROLE_SLUGS } from "@/lib/permissions/roles";

const PERMISSION_ROWS = [
  { key: "manageContent", labelKey: "admin.users.permissionsPanel.permissionContent" },
  { key: "manageQuizzes", labelKey: "admin.users.permissionsPanel.permissionQuizzes" },
  { key: "manageUsers", labelKey: "admin.users.permissionsPanel.permissionUsers" },
  { key: "manageRoles", labelKey: "admin.users.permissionsPanel.permissionRoles" },
  { key: "fullAccess", labelKey: "admin.users.permissionsPanel.permissionFull" },
] as const;

export function RolesPermissionsPanel() {
  const { t } = useTranslations();

  return (
    <Card className="brand-surface">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldQuestion className="h-5 w-5 text-brand-accent" />
          {t("admin.users.permissionsPanel.title")}
        </CardTitle>
        <CardDescription>
          {t("admin.users.permissionsPanel.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-3 text-left font-medium">
                  {t("admin.users.filterRole")}
                </th>
                {PERMISSION_ROWS.map((row) => (
                  <th key={row.key} className="p-3 text-center font-medium">
                    {t(row.labelKey)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROLE_SLUGS.map((slug) => {
                const definition = ROLE_DEFINITIONS[slug];
                return (
                  <tr key={slug} className="border-b border-white/5 last:border-0">
                    <td className="p-3">
                      <div className="space-y-0.5">
                        <p className="font-medium">{t(definition.labelKey)}</p>
                        <p className="text-xs text-muted-foreground">
                          {t(definition.descriptionKey)}
                        </p>
                      </div>
                    </td>
                    {PERMISSION_ROWS.map((row) => (
                      <td key={row.key} className="p-3 text-center">
                        {definition.permissions[row.key] ? (
                          <Check className="mx-auto h-4 w-4 text-emerald-400" />
                        ) : (
                          <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-dashed border-white/15 p-3 text-xs text-muted-foreground">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-accent" />
          <p>{t("admin.users.permissionsPanel.comingSoon")}</p>
        </div>
      </CardContent>
    </Card>
  );
}
