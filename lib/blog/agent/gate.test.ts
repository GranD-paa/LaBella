import { afterEach, describe, expect, it } from "vitest";

import {
  describeVerdict,
  failsRun,
  holdsPublication,
  reviewArticle,
  type GateVerdict,
} from "@/lib/blog/agent/gate";

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

  it("holds back when the judge could not be reached", () => {
    // The point of the gate is that nothing goes out unread. "Could not check"
    // is not the same as "checked and fine".
    expect(holdsPublication(verdict({ outcome: "unavailable" }))).toBe(true);
  });

  it("changes nothing in log mode, whatever the outcome", () => {
    for (const outcome of ["hold", "unavailable"] as const) {
      expect(holdsPublication(verdict({ mode: "log", outcome }))).toBe(false);
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
    process.env.AGENT_GATE_MODE = "off";
    const result = await reviewArticle(subject);
    expect(result.outcome).toBe("skipped");
    expect(result.scores).toBeNull();
  });

  it("skips, rather than holding everything back, when no key is configured", async () => {
    process.env.AGENT_GATE_MODE = "soft";
    delete process.env.TYPESAFE_API_KEY;
    const result = await reviewArticle(subject);
    expect(result.outcome).toBe("skipped");
    expect(holdsPublication(result)).toBe(false);
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
