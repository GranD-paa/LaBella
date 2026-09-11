import { describe, expect, it } from "vitest";

import { blogImageIdFromUrl, readImageDimensions } from "@/lib/data/blog-image";

/**
 * These parsers read four binary formats by hand, which is the kind of code
 * that is either exactly right or quietly wrong — a misread offset returns a
 * plausible-looking number rather than throwing, and the symptom downstream is
 * "some images make the page jump", months later.
 *
 * So the fixtures below are built byte by byte from each format's actual
 * header layout rather than loaded from sample files: a test that constructs
 * the bytes states what the parser is supposed to believe about them.
 */

const UUID = "0f8fad5b-d9cb-469f-a165-70867728950e";

function pngWith(width: number, height: number): Buffer {
  const bytes = Buffer.alloc(24);
  // 8-byte signature, then the IHDR chunk: 4-byte length, 4-byte type, and
  // the two dimensions as big-endian 32-bit integers.
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(bytes, 0);
  bytes.writeUInt32BE(13, 8);
  bytes.write("IHDR", 12, "ascii");
  bytes.writeUInt32BE(width, 16);
  bytes.writeUInt32BE(height, 20);
  return bytes;
}

function gifWith(width: number, height: number): Buffer {
  const bytes = Buffer.alloc(13);
  bytes.write("GIF89a", 0, "ascii");
  bytes.writeUInt16LE(width, 6);
  bytes.writeUInt16LE(height, 8);
  return bytes;
}

/**
 * A JPEG with one metadata segment in front of the frame header, which is the
 * case that matters: every photograph out of a phone has EXIF before its SOF,
 * so a parser that reads a fixed offset works on synthetic files and fails on
 * real ones.
 */
function jpegWith(width: number, height: number): Buffer {
  const bytes = Buffer.alloc(40);
  bytes.writeUInt16BE(0xffd8, 0); // Start of image.

  bytes.writeUInt16BE(0xffe0, 2); // APP0, the segment to be skipped.
  bytes.writeUInt16BE(16, 4); //     ...whose length includes these two bytes.

  bytes.writeUInt16BE(0xffc0, 20); // SOF0, at 4 + 16.
  bytes.writeUInt16BE(11, 22); //     Segment length.
  bytes.writeUInt8(8, 24); //         Sample precision.
  bytes.writeUInt16BE(height, 25);
  bytes.writeUInt16BE(width, 27);
  return bytes;
}

function webpWith(
  flavour: "VP8 " | "VP8L" | "VP8X",
  width: number,
  height: number
): Buffer {
  const bytes = Buffer.alloc(32);
  bytes.write("RIFF", 0, "ascii");
  bytes.writeUInt32LE(bytes.length - 8, 4);
  bytes.write("WEBP", 8, "ascii");
  bytes.write(flavour, 12, "ascii");

  if (flavour === "VP8 ") {
    bytes.writeUInt16LE(width, 26);
    bytes.writeUInt16LE(height, 28);
  } else if (flavour === "VP8L") {
    // 14 bits each, both stored one less than the real value.
    bytes.writeUInt32LE(((height - 1) << 14) | (width - 1), 21);
  } else {
    // 24-bit canvas size, also stored minus one.
    bytes.writeUIntLE(width - 1, 24, 3);
    bytes.writeUIntLE(height - 1, 27, 3);
  }

  return bytes;
}

describe("readImageDimensions", () => {
  it("reads a PNG's IHDR chunk", () => {
    expect(readImageDimensions("image/png", pngWith(1200, 630))).toEqual({
      width: 1200,
      height: 630,
    });
  });

  it("reads a GIF's logical screen size", () => {
    expect(readImageDimensions("image/gif", gifWith(480, 270))).toEqual({
      width: 480,
      height: 270,
    });
  });

  it("walks past a JPEG's metadata segments to reach the frame header", () => {
    expect(readImageDimensions("image/jpeg", jpegWith(1920, 1080))).toEqual({
      width: 1920,
      height: 1080,
    });
  });

  it.each([
    ["VP8 ", 800, 600],
    ["VP8L", 1024, 768],
    ["VP8X", 2048, 1152],
  ] as const)("reads a %s WebP", (flavour, width, height) => {
    expect(
      readImageDimensions("image/webp", webpWith(flavour, width, height))
    ).toEqual({ width, height });
  });

  it("returns null rather than throwing on a truncated header", () => {
    // A real risk: `readUInt32BE` past the end of a Buffer throws, and an
    // upload that throws here would fail instead of simply going unmeasured.
    expect(readImageDimensions("image/png", Buffer.alloc(10))).toBeNull();
    expect(readImageDimensions("image/jpeg", Buffer.alloc(4))).toBeNull();
    expect(readImageDimensions("image/webp", Buffer.alloc(12))).toBeNull();
  });

  it("returns null for a type it does not parse", () => {
    expect(readImageDimensions("image/avif", pngWith(10, 10))).toBeNull();
  });
});

describe("blogImageIdFromUrl", () => {
  it("reads the id out of both storage shapes", () => {
    expect(blogImageIdFromUrl(`/api/blog-images/${UUID}`)).toBe(UUID);
    expect(blogImageIdFromUrl(`/uploads/blog/${UUID}.webp`)).toBe(UUID);
  });

  it("ignores images hosted somewhere else", () => {
    expect(blogImageIdFromUrl("https://example.com/photo.png")).toBeNull();
    expect(blogImageIdFromUrl("/uploads/banners/x.png")).toBeNull();
  });

  it("does not accept a path that merely starts with a real one", () => {
    // The extension separator has to be a literal dot. An earlier version of
    // this pattern was built by interpolating into a template string, where
    // the `\.` collapsed to `.` and matched any character at all.
    expect(blogImageIdFromUrl(`/api/blog-images/${UUID}/../secret`)).toBeNull();
    expect(blogImageIdFromUrl(`/api/blog-images/${UUID}x`)).toBeNull();
  });
});
