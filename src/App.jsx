import { useEffect, useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatList from "./components/ChatList";
import Login from "./components/Login";
import Navlinks from "./components/Navlinks";
import Register from "./components/Register";
// import SearchModel from "./components/SearchModel";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import SearchModel from "./components/SearchModel";

function App() {
  const [islogin, setIslogin] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);


  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      onAuthStateChanged(currentUser);
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
       <div className="flex h-screen w-full overflow-hidden">
  <Navlinks />

  <ChatList
    isMobileChatOpen={isMobileChatOpen}
    setSelectedUser={(user) => {
      setSelectedUser(user);
      setIsMobileChatOpen(true);
    }}
  />

  <ChatBox
    selectedUser={selectedUser}
    setIsMobileChatOpen={setIsMobileChatOpen}
  />
</div>

      ) : (
        <div>
          {islogin ? (
            <Login islogin={islogin} setIslogin={setIslogin} />
          ) : (
            <Register islogin={islogin} setIslogin={setIslogin} />

          )}
        </div>
      )} <SearchModel />
    </div>
  );
}

export default App;
