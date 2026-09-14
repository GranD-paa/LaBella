import type { Metadata } from "next";

import { BlogAgentPanel } from "@/components/admin/blog/agent/agent-panel";
import { ErrorState } from "@/components/errors/error-state";
import { readAgentPanelSettings } from "@/lib/blog/agent/config";
import { DEFAULT_PROMPT_SECTIONS } from "@/lib/blog/agent/prompts";
import {
  costSince,
  listRunsForAdmin,
  listTopicsForAdmin,
  releaseStaleTopics,
} from "@/lib/blog/agent/store";
import { BLOG_LANGUAGES } from "@/lib/blog/languages";
import { getDataRepository } from "@/lib/data";
import { requireAdminPage } from "@/lib/supabase/admin-guard";

export const metadata: Metadata = { title: "ایجنت وبلاگ — مدیریت" };

// The queue changes under the page while the agent runs; never serve it cached.
export const dynamic = "force-dynamic";

// "Run now" is a server action on this page that waits for a whole article
// to be written. Hosts that honour this give it the time; a plain Node
// container ignores it and lets the request run.
export const maxDuration = 600;

export default async function AdminBlogAgentPage() {
  // Super admin only. The agent spends the owner's AI credit and publishes
  // without review; every other role is sent to the first page it can open.
  await requireAdminPage("fullAccess");

  const failed = (label: string) => (error: unknown) => {
    console.error(`[admin/blog/agent] failed to load ${label}`, error);
    return null;
  };

  // A run cut short by a restart leaves its subject on "running", and a
  // running subject cannot be edited, deleted or run again. The cron sweeps
  // these too, but the panel should not depend on a cron being set up, so
  // opening it is enough to put such a subject back in the queue.
  await releaseStaleTopics().catch(failed("stale-topic sweep"));

  const [settings, topics, runs, cost, categories] = await Promise.all([
    readAgentPanelSettings().catch(failed("settings")),
    listTopicsForAdmin().catch(failed("topics")),
    listRunsForAdmin().catch(failed("runs")),
    costSince(30).catch(failed("cost")),
    getDataRepository().getBlogCategories().catch(failed("categories")),
  ]);

  // The same rule as the blog list: a table that cannot be read says so,
  // instead of rendering an empty queue that looks like there is nothing to do.
  if (!settings || !topics || !runs || cost === null || !categories) {
    return (
      <ErrorState
        title="ایجنت وبلاگ خوانده نشد"
        description="جدول‌های ایجنت روی این دیتابیس در دسترس نیستند. احتمالاً مایگریشن‌های ۰۱۱ و ۰۱۲ پوشهٔ db هنوز اجرا نشده‌اند؛ اگر اجرا شده‌اند، متن خطا در لاگ سرور هست."
      />
    );
  }

  return (
    <BlogAgentPanel
      settings={settings}
      topics={topics}
      runs={runs}
      costLast30Days={cost}
      categories={categories.map(({ slug, name }) => ({ slug, name }))}
      languages={BLOG_LANGUAGES.map(({ slug, name }) => ({ slug, name }))}
      promptDefaults={DEFAULT_PROMPT_SECTIONS}
    />
  );
}
