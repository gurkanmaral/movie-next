"use client";
import useUser from '@/utils/useUser';
import { useSession } from 'next-auth/react';
import React from 'react'
import {useEffect, useState} from "react"

interface UserWatchlistProps{
    id:string;
    serializedWatchlist: WatchlistProps[];
}

interface WatchlistProps{
    _id:string;
    userId:string;
    mediaId:number;
    mediaType:string;
    createdAt:Date;
}

const UserWatchlist = ({id,serializedWatchlist}:UserWatchlistProps) => {

    const { data: session, status } = useSession();
    const user = useUser(session?.user?.email ||null)!
    const [combinedWatchlist,setCombinedWatchlist] = useState<userWatchedFilmsProps[]>([]);

    const API_KEY = '8c4e79ed80f9f915a30a2faece2daa0f'
    const baseUrl = 'https://api.themoviedb.org/3'
    
    const movieMediaIds = serializedWatchlist.filter((comment)=> comment.mediaType === "movie")
    const seriesMediaIds = serializedWatchlist.filter((comment)=> comment.mediaType === "serie")
    const movieComment = movieMediaIds.map((comment)=> comment.mediaId)
    const serieComment = seriesMediaIds.map((comment)=>comment.mediaId)

   
    useEffect(() => {
        const fetchWatchedMediaData = async () => {
          try {
            const moviePromises = movieComment.map((id) =>
              fetch(`${baseUrl}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits&include_image_language=en,null`)
            );
            const seriesPromises = serieComment.map((id) =>
              fetch(`${baseUrl}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits&include_image_language=en,null`)
            );
      
            const movieResponses = await Promise.all(moviePromises);
            const seriesResponses = await Promise.all(seriesPromises);
      
            const movieData = await Promise.all(movieResponses.map((response) => response.json()));
            const seriesData = await Promise.all(seriesResponses.map((response) => response.json()));
      
          
            const moviesWithCreatedAt = movieData.map((movie, index) => ({
              id: movie.id,
              poster_path: movie.poster_path,
              title: movie.title,
              release_year: new Date(movie.release_date).getFullYear(),            
              createdAt: movieMediaIds[index].createdAt,
              type: "movie",
            }));
      
            const seriesWithCreatedAt = seriesData.map((serie, index) => ({
              id: serie.id,
              poster_path: serie.poster_path,
              title: serie.name,
              release_year: new Date(serie.first_air_date).getFullYear(),            
              createdAt: seriesMediaIds[index].createdAt,
              type: "series",
            }));
      
            setCombinedWatchlist((prevMedia) => {
              const uniqueMedia = new Set([...prevMedia.map((item) => item.id), ...moviesWithCreatedAt.map((item) => item.id), ...seriesWithCreatedAt.map((item) => item.id)]);
              return [...uniqueMedia].map((id) => {
                const movieItem = moviesWithCreatedAt.find((item) => item.id === id);
                const seriesItem = seriesWithCreatedAt.find((item) => item.id === id);
                return movieItem || seriesItem as userWatchedFilmsProps;
              });
            });
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchWatchedMediaData();
      }, [id]);

  return (
    <div className='w-full px-4 md:px-0 md:max-w-5xl mx-auto mt-[40px] flex flex-col '>
       <div className='border-b border-[#456] flex justify-between'>
            <p>{user?._id === id ? 'YOU' : id} WANT TO SEE {combinedWatchlist.length} FILMS AND SERIES</p>
            <div className="hidden md:flex gap-4">
                <p>rating</p>
                <p>Decade</p>
                <p>GENRE</p>
                <p>Sort by RELEASE DATE</p>
            </div>
        </div>
        <div className='grid grid-cols-8 md:grid-cols-7 mt-3 gap-2'>
             {combinedWatchlist.map((item)=>(
                    <div key={item.id} className="col-span-2 md:col-span-1 rounded-[3px] bg-gradient-to-r from-transparent via-white to-transparent hover:border-[#40bcf4] hover:border-[2px] h-full  border-transparent border-[2px] border-[#def] shadow-md transition duration-100 ease-linear ">
                        <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt=""  className=" "/>
                
            </div>
             )) }
        </div>
    </div>
  )
}

export default UserWatchlist