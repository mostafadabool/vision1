// minimal service worker: app shell offline, live data always from network (MQTT)
const C = 'vision-v1';
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'])).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(fetch(e.request).then(r => { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); return r; }).catch(() => caches.match(e.request)));
});
