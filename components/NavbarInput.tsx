"use client";
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import React from 'react'
import {useState} from "react";
import { useRouter } from "next/navigation";
const NavbarInput = () => {
  const [open,setOpen] = useState<boolean>(false)
  const [searchValue,setSearchValue] = useState<string>("")

   const router = useRouter()

const handleClick = (e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()

  if (searchValue) {
    const decodedSearchValue = decodeURIComponent(searchValue);
    router.push(`/search/${decodedSearchValue}`);
    setSearchValue("");
    setOpen(false);
  }
}

  return (
    <div className="flex gap-2 items-center font-graphikBold">
         { open ? <IoMdClose  onClick={()=>setOpen(false)} className="cursor-pointer w-6 h-6" />
            : <IoSearch    
            onClick={()=>setOpen(true)}      
            className="cursor-pointer  w-6 h-6 hover:text-[#fff]"   
            />
      }
       <form className='flex items-center justify-center gap-1 transition-all duration-300 '>
        
       {open && 
       <form className="bg-[#fff] rounded-[5px] items-center flex justify-center p-1 " onClick={handleClick}>
          <input type="text"
            placeholder='Search'
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            className={`border-none  bg-[#fff] outline-none  text-[#000000] text-[12px] transition-opacity duration-300 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
            />
            <button type="submit">
              <IoSearch className="w-6 h-6"  />
            </button>
        </form>
          }
          
      </form>
    </div>
   
  )
}

export default NavbarInput