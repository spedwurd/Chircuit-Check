// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSZrBkdh9MQ6Xni6F0sVlnJEM2hZI2-6s",
  authDomain: "chircuit-check.firebaseapp.com",
  projectId: "chircuit-check",
  storageBucket: "chircuit-check.firebasestorage.app",
  messagingSenderId: "176346552887",
  appId: "1:176346552887:web:50185028d6ae237cbe3db2",
  measurementId: "G-8Q66WCZSC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log('I FUCKING DELETED IT!')
