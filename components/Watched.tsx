"use client";
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { watchMovie } from '@/lib/actions/user.actions';
import { usePathname } from 'next/navigation';

interface WatchedProps {
    watched:string[];
    numberId:number;
    userId:string;
    type:string;
}


const Watched = ({numberId,userId,type,watched}:WatchedProps) => {

    const isCurrentUserWatched = watched.includes(userId)

    const pathname = usePathname()

  return (
    <div>
       {!isCurrentUserWatched ? (
                <div 
                onClick={async()=>{
                  await watchMovie(numberId,userId,type,pathname)
                }} 
                className='flex items-center justify-start gap-[10px]  w-full cursor-pointer'>
                  <RemoveRedEyeIcon style={{ width: '40px', height: '40px' }}/>
                      <span>Watch</span>
                  </div>  ) : (
                    <div 
                    onClick={async()=>{
                      await watchMovie(numberId,userId,type,pathname)
                    }} 
                    className='flex items-center justify-start gap-[10px] cursor-pointer'>
                    <RemoveRedEyeIcon  style={{ width: '40px', height: '40px' }} className='text-[#00e054]' />
                        <span>Watched</span>
                    </div>
                  )
                  }

    </div>
  )
}

export default Watched