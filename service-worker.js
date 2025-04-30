
const CACHE_NAME = "time-machine-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/9953794.png",
  "/9953794-fotor-2025042914323.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
