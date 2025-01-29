importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js')
// Your Firebase configuration (same as in your client.js)
const firebaseConfig = {

  apiKey: "AIzaSyCv04Ln56oCmAYTrDNL5tTjlPTiuCJKp5Q",
  authDomain: "clirclify.firebaseapp.com",
  projectId: "clirclify",
  storageBucket: "clirclify.appspot.com",
  messagingSenderId: "376223893078",
  appId: "1:376223893078:web:72db34e8798bc220d91df7",
  measurementId: "G-ZVSZ92QF61"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
}





