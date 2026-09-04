"use client";

import Link from "next/link";
import { ArrowLeft, Receipt } from "lucide-react";

import { AccountingKpis } from "@/components/admin/accounting/accounting-kpis";
import { BillingSettingsForm } from "@/components/admin/accounting/billing-settings-form";
import { PaymentsLedger } from "@/components/admin/accounting/payments-ledger";
import { RevenueChart } from "@/components/admin/accounting/revenue-chart";
import { SubscriptionsTable } from "@/components/admin/accounting/subscriptions-table";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatEurCents } from "@/lib/billing/format";
import type { AccountingSnapshot, RevenueSlice } from "@/types";

function BreakdownList({ slices }: { slices: RevenueSlice[] }) {
  const { t, locale } = useTranslations();

  if (slices.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("admin.accounting.breakdown.empty")}
      </p>
    );
  }

  const total = slices.reduce((sum, slice) => sum + slice.netEurCents, 0) || 1;

  return (
    <ul className="space-y-3">
      {slices.map((slice) => {
        const share = (slice.netEurCents / total) * 100;
        return (
          <li key={slice.key} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-2 text-sm">
              <span className="font-medium capitalize">{slice.key}</span>
              <span className="text-muted-foreground">
                {formatEurCents(slice.netEurCents, locale)}
              </span>
            </div>
            {/* A proportion bar rather than a pie: comparing lengths against a
                shared baseline is far easier than comparing angles. */}
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full"
                style={{ width: `${share}%`, backgroundColor: "#B58419" }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function AdminAccountingPageView({
  displayName,
  snapshot,
}: {
  displayName: string;
  snapshot: AccountingSnapshot;
}) {
  const { t } = useTranslations();

  return (
    <div className="space-y-8">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/15">
              <Receipt className="me-1 h-3 w-3" />
              {t("admin.accounting.pageBadge")}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("admin.accounting.pageHello", { name: displayName })}
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              {t("admin.accounting.pageSubtitle")}
            </p>
          </div>
          <Button variant="outline" className="border-white/20" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {t("admin.accounting.backToDashboard")}
            </Link>
          </Button>
        </div>
      </section>

      <AccountingKpis snapshot={snapshot} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="brand-surface lg:col-span-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base">
              {t("admin.accounting.chart.title")}
            </CardTitle>
            <CardDescription>
              {t("admin.accounting.chart.subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart buckets={snapshot.revenueByMonth} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="brand-surface">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                {t("admin.accounting.breakdown.byLanguage")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BreakdownList slices={snapshot.revenueByLanguage} />
            </CardContent>
          </Card>
          <Card className="brand-surface">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                {t("admin.accounting.breakdown.byPlan")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BreakdownList slices={snapshot.revenueByPlan} />
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="ledger" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="ledger">
            {t("admin.accounting.tabs.ledger")}
          </TabsTrigger>
          <TabsTrigger value="lapsed">
            {t("admin.accounting.tabs.lapsed")}
            {snapshot.lapsed.length > 0 ? (
              <span className="ms-1.5 rounded-full bg-rose-500/20 px-1.5 text-xs text-rose-300">
                {snapshot.lapsed.length}
              </span>
            ) : null}
          </TabsTrigger>
          <TabsTrigger value="expiring">
            {t("admin.accounting.tabs.expiring")}
            {snapshot.expiringSoon.length > 0 ? (
              <span className="ms-1.5 rounded-full bg-amber-500/20 px-1.5 text-xs text-amber-300">
                {snapshot.expiringSoon.length}
              </span>
            ) : null}
          </TabsTrigger>
          <TabsTrigger value="settings">
            {t("admin.accounting.tabs.settings")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ledger" className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">
              {t("admin.accounting.ledger.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("admin.accounting.ledger.description")}
            </p>
          </div>
          <PaymentsLedger payments={snapshot.recentPayments} />
        </TabsContent>

        <TabsContent value="lapsed" className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">
              {t("admin.accounting.lapsed.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("admin.accounting.lapsed.description")}
            </p>
          </div>
          <SubscriptionsTable
            subscriptions={snapshot.lapsed}
            variant="lapsed"
            emptyMessage={t("admin.accounting.lapsed.empty")}
          />
        </TabsContent>

        <TabsContent value="expiring" className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">
              {t("admin.accounting.expiring.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("admin.accounting.expiring.description")}
            </p>
          </div>
          <SubscriptionsTable
            subscriptions={snapshot.expiringSoon}
            variant="expiring"
            emptyMessage={t("admin.accounting.expiring.empty")}
          />
        </TabsContent>

        <TabsContent value="settings">
          <BillingSettingsForm
            settings={snapshot.settings}
            fxRate={snapshot.fxRate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
