// sw.js

const CACHE_NAME = 'gamester-galaxy-v1';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/style.css',
  '/favicon_io/favicon.ico',
  '/favicon_io/android-icon-192x192.png',
  '/favicon_io/favicon-32x32.png',
  '/IMAGES/introoo%2011.jpg',
  '/IMAGES/about%20us.jpg',
  '/IMAGES/featureee.jpg',
  '/IMAGES/review.jpg',
  '/IMAGES/featureee.jpg',
  '/IMAGES/introoo%2011.jpg', // Add all important URLs to cache
  '/manifest.json'
];

// Install service worker and cache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching essential assets');
        return cache.addAll(CACHE_URLS);
      })
  );
});

// Activate service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event to serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse; // Return cached file if found
        }
        return fetch(event.request); // Otherwise, fetch from network
      })
  );
});

  