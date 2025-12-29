import { useEffect, useState } from "react";
import ChatBox from "./components/ChatBox";
import ChatList from "./components/ChatList";
import Login from "./components/Login";
import Navlinks from "./components/Navlinks";
import Register from "./components/Register";
// import SearchModel from "./components/SearchModel";
import { auth } from "./firebase/firebase";

function App() {
  const [islogin, setIslogin] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div className="flex lg:flex-row flex-col items-start w-full">
          <Navlinks />
          <ChatList />
          <ChatBox />
        </div>
      ) : (
        <div>
          {islogin ? (
            <Login islogin={islogin} setIslogin={setIslogin} />
          ) : (
            <Register islogin={islogin} setIslogin={setIslogin} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
