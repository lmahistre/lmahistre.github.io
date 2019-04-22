const CACHE_NAME = 'ghtd';

const STATICS_TO_PRELOAD = [
	'img/endturn.png',
	'img/icons/32.png',
	'img/icons/128.png',
	'img/icons/512.png',
	'style.css',
	'index.html',
	'app.js',
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(cache => cache.addAll(STATICS_TO_PRELOAD)
			.then(self.skipWaiting)
		)
	);
});

self.addEventListener('activate', function (event) {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.match(event.request).then(function (response) {
				return response || fetch(event.request).then(function(response) {
					if (event.request.method === 'GET' && event.request.cache !== 'no-store') {
						cache.put(event.request, response.clone());
					}
					return response;
				});
			});
		})
	);
});
