// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firestore functions
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  addDoc, serverTimestamp,
  updateDoc
} from "firebase/firestore";


// Import Auth
import { checkActionCode, getAuth } from "firebase/auth";

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
 const auth = getAuth(app);
 const db = getFirestore(app);

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


export const sendMessage = async (messageText, chatId, user1, user2) =>{

  const chatRef = doc(db, "chats", chatId);

  const user1Doc = await getDoc(doc(db, "users", user1));
  const user2Doc = await getDoc(doc(db, "users", user2));

  console.log(user1Doc);
  console.log(user2Doc);

  const user1Data = user1Doc.data();
  const user2Data = user2Doc.data();


  const chatDoc = await getDoc(chatRef);
  if (!chatDoc.exists()) {
    await setDoc(chatRef, {
      users: [user1Data, user2Data],
      lastMessage: messageText,
      lastMessageTimestamp: serverTimestamp(),


    },
     { merge: true }
  );
  } else {
    await updateDoc(chatRef, {

      lastMessage: messageText,
      lastMessageTimestamp: serverTimestamp(),


    });

  }

  const messageRef = collection(db, "chats", chatId, "messages");

  await addDoc(messageRef, {
  text: messageText,
  sender: auth.currentUser.email,
  timestamp: serverTimestamp(),
});

}
export { auth, db };