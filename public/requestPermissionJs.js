import { messaging, onMessage1 } from "/firebase.js";
import { getToken } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging.js";
import { sendNotification } from "./sendNotification.js";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistration().then(function (registration) {
    if (!registration) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js", {
          scope: "/firebase-cloud-messaging-push-scope",
        })
        .then(function (registration) {
          console.log( "Service Worker registered with scope:", registration.scope);
        })
        .catch(function (err) {
          console.log("Service Worker registration failed:", err);
        });
    }
  });
}

onMessage1(messaging, (payload) => {
  new Notification(payload.notification.title, {
    body: payload.notification.body,
  });
});

async function requestPermission() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const vapidKey =
      "BF11U9EpkVQcmf2aLEs75bS7KkL88hFNWpllB32o_1Kh2bo4ZQaVH4VHMqVCbVQYyCCJ0LCLIfSacCDiwNRC_Vg";
    const token = await getToken(messaging, { vapidKey: vapidKey });

    // ----- Fetching save-token route to save token into database

    await fetch("/save-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

  } else if (permission === "denied") {
    Toastify({
      text: "You have denied notifications!",
      duration: 3000, // Toast duration in milliseconds
      close: true, // Enable close button
      gravity: "top", // Position top or bottom
      position: "center", // Position left, right, or center
      backgroundColor: "linear-gradient(to right, #4facfe, #00f2fe)", // Gradient background
      stopOnFocus: true, // Stop on hover
    }).showToast();
  }
}

requestPermission();
