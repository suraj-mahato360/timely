const CACHE_NAME = 'lofi-stopwatch-v1';
// List of files to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Install event: cache all the files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event: serve cached files if available
self.addEventListener('fetch', event => {
    // We only want to cache local assets, not the YouTube or Videezy streams
    if (urlsToCache.some(url => event.request.url.endsWith(url))) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    // If we have a match in the cache, return it. Otherwise, fetch from network.
                    return response || fetch(event.request);
                })
        );
    }
});