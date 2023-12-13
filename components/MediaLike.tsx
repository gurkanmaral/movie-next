"use client";
import React from 'react'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { usePathname } from 'next/navigation';
import { likeMovie } from '@/lib/actions/user.actions';

interface WatchedProps {
    likes:string[];
    numberId:number;
    userId:string;
    type:string;
}


const MediaLike = ({numberId,userId,type,likes}:WatchedProps) => {

    const isCurrentUserLiked =likes.includes(userId);

    const pathname = usePathname()

  return (
    <div>
       {!isCurrentUserLiked ? ( 
                  <div 
                  onClick={async()=>{
                    await likeMovie(numberId,userId,type,pathname)
                  }} 
                  className='flex items-center justify-start gap-[10px] cursor-pointer'>               
                  <FavoriteBorderOutlinedIcon
                    style={{ width:'40px',height:'40px' }}     
                  />
                      <span>Like</span>
                  </div>
            ) : (
              <div 
              onClick={async()=>{
              await likeMovie(numberId,userId,type,pathname)
            }} 
              className='flex items-center justify-start gap-[10px] cursor-pointer'>               
              <FavoriteOutlinedIcon
                style={{ color: "red",width:'40px',height:'40px' }}     
          />
                  <span>Liked</span>
              </div>
                  )}

    </div>
  )
}

export default MediaLike