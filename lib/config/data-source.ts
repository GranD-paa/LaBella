export type DataSource = "local" | "supabase";

const raw = process.env.NEXT_PUBLIC_DATA_SOURCE?.toLowerCase();

export function getDataSource(): DataSource {
  return raw === "local" ? "local" : "supabase";
}

export function isLocalDataMode(): boolean {
  return getDataSource() === "local";
}

export function isSupabaseDataMode(): boolean {
  return !isLocalDataMode();
}
