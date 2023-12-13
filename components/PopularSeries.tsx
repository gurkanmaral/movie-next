"use client";
import Link from 'next/link'
import PopularCard from './PopularCard'
import { useEffect, useState } from 'react';
import { fetchData } from '@/utils/fetchData';
import PopularSeriesCard from './PopularSeriesCard';



const PopularSeries = () => {

  const [popularSeries,setPopularSeries] = useState<Series[]>([]);

  const API_KEY = '8c4e79ed80f9f915a30a2faece2daa0f'
  const baseUrl = 'https://api.themoviedb.org/3'


 useEffect(() => {
    const fetchPopularSeries = async () => {
      try {
        const response = await fetchData<SeriesResponse>(
          `${baseUrl}/trending/tv/week?api_key=${API_KEY}&language=en-US`
        );
        const popularSeries = response.results;
        setPopularSeries(popularSeries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPopularSeries();
  }, []); 
  

  return (
    <div className='flex flex-col mt-[50px] gap-[15px]'>
        <div className='font-semibold flex w-full md:w-[1050px] m-auto h-[30px] relative font-thebold border-b  text-[23px]'>
                <Link href="/films">
                <h2>POPULAR SERIES</h2>
                </Link>        
        </div>
        <div className='flex flex-col md:flex-row gap-[10px] m-auto '>
            {popularSeries.slice(0,6).map((serie)=>(
              <PopularSeriesCard
              key={serie.id}
              serie={serie}
              isMovie={false}
              />
            ))}
        </div>

    </div>
  )
}

export default PopularSeries