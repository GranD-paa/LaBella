"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Save } from "lucide-react";

import { saveSwitchesAction } from "@/app/admin/actions/blog-agent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AgentPanelSettings } from "@/lib/blog/agent/config";

import { Field, formatTehranDateTime, reportResult } from "./shared";

const choiceClassName =
  "flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 p-4 transition-colors hover:bg-white/5";
const inputClassName = "mt-1 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]";

export function SettingsForm({ settings }: { settings: AgentPanelSettings }) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(settings.enabled);
  const [autoPublish, setAutoPublish] = useState(settings.autoPublish);
  const [maxAttempts, setMaxAttempts] = useState(String(settings.maxAttempts));
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const connected = settings.apiKeyState === "panel";

  function submit(event: FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      const result = await saveSwitchesAction({
        enabled,
        autoPublish,
        maxAttempts: Number(maxAttempts),
      });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setError(null);
      reportResult(result, "تنظیمات ذخیره شد.");
      router.refresh();
    });
  }

  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-1">
        <CardTitle>تنظیمات</CardTitle>
        <CardDescription>
          {settings.updatedAt
            ? `آخرین تغییر: ${formatTehranDateTime(settings.updatedAt)}`
            : "هنوز چیزی در پنل ذخیره نشده است."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-6">
          <label className={choiceClassName}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(event) => setEnabled(event.target.checked)}
              className={inputClassName}
            />
            <span className="space-y-1">
              <span className="block font-medium">ایجنت روشن باشد</span>
              <span className="block text-sm leading-relaxed text-muted-foreground">
                وقتی روشن است، اجرای خودکار هر بار موضوعی را که وقتش رسیده
                می‌نویسد. وقتی خاموش است، اجرای خودکار کاری نمی‌کند؛ دکمهٔ
                «اجرای فوری» در صف همچنان کار می‌کند.
              </span>
            </span>
          </label>

          {enabled && !connected ? (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-300"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              ایجنت روشن است ولی کلید سرویس هوش مصنوعی تنظیم نشده؛ تا آن را در
              بخش اتصال وارد نکنید، چیزی نوشته نمی‌شود.
            </p>
          ) : null}

          <fieldset className="space-y-3">
            <legend className="mb-3 text-sm font-medium">بعد از نوشتن مقاله</legend>
            <label className={choiceClassName}>
              <input
                type="radio"
                name="publish-mode"
                checked={autoPublish}
                onChange={() => setAutoPublish(true)}
                className={inputClassName}
              />
              <span className="space-y-1">
                <span className="block font-medium">منتشر شود</span>
                <span className="block text-sm text-muted-foreground">
                  مطلب بلافاصله روی سایت می‌رود.
                </span>
              </span>
            </label>
            <label className={choiceClassName}>
              <input
                type="radio"
                name="publish-mode"
                checked={!autoPublish}
                onChange={() => setAutoPublish(false)}
                className={inputClassName}
              />
              <span className="space-y-1">
                <span className="block font-medium">پیش‌نویس بماند</span>
                <span className="block text-sm text-muted-foreground">
                  مطلب در فهرست مطالب وبلاگ می‌ماند تا خودتان بخوانید و منتشرش کنید.
                </span>
              </span>
            </label>
          </fieldset>

          <div className="max-w-xs">
            <Field
              id="agent-max-attempts"
              label="تعداد تلاش برای هر موضوع"
              hint="اگر کار روی یک موضوع به هر دلیلی متوقف شود، در اجرای خودکار بعدی دوباره امتحان می‌شود تا این تعداد؛ بعد از آن «ناموفق» می‌شود و ایجنت سراغ موضوع بعدی می‌رود. با عدد ۱، موضوع بعد از اولین خطا دیگر امتحان نمی‌شود."
            >
              <Input
                id="agent-max-attempts"
                type="number"
                dir="ltr"
                min={1}
                max={10}
                required
                value={maxAttempts}
                aria-describedby="agent-max-attempts-hint"
                onChange={(event) => setMaxAttempts(event.target.value)}
              />
            </Field>
          </div>

          {error ? (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          ) : null}

          <Button type="submit" disabled={pending}>
            {pending ? (
              <Loader2 className="me-1 h-4 w-4 animate-spin" />
            ) : (
              <Save className="me-1 h-4 w-4" />
            )}
            ذخیرهٔ تنظیمات
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
