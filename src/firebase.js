// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


//Esto lo puse hard coded, para que pueda probar la app.
const firebaseConfig = {
  apiKey: "AIzaSyCEbiAut7B9F8LqvUcsnNXKp_fUtQodxqI",
  authDomain: "proyectofinal-d4198.firebaseapp.com",
  projectId: "proyectofinal-d4198",
  storageBucket: "proyectofinal-d4198.firebasestorage.app",
  messagingSenderId: "483881217195",
  appId: "1:483881217195:web:923a26e79cda32b2d15bee",
  measurementId: "G-CK1X9JDM9W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);