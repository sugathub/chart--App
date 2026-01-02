import React from 'react'
import { RiSearchLine } from 'react-icons/ri'
import defaultAvatar from "../assets/defaultAvatar.png"
import { FaXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";


const SearchModel = () => {
  return (
    <div>
      <button className="bg-[#D9F2ED] w-[35px] h-[35px] p-2 flex items-center justify-center rounded-lg cursor-pointer">
        <RiSearchLine color="#01AA85" className="w-[18px] h-[18px]" />
      </button>
       <div className="fixed inset-0 z-[100] flex justify-center items-center bg-[#00170cb7]" >
        <div className='relative p-4 w-full max-w-md max-h-full  ' >
          <div className='relative bg-[#01AA85] w-[100%] rounded-md shadow-lg ' >
            <div className='flex items-center justify-between p-4 md:p-5 border-b border-gray-300 ' >
              <h3 className='text-xl font-semibold text-gray-900  ' >Search Chat </h3> 
               <button className=' text-white bg-transparent hover:bg-[#d9f2ed] hover:text-[#01AA85]  rounded-lg text-sm  w-8 h-8 inline-flex justify-center items-center cursor-pointer ' >
                  <FaXmark size={20} />
                 
                </button>
            </div>
            <div className='p-4 md:p-5' >
              <div className='space-y-4' >
                <div className='flex gap-2'>
                  <input type="text" className=' bg-white border border-gray-300 text-gray-900 text-sm rounded-lg  outline-none w-full p-2.5 ' />
                  <button className='bg-green-900 text-white px-3 py-2 rounded-lg cursor-pointer  ' >
                    <FaSearch />
                  </button>
                </div>
              </div>
              <div className='mt-6  ' >
                <div className='flex  items-start gap-3 bg-[#15eabc34] p-2 rounded-lg cursor-pointer border border-[#ffffff20] shadow-lg' >
                  <img src={defaultAvatar} className='h-[40px] w-[40px] rounded-full '  alt="" />
                  <span>
                    <h2 className='p-0 font-semibold text-white text-[18px]' >Chatfrik User</h2>
                    <p className=' text-[13px] text-white '>@chatfrik</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>

    </div>
  )
}

export default SearchModel
