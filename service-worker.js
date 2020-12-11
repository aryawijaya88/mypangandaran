const CACHE_NAME = "pangandaran";
var urlsToCache = [
  "/",
  "https://fonts.googleapis.com/css?family=Roboto&display=swap",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff2",
  "/nav.html",
  "/manifest.json",
  "/index.html",
  "/pages/home.html",
  "/pages/tentang.html",
  "/pages/hotel.html",
  "/pages/wisata.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/sw-register.js",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/asset/header.jpg",
  "/asset/wisata1.jpg",
  "/asset/wisata2.jpg",
  "/asset/wisata3.jpg",
  "/asset/wisata4.jpg",
  "/asset/hotel1.jpeg",
  "/asset/hotel2.jpeg",
  "/asset/hotel3.jpeg",
  "/asset/hotel4.jpeg",
  "/asset/hotel5.jpeg",
  "/asset/hotel6.jpeg"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Using asset from cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Load asset from server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
});
  
self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " deleted");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });