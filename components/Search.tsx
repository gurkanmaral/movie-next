"use client";
import { fetchData } from '@/utils/fetchData';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface MyComponentProps {
  page: number;
  results: TVSeriesItem[];
  total_pages: number;
  total_results: number;
}
interface TVSeriesItem {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

const Search = ({searchParam,serializedUsers}:SearchProps) => {

  const [movies, setMovies] = useState<MyComponentProps>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [tvSeries, setTvSeries] = useState<MyComponentProps>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
    const API_KEY = '8c4e79ed80f9f915a30a2faece2daa0f'
    const baseUrl = 'https://api.themoviedb.org/3'

    useEffect(()=>{
        const fetchSearchedMovies = async()=>{
          try {
              const response: MyComponentProps= await fetchData(`${baseUrl}/search/movie?api_key=${API_KEY}&query=${searchParam}`)
              const fetchedMoviesData = response
              setMovies(fetchedMoviesData)
          } catch (error) {
            console.log(error)
          }
        }
        fetchSearchedMovies()
      },[searchParam])
    
    
      useEffect(()=>{
        const fetchSearchedSeries = async()=>{
          try {
            const response: MyComponentProps = await fetchData(`${baseUrl}/search/tv?api_key=${API_KEY}&query=${searchParam}`)
            const fetchedMoviesData = response
            setTvSeries(fetchedMoviesData)
          } catch (error) {
            console.log(error)
          }
        }
        fetchSearchedSeries()
        
      },[searchParam])


  return (
    <div className=' max-w-5xl mx-auto pt-10 min-h-screen flex flex-col'>
        <div className=''>
            <h1>
              Search results for: <span className='text-white'>{searchParam}</span>
            </h1>
        </div>
        <div>
            <h1 className='text-white text-[22px] mt-10'>
                Users
            </h1>
            <div className='border-t border-[#456] grid grid-cols-8 gap-4 pt-5  '>
            {serializedUsers.map((user)=>(
              <Link href={`/profile/${user.id}`} key={user.id} className='col-span-1 flex flex-col  justify-center'>
                    <div className='flex  items-center justify-center'>
                        <img src={user.image === "" ? '/assets/user.png' : user.image} alt="" className='rounded-[50%] w-[100px] h-[100px]' />
                    </div>
                    <div className='flex items-center justify-center '>
                      <p>
                        {user.name}
                      </p>
                    </div>
              </Link>
            ))}
            </div>
        </div>
        <div>
            <h1 className='text-white text-[22px] mt-10'>
                FILMS
            </h1>
            <div className='grid grid-cols-5 gap-4 pt-5 border-t border-[#456] '>
                {movies?.results?.map((item)=>(
                    <Link  
                    href={`/movie-details/${item.id}`} key={item.id} 
                    className='col-span-1 rounded-[5px] overflow-hidden border border-[#abcdef] border-solid border-opacity-25 hover:border-opacity-70 transition-all  adding-shadow '>
                          <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="" className=" objcer-cover w-full h-full "  />
                    </Link>
                ))}
            </div>
        </div>
        <div className='mt-10'>
            <h1 className='text-white text-[22px]'>
                SERIES
            </h1>
            <div className='grid grid-cols-5 gap-4 pt-5 border-t border-[#456]' >
            {tvSeries?.results?.map((item)=>(
                    <Link href={`/serie-details/${item.id}`} key={item.id} 
                    className='col-span-1 rounded-[5px] overflow-hidden border  border-[#abcdef] border-solid border-opacity-25 hover:border-opacity-70 transition-all  adding-shadow '>
                          <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="" className=" objcer-cover w-full h-full"  />
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Search