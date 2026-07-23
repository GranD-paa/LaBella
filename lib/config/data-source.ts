export type DataSource = "local" | "supabase";

const raw = process.env.NEXT_PUBLIC_DATA_SOURCE?.toLowerCase();

export function getDataSource(): DataSource {
  if (process.env.NODE_ENV === "production" && raw === "local") {
    throw new Error("Local data mode is not allowed in production.");
  }

  return raw === "local" ? "local" : "supabase";
}

export function isLocalDataMode(): boolean {
  return getDataSource() === "local";
}

export function isSupabaseDataMode(): boolean {
  return !isLocalDataMode();
}
