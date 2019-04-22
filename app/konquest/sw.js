const CACHE_NAME = 'konquest';

const STATICS_TO_PRELOAD = [
	'index.html',
	'style.css',
	'app.js',
	'img/icon/32.png',
	'img/icon/64.png',
	'img/icon/128.png',
	'img/icon/256.png',
	'img/icon/512.png',
	'fonts/glyphicons-halflings-regular.ttf',
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
