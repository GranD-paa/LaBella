"use client";

import { useState } from "react";

import { useTranslations } from "@/components/providers/locale-provider";
import { formatEurCents, formatMonthLabel } from "@/lib/billing/format";
import type { RevenueBucket } from "@/types";

/**
 * Net revenue per month.
 *
 * A single-series bar chart: the data's job is magnitude across discrete
 * periods, so bars rather than a line, and one series means no legend — the
 * title names what is being measured. Gross and refunds live in the tooltip
 * instead of becoming a second scale; two y-axes on one chart is the fastest
 * way to make a revenue figure unreadable.
 *
 * The fill is a darker step than the brand's `#FBBF24`, which sits too light
 * against the dark surface to hold a shape.
 */
const BAR_FILL = "#B58419";
const BAR_FILL_HOVER = "#D69A1C";
/** Months where refunds outweighed sales. */
const NEGATIVE_FILL = "#9F1239";

/** Bars need a floor so an empty month is still a visible, hoverable target. */
const MIN_BAR_PX = 2;

export function RevenueChart({ buckets }: { buckets: RevenueBucket[] }) {
  const { t, locale } = useTranslations();
  const [active, setActive] = useState<number | null>(null);

  const maxNet = Math.max(...buckets.map((bucket) => bucket.netEurCents), 0);
  const hasRevenue = buckets.some((bucket) => bucket.netEurCents !== 0);

  if (!hasRevenue) {
    return (
      <div className="flex h-56 items-center justify-center rounded-xl border border-white/10 bg-muted/10 text-sm text-muted-foreground">
        {t("admin.accounting.chart.empty")}
      </div>
    );
  }

  // A month can go negative when refunds outweigh sales, so the baseline is
  // not always the bottom of the plot.
  const minNet = Math.min(...buckets.map((bucket) => bucket.netEurCents), 0);
  const range = maxNet - minNet || 1;
  const zeroRatio = (0 - minNet) / range;

  return (
    <div className="space-y-3">
      <div className="relative">
        {/* Recessive gridlines: present enough to read a value against, quiet
            enough that the bars stay the subject. */}
        <div className="absolute inset-0 flex flex-col justify-between" aria-hidden="true">
          {[0, 1, 2, 3].map((line) => (
            <div key={line} className="border-t border-white/5" />
          ))}
        </div>

        <div className="relative flex h-56 items-end gap-1 sm:gap-2">
          {buckets.map((bucket, index) => {
            const heightRatio = Math.abs(bucket.netEurCents) / range;
            const isNegative = bucket.netEurCents < 0;
            const isActive = active === index;

            return (
              <div
                key={bucket.month}
                className="group relative flex h-full flex-1 flex-col justify-end"
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                role="img"
                aria-label={`${formatMonthLabel(bucket.month, locale)}: ${formatEurCents(
                  bucket.netEurCents,
                  locale
                )}`}
              >
                {isActive ? (
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max -translate-x-1/2 rounded-lg border border-white/15 bg-brand-dark/95 p-2.5 text-xs shadow-brand-lg backdrop-blur">
                    <p className="mb-1 font-semibold">
                      {formatMonthLabel(bucket.month, locale)}
                    </p>
                    <dl className="space-y-0.5 text-muted-foreground">
                      <div className="flex justify-between gap-4">
                        <dt>{t("admin.accounting.chart.tooltipGross")}</dt>
                        <dd className="font-medium text-foreground">
                          {formatEurCents(bucket.grossEurCents, locale)}
                        </dd>
                      </div>
                      {bucket.refundedEurCents > 0 ? (
                        <div className="flex justify-between gap-4">
                          <dt>{t("admin.accounting.chart.tooltipRefunds")}</dt>
                          <dd className="font-medium text-rose-400">
                            −{formatEurCents(bucket.refundedEurCents, locale)}
                          </dd>
                        </div>
                      ) : null}
                      <div className="flex justify-between gap-4 border-t border-white/10 pt-0.5">
                        <dt>{t("admin.accounting.chart.tooltipNet")}</dt>
                        <dd className="font-semibold text-foreground">
                          {formatEurCents(bucket.netEurCents, locale)}
                        </dd>
                      </div>
                      <div className="pt-0.5 text-[11px]">
                        {t("admin.accounting.chart.tooltipCount", {
                          count: bucket.paymentCount,
                        })}
                      </div>
                    </dl>
                  </div>
                ) : null}

                <div
                  className="w-full rounded-t transition-colors"
                  style={{
                    height: `max(${MIN_BAR_PX}px, ${
                      heightRatio *
                      (isNegative ? zeroRatio : 1 - zeroRatio) *
                      100
                    }%)`,
                    // A refund-heavy month reads as a loss, so it gets the
                    // status colour rather than a shorter amber bar.
                    backgroundColor: isNegative
                      ? NEGATIVE_FILL
                      : isActive
                        ? BAR_FILL_HOVER
                        : BAR_FILL,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-1 sm:gap-2">
        {buckets.map((bucket, index) => (
          <div
            key={bucket.month}
            className={`flex-1 text-center text-[10px] transition-colors sm:text-xs ${
              active === index ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {formatMonthLabel(bucket.month, locale)}
          </div>
        ))}
      </div>
    </div>
  );
}
