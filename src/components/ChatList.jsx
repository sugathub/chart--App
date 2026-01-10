import React, { useEffect, useMemo, useState } from "react";
import defaultAvatar from "../assets/defaultAvatar.png";
import { RiMore2Fill } from "react-icons/ri";
import SearchModel from "./SearchModel";
import { formatTimestamp } from "../utils/formatTimestamp";
import { db, listenForChats } from "../firebase/firebase";
import { auth } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ChatList = ({ setSelectedUser }) => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // ✅ Track auth state to get current user ID safely
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) setCurrentUserId(currentUser.uid);
      else setCurrentUserId(null);
    });
    return unsubscribeAuth;
  }, []);

  // ✅ Listen for current user's document after currentUserId is available
  useEffect(() => {
    if (!currentUserId) return;

    const userDocRef = doc(db, "users", currentUserId);
    const unsubscribeUser = onSnapshot(userDocRef, (docSnap) => {
      setUser(docSnap.data());
    });

    return unsubscribeUser;
  }, [currentUserId]);

  // ✅ Listen for chats
  useEffect(() => {
    const unsubscribeChats = listenForChats(setChats);
    return () => unsubscribeChats && unsubscribeChats();
  }, []);

  // ✅ Sort chats by latest message time
  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => {
      if (!a.lastMessageTimestamp || !b.lastMessageTimestamp) return 0;

      const aTime =
        a.lastMessageTimestamp.seconds +
        a.lastMessageTimestamp.nanoseconds / 1e9;

      const bTime =
        b.lastMessageTimestamp.seconds +
        b.lastMessageTimestamp.nanoseconds / 1e9;

      return bTime - aTime;
    });
  }, [chats]);

  // ✅ Handle selecting a chat
  const startChat = (otherUser) => {
    setSelectedUser(otherUser);
  };

  return (
    <section className="relative hidden lg:flex flex-col bg-white h-screen w-full md:w-[600px]">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-[#676767b9] p-4 sticky top-0 z-[100] bg-white">
        <div className="flex items-center gap-3">
          <img
            src={user?.image || defaultAvatar}
            className="w-[44px] h-[44px] rounded-full object-cover"
            alt="user"
          />
          <div>
            <h3 className="font-semibold text-[#2A3D39] text-[17px]">
              {user?.fullName || "ChatFrik user"}
            </h3>
            <p className="text-[#2A3D39] text-[15px] font-light">
              {user?.username || "ChatFrik username"}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="bg-[#D9F2ED] w-[35px] h-[35px] flex items-center justify-center rounded-lg"
        >
          <RiMore2Fill className="w-[20px] h-[20px] text-[#01AA85]" />
        </button>
      </header>

      {/* Messages Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[#2A3D39]">
            Messages <span className="font-normal">({chats.length})</span>
          </h3>
          <SearchModel startChats={startChat} />
        </div>
      </div>

      {/* Chat List */}
      <main className="flex-1 overflow-y-auto">
        {sortedChats.map((chat) => {
          const otherUser =
            chat?.users?.find((u) => u.uid !== currentUserId) || {};

          return (
            <button
              key={chat.id} // ✅ Stable key
              type="button"
              onClick={() => startChat(otherUser)}
              className="flex items-start justify-between w-full border-b border-[#90902c62] px-5 py-3 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <img
                  src={otherUser.image || defaultAvatar}
                  className="w-[40px] h-[40px] rounded-full object-cover"
                  alt="user"
                />

                <div>
                  <h2 className="font-semibold text-[#2A3d39] text-left text-[17px]">
                    {otherUser.fullName || "ChatFrik User"}
                  </h2>
                  <p className="text-[#2A3D39] text-[14px] font-light truncate max-w-[220px]">
                    {chat.lastMessage || "No messages yet"}
                  </p>
                </div>
              </div>

              <p className="text-gray-400 text-[11px] whitespace-nowrap">
                {formatTimestamp(chat.lastMessageTimestamp)}
              </p>
            </button>
          );
        })}
      </main>
    </section>
  );
};

export default ChatList;
