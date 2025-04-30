// service-worker.js
const CACHE_NAME = "time-machine-cache-v1";
const urlsToCache = [
  "./",             // caches your repo’s root (index.html)
  "./index.html",
  "./manifest.json",
  "./9953794-fotor-2025042914323.png",
  "./9953794.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache)));
});

self.addEventListener("fetch", event => {
  // If this is a navigation to a new page, serve index.html from cache
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("./index.html").then(cached => cached || fetch(event.request))
    );
    return;
  }

  // Otherwise, try cache first then network
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
