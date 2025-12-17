import ChatBox from "./components/ChatBox"
import ChatList from "./components/ChatList"
import Login from "./components/Login"
import Navlinks from "./components/Navlinks"
import Register from "./components/Register"
import SearchModel from "./components/SearchModel"


function App() {
 

  return (
  <>
  <div className="flex lg:flex-row flex-col items-start w-[100%]" >
    <Navlinks />
  <ChatList />
  <ChatBox />
  </div>
  



<div>
  {/* <Login />  */}
  
  {/* <Register /> */}


</div>



  {/* <SearchModel /> */}
  
  </>
  )
}

export default App
