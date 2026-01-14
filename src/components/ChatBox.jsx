import React, { useEffect, useMemo, useRef, useState } from "react";
import defaultAvatar from "../assets/defaultAvatar.png";
import { RiSendPlaneFill } from "react-icons/ri";
import { messageData } from "../data/messageData";
import { formatTimestamp } from "../utils/formatTimestamp";
import { auth, sendMessage, listenForMessages } from "../firebase/firebase";
import logo from "../assets/logo.png"

const ChatBox = ({ selectedUser, setIsMobileChatOpen }) => {
  const [message, setMessages] = useState([]);
  const [messageText, sendMessageText] = useState("");


  const scrollRef = useRef(null);


const chatId =
  auth.currentUser && selectedUser
    ? [auth.currentUser.uid, selectedUser.uid].sort().join("_")
    : null;
  const user1 = auth?.currentUser;
  const user2 = selectedUser;
  const senderEmail = auth?.currentUser?.email;

  useEffect(() => {
  if (!chatId) return;
  return listenForMessages(chatId, setMessages);
}, [chatId]);


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [message]);

  const sortedMessage = useMemo(() => {
  return message
    .filter((msg) => msg?.timestamp?.seconds) // 🔥 REMOVE NULL TIMESTAMPS
    .sort((a, b) => {
      const aTime =
        a.timestamp.seconds + (a.timestamp.nanoseconds || 0) / 1e9;
      const bTime =
        b.timestamp.seconds + (b.timestamp.nanoseconds || 0) / 1e9;
      return aTime - bTime;
    });
}, [message]);



  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      sender: senderEmail,
      text: messageText,
      timestamp: {
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0,
      },
    };
sendMessage(messageText, user1?.uid, user2?.uid);

    
    sendMessageText("");
  };

  return (
    <>{
      selectedUser ? <section
    className={`
    flex flex-col
    h-screen w-full
    fixed lg:static
    top-0 left-0
    bg-[#e5f6f3]
    z-30
    ${!selectedUser ? "hidden lg:flex" : "flex"}
  `}
>

        {/* ✅ HEADER */}
        <header className="border-b border-gray-300 p-4 bg-white sticky flex items-center gap-3">
          <button
    onClick={() => setIsMobileChatOpen(false)}
    className="lg:hidden mr-3 text-xl font-bold"
  >
    ←
  </button>
          <img
            src={selectedUser?.image || defaultAvatar}
            alt="User"
            className="w-11 h-11 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              {selectedUser?.fullName || "Chatfrik User"}
            </h3>
            <p className="text-sm text-gray-500">   {selectedUser?.username || "Chatfrik User"}</p>
          </div>
        </header>

        {/* ✅ MESSAGES */}
       <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 pt-4 pb-24">

          {sortedMessage.map((msg, index) => (
            <div key={`${msg.timestamp.seconds}-${msg.sender}-${index}`}
>
              {msg.senderId === auth.currentUser.uid ? (
                <div className="flex justify-end mb-4">
                  <div>
                    <p className="bg-white p-4 rounded-lg shadow">
                      {msg.text}
                    </p>
                    <small className="text-gray-400 block text-right">
                      {msg?.timestamp ? formatTimestamp(msg.timestamp) : ""}
                    </small>

                  </div>
                </div>
              ) : (
                <div className="flex items-start mb-4 gap-2">
                  <img
                    src={defaultAvatar}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <div>
                    <p className="bg-white p-4 rounded-lg shadow">
                      {msg.text}
                    </p>
                    <small className="text-gray-400">
                      {formatTimestamp(msg.timestamp)}
                    </small>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ✅ INPUT */}
      <form
  onSubmit={handleSendMessage}
  className="sticky bottom-0 w-full flex items-center bg-white p-3 shadow-md m-2"
>

          <input
            value={messageText}
            onChange={(e) => sendMessageText(e.target.value)}
            className="flex-1 outline-none"
            placeholder="Write your message..."
          />
          <button type="submit" className="cursor-pointer">
            <RiSendPlaneFill color="#01AA85" />
          </button>
        </form>
      </section> :
        <section className="h-screen w-full bg-[#e5f6f3]">
          <div className="flex flex-col justify-center items-center h-[100vh]" >
            <img src={logo} width={100} alt="" />
            <h1 className="text-[30px] font-bold text-teal-700 mt-5 ">Wellcome to chatfrik</h1>
            <p>Connect and chat with friends easily, securely,fast and free </p>

          </div>
        </section>

    }

    </>
  );
};

export default ChatBox;
