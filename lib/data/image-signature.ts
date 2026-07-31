/**
 * Verifies a file's actual bytes match its claimed MIME type, instead of
 * trusting the browser-reported `file.type` alone (which is easy to spoof
 * by renaming an arbitrary file's extension).
 */
const SIGNATURE_CHECKS: Record<string, (bytes: Uint8Array) => boolean> = {
  "image/jpeg": (bytes) =>
    bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  "image/png": (bytes) =>
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a,
  "image/gif": (bytes) =>
    bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38,
  "image/webp": (bytes) =>
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50,
};

export function matchesImageSignature(mimeType: string, bytes: Uint8Array): boolean {
  const check = SIGNATURE_CHECKS[mimeType];
  return check ? check(bytes) : false;
}
