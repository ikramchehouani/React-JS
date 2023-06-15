self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
  
        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
  
          const responseToCache = response.clone();
  
          caches.open("capsules").then((cache) => {
            cache.put(event.request, responseToCache);
          });
  
          return response;
        });
      })
    );
  });
  