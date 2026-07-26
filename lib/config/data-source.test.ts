import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

async function loadModule() {
  vi.resetModules();
  return import("./data-source");
}

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getDataSource / isLocalDataMode", () => {
  it("throws when local mode is requested in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_DATA_SOURCE", "local");
    const { getDataSource, isLocalDataMode } = await loadModule();

    expect(() => getDataSource()).toThrow(
      "Local data mode is not allowed in production."
    );
    expect(() => isLocalDataMode()).toThrow();
  });

  it("allows local mode outside production", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NEXT_PUBLIC_DATA_SOURCE", "local");
    const { getDataSource, isLocalDataMode } = await loadModule();

    expect(getDataSource()).toBe("local");
    expect(isLocalDataMode()).toBe(true);
  });

  it("defaults to supabase when the env var is unset, even in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_DATA_SOURCE", undefined);
    const { getDataSource, isSupabaseDataMode } = await loadModule();

    expect(getDataSource()).toBe("supabase");
    expect(isSupabaseDataMode()).toBe(true);
  });
});
