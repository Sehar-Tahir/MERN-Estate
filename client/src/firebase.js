// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4caef.firebaseapp.com",
  projectId: "mern-estate-4caef",
  storageBucket: "mern-estate-4caef.firebasestorage.app",
  messagingSenderId: "612617841018",
  appId: "1:612617841018:web:91436a611d59e88a3f0ec3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);