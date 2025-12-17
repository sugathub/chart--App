import React from 'react'
import { RiSearchLine } from 'react-icons/ri'

const SearchModel = () => {
  return (
    <div>
      <button className="bg-[#D9F2ED] w-[35px] h-[35px] p-2 flex items-center justify-center rounded-lg cursor-pointer">
        <RiSearchLine color="#01AA85" className="w-[18px] h-[18px]" />
      </button>
    </div>
  )
}

export default SearchModel
