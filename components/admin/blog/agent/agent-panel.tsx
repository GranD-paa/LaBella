"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  CalendarClock,
  KeyRound,
  Power,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { GateSettings } from "@/lib/blog/agent/gate-settings";
import type { GateStats } from "@/lib/blog/agent/store";

import { JevPanel } from "./jev-panel";
import { formatToman } from "@/lib/ai/pricing";
import type { AgentPanelSettings } from "@/lib/blog/agent/config";
import type { PromptSectionKey } from "@/lib/blog/agent/prompts";
import type { AdminRun, AdminTopic } from "@/lib/blog/agent/store";

import { ConnectionForm } from "./connection-form";
import { PromptEditor } from "./prompt-editor";
import { RunLog } from "./run-log";
import { SettingsForm } from "./settings-form";
import { formatTehranDateTime, type Option } from "./shared";
import { TopicQueue } from "./topic-queue";

type Tone = "good" | "bad" | "muted";

const TONES: Record<Tone, string> = {
  good: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  bad: "border-red-400/30 bg-red-500/10 text-red-300",
  muted: "border-white/15 bg-white/5 text-muted-foreground",
};

function StatusChip({
  icon: Icon,
  label,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  tone: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 ${TONES[tone]}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {label}
    </span>
  );
}

export function BlogAgentPanel({
  settings,
  topics,
  runs,
  costLast30Days,
  categories,
  languages,
  promptDefaults,
  gateSettings,
  gateStats,
  jevKeyConfigured,
}: {
  settings: AgentPanelSettings;
  topics: AdminTopic[];
  runs: AdminRun[];
  costLast30Days: number;
  categories: Option[];
  languages: Option[];
  promptDefaults: Record<PromptSectionKey, string>;
  gateSettings: GateSettings;
  gateStats: GateStats;
  /** Whether `TYPESAFE_API_KEY` is set on the server; never the key itself. */
  jevKeyConfigured: boolean;
}) {
  const waiting = topics.filter((topic) => topic.status === "pending");
  const next = waiting[0];
  const connected = settings.apiKeyState === "panel";

  return (
    <div className="space-y-8" dir="rtl">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
              <Bot className="me-1 h-3 w-3" />
              ایجنت وبلاگ
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              نویسندهٔ خودکار وبلاگ
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              موضوع‌های آینده را در صف بگذارید. ایجنت در زمان هر موضوع مقاله را
              می‌نویسد، تصویر شاخص می‌سازد و{" "}
              {settings.autoPublish ? "منتشرش می‌کند." : "به‌صورت پیش‌نویس ذخیره‌اش می‌کند."}
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <StatusChip
                icon={Power}
                tone={settings.enabled ? "good" : "muted"}
                label={settings.enabled ? "روشن" : "خاموش"}
              />
              <StatusChip
                icon={KeyRound}
                tone={connected ? "good" : "bad"}
                label={connected ? "اتصال تنظیم شده" : "اتصال تنظیم نشده"}
              />
              <StatusChip
                icon={CalendarClock}
                tone="muted"
                label={
                  next
                    ? `موضوع بعدی: ${formatTehranDateTime(next.scheduledFor)}`
                    : "صف خالی است"
                }
              />
              <StatusChip
                icon={Wallet}
                tone="muted"
                label={`هزینهٔ ۳۰ روز اخیر: ${formatToman(costLast30Days)}`}
              />
            </div>
          </div>

          <Button variant="outline" className="border-white/20" asChild>
            <Link href="/admin/blog">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              بازگشت به مطالب
            </Link>
          </Button>
        </div>
      </section>

      <Tabs defaultValue="queue" dir="rtl" className="space-y-6">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 sm:w-auto">
          <TabsTrigger value="queue">
            صف محتوا ({waiting.length.toLocaleString("fa-IR")})
          </TabsTrigger>
          <TabsTrigger value="runs">گزارش اجراها</TabsTrigger>
          <TabsTrigger value="prompt">پرامپت</TabsTrigger>
          <TabsTrigger value="connection">اتصال هوش مصنوعی</TabsTrigger>
          <TabsTrigger value="settings">تنظیمات</TabsTrigger>
          <TabsTrigger value="jev">jev</TabsTrigger>
        </TabsList>

        <TabsContent value="queue">
          <TopicQueue
            topics={topics}
            categories={categories}
            languages={languages}
            autoPublish={settings.autoPublish}
            maxAttempts={settings.maxAttempts}
          />
        </TabsContent>
        <TabsContent value="runs">
          <RunLog runs={runs} />
        </TabsContent>
        <TabsContent value="prompt">
          <PromptEditor overrides={settings.promptOverrides} defaults={promptDefaults} />
        </TabsContent>
        <TabsContent value="connection">
          <ConnectionForm settings={settings} />
        </TabsContent>
        <TabsContent value="jev">
          <JevPanel
            settings={gateSettings}
            stats={gateStats}
            keyConfigured={jevKeyConfigured}
          />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsForm settings={settings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
