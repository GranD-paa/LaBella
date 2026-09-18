"use client";

import { useState, useTransition } from "react";
import { Loader2, ShieldCheck } from "lucide-react";

import {
  reviewTextAction,
  saveGateSettingsAction,
} from "@/app/admin/actions/blog-agent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { GateVerdict } from "@/lib/blog/agent/gate";
import {
  CHECKS,
  CHECK_DEFINITIONS,
  type CheckName,
  type GateMode,
  type GateSettings,
} from "@/lib/blog/agent/gate-settings";
import type { GateStats } from "@/lib/blog/agent/store";

import { ErrorText, formatTehranDateTime } from "./shared";

const MODES: { value: GateMode; label: string; hint: string }[] = [
  { value: "off", label: "خاموش", hint: "هیچ بررسی‌ای انجام نمی‌شود." },
  {
    value: "log",
    label: "فقط ثبت",
    hint: "نمره‌ها ثبت می‌شوند و هیچ‌چیز را عوض نمی‌کنند.",
  },
  {
    value: "soft",
    label: "نرم",
    hint: "مقالهٔ مشکل‌دار پیش‌نویس می‌ماند؛ اجرا موفق است.",
  },
  {
    value: "hard",
    label: "سخت‌گیر",
    hint: "مقالهٔ مشکل‌دار اصلاً منتشر نمی‌شود و اجرا ناموفق ثبت می‌شود.",
  },
];

const OUTCOME_LABELS: Record<string, string> = {
  pass: "قبول",
  hold: "نگه داشته شد",
  unavailable: "در دسترس نبود",
  skipped: "انجام نشد",
};

