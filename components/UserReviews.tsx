"use client";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {useEffect, useState} from "react"
import useUser from "@/utils/useUser";
import { useSession } from 'next-auth/react';

interface ProfileReviews{
    id:string;
    serializedReviews:WatchedProps[];
}
interface WatchedProps{
    _id:string;
    userId:string;
    mediaId:number;
    mediaType:string;
    text:string;
    createdAt:Date;
    likes: {
        userId: string;
        createdAt: Date;
      }[];
}

const UserReviews = ({id,serializedReviews}:ProfileReviews) => {
    const { data: session, status } = useSession();
    const user = useUser(session?.user?.email ||null)!
    const [combinedReviews,setCombinedReviews] = useState<userReviewedFilmsProps[]>([]);
    const baseUrl = 'https://api.themoviedb.org/3'
    const API_KEY = '8c4e79ed80f9f915a30a2faece2daa0f'
const movieMediaIds = serializedReviews.filter((comment)=> comment.mediaType === "movie")
const seriesMediaIds = serializedReviews.filter((comment)=> comment.mediaType === "serie")
const movieComment = movieMediaIds.map((comment)=> comment.mediaId)
const serieComment = seriesMediaIds.map((comment)=>comment.mediaId)


useEffect(()=>{

    const fetchReviewData = async() =>{
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
            text: movieMediaIds[index].text,
            createdAt: movieMediaIds[index].createdAt,
            likes: movieMediaIds[index].likes,
            type: "movie",
          }));
    
          const seriesWithCreatedAt = seriesData.map((serie, index) => ({
            id: serie.id,
            poster_path: serie.poster_path,
            title: serie.name,
            release_year: new Date(serie.first_air_date).getFullYear(),
            text: seriesMediaIds[index].text,
            createdAt: seriesMediaIds[index].createdAt,
            likes: seriesMediaIds[index].likes,
            type: "series",
          }));
          setCombinedReviews((prevMedia) => {
            const uniqueMedia = new Set([...prevMedia.map((item) => item.id), ...moviesWithCreatedAt.map((item) => item.id), ...seriesWithCreatedAt.map((item) => item.id)]);
            return [...uniqueMedia].map((id) => {
              const movieItem = moviesWithCreatedAt.find((item) => item.id === id);
              const seriesItem = seriesWithCreatedAt.find((item) => item.id === id);
              return movieItem || seriesItem as userReviewedFilmsProps;
            });
          });
        } catch (error) {
            console.log(error)
        }
    }
    fetchReviewData();
},[id])



  return (
    <div className="w-full px-4 md:px-0 md:max-w-5xl mx-auto mt-[40px] grid grid-cols-6 ">
        <div className="col-span-6 md:col-span-4  ">
            <div className='border-b border-[#456] flex justify-between  '>
                <p>Reviews</p>
                <div className="hidden md:flex gap-4">
                    <p>rating</p>
                    <p>Year</p>        
                    <p>Sort by WhenReviewed</p>
                </div>
            </div>
            <div className="grid grid-cols-4 ">
               {combinedReviews.map((item)=>(
                <div className="col-span-4 pt-2   " key={item.id}>
                    <div className="grid grid-cols-7 gap-3 border-b border-[#456]">
                        <div className="col-span-2 md:col-span-1 p-2">
                            <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} />
                        </div>
                        <div className="col-span-5 md:col-span-6 flex flex-col gap-4 mb-4">
                            <h2 className="text-[#fff] text-[24px]">{item.title} <span className="text-[16px] text-[#89a] ml-1">{item.release_year}</span></h2>
                            <div className="flex gap-2">
                                <span>rate</span>
                                <span className="text-[#678] text-[12px]" >Watched at {new Date(item.createdAt).toLocaleDateString('en-US')}</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p className="text-[#9ab] text-[16px]">{item.text}</p>
                                <div className="flex gap-2">                               
                                    {item.likes.some((like) => like.userId === user?._id) ? (
                                             <div className="flex items-center justify-center">
                                                 <FavoriteOutlinedIcon /> 
                                                <span>{item.likes.length}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                <FavoriteBorderOutlinedIcon /> 
                                                <span>{item.likes.length}</span>
                                            </div>
                                        )}                                                         
                                    <span>Like review</span>
                                </div>
                            </div>

                        </div>
                    </div>                   
                </div>
               ))}
            </div>
        </div>

    </div>
  )
}

export default UserReviews