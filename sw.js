var cacheID="mws-restaurant-stage-1-V3";

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheID).then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/restaurant.html",
                "/css.styles.css",
                "/js/",
                "js/dbhelper.js",
                "/js/main.js",
                "/js/restarant_info.js",
                "/js/register.js"
            ])
            .catch(error => {
                console.log("Caches open failed: " + error);
            });
        })
    );
});

self.addEventListener("fetch", event => {
    let cacheRequest = event.request;
    let cacheUrlObj = new URL(event.request.url);
    if (event.request.url.indexOf("restaurant.html") > -1) {
        const cacheURL = "restaurant.html";
        cacheRequest = new Request(cacheURL);        
    }
    if (cacheUrlObj.hostname !== "localhost") {
        event.request.mode = "no-cors";
    }

    event.respondWith(
        caches.match(cacheRequest).then(response => {
            return (
                response ||
                fetch(event.request)
                .then(fetchResponse => {
                    return caches.open(cache.ID).then(cache => {
                        cache.put(event.request. fetchResponse.clone());
                        return fetchResponse;
                    });
                })
                .catch(error => {
                    if (event.request.url.indexOf(".jpg") > -1) {
                        return caches.match("/img/na.png");          
                    }
                    return new Response("Application is not connected to the Internet", {
                        status: 404,
                        statusText: "Application is not connected to the Internet"
                    });
                })
            );
        })
    );
});