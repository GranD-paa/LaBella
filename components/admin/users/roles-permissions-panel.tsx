"use client";

import { Fragment, useMemo, useState, useTransition } from "react";
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
  PERMISSION_GROUPS,
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

/**
 * A granted / not-granted cell.
 *
 * The icon carries a label rather than only a colour, so the table still says
 * which way round it is to a screen reader — and to anyone who cannot tell the
 * green tick from the grey dash.
 */
function Mark({ on, label }: { on: boolean; label: string }) {
  const { t } = useTranslations();
  const state = t(
    on
      ? "admin.users.permissionsPanel.granted"
      : "admin.users.permissionsPanel.notGranted"
  );

  return (
    <>
      <span className="sr-only">{`${label}: ${state}`}</span>
      {on ? (
        <Check aria-hidden className="mx-auto h-4 w-4 text-emerald-400" />
      ) : (
        <Minus aria-hidden className="mx-auto h-4 w-4 text-muted-foreground/30" />
      )}
    </>
  );
}

/**
 * The reference for every access level on the platform, in three parts.
 *
 * First the roles themselves, as cards — a role's description is the part
 * somebody actually reads, and squeezing six of them into the first column of
 * a fifteen-column table left every one of them three words wide.
 *
 * Then the matrix, with permissions down the side and roles across the top.
 * That way round because six short role names fit across a screen and fourteen
 * Persian permission names do not; the permissions get a column wide enough to
 * read, and the grid stays honest by reading the same definitions the server
 * guards use, with any head-admin override already merged in.
 *
 * Last the paid learner tiers, which are not roles and are not listed in code
 * at all: they come from the subscription panel, the only thing that decides
 * what a paying account can open.
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

  const permissionsByRole = useMemo(
    () =>
      Object.fromEntries(
        ROLE_SLUGS.map((slug) => [slug, resolveRolePermissions(slug, overrides)])
      ) as Record<(typeof ROLE_SLUGS)[number], Record<PermissionKey, boolean>>,
    [overrides]
  );

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

      <CardContent className="space-y-8">
        {/* ------------------------------------------------- the roles */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {ROLE_SLUGS.map((slug) => {
            const definition = ROLE_DEFINITIONS[slug];
            return (
              <div
                key={slug}
                className="space-y-1.5 rounded-lg border border-white/10 bg-white/[0.02] p-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className={definition.badgeClassName}>
                    {t(definition.labelKey)}
                  </Badge>
                  {definition.languageScoped ? (
                    <Badge
                      variant="outline"
                      className="border-sky-400/30 text-[10px] font-normal text-sky-300"
                    >
                      {t("admin.users.permissionsPanel.languageScoped")}
                    </Badge>
                  ) : null}
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {t(definition.descriptionKey)}
                </p>
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------ the matrix */}
        <div className="space-y-2">
          <p className="text-sm font-semibold">
            {t("admin.users.permissionsPanel.matrixTitle")}
          </p>
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full min-w-[620px] text-sm">
              <caption className="sr-only">
                {t("admin.users.permissionsPanel.matrixTitle")}
              </caption>
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th
                    scope="col"
                    className="p-3 text-start font-medium ps-4 w-[34%]"
                  >
                    {t("admin.users.permissionsPanel.permissionColumn")}
                  </th>
                  {ROLE_SLUGS.map((slug) => (
                    <th
                      key={slug}
                      scope="col"
                      className="p-3 text-center align-bottom text-xs font-medium leading-tight"
                    >
                      {t(ROLE_DEFINITIONS[slug].labelKey)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERMISSION_GROUPS.map((group) => (
                  <Fragment key={group.key}>
                    <tr className="border-b border-white/10 bg-white/[0.03]">
                      <th
                        scope="colgroup"
                        colSpan={ROLE_SLUGS.length + 1}
                        className="px-4 py-1.5 text-start text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                      >
                        {t(group.labelKey)}
                      </th>
                    </tr>
                    {group.permissions.map((key) => (
                      <tr
                        key={key}
                        className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                      >
                        <th
                          scope="row"
                          className="py-2.5 ps-4 pe-3 text-start font-normal"
                        >
                          {t(PERMISSION_LABEL_KEYS[key])}
                        </th>
                        {ROLE_SLUGS.map((slug) => (
                          <td key={slug} className="px-3 py-2.5 text-center">
                            <Mark
                              on={permissionsByRole[slug][key]}
                              label={`${t(ROLE_DEFINITIONS[slug].labelKey)} — ${t(
                                PERMISSION_LABEL_KEYS[key]
                              )}`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ------------------------------------------------ the editor */}
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

        {/* ------------------------------------------- the paid tiers */}
        {tiers.length > 0 ? (
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-sm font-semibold">
                {t("admin.users.permissionsPanel.tiersTitle")}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {t("admin.users.permissionsPanel.tiersDescription")}
              </p>
            </div>
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th scope="col" className="p-3 ps-4 text-start font-medium">
                      {t("admin.users.permissionsPanel.tierColumn")}
                    </th>
                    {TIER_COLUMNS.map((column) => (
                      <th
                        key={column.key}
                        scope="col"
                        className="p-3 text-center font-medium"
                      >
                        {t(column.labelKey)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <th scope="row" className="py-2.5 ps-4 pe-3 text-start">
                      <span className="font-medium">
                        {t("admin.users.permissionsPanel.tierFree")}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {t("admin.users.permissionsPanel.tierFreeHint")}
                      </span>
                    </th>
                    {TIER_COLUMNS.map((column) => (
                      <td key={column.key} className="px-3 py-2.5 text-center">
                        <Mark
                          on={false}
                          label={`${t(
                            "admin.users.permissionsPanel.tierFree"
                          )} — ${t(column.labelKey)}`}
                        />
                      </td>
                    ))}
                  </tr>
                  {tiers.map((tier) => {
                    const planName = tier.title[locale] ?? tier.planSlug;
                    return (
                      <tr
                        key={tier.planSlug}
                        className="border-b border-white/5 last:border-0"
                      >
                        <th scope="row" className="py-2.5 ps-4 pe-3 text-start">
                          <span className="font-medium">
                            {t("admin.users.permissionsPanel.tierUser", {
                              plan: planName,
                            })}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {t("admin.users.permissionsPanel.tierUserHint")}
                          </span>
                        </th>
                        {TIER_COLUMNS.map((column) => (
                          <td
                            key={column.key}
                            className="px-3 py-2.5 text-center"
                          >
                            <Mark
                              on={tier.unlocks[column.key]}
                              label={`${planName} — ${t(column.labelKey)}`}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
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
 * Only grantable permissions get a switch; the locked ones are named in the
 * note underneath rather than rendered as toggles that can never move. A row
 * that is permanently disabled reads as a bug, and there are six of them.
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
    <div className="space-y-4 rounded-lg border border-white/10 p-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold">
          {t("admin.users.permissionsPanel.editorTitle", {
            role: t(ROLE_DEFINITIONS[roleSlug].labelKey),
          })}
        </p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {t("admin.users.permissionsPanel.editorDescription")}
        </p>
      </div>

      {PERMISSION_GROUPS.map((group) => {
        const grantable = group.permissions.filter(isGrantablePermission);
        if (grantable.length === 0) return null;

        return (
          <div key={group.key} className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {t(group.labelKey)}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {grantable.map((key) => (
                <ToggleRow
                  key={key}
                  label={t(PERMISSION_LABEL_KEYS[key])}
                  checked={draft[key]}
                  disabled={isPending}
                  onChange={(next) => toggle(key, next)}
                />
              ))}
            </div>
          </div>
        );
      })}

      <p className="rounded-lg border border-dashed border-white/15 p-3 text-xs leading-relaxed text-muted-foreground">
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
