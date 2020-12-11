if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker
                    .register("/service-worker.js")
                    .then(function () {
                        console.log("Service Worker registered");
                    })
                    .catch(function () {
                        console.log("Service Worker registration failed");
                    });
            });
        } else {
            console.log("Service Worker not support on this browser");
        }