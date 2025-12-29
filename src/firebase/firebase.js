// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJktbw1ouYIkwou3a10kPeruGHboyF0qk",
  authDomain: "app-chat-acbd0.firebaseapp.com",
  projectId: "app-chat-acbd0",
  storageBucket: "app-chat-acbd0.firebasestorage.app",
  messagingSenderId: "411160165866",
  appId: "1:411160165866:web:996d42cfa7fedd619f8693",
  measurementId: "G-EZZL474K8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {auth,db}