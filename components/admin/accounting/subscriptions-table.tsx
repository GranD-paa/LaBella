"use client";

import { AlertTriangle, CalendarClock, Clock } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { daysUntil } from "@/lib/billing/period";
import { cn } from "@/lib/utils";
import type { SubscriptionWithUser } from "@/types";

/**
 * One table serving the three subscriber views — active, lapsed, and expiring
 * soon. They differ only in which date matters and what the badge says, so
 * splitting them into three components would be three copies of the same
 * markup drifting apart.
 */
export function SubscriptionsTable({
  subscriptions,
  variant,
  emptyMessage,
}: {
  subscriptions: SubscriptionWithUser[];
  variant: "active" | "lapsed" | "expiring";
  emptyMessage: string;
}) {
  const { t, formatDate } = useTranslations();
  const now = new Date();

  if (subscriptions.length === 0) {
    return (
      <p className="rounded-xl border border-white/10 bg-muted/10 p-6 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  const dateLabel =
    variant === "lapsed"
      ? t("admin.accounting.lapsed.endedOn")
      : t("admin.accounting.subscribers.renewsOn");

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("admin.accounting.subscribers.title")}</TableHead>
            <TableHead>{t("admin.accounting.subscribers.plan")}</TableHead>
            <TableHead>{t("admin.accounting.subscribers.language")}</TableHead>
            <TableHead>{dateLabel}</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription) => {
            const remaining = daysUntil(
              new Date(subscription.current_period_end),
              now
            );

            return (
              <TableRow key={subscription.id}>
                <TableCell className="max-w-[200px]">
                  <p className="truncate text-sm font-medium">
                    {subscription.user_name ?? subscription.user_email ?? "—"}
                  </p>
                  {subscription.user_name && subscription.user_email ? (
                    <p className="truncate text-xs text-muted-foreground">
                      {subscription.user_email}
                    </p>
                  ) : null}
                </TableCell>
                <TableCell className="text-sm">{subscription.plan_slug}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {subscription.language_slug}
                </TableCell>
                <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                  {formatDate(
                    variant === "lapsed"
                      ? (subscription.ended_at ?? subscription.current_period_end)
                      : subscription.current_period_end,
                    { dateStyle: "medium" }
                  )}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {variant === "lapsed" ? (
                    <Badge
                      variant="outline"
                      className={cn(
                        "gap-1 text-xs",
                        subscription.status === "past_due"
                          ? // Still recoverable — worth chasing.
                            "border-amber-500/30 bg-amber-500/10 text-amber-300"
                          : "border-white/20 bg-white/5 text-muted-foreground"
                      )}
                    >
                      <AlertTriangle className="h-3 w-3" />
                      {subscription.status === "past_due"
                        ? t("admin.accounting.lapsed.inGrace")
                        : t("admin.accounting.lapsed.gone")}
                    </Badge>
                  ) : variant === "expiring" ? (
                    <Badge
                      variant="outline"
                      className="gap-1 border-amber-500/30 bg-amber-500/10 text-xs text-amber-300"
                    >
                      <CalendarClock className="h-3 w-3" />
                      {remaining <= 0
                        ? t("admin.accounting.expiring.today")
                        : remaining === 1
                          ? t("admin.accounting.expiring.tomorrow")
                          : t("admin.accounting.expiring.daysLeft", {
                              count: remaining,
                            })}
                    </Badge>
                  ) : subscription.cancel_at_period_end ? (
                    <Badge
                      variant="outline"
                      className="gap-1 border-rose-500/30 bg-rose-500/10 text-xs text-rose-300"
                    >
                      <Clock className="h-3 w-3" />
                      {t("admin.accounting.subscribers.cancelling")}
                    </Badge>
                  ) : null}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
