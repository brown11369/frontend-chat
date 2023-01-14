// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi6Fc6nY9NughT6ynE9LUcKKglNwakguc",
  authDomain: "chat-app-87726.firebaseapp.com",
  projectId: "chat-app-87726",
  storageBucket: "chat-app-87726.appspot.com",
  messagingSenderId: "14331402561",
  appId: "1:14331402561:web:c479420428cdd5399ca9c0",
  measurementId: "G-S5PQHJEX1K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);