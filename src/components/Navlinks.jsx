import React from 'react'
import logo from "../assets/logo.png"
import { RiArrowDownSLine, RiBardLine, RiChatAiLine, RiFile4Line, RiFolderUserLine, RiNotificationLine, RiShutDownLine } from "react-icons/ri";


const Navlinks = () => {
  return (
    <section className='sticky lg:static top-0  flex items-center lg:items-start lg:justify-start h-[7vh] lg:h-[100vh] w-[100%] lg:w-[150px] py-8 lg:py-0 bg-[#01AA85] '>
      <main className='flex lg:flex-col items-center lg:gap-10 justify-between lg:px-0 w-[100%] '>
        <div className='lex items-start justify-center lg:border-b border-b-1 border-[#d9fa03d7] lg:w-[100%] p-4  ' >
          <span className='flex items-center justify-center  cursor-pointer  ' >
             <img src={logo} className='w-[60px] h-[56px] object-contain'  alt="" />
           </span>

        </div>
        <ul className='flex lg:flex-col flex-row items-center gap-7 md:gap-10 px-2 md:px-0 ' >
          <li>
              <button className='lg:text-[28px] text-[22px] cursor-pointer '>
                <RiChatAiLine color='#d9fa03d7' />
              </button>     
           </li>
            <li>
              <button className='lg:text-[28px] text-[22px] cursor-pointer '>
                <RiFolderUserLine color='#d9fa03d7' />
              </button>     
           </li>
            <li>
              <button className='lg:text-[28px] text-[22px] cursor-pointer '>
                <RiNotificationLine color='#d9fa03d7' />
              </button>     
           </li> 
           <li>
              <button className='lg:text-[28px] text-[22px] cursor-pointer '>
                <RiFile4Line color='#d9fa03d7' />
              </button>     
           </li> 
           <li>
              <button className='lg:text-[28px] text-[22px] cursor-pointer '>
                <RiBardLine color='#d9fa03d7' />
              </button>     
           </li> 
           <li>
              <button className='lg:text-[28px] text-[22px] cursor-pointer '>
                <RiShutDownLine color='ff0000' />
              </button>     
           </li> 
           
               
           
        </ul>
         <button className=' block lg:hidden lg:text-[28px] text-[22px] cursor-pointer '>
                <RiArrowDownSLine color='#ffff' />
              </button>   
      </main>
    </section>
  )
}

export default Navlinks