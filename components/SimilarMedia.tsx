import Link from 'next/link';
import React from 'react'

interface SimilarProps{
    id:number;
    image:string;
    mediaType:string;
}

const SimilarMedia = ({image,id,mediaType}:SimilarProps) => {


    const posterPath = image
       
    let posterUrl = null
    if (posterPath) {
        posterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`
    }
  
 
  return (
    <Link href={mediaType === "serie" ? `/serie-details/${id}` : `/movie-details/${id}`} className='col-span-1 flex-col flex rounded-[5px]    cursor-pointer'>

        <img src={posterUrl || ""} className='rounded-[5px] border-[2px] border-transparent hover:border-white w-full h-full ' alt="" />

    </Link>
  )
}

export default SimilarMedia