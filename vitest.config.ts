import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    // `.claude/worktrees` holds isolated checkouts that background agents work
    // in. Without excluding it, every test in the repo gets collected twice
    // and a run reports inflated counts — or fails because of unfinished work
    // in a copy that is not the one being edited here.
    exclude: ["node_modules/**", ".next/**", ".claude/**"],
  },
});
