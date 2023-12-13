"use client";
import React from 'react'
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { addSeriesFavorite } from '@/lib/actions/user.actions';
import { usePathname } from 'next/navigation';


const Favorites = ({numberId,userId,type,favorite}:FavoritesProps) => {

    const isCurrentUserFav = favorite.includes(userId)
    const pathname = usePathname()
  return (
    <div className=''>
        { !isCurrentUserFav ? (
                            <div 
                            onClick={async()=>{
                              await addSeriesFavorite(numberId,userId,type,pathname)
                            }} 
                            className='flex items-center justify-start gap-[10px] cursor-pointer'>
                            <StarBorderPurple500OutlinedIcon style={{ width: '40px', height: '40px' }} />
                            <span>Add to Favorites</span>
                            </div>
                      
                  ) : (           
                      <div
                      onClick={async()=>{
                        await addSeriesFavorite(numberId,userId,type,pathname)
                      }} 
                      className='flex items-center justify-start gap-[10px] cursor-pointer'>
                      <StarOutlinedIcon style={{ width: '40px', height: '40px' }} className='text-[#4c96f8]'/>
                      <span>Remove from Favorites</span>
                      </div>
                  )}           

    </div>
  )
}

export default Favorites