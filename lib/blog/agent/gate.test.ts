import { afterEach, describe, expect, it } from "vitest";

import {
  describeVerdict,
  failsRun,
  holdsPublication,
  reviewArticle,
  reviewTopic,
  trips,
  type GateVerdict,
} from "@/lib/blog/agent/gate";
import {
  CHECKS,
  DEFAULT_GATE_SETTINGS,
  parseGateSettings,
} from "@/lib/blog/agent/gate-settings";

function verdict(over: Partial<GateVerdict> = {}): GateVerdict {
  return {
    mode: "soft",
    outcome: "pass",
    reasons: [],
    scores: null,
    durationMs: 1,
    inputTokens: 0,
    ...over,
  };
}

const originalMode = process.env.AGENT_GATE_MODE;
const originalKey = process.env.TYPESAFE_API_KEY;

afterEach(() => {
  process.env.AGENT_GATE_MODE = originalMode;
  process.env.TYPESAFE_API_KEY = originalKey;
});

describe("holdsPublication", () => {
  it("lets a pass through in every mode", () => {
    for (const mode of ["off", "log", "soft", "hard"] as const) {
      expect(holdsPublication(verdict({ mode }))).toBe(false);
    }
  });

  it("holds a concern back under the soft gate", () => {
    expect(holdsPublication(verdict({ outcome: "hold" }))).toBe(true);
  });

  it("does NOT hold back when the judge could not be reached", () => {
    // The owner's rule: the reviewer is an addition, never a dependency. If
    // the credit runs out or the network closes, the agent carries on exactly
    // as it did before any of this existed.
    expect(holdsPublication(verdict({ outcome: "unavailable" }))).toBe(false);
    expect(holdsPublication(verdict({ mode: "hard", outcome: "unavailable" }))).toBe(
      false
    );
  });

  it("changes nothing in log mode, whatever the outcome", () => {
    for (const outcome of ["hold", "unavailable"] as const) {
      expect(holdsPublication(verdict({ mode: "log", outcome }))).toBe(false);
    }
  });

  it("only an answered objection can hold a post", () => {
    expect(holdsPublication(verdict({ outcome: "hold" }))).toBe(true);
    for (const outcome of ["pass", "skipped", "unavailable"] as const) {
      expect(holdsPublication(verdict({ outcome }))).toBe(false);
    }
  });

  it("lets the run proceed when the gate is switched off or unconfigured", () => {
    expect(holdsPublication(verdict({ mode: "off", outcome: "skipped" }))).toBe(false);
    expect(holdsPublication(verdict({ outcome: "skipped" }))).toBe(false);
  });
});

describe("failsRun", () => {
  it("never fails a run under the soft gate", () => {
    expect(failsRun(verdict({ outcome: "hold" }))).toBe(false);
    expect(failsRun(verdict({ outcome: "unavailable" }))).toBe(false);
  });

  it("does not fail even a hard-gated run when the judge was unreachable", () => {
    expect(failsRun(verdict({ mode: "hard", outcome: "unavailable" }))).toBe(false);
  });

  it("fails the run under the hard gate", () => {
    expect(failsRun(verdict({ mode: "hard", outcome: "hold" }))).toBe(true);
  });

  it("does not fail a hard-gated run that passed", () => {
    expect(failsRun(verdict({ mode: "hard" }))).toBe(false);
  });
});

describe("reviewArticle", () => {
  const subject = {
    queuedTopic: "t",
    title: "t",
    summary: "s",
    body: "b",
    imagePrompt: "p",
    existingPosts: [],
  };

  it("skips without reaching the network when the mode is off", async () => {
    const result = await reviewArticle(subject, {
      ...DEFAULT_GATE_SETTINGS,
      mode: "off",
    });
    expect(result.outcome).toBe("skipped");
    expect(result.scores).toBeNull();
  });

  it("skips, rather than holding everything back, when no key is configured", async () => {
    delete process.env.TYPESAFE_API_KEY;
    const result = await reviewArticle(subject, DEFAULT_GATE_SETTINGS);
    expect(result.outcome).toBe("skipped");
    expect(holdsPublication(result)).toBe(false);
  });

  it("skips when every check has been switched off", async () => {
    process.env.TYPESAFE_API_KEY = "test-key";
    const checks = { ...DEFAULT_GATE_SETTINGS.checks };
    for (const name of CHECKS) checks[name] = { ...checks[name], enabled: false };

    const result = await reviewArticle(subject, {
      ...DEFAULT_GATE_SETTINGS,
      checks,
    });
    expect(result.outcome).toBe("skipped");
  });
});

describe("describeVerdict", () => {
  it("writes the scores into one line for the run log", () => {
    const line = describeVerdict(
      verdict({ outcome: "hold", scores: { coversTopic: 0.031, depth: 1.26 } })
    );
    expect(line).toBe("hold coversTopic=0.03 depth=1.26");
  });

  it("falls back to the outcome when there are no scores", () => {
    expect(describeVerdict(verdict({ outcome: "unavailable" }))).toBe("unavailable");
  });
});

describe("trips", () => {
  it("fails a `below` check when the value is under the threshold", () => {
    expect(trips("coversTopic", 0.4, 0.5)).toBe(true);
    expect(trips("coversTopic", 0.5, 0.5)).toBe(false);
  });

  it("fails an `atOrAbove` check when the value reaches the threshold", () => {
    expect(trips("duplicate", 0.7, 0.7)).toBe(true);
    expect(trips("duplicate", 0.69, 0.7)).toBe(false);
  });
});

describe("reviewTopic", () => {
  it("says nothing when the pre-flight check is switched off", async () => {
    process.env.TYPESAFE_API_KEY = "test-key";
    const result = await reviewTopic("t", [], {
      ...DEFAULT_GATE_SETTINGS,
      preflight: false,
    });
    expect(result).toEqual({ alreadyCovered: null, reason: null });
  });

  it("says nothing when there is no key, so the agent just writes", async () => {
    delete process.env.TYPESAFE_API_KEY;
    const result = await reviewTopic("t", [], DEFAULT_GATE_SETTINGS);
    expect(result.reason).toBeNull();
  });
});

describe("parseGateSettings", () => {
  it("falls back to defaults for anything that is not an object", () => {
    for (const value of [null, undefined, 42, "x", []]) {
      expect(parseGateSettings(value)).toEqual(DEFAULT_GATE_SETTINGS);
    }
  });

  it("fills in a check the saved row has never heard of", () => {
    const parsed = parseGateSettings({ mode: "log", checks: {} });
    expect(parsed.mode).toBe("log");
    for (const name of CHECKS) {
      expect(parsed.checks[name]).toEqual(DEFAULT_GATE_SETTINGS.checks[name]);
    }
  });

  it("rejects a threshold outside its own check's range", () => {
    const parsed = parseGateSettings({
      checks: {
        coversTopic: { enabled: true, threshold: 2.5 },
        depth: { enabled: true, threshold: 2.5 },
      },
    });
    // 2.5 is impossible for a 0..1 question but fine for a 0..3 one.
    expect(parsed.checks.coversTopic.threshold).toBe(0.5);
    expect(parsed.checks.depth.threshold).toBe(2.5);
  });

  it("ignores a mode it does not know", () => {
    expect(parseGateSettings({ mode: "nonsense" }).mode).toBe("soft");
  });
});
