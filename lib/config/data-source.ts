export type DataSource = "local" | "postgres" | "supabase";

const raw = process.env.NEXT_PUBLIC_DATA_SOURCE?.toLowerCase();

export function getDataSource(): DataSource {
  if (process.env.NODE_ENV === "production" && raw === "local") {
    throw new Error("Local data mode is not allowed in production.");
  }

  if (raw === "local") return "local";
  if (raw === "postgres") return "postgres";
  return "supabase";
}

export function isLocalDataMode(): boolean {
  return getDataSource() === "local";
}

export function isPostgresDataMode(): boolean {
  return getDataSource() === "postgres";
}

export function isSupabaseDataMode(): boolean {
  return getDataSource() === "supabase";
}
