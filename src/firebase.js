// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoKWb6OzCcmCgVjkTDfj7Zb6X0WXV_tIc",
  authDomain: "ossp--liveon.firebaseapp.com",
  projectId: "ossp--liveon",
  storageBucket: "ossp--liveon.appspot.com",
  messagingSenderId: "111219942991",
  appId: "1:111219942991:web:eacda51dd7c07347996c3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;