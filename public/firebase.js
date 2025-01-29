// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getMessaging, onMessage } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv04Ln56oCmAYTrDNL5tTjlPTiuCJKp5Q",
  authDomain: "clirclify.firebaseapp.com",
  projectId: "clirclify",
  storageBucket: "clirclify.appspot.com",
  messagingSenderId: "376223893078",
  appId: "1:376223893078:web:72db34e8798bc220d91df7",
  measurementId: "G-ZVSZ92QF61"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const onMessage1 = onMessage;

