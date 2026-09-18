"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatToman } from "@/lib/ai/pricing";
import {
  CHECK_DEFINITIONS,
  goodness,
  type CheckName,
} from "@/lib/blog/agent/gate-settings";
import type { AdminRun } from "@/lib/blog/agent/store";

import { ErrorText, formatTehranDateTime } from "./shared";

/** What each judgment asked, in the owner's words. */
function gateLabel(name: string) {
  return name in CHECK_DEFINITIONS
    ? CHECK_DEFINITIONS[name as CheckName].label
    : name;
}

const GATE_OUTCOME: Record<string, { label: string; className: string }> = {
  pass: {
    label: "بازبینی: قبول",
    className: "border-brand-accent/30 bg-brand-accent/10 text-brand-accent",
  },
  hold: {
    label: "بازبینی: نگه داشته شد",
    className: "border-amber-400/30 bg-amber-500/10 text-amber-300",
  },
  unavailable: {
    label: "بازبینی: در دسترس نبود",
    className: "border-red-400/30 bg-red-500/10 text-red-300",
  },
  skipped: {
    label: "بازبینی: انجام نشد",
    className: "border-white/15 bg-white/5 text-muted-foreground",
  },
};

/**
 * Out of a hundred, higher is better — the same scale the reviewer's own tab
 * uses. A name this build does not know is left raw rather than rescaled by a
 * rule that may not apply to it.
 */
function formatScore(name: string, value: number) {
  const text =
    name in CHECK_DEFINITIONS
      ? String(goodness(name as CheckName, value))
      : value.toFixed(2);
  return text.replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}

const RUN_STATUS: Record<AdminRun["status"], { label: string; className: string }> = {
  done: {
    label: "موفق",
    className: "border-brand-accent/30 bg-brand-accent/10 text-brand-accent",
  },
  failed: {
    label: "ناموفق",
    className: "border-red-400/30 bg-red-500/10 text-red-300",
  },
  running: {
    label: "در حال اجرا",
    className: "border-amber-400/30 bg-amber-500/10 text-amber-300",
  },
};

export function RunLog({ runs }: { runs: AdminRun[] }) {
  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-1">
        <CardTitle>گزارش اجراها</CardTitle>
        <CardDescription>
          پنجاه اجرای آخر. هزینهٔ اجرای ناموفق هم، اگر توکنی مصرف کرده باشد، ثبت
          می‌شود.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {runs.length === 0 ? (
          <p className="rounded-lg border border-white/10 p-8 text-center text-muted-foreground">
            هنوز اجرایی ثبت نشده است.
          </p>
        ) : (
          <ul className="divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
            {runs.map((run) => {
              const meta = RUN_STATUS[run.status] ?? RUN_STATUS.running;
              const tokens = run.promptTokens + run.completionTokens + run.imageTokens;

              return (
                <li key={run.id} className="space-y-2 px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={meta.className}>{meta.label}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatTehranDateTime(run.createdAt)}
                      </span>
                    </div>
                    {run.postId ? (
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/admin/blog/${run.postId}`}>
                          <ExternalLink className="me-1 h-4 w-4" />
                          باز کردن مطلب
                        </Link>
                      </Button>
                    ) : null}
                  </div>

                  <p className="font-medium">{run.topic ?? "موضوعش از صف حذف شده"}</p>

                  <dl className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                    <div className="flex gap-1">
                      <dt>مدل:</dt>
                      <dd>
                        <bdi dir="ltr">{run.writerModel ?? "—"}</bdi>
                      </dd>
                    </div>
                    <div className="flex gap-1">
                      <dt>مدت:</dt>
                      <dd>
                        {run.durationMs === null
                          ? "—"
                          : `${Math.round(run.durationMs / 1000).toLocaleString("fa-IR")} ثانیه`}
                      </dd>
                    </div>
                    <div className="flex gap-1">
                      <dt>توکن:</dt>
                      <dd>{tokens.toLocaleString("fa-IR")}</dd>
                    </div>
                    <div className="flex gap-1">
                      <dt>هزینه:</dt>
                      <dd>{formatToman(run.costToman)}</dd>
                    </div>
                  </dl>

                  {run.gate ? (
                    <div className="space-y-2 rounded-lg border border-white/10 bg-white/[0.02] p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          className={
                            (GATE_OUTCOME[run.gate.outcome] ?? GATE_OUTCOME.skipped)
                              .className
                          }
                        >
                          {(GATE_OUTCOME[run.gate.outcome] ?? GATE_OUTCOME.skipped).label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {Math.round(run.gate.durationMs).toLocaleString("fa-IR")}{" "}
                          میلی‌ثانیه
                        </span>
                        {run.gate.inputTokens > 0 ? (
                          // Not added to the run's toman total on purpose: that
                          // figure tracks the ArvanCloud wallet, and the
                          // reviewer is billed to a different account in
                          // another currency. One number for two invoices would
                          // be wrong in both.
                          <span className="text-xs text-muted-foreground">
                            {run.gate.inputTokens.toLocaleString("fa-IR")} توکن،
                            از اعتبار سرویس بازبینی
                          </span>
                        ) : null}
                      </div>

                      {run.gate.scores.length > 0 ? (
                        <dl className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                          {run.gate.scores.map((entry) => (
                            <div key={entry.name} className="flex gap-1">
                              <dt>{gateLabel(entry.name)}:</dt>
                              <dd className="font-medium text-foreground">
                                {formatScore(entry.name, entry.value)}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}
                    </div>
                  ) : null}

                  {run.error ? <ErrorText>{run.error}</ErrorText> : null}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
