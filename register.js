/*set up service worker*/

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
    .register("js/sw.js")
    .then(reg => {
        console.log("Service worker registration successful: + reg.scope");
    })
    .catch(error => {
        console.log("Registration failed: " + error);
    });
} 