function faNumber(value: number, digits = 2) {
  return value.toFixed(digits).replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

export function JevPanel({
  settings: initial,
  stats,
  keyConfigured,
}: {
  settings: GateSettings;
  stats: GateStats;
  keyConfigured: boolean;
}) {
  const [settings, setSettings] = useState(initial);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startSaving] = useTransition();

  function patchCheck(name: CheckName, patch: Partial<GateSettings["checks"][CheckName]>) {
    setSaved(false);
    setSettings((current) => ({
      ...current,
      checks: { ...current.checks, [name]: { ...current.checks[name], ...patch } },
    }));
  }

  function save() {
    setError(null);
    startSaving(async () => {
      const result = await saveGateSettingsAction(settings);
      if ("error" in result && result.error) setError(result.error);
      else setSaved(true);
    });
  }

  return (
    <div className="space-y-6">
      <Card className="brand-surface">
        <CardHeader className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-accent" />
            بازبینِ مقاله‌ها
          </CardTitle>
          <CardDescription>
            هر مقاله پیش از انتشار خوانده و نمره‌گذاری می‌شود. این سرویس فقط
            قضاوت می‌کند و چیزی نمی‌نویسد؛ اگر از دسترس خارج شود، ایجنت دقیقاً
            مثل قبل کار خودش را می‌کند.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={
                keyConfigured
                  ? "border-brand-accent/30 bg-brand-accent/10 text-brand-accent"
                  : "border-amber-400/30 bg-amber-500/10 text-amber-300"
              }
            >
              {keyConfigured ? "کلید تنظیم شده" : "کلید تنظیم نشده"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {stats.judged > 0
                ? `${stats.judged.toLocaleString("fa-IR")} اجرای بازبینی‌شده`
                : "هنوز اجرایی بازبینی نشده"}
            </span>
            {stats.totalInputTokens > 0 ? (
              <span className="text-xs text-muted-foreground">
                {stats.totalInputTokens.toLocaleString("fa-IR")} توکن مصرف‌شده
              </span>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label>رفتار وقتی ایرادی پیدا شد</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {MODES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSaved(false);
                    setSettings((current) => ({ ...current, mode: option.value }));
                  }}
                  className={`rounded-lg border p-3 text-start transition-colors ${
                    settings.mode === option.value
                      ? "border-brand-accent/50 bg-brand-accent/10"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                >
                  <p className="text-sm font-medium">{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.hint}</p>
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-lg border border-white/10 p-3">
            <input
              type="checkbox"
              checked={settings.preflight}
              onChange={(event) => {
                setSaved(false);
                setSettings((current) => ({
                  ...current,
                  preflight: event.target.checked,
                }));
              }}
              className="mt-1"
            />
            <span>
              <span className="text-sm font-medium">بررسی موضوع پیش از نوشتن</span>
              <span className="block text-xs text-muted-foreground">
                موضوع صف با مطالب منتشرشده مقایسه می‌شود، پیش از آنکه هزینهٔ یک
                مقاله خرج شود.
              </span>
            </span>
          </label>

          <div className="space-y-2">
            <Label>بررسی‌ها و آستانه‌ها</Label>
            <ul className="divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
              {CHECKS.map((name) => {
                const definition = CHECK_DEFINITIONS[name];
                const check = settings.checks[name];
                const average = stats.averages.find((entry) => entry.name === name);

                return (
                  <li key={name} className="flex flex-wrap items-center gap-3 p-3">
                    <input
                      type="checkbox"
                      checked={check.enabled}
                      onChange={(event) =>
                        patchCheck(name, { enabled: event.target.checked })
                      }
                    />
                    <span className="min-w-40 flex-1">
                      <span className="text-sm font-medium">{definition.label}</span>
                      <span className="block text-xs text-muted-foreground">
                        {definition.meaning}
                      </span>
                    </span>

                    {average ? (
                      <span className="text-xs text-muted-foreground">
                        میانگین {faNumber(average.value)} از{" "}
                        {average.samples.toLocaleString("fa-IR")} اجرا
                      </span>
                    ) : null}

                    <span className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {definition.direction === "below" ? "کمتر از" : "بیشتر از"}
                      </span>
                      <Input
                        type="number"
                        step="0.05"
                        min={0}
                        max={definition.max}
                        value={check.threshold}
                        disabled={!check.enabled}
                        onChange={(event) =>
                          patchCheck(name, { threshold: Number(event.target.value) })
                        }
                        className="h-8 w-20"
                      />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {error ? <ErrorText>{error}</ErrorText> : null}

          <div className="flex items-center gap-3">
            <Button onClick={save} disabled={pending}>
              {pending ? <Loader2 className="me-1 h-4 w-4 animate-spin" /> : null}
              ذخیرهٔ تنظیمات
            </Button>
            {saved ? (
              <span className="text-xs text-brand-accent">ذخیره شد.</span>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <ManualReview />

      <Card className="brand-surface">
        <CardHeader className="space-y-1">
          <CardTitle>تاریخچهٔ نمره‌ها</CardTitle>
          <CardDescription>
            نتیجهٔ بازبینی در اجراهای اخیر. اجراهای قدیمی‌تر از این قابلیت،
            نمره‌ای ندارند.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.history.length === 0 ? (
            <p className="rounded-lg border border-white/10 p-8 text-center text-muted-foreground">
              هنوز اجرایی بازبینی نشده است.
            </p>
          ) : (
            <ul className="divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
              {stats.history.map((entry) => (
                <li key={entry.createdAt} className="space-y-2 p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className={
                        entry.outcome === "pass"
                          ? "border-brand-accent/30 bg-brand-accent/10 text-brand-accent"
                          : "border-amber-400/30 bg-amber-500/10 text-amber-300"
                      }
                    >
                      {OUTCOME_LABELS[entry.outcome] ?? entry.outcome}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatTehranDateTime(entry.createdAt)}
                    </span>
                  </div>
                  <dl className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                    {Object.entries(entry.scores).map(([name, value]) => (
                      <div key={name} className="flex gap-1">
                        <dt>
                          {CHECK_DEFINITIONS[name as CheckName]?.label ?? name}:
                        </dt>
                        <dd className="font-medium text-foreground">
                          {faNumber(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * The owner's own text, through the same judgments the agent's output gets.
 *
 * Nothing here is stored or published. It is a place to put a draft, or a rival's
 * article, and see the numbers before deciding anything.
 */
function ManualReview() {
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [verdict, setVerdict] = useState<GateVerdict | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startReview] = useTransition();

  function run() {
    setError(null);
    setVerdict(null);
    startReview(async () => {
      const result = await reviewTextAction({ topic, title, body });
      if ("error" in result && result.error) setError(result.error);
      else if ("verdict" in result && result.verdict) setVerdict(result.verdict);
    });
  }

  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-1">
        <CardTitle>بررسی دستی یک متن</CardTitle>
        <CardDescription>
          هر متنی را اینجا بگذارید تا با همان معیارهای بالا نمره بگیرد. چیزی
          ذخیره یا منتشر نمی‌شود.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="jev-topic">موضوعی که متن باید پوشش بدهد</Label>
            <Input
              id="jev-topic"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="اختیاری"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="jev-title">عنوان</Label>
            <Input
              id="jev-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="اختیاری"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="jev-body">متن</Label>
          <Textarea
            id="jev-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={10}
            placeholder="متن را اینجا بچسبانید…"
          />
        </div>

        {error ? <ErrorText>{error}</ErrorText> : null}

        <Button onClick={run} disabled={pending || body.trim().length === 0}>
          {pending ? <Loader2 className="me-1 h-4 w-4 animate-spin" /> : null}
          بررسی کن
        </Button>

        {verdict ? (
          <div className="space-y-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className={
                  verdict.outcome === "pass"
                    ? "border-brand-accent/30 bg-brand-accent/10 text-brand-accent"
                    : "border-amber-400/30 bg-amber-500/10 text-amber-300"
                }
              >
                {OUTCOME_LABELS[verdict.outcome] ?? verdict.outcome}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {Math.round(verdict.durationMs).toLocaleString("fa-IR")} میلی‌ثانیه
                · {verdict.inputTokens.toLocaleString("fa-IR")} توکن
              </span>
            </div>

            {verdict.scores ? (
              <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                {Object.entries(verdict.scores).map(([name, value]) => (
                  <div key={name} className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">
                      {CHECK_DEFINITIONS[name as CheckName]?.label ?? name}
                    </dt>
                    <dd className="font-medium">{faNumber(value as number)}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {verdict.reasons.length > 0 ? (
              <ul className="list-inside list-disc space-y-1 text-sm text-amber-300">
                {verdict.reasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
