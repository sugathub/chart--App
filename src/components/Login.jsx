import React, { useState } from 'react'
import { FaSignInAlt } from "react-icons/fa";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

const Login = ({ islogin, setIslogin }) => {

  const [userData, setUserData] = useState({email: "", password: ""});
  const [isloading, setIsloading] = useState(false);

  const handlechangeUserData = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleeAuth = async () => {
    setIsloading(true);
    try {
      await signInWithEmailAndPassword(auth, userData?.email, userData?.password);
      console.log(userData); // correct place to log
    } catch (error) {
      console.log(error);
      alert(error.message)
      
  console.error("LOGIN ERROR:");
  console.error("Code:", error.code);
  console.error("Message:", error.message);


    }
    finally{
      setIsloading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-[100vh] background-image">
      <div className="bg-white shadow-lg p-5 rounded-xl h-[27rem] w-[20rem] flex flex-col justify-center items-center">

        <div className="mb-10">
          <h1 className="text-center text-[28px] font-bold">Sign In</h1>
          <p className="text-center text-sm text-gray-400">
            Welcome back, login to continue
          </p>
        </div>

        <div className="w-full">
          <input
            name="email"
            onChange={handlechangeUserData}
            type="email"
            className="border border-green-200 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 font-medium outline-none placeholder:text-[#00493958]"
            placeholder="Email"
          />

          <input
            name="password"
            onChange={handlechangeUserData}
            type="password"
            className="border border-green-200 w-full p-2 rounded-md bg-[#01aa851d] text-[#004939f3] mb-3 font-medium outline-none placeholder:text-[#00493958]"
            placeholder="Password"
          />
        </div>

        <div className="w-full">
          <button
           disabled={isloading}
            onClick={handleeAuth}
            className="bg-[#01aa85] text-white font-bold w-full p-2 rounded-md flex items-center gap-2 justify-center cursor-pointer "
          >
           {isloading ? (

            <>
            Processing...
            </>
           ):(<>
            Login <FaSignInAlt />
           
           </>)}
          </button>
        </div>

        <div className="mt-5 text-center text-gray-400 text-sm">
         
           <button  className='cursor-pointer ' onClick={()=>setIslogin(!islogin)} >Don't have an account yet? Sign Up</button>
        </div>

      </div>
    </section>
  );
};

export default Login;
