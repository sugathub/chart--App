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
      (user) => user.uid === auth.currentUser?.uid
    )
);


    setChats(filteredChats);
  });

  return unsubscribe;
};


export const sendMessage = async (messageText, user1Id, user2Id) => {
  if (!user1Id || !user2Id) return;

  const chatId = [user1Id, user2Id].sort().join("_");
  const chatRef = doc(db, "chats", chatId);

  const user1Doc = await getDoc(doc(db, "users", user1Id));
  const user2Doc = await getDoc(doc(db, "users", user2Id));

  const user1Data = user1Doc.exists() ? user1Doc.data() : { fullName: "User1", image: "" };
  const user2Data = user2Doc.exists() ? user2Doc.data() : { fullName: "User2", image: "" };

  const chatDoc = await getDoc(chatRef);

  if (!chatDoc.exists()) {
    // Create chat if not exist
    await setDoc(chatRef, {
      users: [
        { uid: user1Id, fullName: user1Data.fullName, image: user1Data.image },
        { uid: user2Id, fullName: user2Data.fullName, image: user2Data.image },
      ],
      lastMessage: messageText,
      lastMessageTimestamp: serverTimestamp(),
    });
  } else {
    // Update last message
    await updateDoc(chatRef, {
      lastMessage: messageText,
      lastMessageTimestamp: serverTimestamp(),
    });
  }

  const messageRef = collection(db, "chats", chatId, "messages");
  await addDoc(messageRef, {
    text: messageText,
    senderId: auth.currentUser.uid,
    senderEmail: auth.currentUser.email,
    timestamp: serverTimestamp(),
  });
};


export const listenForMessages = (chatId, setMessages) => {
  const chatRef = collection(db, "chats", chatId, "messages");

  return onSnapshot(chatRef, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(messages);
  });
};


export { auth, db };