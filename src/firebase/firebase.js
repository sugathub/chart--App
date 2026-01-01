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
  apiKey: "AIzaSyBAW0J8eyyPg2J_I4L7s4JDTvkSAN7lZ4Y",
  authDomain: "app-chat-native.firebaseapp.com",
  projectId: "app-chat-native",
  storageBucket: "app-chat-native.firebasestorage.app",
  messagingSenderId: "317570223182",
  appId: "1:317570223182:web:a858ea46e199121906871f",
  measurementId: "G-6YRCXLY50W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {auth,db}