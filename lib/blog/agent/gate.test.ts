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
  CHECK_DEFINITIONS,
  DEFAULT_GATE_SETTINGS,
  goodness,
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

describe("goodness", () => {
  it("turns a probability into a percentage", () => {
    expect(goodness("coversTopic", 0.97)).toBe(97);
    expect(goodness("coversTopic", 0)).toBe(0);
  });

  it("scales a rubric level against its own top", () => {
    expect(goodness("depth", 3)).toBe(100);
    expect(goodness("depth", 1.5)).toBe(50);
  });

  it("flips a fault question, so a duplicate scores low", () => {
    expect(goodness("duplicate", 0.06)).toBe(94);
    expect(goodness("duplicate", 0.89)).toBe(11);
  });

  it("clamps an answer outside its declared range", () => {
    expect(goodness("depth", 5)).toBe(100);
    expect(goodness("coversTopic", -1)).toBe(0);
  });

  it("means the same thing for every check: higher is better", () => {
    for (const name of CHECKS) {
      const best = CHECK_DEFINITIONS[name].invert ? 0 : CHECK_DEFINITIONS[name].max;
      expect(goodness(name, best)).toBe(100);
    }
  });
});

describe("trips", () => {
  it("uses one rule for every check — below the threshold is a problem", () => {
    expect(trips("coversTopic", 0.4, 50)).toBe(true);
    expect(trips("coversTopic", 0.5, 50)).toBe(false);
  });

  it("reads a fault question through the flipped score", () => {
    // 0.7 duplicate is 30 for freshness, which is not below 30.
    expect(trips("duplicate", 0.7, 30)).toBe(false);
    expect(trips("duplicate", 0.75, 30)).toBe(true);
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

  it("rejects a threshold outside 0–100", () => {
    const parsed = parseGateSettings({
      scale: 100,
      checks: { coversTopic: { enabled: true, threshold: 140 } },
    });
    expect(parsed.checks.coversTopic.threshold).toBe(
      DEFAULT_GATE_SETTINGS.checks.coversTopic.threshold
    );
  });

  it("converts a row saved before the 0–100 scale", () => {
    const parsed = parseGateSettings({
      mode: "soft",
      checks: {
        // The old raw cut-offs: "below 0.5" and "at or above 0.7".
        coversTopic: { enabled: true, threshold: 0.5 },
        duplicate: { enabled: true, threshold: 0.7 },
        depth: { enabled: true, threshold: 1.5 },
      },
    });
    expect(parsed.scale).toBe(100);
    expect(parsed.checks.coversTopic.threshold).toBe(50);
    // 0.7 duplicate is 30 freshness, and the comparison flips with it.
    expect(parsed.checks.duplicate.threshold).toBe(30);
    expect(parsed.checks.depth.threshold).toBe(50);
  });

  it("survives a save/read round trip without rescaling", () => {
    // The bug this pins: the save path once dropped `scale`, so a threshold
    // the owner had just typed was read back as a raw cut-off and converted a
    // second time. Anything already on the 0–100 scale must come back
    // unchanged, however many times it goes round.
    let settings = { ...DEFAULT_GATE_SETTINGS };
    settings.checks = {
      ...settings.checks,
      seoQuality: { enabled: true, threshold: 70 },
    };

    for (let pass = 0; pass < 3; pass += 1) {
      settings = parseGateSettings(JSON.parse(JSON.stringify(settings)));
      expect(settings.checks.seoQuality.threshold).toBe(70);
      expect(settings.scale).toBe(100);
    }
  });

  it("accepts the whole 0–100 range, not just the old raw one", () => {
    const parsed = parseGateSettings({
      scale: 100,
      checks: { seoQuality: { enabled: true, threshold: 100 } },
    });
    expect(parsed.checks.seoQuality.threshold).toBe(100);
  });

  it("leaves a row that already carries the marker alone", () => {
    const parsed = parseGateSettings({
      scale: 100,
      checks: { coversTopic: { enabled: true, threshold: 65 } },
    });
    expect(parsed.checks.coversTopic.threshold).toBe(65);
  });

  it("ignores a mode it does not know", () => {
    expect(parseGateSettings({ mode: "nonsense" }).mode).toBe("soft");
  });
});
