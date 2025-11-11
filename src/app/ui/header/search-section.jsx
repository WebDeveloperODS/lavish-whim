'use client'
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const SearchSection = () => {
      const [searchCall, setSearchCall] = useState(false)
      const [searchText, setSearchText] = useState('');

      return  <div className={`flex items-center gap-3 w-fit pl-2 ${searchCall ? 'bg-neutral-100/60 rounded-md shadow-sm shadow-neutral-400' : ''}`}>
            {
                  searchCall ? <IoIosCloseCircle onClick={() => setSearchCall(false)} className='h-6 w-auto text-neutral-500 cursor-pointer'/> : <FaSearch onClick={() => setSearchCall(true)} className='h-4 w-auto text-neutral-800 cursor-pointer' />
            }
            {
                  searchCall && <div className='w-full max-w-[250px]'>
                        <input type='text' name="searchText" id="searchText" value={searchText || ''} onChange={(e) => setSearchText(e.target.value)} className='w-full p-2 bg-transparent text-sm' placeholder='Search for products...' />
                  </div>
            }
      </div>
}

export default SearchSection