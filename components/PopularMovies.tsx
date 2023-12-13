"use client";

import Link from 'next/link'

import PopularCard from './PopularCard'
import { useState,useEffect} from 'react';
import { fetchData } from '@/utils/fetchData';



const PopularMovies = () => {

  const [popularMovies, setPopularMovies] = useState<Film[]>([])
 

  const API_KEY = '8c4e79ed80f9f915a30a2faece2daa0f'
  const baseUrl = 'https://api.themoviedb.org/3'

  

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetchData<FilmsResponse>(
          `${baseUrl}/trending/movie/week?api_key=${API_KEY}&language=en-US`
       );
       const popularSeries = response.results;
        setPopularMovies(popularSeries);
      } catch (error) {
       console.error(error);
     }
    };
    fetchPopularMovies();
  }, []);
  

  

  return (
    <div className='flex flex-col mt-[50px] gap-[15px] '>
        <div className='text-[23px] flex w-full md:w-[1050px] m-auto h-[30px] relative font-thebold border-b  '>
                <Link href="/films">
                <h2>POPULAR MOVIES</h2>
                </Link>        
        </div>
        <div className='flex flex-col md:flex-row gap-[10px] m-auto '>
           {popularMovies.slice(0,6).map((movie)=>(
            <PopularCard 
            key={movie.id}
            movie={movie}
            isMovie={true}
            />
           ))}
        </div>

    </div>
  )
}

export default PopularMovies