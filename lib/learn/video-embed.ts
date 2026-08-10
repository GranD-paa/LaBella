/**
 * Turns a video page URL into an embeddable player URL.
 *
 * Videos are hosted on third-party platforms and only their link is stored, so
 * something has to translate "the URL an admin pasted from the address bar"
 * into "the URL an iframe can actually play".
 *
 * **This is an allowlist, and that is the point.** An `<iframe src>` pointing
 * at an arbitrary URL hands that origin a frame inside our page. Only hosts we
 * recognise are ever embedded; anything else falls back to a plain link that
 * opens in a new tab. An admin pasting a bad link should get a broken link,
 * never an injected frame.
 *
 * Aparat is included alongside YouTube because YouTube is blocked in Iran, and
 * Iranian learners are a primary audience.
 */

export type VideoProvider = "youtube" | "aparat" | "vimeo";

export type VideoEmbed = {
  provider: VideoProvider;
  /** URL safe to use as an iframe `src`. */
  embedUrl: string;
  /** The platform's own id for the video. */
  id: string;
};

/** Video ids are alphanumeric across all three platforms; reject anything else. */
function isSafeId(id: string): boolean {
  return /^[A-Za-z0-9_-]+$/.test(id);
}

function parseYouTube(url: URL): VideoEmbed | null {
  const host = url.hostname.replace(/^www\./, "");

  let id: string | null = null;

  if (host === "youtu.be") {
    // https://youtu.be/<id>
    id = url.pathname.slice(1);
  } else if (host === "youtube.com" || host === "m.youtube.com") {
    if (url.pathname === "/watch") {
      // https://youtube.com/watch?v=<id>
      id = url.searchParams.get("v");
    } else if (url.pathname.startsWith("/embed/")) {
      id = url.pathname.slice("/embed/".length);
    } else if (url.pathname.startsWith("/shorts/")) {
      id = url.pathname.slice("/shorts/".length);
    }
  }

  if (!id) return null;
  id = id.split("/")[0];
  if (!isSafeId(id)) return null;

  return {
    provider: "youtube",
    id,
    // youtube-nocookie avoids setting tracking cookies until the learner
    // actually presses play.
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
  };
}

function parseAparat(url: URL): VideoEmbed | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "aparat.com") return null;

  // https://aparat.com/v/<hash>  — the canonical share link.
  const match = url.pathname.match(/^\/v\/([A-Za-z0-9_-]+)/);
  // Already-embedded links: /video/video/embed/videohash/<hash>/vt/frame
  const embedMatch = url.pathname.match(/\/videohash\/([A-Za-z0-9_-]+)/);

  const id = match?.[1] ?? embedMatch?.[1];
  if (!id || !isSafeId(id)) return null;

  return {
    provider: "aparat",
    id,
    embedUrl: `https://www.aparat.com/video/video/embed/videohash/${id}/vt/frame`,
  };
}

function parseVimeo(url: URL): VideoEmbed | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;

  const match = url.pathname.match(/(\d+)/);
  const id = match?.[1];
  if (!id) return null;

  return {
    provider: "vimeo",
    id,
    embedUrl: `https://player.vimeo.com/video/${id}`,
  };
}

/**
 * Resolves a pasted video URL to an embed, or null when the host is not one we
 * are willing to put in an iframe.
 */
export function toVideoEmbed(rawUrl: string): VideoEmbed | null {
  if (!rawUrl?.trim()) return null;

  let url: URL;
  try {
    url = new URL(rawUrl.trim());
  } catch {
    return null;
  }

  // No javascript:, data:, or file: URLs reaching an iframe.
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return null;
  }

  return parseYouTube(url) ?? parseAparat(url) ?? parseVimeo(url);
}
