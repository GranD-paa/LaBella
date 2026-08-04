"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BadgePercent,
  Repeat,
  TrendingDown,
  Users,
  Wallet,
} from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Card, CardContent } from "@/components/ui/card";
import { formatEurCents } from "@/lib/billing/format";
import { cn } from "@/lib/utils";
import type { AccountingSnapshot } from "@/types";

function Tile({
  icon: Icon,
  label,
  value,
  hint,
  hintTone = "muted",
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  hint?: string;
  hintTone?: "muted" | "up" | "down";
}) {
  return (
    <Card className="brand-surface">
      <CardContent className="space-y-2 p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Icon className="h-4 w-4 text-brand-accent" />
          {label}
        </div>
        {/* The number is the point of the tile, so it gets the size. */}
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        {hint ? (
          <p
            className={cn(
              "flex items-center gap-1 text-xs",
              hintTone === "up" && "text-emerald-400",
              hintTone === "down" && "text-rose-400",
              hintTone === "muted" && "text-muted-foreground"
            )}
          >
            {hintTone === "up" ? <ArrowUpRight className="h-3 w-3" /> : null}
            {hintTone === "down" ? <ArrowDownRight className="h-3 w-3" /> : null}
            {hint}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function AccountingKpis({ snapshot }: { snapshot: AccountingSnapshot }) {
  const { t, locale } = useTranslations();

  const { thisMonth, lastMonth } = snapshot;
  const hasComparison = lastMonth.netEurCents > 0;
  const changePercent = hasComparison
    ? ((thisMonth.netEurCents - lastMonth.netEurCents) / lastMonth.netEurCents) * 100
    : 0;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <Tile
        icon={Wallet}
        label={t("admin.accounting.kpi.netRevenue")}
        value={formatEurCents(snapshot.totals.netEurCents, locale)}
        hint={t("admin.accounting.kpi.payments", {
          count: snapshot.totals.paymentCount,
        })}
      />
      <Tile
        icon={TrendingDown}
        label={t("admin.accounting.kpi.thisMonth")}
        value={formatEurCents(thisMonth.netEurCents, locale)}
        hint={
          hasComparison
            ? t("admin.accounting.kpi.vsLastMonth", {
                percent: Math.abs(changePercent).toFixed(0),
              })
            : t("admin.accounting.kpi.noComparison")
        }
        hintTone={
          !hasComparison ? "muted" : changePercent >= 0 ? "up" : "down"
        }
      />
      <Tile
        icon={Repeat}
        label={t("admin.accounting.kpi.mrr")}
        value={formatEurCents(snapshot.mrrEurCents, locale)}
        hint={t("admin.accounting.kpi.mrrHint")}
      />
      <Tile
        icon={BadgePercent}
        label={t("admin.accounting.kpi.arpu")}
        value={formatEurCents(snapshot.arpuEurCents, locale)}
        hint={t("admin.accounting.kpi.arpuHint")}
      />
      <Tile
        icon={Users}
        label={t("admin.accounting.kpi.activeSubscribers")}
        value={String(snapshot.counts.activeSubscribers)}
        hint={t("admin.accounting.kpi.subscriptionsCount", {
          count: snapshot.counts.activeSubscriptions,
        })}
      />
      <Tile
        icon={TrendingDown}
        label={t("admin.accounting.kpi.churnRate")}
        value={`${snapshot.churnRatePercent.toFixed(1)}%`}
        hint={t("admin.accounting.kpi.churnHint", {
          count: snapshot.lapsed.length,
        })}
        hintTone={snapshot.churnRatePercent > 0 ? "down" : "muted"}
      />
    </div>
  );
}
