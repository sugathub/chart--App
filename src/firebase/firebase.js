// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firestore functions
import {
  getFirestore,
  collection,
  onSnapshot
} from "firebase/firestore";

// Import Auth
import { getAuth } from "firebase/auth";

// Firebase config
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

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ FIXED LISTENER
export const listenForChats = (setChats) => {
  const chatsRef = collection(db, "chats");

  const unsubscribe = onSnapshot(chatsRef, (snapshot) => {
    const chatList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredChats = chatList.filter(
      (chat) =>
        chat?.users?.some(
          (user) => user.email === auth.currentUser?.email
        )
    );

    setChats(filteredChats);
  });

  return unsubscribe;
};
