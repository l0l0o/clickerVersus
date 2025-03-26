// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGlrq564Mv-4kx_gDMhsHDQzuCSmTi35Q",
  authDomain: "clicker-48baa.firebaseapp.com",
  projectId: "clicker-48baa",
  storageBucket: "clicker-48baa.firebasestorage.app",
  messagingSenderId: "966742771510",
  appId: "1:966742771510:web:0dbc02edcaa2b594745597",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
