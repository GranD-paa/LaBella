/**
 * The caps on an uploaded grammar document, in a module of their own because
 * the browser needs them to say what it will accept and the server needs them
 * to enforce it. lib/storage/pdf-pages reaches for the filesystem and the
 * render binaries, so a client component cannot import from it.
 *
 * Beyond these a single upload takes long enough that the request would hang.
 */
export const MAX_PDF_PAGES = 80;
export const MAX_PDF_BYTES = 60 * 1024 * 1024;
