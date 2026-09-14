"use client";

import { useState, useTransition, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Info, Loader2, PlugZap, Save, Trash2, XCircle } from "lucide-react";

import {
  saveConnectionAction,
  testConnectionAction,
} from "@/app/admin/actions/blog-agent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AgentPanelSettings, ApiKeyState } from "@/lib/blog/agent/config";

import { ConfirmDialog, Field, reportResult } from "./shared";

function keyHint(state: ApiKeyState, hint: string | null): ReactNode {
  switch (state) {
    case "panel":
      return (
        <>
          کلیدی ذخیره شده که به{" "}
          <bdi dir="ltr" className="font-mono">
            …{hint}
          </bdi>{" "}
          ختم می‌شود. برای عوض‌کردنش کلید جدید را وارد کنید؛ اگر خالی بماند،
          همان کلید حفظ می‌شود. این کلید فقط با آدرس بالا کار می‌کند و اگر آدرس
          را عوض کنید، باید کلید سرویس جدید را هم وارد کنید.
        </>
      );
    case "unreadable":
      return "کلید ذخیره‌شده دیگر خوانده نمی‌شود، احتمالاً چون رمز سرور عوض شده است. کلید را دوباره وارد کنید.";
    default:
      return "هنوز کلیدی وارد نشده است. تا کلید وارد نشود، ایجنت کار نمی‌کند.";
  }
}

type TestState = { ok: boolean; message: string; detail?: string };

export function ConnectionForm({ settings }: { settings: AgentPanelSettings }) {
  const router = useRouter();
  const [baseUrl, setBaseUrl] = useState(settings.apiBaseUrl);
  const [apiKey, setApiKey] = useState("");
  const [writerModel, setWriterModel] = useState(settings.writerModel);
  const [imageModel, setImageModel] = useState(settings.imageModel);
  const [error, setError] = useState<string | null>(null);
  const [saving, startSaving] = useTransition();
  const [testing, setTesting] = useState(false);
  const [test, setTest] = useState<TestState | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const hasStoredKey =
    settings.apiKeyState === "panel" || settings.apiKeyState === "unreadable";

  function save(clearApiKey: boolean) {
    startSaving(async () => {
      const result = await saveConnectionAction({
        baseUrl,
        apiKey: clearApiKey ? "" : apiKey,
        clearApiKey,
        writerModel,
        imageModel,
      });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setError(null);
      setApiKey("");
      reportResult(result, clearApiKey ? "کلید حذف شد." : "اتصال ذخیره شد.");
      router.refresh();
    });
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    save(false);
  }

  async function runTest() {
    setTesting(true);
    setTest(null);
    try {
      const result = await testConnectionAction({ baseUrl, apiKey, writerModel });
      setTest(
        "error" in result
          ? { ok: false, message: result.error, detail: result.detail }
          : { ok: true, message: result.message }
      );
    } catch {
      setTest({ ok: false, message: "تست انجام نشد؛ دوباره امتحان کنید." });
    } finally {
      setTesting(false);
    }
  }

  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-1">
        <CardTitle>اتصال هوش مصنوعی</CardTitle>
        <CardDescription>
          هر سرویسی که با فرمت استاندارد چت‌جی‌پی‌تی کار کند، مثل درگاه هوش
          مصنوعی آروان یا لیارا، قابل استفاده است.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>
            ایجنت فقط از همین یک سرویس استفاده می‌کند. اگر مرحله‌ای کار نکند،
            مثلاً سرویس جواب ندهد یا تصویر شاخص ساخته نشود، اجرا متوقف می‌شود،
            چیزی منتشر نمی‌شود و خطا در صف و گزارش اجراها ثبت می‌شود.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <Field
            id="ai-base-url"
            label="آدرس سرویس"
            hint="آدرس کامل را از پنل سرویس کپی کنید؛ معمولاً به v1 ختم می‌شود."
          >
            <Input
              id="ai-base-url"
              dir="ltr"
              required
              value={baseUrl}
              aria-describedby="ai-base-url-hint"
              onChange={(event) => setBaseUrl(event.target.value)}
            />
          </Field>

          <Field
            id="ai-api-key"
            label="کلید"
            hint={keyHint(settings.apiKeyState, settings.apiKeyHint)}
          >
            <Input
              id="ai-api-key"
              type="password"
              dir="ltr"
              autoComplete="off"
              spellCheck={false}
              value={apiKey}
              aria-describedby="ai-api-key-hint"
              onChange={(event) => setApiKey(event.target.value)}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="ai-writer-model"
              label="مدل نویسنده"
              hint="نام دقیق مدل، همان‌طور که در فهرست مدل‌های سرویس آمده."
            >
              <Input
                id="ai-writer-model"
                dir="ltr"
                required
                value={writerModel}
                aria-describedby="ai-writer-model-hint"
                onChange={(event) => setWriterModel(event.target.value)}
              />
            </Field>

            <Field
              id="ai-image-model"
              label="مدل تصویر"
              hint="خالی بگذارید تا مطلب‌ها بدون تصویر شاخص منتشر شوند."
            >
              <Input
                id="ai-image-model"
                dir="ltr"
                value={imageModel}
                aria-describedby="ai-image-model-hint"
                onChange={(event) => setImageModel(event.target.value)}
              />
            </Field>
          </div>

          {error ? (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? (
                <Loader2 className="me-1 h-4 w-4 animate-spin" />
              ) : (
                <Save className="me-1 h-4 w-4" />
              )}
              ذخیره
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-white/20"
              disabled={testing}
              onClick={runTest}
            >
              {testing ? (
                <Loader2 className="me-1 h-4 w-4 animate-spin" />
              ) : (
                <PlugZap className="me-1 h-4 w-4" />
              )}
              تست اتصال
            </Button>
            {hasStoredKey ? (
              <Button
                type="button"
                variant="ghost"
                className="text-red-300 hover:text-red-200"
                disabled={saving}
                onClick={() => setConfirmClear(true)}
              >
                <Trash2 className="me-1 h-4 w-4" />
                حذف کلید ذخیره‌شده
              </Button>
            ) : null}
          </div>
        </form>

        <p className="text-xs text-muted-foreground">
          تست اتصال با مقادیر همین فرم، پیش از ذخیره، یک درخواست خیلی کوتاه
          می‌فرستد و هزینه‌اش ناچیز است.
        </p>

        {test ? (
          <div
            role="status"
            className={`space-y-2 rounded-lg border p-4 text-sm ${
              test.ok
                ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
                : "border-red-400/30 bg-red-500/10 text-red-300"
            }`}
          >
            <p className="flex items-center gap-2 font-medium">
              {test.ok ? (
                <CheckCircle2 className="h-4 w-4" aria-hidden />
              ) : (
                <XCircle className="h-4 w-4" aria-hidden />
              )}
              {test.message}
            </p>
            {test.detail ? (
              <p dir="ltr" className="break-words font-mono text-xs opacity-80">
                {test.detail}
              </p>
            ) : null}
          </div>
        ) : null}
      </CardContent>

      <ConfirmDialog
        open={confirmClear}
        onOpenChange={setConfirmClear}
        title="کلید حذف شود؟"
        description="کلید ذخیره‌شده پاک می‌شود و ایجنت تا واردکردن کلید جدید کار نمی‌کند."
        confirmLabel="حذف کلید"
        destructive
        onConfirm={() => save(true)}
      />
    </Card>
  );
}
