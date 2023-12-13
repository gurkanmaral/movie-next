"use client";
import { useState,useEffect} from 'react';
import { fetchData } from '@/utils/fetchData';
import Image from 'next/image'
import Link from 'next/link'




const New = () => {

  const [inTheaters,setInTheaters] = useState<Film[]>([]);
  const [onAir,setOnAir] = useState<Series[]>([]);

  const API_KEY = '8c4e79ed80f9f915a30a2faece2daa0f'
  const baseUrl = 'https://api.themoviedb.org/3'

  useEffect(() => {
    const fetchPopularSeries = async () => {
      try {
        const response = await fetchData<SeriesResponse>(
          `${baseUrl}/tv/on_the_air?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_origin_country=US`
        );
        const popularSeries = response.results;
        setOnAir(popularSeries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPopularSeries();
  }, []); 
  
  useEffect(() => {
    const fetchPopularSeries = async () => {
      try {
        const response = await fetchData<FilmsResponse>(
          `${baseUrl}/movie/upcoming?api_key=${API_KEY}&language=en-US`
        );
        const popularSeries = response.results;
        setInTheaters(popularSeries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPopularSeries();
  }, []); 
  const filteredMovies = inTheaters?.slice(0,10)
  const filteredSeries = onAir?.slice(0,10)
  return (
    <div className='w-[70%] mt-[50px] flex flex-col md:flex-row p-[5px] gap-[10px] m-auto '>
      <div className='flex-1 flex flex-col gap-[20px]'>
        <div className=''>
          <h1>In Theaters</h1>
        </div>
        <div className='flex flex-col gap-[10px]'>
          {filteredMovies?.map((movie)=>(
            <div className='flex flex-col items-center gap-[5px]' key={movie.id}> 
            <Link href="/">
              <Image 
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" 
              width={150}
              height={200}
              className='rounded-[10px]'
              />
              </Link>                
              <span>{movie.title}</span>
          </div>
          ))} 
        
        </div>
      </div>
      <div className='flex-1 flex flex-col gap-[20px]'>
        <div>
          <h1>Series On the Air</h1>
        </div>
        <div className='flex flex-col gap-[10px]'>
          {filteredSeries?.map((serie)=>(
               <div className='flex flex-col items-center gap-[5px]' key={serie.id}> 
               <Link href="/">
                 <Image 
                 src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`} alt="" 
                 width={150}
                 height={200}
                 className='rounded-[10px]'
                 />
                 </Link>                
                 <span>{serie.name}</span>
             </div>
          ))}             
        </div>
      </div>
    </div>
  )
}

export default New