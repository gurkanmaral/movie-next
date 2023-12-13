import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Film {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface PopularCardProps {
  film: Film;
}



const FilmCard = ({film}:PopularCardProps) => {

  if (!film) {
    return null;
  }

  const posterPath = film.poster_path;
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/original/${posterPath}`
    : null;

  return (
    <Link href={`movie-details/${film.id}`}>
       <div className='flex flex-col relative group'>
           {posterUrl && <Image 
            src={posterUrl}
            alt=""
            width={200}
            height={300}
            className='film-img rounded-[10px] object-cover cursor-pointer transition-all duration-300 ease-linear'
            />}
            <div className='absolute bg-[#000000] top-[5px] right-[7px]
            rounded-[50%] w-[40px] h-[40px] flex items-center justify-center font-heavitas text-[#fff] shadow-[#000000] shadow-md'>
                <span>{film.vote_average.toFixed(1)}</span>
            </div>
       </div>


    </Link>
  )
}

export default FilmCard