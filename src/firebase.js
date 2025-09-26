import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBO4ojQn3hwKuBRm42WnOwxXzLsEUMB5aQ",
  authDomain: "mining-4c166.firebaseapp.com",
  projectId: "mining-4c166",
  storageBucket: "mining-4c166.firebasestorage.app",
  messagingSenderId: "813797135921",
  appId: "1:813797135921:web:6b077ab68269229861e710",
  measurementId: "G-9PNZNM4XB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };