"use client";

import { Download } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatEurCents, formatNumber, formatPaidAmount } from "@/lib/billing/format";
import { cn } from "@/lib/utils";
import type { PaymentStatus, PaymentWithUser } from "@/types";

const STATUS_STYLES: Record<PaymentStatus, string> = {
  succeeded: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  pending: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  failed: "border-rose-500/30 bg-rose-500/10 text-rose-300",
  refunded: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  canceled: "border-white/20 bg-white/5 text-muted-foreground",
};

/**
 * Builds a CSV of the visible ledger.
 *
 * Both the euro value and the amount actually paid are exported: an
 * accountant reconciling a Rial bank statement needs the Rial figure, and the
 * euro column is what the revenue totals are built from.
 */
function toCsv(payments: PaymentWithUser[]): string {
  const header = [
    "date",
    "learner",
    "email",
    "plan",
    "language",
    "list_price_eur",
    "discount_percent",
    "amount_eur",
    "paid_currency",
    "paid_amount",
    "fx_rate",
    "fx_source",
    "provider",
    "status",
    "reference",
  ];

  const escape = (value: unknown) => {
    const text = value === null || value === undefined ? "" : String(value);
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  const rows = payments.map((payment) =>
    [
      payment.paid_at ?? payment.created_at,
      payment.user_name,
      payment.user_email,
      payment.plan_slug,
      payment.language_slug,
      (payment.list_price_eur_cents / 100).toFixed(2),
      payment.discount_percent,
      (payment.amount_eur_cents / 100).toFixed(2),
      payment.paid_currency,
      payment.paid_currency === "EUR"
        ? (payment.paid_amount / 100).toFixed(2)
        : payment.paid_amount,
      payment.fx_rate ?? "",
      payment.fx_source ?? "",
      payment.provider,
      payment.status,
      payment.provider_ref ?? "",
    ].map(escape)
  );

  return [header.join(","), ...rows.map((row) => row.join(","))].join("\n");
}

export function PaymentsLedger({ payments }: { payments: PaymentWithUser[] }) {
  const { t, locale, formatDate } = useTranslations();

  function handleExport() {
    // A BOM so Excel opens the Persian columns as UTF-8 rather than mojibake.
    const blob = new Blob(["﻿", toCsv(payments)], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `laparli-payments-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (payments.length === 0) {
    return (
      <p className="rounded-xl border border-white/10 bg-muted/10 p-6 text-center text-sm text-muted-foreground">
        {t("admin.accounting.ledger.empty")}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="border-white/20"
          onClick={handleExport}
        >
          <Download className="h-4 w-4" />
          {t("admin.accounting.ledger.exportCsv")}
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("admin.accounting.ledger.date")}</TableHead>
              <TableHead>{t("admin.accounting.ledger.user")}</TableHead>
              <TableHead>{t("admin.accounting.ledger.plan")}</TableHead>
              <TableHead>{t("admin.accounting.ledger.amount")}</TableHead>
              <TableHead>{t("admin.accounting.ledger.method")}</TableHead>
              <TableHead>{t("admin.accounting.ledger.status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                  {formatDate(payment.paid_at ?? payment.created_at, {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </TableCell>
                <TableCell className="max-w-[180px]">
                  <p className="truncate text-sm font-medium">
                    {payment.user_name ?? payment.user_email ?? "—"}
                  </p>
                  {payment.user_name && payment.user_email ? (
                    <p className="truncate text-xs text-muted-foreground">
                      {payment.user_email}
                    </p>
                  ) : null}
                </TableCell>
                <TableCell className="text-sm">
                  <span className="font-medium">
                    {payment.plan_title ?? payment.plan_slug}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {payment.language_slug}
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <span className="text-sm font-semibold">
                    {formatPaidAmount(payment, locale)}
                  </span>
                  {payment.paid_currency === "IRR" && payment.fx_rate ? (
                    // The euro value and the rate it was priced at, so a Rial
                    // line can be reconciled long after the rate has moved.
                    <span className="block text-xs text-muted-foreground">
                      {formatEurCents(payment.amount_eur_cents, locale)} @{" "}
                      {formatNumber(payment.fx_rate, locale)}
                    </span>
                  ) : null}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {t(`admin.accounting.provider.${payment.provider}`)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("text-xs", STATUS_STYLES[payment.status])}
                  >
                    {t(`admin.accounting.status.${payment.status}`)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
