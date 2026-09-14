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
import type { AdminRun } from "@/lib/blog/agent/store";

import { ErrorText, formatTehranDateTime } from "./shared";

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
