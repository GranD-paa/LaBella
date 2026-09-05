import { execFile } from "node:child_process";
import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);

/**
 * Turns an uploaded PDF into one image per page.
 *
 * The learner never receives the PDF itself. Rendering server-side is what
 * makes "no download" mean something: there is no document in the browser to
 * save, only pictures of its pages. Screenshots are still possible and always
 * will be — the goal is that the file is not one click away.
 *
 * 200 DPI puts an A4 page at roughly 1654x2339, which stays sharp on a
 * high-density phone screen and when a reader zooms in. Quality was the one
 * thing asked for explicitly, so this errs high: the pages cost a few hundred
 * kilobytes each rather than the tens of kilobytes a screen-sized render would.
 */
const RENDER_DPI = 200;
const WEBP_QUALITY = 90;

export { MAX_PDF_BYTES, MAX_PDF_PAGES } from "@/lib/storage/pdf-limits";

export type RenderedPage = {
  /** 1-based position within the source document. */
  pageNumber: number;
  bytes: Buffer;
  width: number;
  height: number;
};

function isPdf(bytes: Buffer): boolean {
  // %PDF-
  return (
    bytes[0] === 0x25 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x44 &&
    bytes[3] === 0x46 &&
    bytes[4] === 0x2d
  );
}

/** Reads width and height out of a WebP header, so the reader can size a page
 *  before the image itself has loaded and avoid reflowing as pages turn. */
function readWebpDimensions(bytes: Buffer): { width: number; height: number } {
  // VP8L (lossless) and VP8 (lossy) store dimensions differently; cwebp emits
  // VP8L for these renders, but handle both rather than guess wrong later.
  const format = bytes.toString("ascii", 12, 16);

  if (format === "VP8L") {
    const bits = bytes.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }

  if (format === "VP8 ") {
    return {
      width: bytes.readUInt16LE(26) & 0x3fff,
      height: bytes.readUInt16LE(28) & 0x3fff,
    };
  }

  if (format === "VP8X") {
    return {
      width: (bytes.readUIntLE(24, 3) & 0xffffff) + 1,
      height: (bytes.readUIntLE(27, 3) & 0xffffff) + 1,
    };
  }

  return { width: 0, height: 0 };
}

export async function countPdfPages(bytes: Buffer): Promise<number> {
  const directory = await mkdtemp(path.join(tmpdir(), "laparli-pdf-"));
  try {
    const source = path.join(directory, "in.pdf");
    await writeFile(source, bytes);
    const { stdout } = await run("pdfinfo", [source]);
    const match = stdout.match(/^Pages:\s+(\d+)/m);
    return match ? Number(match[1]) : 0;
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

/**
 * Renders every page, in order.
 *
 * `pdftoppm` writes one PNG per page into a directory and `cwebp` compresses
 * each one; both ship with the container image (poppler-utils, libwebp-tools).
 * Doing it through the filesystem rather than a pipe keeps memory flat — a
 * long document never has more than one page decoded at a time.
 */
export async function renderPdfToPages(bytes: Buffer): Promise<RenderedPage[]> {
  if (!isPdf(bytes)) {
    throw new Error("not a pdf");
  }

  const directory = await mkdtemp(path.join(tmpdir(), "laparli-pdf-"));
  try {
    const source = path.join(directory, "in.pdf");
    await writeFile(source, bytes);

    await run("pdftoppm", [
      "-png",
      "-r",
      String(RENDER_DPI),
      source,
      path.join(directory, "page"),
    ]);

    // pdftoppm zero-pads the page number to the document's width, so plain
    // lexical order is already page order.
    const rendered = (await readdir(directory))
      .filter((name) => name.startsWith("page") && name.endsWith(".png"))
      .sort();

    const pages: RenderedPage[] = [];
    for (let index = 0; index < rendered.length; index += 1) {
      const name = rendered[index];
      const png = path.join(directory, name);
      const webp = `${png}.webp`;
      await run("cwebp", ["-quiet", "-q", String(WEBP_QUALITY), png, "-o", webp]);

      const output = await readFile(webp);
      pages.push({
        pageNumber: index + 1,
        bytes: output,
        ...readWebpDimensions(output),
      });
    }

    return pages;
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
