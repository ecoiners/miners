// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhRiCvK-tDrdgYmMasKyeNSi7XIF8RFA4",
  authDomain: "ecoin-mining-53894.firebaseapp.com",
  projectId: "ecoin-mining-53894",
  storageBucket: "ecoin-mining-53894.firebasestorage.app",
  messagingSenderId: "150635254093",
  appId: "1:150635254093:web:74fdab564922fdabbce704"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};