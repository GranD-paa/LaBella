const CACHE_NAME = "laparla-v2";
const STATIC_ASSET_PATTERN = /^\/_next\/static\//;
const PRECACHE_URLS = [
  "/manifest.json",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
  "/icons/icon-maskable.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

function cachePut(request, response) {
  if (response && response.status === 200 && response.type === "basic") {
    const clone = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  // Hashed build assets never change contents for a given URL, so they're
  // safe (and fast) to serve cache-first forever.
  if (STATIC_ASSET_PATTERN.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => cachePut(event.request, response));
      })
    );
    return;
  }

  // Real page loads (not the RSC/data fetches Next.js's client router makes
  // under the same URL): go to the network first so deploys are picked up
  // immediately, falling back to the last cached copy only when offline.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => cachePut(event.request, response))
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Everything else (RSC payloads, server actions, API-style calls) is left
  // to the network untouched — caching these by URL would risk serving a
  // stale or mismatched payload back for a different request shape.
});
