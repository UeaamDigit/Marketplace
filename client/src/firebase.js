// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate13.firebaseapp.com",
  projectId: "mern-estate13",
  storageBucket: "mern-estate13.appspot.com",
  messagingSenderId: "77222526660",
  appId: "1:77222526660:web:d13f7748a35c1d41b1d391",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
