"use client";
import { getOneUser } from '@/lib/actions/user.actions';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const navlinks = [
    {
      name:"Activity",
      href:"/activity",
    },
    {
      name:"Films",
      href:"/films",
    },
    {
      name:"Series",
      href:"/profile-series",
    },
    {
      name:"Watchlist",
      href:"/watchlist",
    },
    {
      name:"Reviews",
      href:"/reviews",
    },
    {
      name:"Likes",
      href:"/likes",
    },
  
  ]

const ProfileBar = () => {
    const [user,setUser] = useState<User| null>(null);
    const pathname = usePathname()
    const path= pathname.split("/")[1];
    
 
    
    const id = pathname.split("/")[2]; 
   
    

    const fetchUser = async(id:string)=>{

        const user = await getOneUser(id)

        return setUser(user)
        
    }
    useEffect(()=>{
        fetchUser(id) 
    },[id])

    if(!user){
      return (
        <p>Loading..</p>
      )
    }

 console.log(user)
  return (
   
      <div className='w-full md:max-w-5xl mx-auto rounded-[3px] bg-[#2c3440]  '>
        <div className='grid grid-cols-5'>
            <Link href={`/profile/${id.toString()}`} className='col-span-1  flex gap-2 items-center py-3 px-4 '>
                {user?.image ? <img src={user?.image} alt="" className='w-[24px] h-[24px] rounded-[50%]  avatar' /> :
                 <img src="/assets/user.png" alt="" className='w-[24px] h-[24px] rounded-[50%]  avatar' /> }
                <p className='text-[#fff] text-[14px] font-semibold'>{user?.name}</p>
            </Link>
            <div className='hidden md:flex col-span-3  gap-6  justify-center'>    
                {navlinks.map((link)=>(
                    <Link  href={`${link.href}/${id}`} key={link.name} className={`${link.href.includes(path)  ? "border-b border-[#00e054] " : ''} flex items-center justify-center`}>
                            <p className='text-[#9ab] text-[14px]'>{link.name}</p>
                    </Link>
                ))}
            </div>
            <div className='col-span-1 '>
                    
            </div>
        </div>

    </div>

    
  )
}

export default ProfileBar