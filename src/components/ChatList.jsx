import React from 'react'
import defaultAvatar from "../assets/defaultAvatar.png"
import { RiMore2Fill } from 'react-icons/ri'
import SearchModel from './SearchModel'

const ChatList = () => {
  return (
    <section className="relative hidden lg:flex flex-col bg-white h-screen w-full md:w-[600px]">

      {/* Top Header */}
      <header className="flex items-center justify-between w-full border-b border-[#676767b9] p-4 sticky top-0 z-[100] bg-white">
        <main className="flex items-center gap-3">
          <img
            src={defaultAvatar}
            className="w-[44px] h-[44px] object-cover rounded-full"
            alt="user"
          />
          <span>
            <h3 className="font-semibold text-[#2A3D39] text-[17px]">
              Chartfrik User
            </h3>
            <p className="font-light text-[#2A3D39] text-[15px]">
              @chatfrik
            </p>
          </span>
        </main>

        <button className="bg-[#D9F2ED] w-[35px] h-[35px] p-2 flex items-center justify-center rounded-lg cursor-pointer">
          <RiMore2Fill color="#01AA85" className="w-[20px] h-[20px]" />
        </button>
      </header>

      {/* Messages Header */}
      <div className="p-4">
        <header className="flex items-center justify-between">
          <h3 className="font-semibold text-[#2A3D39]">
            Messages <span className="font-normal">({0})</span>
          </h3>
          <SearchModel />
        </header>
      </div>

      <main>

        
      </main>

    </section>
  )
}

export default ChatList
