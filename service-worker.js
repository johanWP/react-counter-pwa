const CACHE_ELEMENTS = [
    './',
    "https://unpkg.com/react@17/umd/react.development.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.development.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "./components/Contador.js"
];

const CACHE_NAME = 'v2_cache_contador_react';

const self = this;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            cache.addAll(CACHE_ELEMENTS).then(() => {
                self.skipWaiting();
            })
                .catch(e => { console.log (`Ojo con: ${e}`)})
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhiteList = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                    return Promise.all(
                        cacheNames.map((cacheName) => {
                            cacheWhiteList.indexOf(cacheName) === -1 && caches.delete(cacheName);
                        })
                    );
                }
            ).then( () => self.clients.claim() )
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((res) => {
                return res ? res : fetch(event.request)
            }
        )
    )
});