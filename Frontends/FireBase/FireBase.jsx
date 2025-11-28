// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "vingo-de231.firebaseapp.com",
  projectId: "vingo-de231",
  storageBucket: "vingo-de231.firebasestorage.app",
  messagingSenderId: "666996834572",
  appId: "1:666996834572:web:06568da46ff4197b964929",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
