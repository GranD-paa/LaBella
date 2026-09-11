"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Minus, ShieldQuestion, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { updateRolePermissionsAction } from "@/app/admin/actions/roles";
import { useRolePermissionOverrides } from "@/components/admin/users/role-permissions-context";
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
import { ToggleRow } from "@/components/admin/toggle-row";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import {
  EDITABLE_ROLE_SLUGS,
  PERMISSION_KEYS,
  PERMISSION_LABEL_KEYS,
  ROLE_DEFINITIONS,
  ROLE_SLUGS,
  isGrantablePermission,
  resolveRolePermissions,
  type EditableRoleSlug,
  type PermissionKey,
} from "@/lib/permissions/roles";
import type { LocalizedText } from "@/types";

/** One paid tier, as the subscription panel currently defines it. */
export type TierReference = {
  planSlug: string;
  title: LocalizedText;
  tierRank: number;
  unlocks: {
    vocabulary: boolean;
    grammar: boolean;
    video: boolean;
    levelExam: boolean;
  };
};

const TIER_COLUMNS = [
  { key: "vocabulary", labelKey: "admin.users.permissionsPanel.tierVocabulary" },
  { key: "grammar", labelKey: "admin.users.permissionsPanel.tierGrammar" },
  { key: "video", labelKey: "admin.users.permissionsPanel.tierVideo" },
  { key: "levelExam", labelKey: "admin.users.permissionsPanel.tierLevelExam" },
] as const;

function Mark({ on }: { on: boolean }) {
  return on ? (
    <Check className="mx-auto h-4 w-4 text-emerald-400" />
  ) : (
    <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
  );
}

/**
 * The reference for every access level on the platform, in two halves.
 *
 * The top half is the admin roles and what each may do — read from the same
 * definitions the server guards use, plus whatever a head admin has changed
 * about the editable ones, so the table can never claim access the code does
 * not grant.
 *
 * The bottom half is the paid learner tiers. Those are not roles and are not
 * listed in code at all: they are read straight out of the subscription panel,
 * which is the only thing that decides what a paying account can open. Renaming
 * a plan or moving a feature between plans is reflected here with no code
 * change, and a learner on a paid plan keeps the ordinary learner dashboard.
 */
export function RolesPermissionsPanel({
  canEdit = false,
  tiers = [],
}: {
  /** True for the tiers that may rewrite what an editable role can do. */
  canEdit?: boolean;
  tiers?: TierReference[];
}) {
  const { t, locale } = useTranslations();
  const overrides = useRolePermissionOverrides();

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
      <CardContent className="space-y-6">
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-3 text-start font-medium">
                  {t("admin.users.filterRole")}
                </th>
                {PERMISSION_KEYS.map((key) => (
                  <th key={key} className="p-3 text-center font-medium">
                    {t(PERMISSION_LABEL_KEYS[key])}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROLE_SLUGS.map((slug) => {
                const definition = ROLE_DEFINITIONS[slug];
                const permissions = resolveRolePermissions(slug, overrides);

                return (
                  <tr key={slug} className="border-b border-white/5 last:border-0">
                    <td className="p-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 font-medium">
                          {t(definition.labelKey)}
                          {definition.languageScoped ? (
                            <Badge
                              variant="outline"
                              className="border-sky-400/30 text-[10px] font-normal text-sky-300"
                            >
                              {t("admin.users.permissionsPanel.languageScoped")}
                            </Badge>
                          ) : null}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {t(definition.descriptionKey)}
                        </p>
                      </div>
                    </td>
                    {PERMISSION_KEYS.map((key) => (
                      <td key={key} className="p-3 text-center">
                        <Mark on={permissions[key]} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {canEdit ? (
          <div className="space-y-4">
            {EDITABLE_ROLE_SLUGS.map((slug) => (
              <RolePermissionEditor key={slug} roleSlug={slug} />
            ))}
          </div>
        ) : (
          <div className="flex items-start gap-2 rounded-lg border border-dashed border-white/15 p-3 text-xs text-muted-foreground">
            <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-accent" />
            <p>{t("admin.users.permissionsPanel.editorHint")}</p>
          </div>
        )}

        {tiers.length > 0 ? (
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold">
                {t("admin.users.permissionsPanel.tiersTitle")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("admin.users.permissionsPanel.tiersDescription")}
              </p>
            </div>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="p-3 text-start font-medium">
                      {t("admin.users.permissionsPanel.tierColumn")}
                    </th>
                    {TIER_COLUMNS.map((column) => (
                      <th
                        key={column.key}
                        className="p-3 text-center font-medium"
                      >
                        {t(column.labelKey)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-3">
                      <p className="font-medium">
                        {t("admin.users.permissionsPanel.tierFree")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("admin.users.permissionsPanel.tierFreeHint")}
                      </p>
                    </td>
                    {TIER_COLUMNS.map((column) => (
                      <td key={column.key} className="p-3 text-center">
                        <Mark on={false} />
                      </td>
                    ))}
                  </tr>
                  {tiers.map((tier) => (
                    <tr
                      key={tier.planSlug}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="p-3">
                        <p className="font-medium">
                          {t("admin.users.permissionsPanel.tierUser", {
                            plan: tier.title[locale] ?? tier.planSlug,
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("admin.users.permissionsPanel.tierUserHint")}
                        </p>
                      </td>
                      {TIER_COLUMNS.map((column) => (
                        <td key={column.key} className="p-3 text-center">
                          <Mark on={tier.unlocks[column.key]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

/**
 * The head admin's editor for one role.
 *
 * Only grantable permissions get a switch. The rest are shown, locked, with
 * the reason — hiding them would make the table look like the whole story and
 * leave a head admin hunting for a switch that is never coming.
 */
function RolePermissionEditor({ roleSlug }: { roleSlug: EditableRoleSlug }) {
  const { t } = useTranslations();
  const router = useRouter();
  const overrides = useRolePermissionOverrides();
  const [isPending, startTransition] = useTransition();

  const saved = useMemo(
    () => resolveRolePermissions(roleSlug, overrides),
    [roleSlug, overrides]
  );
  const [draft, setDraft] = useState(saved);

  const dirty = PERMISSION_KEYS.some(
    (key) => isGrantablePermission(key) && draft[key] !== saved[key]
  );

  function toggle(key: PermissionKey, next: boolean) {
    setDraft((current) => ({ ...current, [key]: next }));
  }

  function handleSave() {
    startTransition(async () => {
      const payload: Record<string, boolean> = {};
      for (const key of PERMISSION_KEYS) {
        if (isGrantablePermission(key)) payload[key] = draft[key];
      }

      const result = await updateRolePermissionsAction(roleSlug, payload);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.users.permissionsPanel.saved"));
      router.refresh();
    });
  }

  return (
    <div className="space-y-3 rounded-lg border border-white/10 p-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold">
          {t("admin.users.permissionsPanel.editorTitle", {
            role: t(ROLE_DEFINITIONS[roleSlug].labelKey),
          })}
        </p>
        <p className="text-xs text-muted-foreground">
          {t("admin.users.permissionsPanel.editorDescription")}
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {PERMISSION_KEYS.map((key) => {
          const grantable = isGrantablePermission(key);
          return (
            <div key={key} className={grantable ? "" : "opacity-60"}>
              <ToggleRow
                label={t(PERMISSION_LABEL_KEYS[key])}
                hint={
                  grantable
                    ? undefined
                    : t("admin.users.permissionsPanel.lockedPermission")
                }
                checked={grantable ? draft[key] : false}
                disabled={!grantable || isPending}
                onChange={(next) => toggle(key, next)}
              />
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        {t("admin.users.permissionsPanel.lockedHint")}
      </p>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!dirty || isPending}
          onClick={() => setDraft(saved)}
        >
          {t("common.cancel")}
        </Button>
        <Button size="sm" disabled={!dirty || isPending} onClick={handleSave}>
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("common.saving")}
            </>
          ) : (
            t("admin.users.permissionsPanel.save")
          )}
        </Button>
      </div>
    </div>
  );
}
