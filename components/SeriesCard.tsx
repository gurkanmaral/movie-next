import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Series {
    adult:boolean;
    backdrop_path: string;
    id: number;
    name:string;
    original_language: string;
    original_name:string;
    overview:string;
    poster_path: string;
    media_type:string;
    genre_ids:number[];
    popularity: number;
    first_air_date: string;
    vote_average:number;
    vote_count:number;
    origin_country:string[];
  }
  interface PopularCardProps{
   serie:Series;
  }
  


const SeriesCard = ({serie}:PopularCardProps) => {

  if (!serie) {
    
    return null;
  }

  const posterPath = serie.poster_path;
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/original/${posterPath}`
    : null;

  return (
    <Link href={`/serie-details/${serie.id}`}>
       <div className='flex flex-col relative group'>
           {posterUrl && <Image 
            src={posterUrl}
            alt=""
            width={200}
            height={300}
            className='film-img rounded-[10px] object-cover cursor-pointer transition-all duration-300 ease-linear'
            />}
            <div className='absolute bg-[#000000] top-[5px] right-[7px]
            rounded-[50%] w-[40px] h-[40px] flex items-center justify-center font-heavitas text-[#fff] shadow-[#000000] shadow-md '>
                <span>{serie.vote_average.toFixed(1)}</span>
            </div>
       </div>


    </Link>
  )
}

export default SeriesCard