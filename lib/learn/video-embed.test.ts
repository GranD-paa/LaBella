import { describe, expect, it } from "vitest";

import { toVideoEmbed } from "./video-embed";

describe("YouTube", () => {
  it("parses a standard watch link", () => {
    expect(toVideoEmbed("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toEqual({
      provider: "youtube",
      id: "dQw4w9WgXcQ",
      embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    });
  });

  it("parses a youtu.be short link", () => {
    expect(toVideoEmbed("https://youtu.be/dQw4w9WgXcQ")?.id).toBe("dQw4w9WgXcQ");
  });

  it("parses a Shorts link", () => {
    expect(toVideoEmbed("https://www.youtube.com/shorts/dQw4w9WgXcQ")?.id).toBe(
      "dQw4w9WgXcQ"
    );
  });

  it("parses an already-embedded link", () => {
    expect(toVideoEmbed("https://www.youtube.com/embed/dQw4w9WgXcQ")?.id).toBe(
      "dQw4w9WgXcQ"
    );
  });

  it("ignores extra query parameters like a timestamp or playlist", () => {
    expect(
      toVideoEmbed("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s&list=PLabc")?.id
    ).toBe("dQw4w9WgXcQ");
  });

  it("handles the mobile host", () => {
    expect(toVideoEmbed("https://m.youtube.com/watch?v=dQw4w9WgXcQ")?.id).toBe(
      "dQw4w9WgXcQ"
    );
  });

  it("returns null for a YouTube URL with no video", () => {
    expect(toVideoEmbed("https://www.youtube.com/")).toBeNull();
    expect(toVideoEmbed("https://www.youtube.com/results?search_query=italian")).toBeNull();
  });
});

describe("Aparat", () => {
  it("parses a share link", () => {
    expect(toVideoEmbed("https://www.aparat.com/v/aBc123")).toEqual({
      provider: "aparat",
      id: "aBc123",
      embedUrl:
        "https://www.aparat.com/video/video/embed/videohash/aBc123/vt/frame",
    });
  });

  it("parses a link without the www prefix", () => {
    expect(toVideoEmbed("https://aparat.com/v/aBc123")?.provider).toBe("aparat");
  });

  it("parses an already-embedded link", () => {
    expect(
      toVideoEmbed(
        "https://www.aparat.com/video/video/embed/videohash/aBc123/vt/frame"
      )?.id
    ).toBe("aBc123");
  });

  it("ignores a trailing title slug", () => {
    expect(toVideoEmbed("https://www.aparat.com/v/aBc123/some-title")?.id).toBe(
      "aBc123"
    );
  });
});

describe("Vimeo", () => {
  it("parses a numeric video link", () => {
    expect(toVideoEmbed("https://vimeo.com/123456789")).toEqual({
      provider: "vimeo",
      id: "123456789",
      embedUrl: "https://player.vimeo.com/video/123456789",
    });
  });

  it("parses a player link", () => {
    expect(toVideoEmbed("https://player.vimeo.com/video/123456789")?.id).toBe(
      "123456789"
    );
  });
});

describe("hosts we refuse to embed", () => {
  it("returns null for an unknown host", () => {
    // The allowlist is the security boundary: an unrecognised host must never
    // end up as an iframe src, it falls back to a plain link instead.
    expect(toVideoEmbed("https://evil.example.com/video.mp4")).toBeNull();
    expect(toVideoEmbed("https://dailymotion.com/video/x123")).toBeNull();
  });

  it("returns null for a host that merely contains an allowed name", () => {
    expect(toVideoEmbed("https://youtube.com.evil.example/watch?v=abc")).toBeNull();
    expect(toVideoEmbed("https://notaparat.com/v/abc")).toBeNull();
    expect(toVideoEmbed("https://aparat.com.attacker.net/v/abc")).toBeNull();
  });

  it("returns null for non-http schemes", () => {
    expect(toVideoEmbed("javascript:alert(1)")).toBeNull();
    expect(toVideoEmbed("data:text/html,<script>alert(1)</script>")).toBeNull();
    expect(toVideoEmbed("file:///etc/passwd")).toBeNull();
  });

  it("returns null for an id containing path or query characters", () => {
    expect(
      toVideoEmbed("https://www.youtube.com/watch?v=abc%22%3E%3Cscript%3E")
    ).toBeNull();
  });

  it("returns null for empty or malformed input", () => {
    expect(toVideoEmbed("")).toBeNull();
    expect(toVideoEmbed("   ")).toBeNull();
    expect(toVideoEmbed("not a url")).toBeNull();
    expect(toVideoEmbed("www.youtube.com/watch?v=abc")).toBeNull();
  });
});
