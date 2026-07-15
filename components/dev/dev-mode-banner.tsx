import { isLocalDataMode } from "@/lib/config/data-source";
import { LOCAL_DEV_CREDENTIALS } from "@/lib/data/local/seed";

export function DevModeBanner() {
  if (!isLocalDataMode()) {
    return null;
  }

  return (
    <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-xs text-amber-100">
      Local development mode active — using in-memory mock data (no Supabase
      requests). Admin: {LOCAL_DEV_CREDENTIALS.admin.email} · User:{" "}
      {LOCAL_DEV_CREDENTIALS.user.email}
    </div>
  );
}
