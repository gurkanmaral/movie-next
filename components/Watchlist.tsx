"use client";
import React from 'react'
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import { usePathname } from 'next/navigation';
import { addWatchlist } from '@/lib/actions/user.actions';


interface WatchedProps {
    watchlist:string[];
    numberId:number;
    userId:string;
    type:string;
}


const Watchlist = ({numberId,userId,type,watchlist}:WatchedProps) => {

    const isCurrentUserWatchlist = watchlist.includes(userId);

    const pathname = usePathname()

  return (
    <div>
        {!isCurrentUserWatchlist ? (
                  <div 
                  onClick={async()=>{
                    await addWatchlist(numberId,userId,type,pathname)
                  }} 
                  className='flex items-center justify-start gap-[10px] cursor-pointer'>
                  <MoreTimeOutlinedIcon style={{ width: '40px', height: '40px' }}
                    />  
                      <span>Add to watchlist</span>
                  </div>) : (
                    <div 
                    onClick={async()=>{
                      await addWatchlist(numberId,userId,type,pathname)
                    }} 
                    className='flex items-center justify-start gap-[10px] cursor-pointer'>
                  <MoreTimeOutlinedIcon style={{ width: '40px', height: '40px' }} className='text-[#209ce4]'
                    />  
                      <span>Remove to watchlist</span>
                  </div>
                  )}
    </div>
  )
}

export default Watchlist