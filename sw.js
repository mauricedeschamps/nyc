const CACHE_NAME = 'nyc-guide-v1';
const urlsToCache = [
  '/',
  'index.html',
  '/image/IMG_20250721_192101_(192_x_192_ピクセル).jpg',
  '/image/IMG_20250721_192133_(512_x_512_ピクセル).jpg'
  // 必要に応じて他のアセット（画像、CSSなど）を追加
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
