"use client";

import { fetchData } from '@/utils/fetchData';
import React, { useEffect, useState } from 'react'
import {  useSession } from 'next-auth/react';
import useUser from '@/utils/useUser';
import { getFriendsComments, getFriendsReviews } from '@/lib/actions/user.actions';
import Favorites from './Favorites';
import Rating from './Rating';
import Watchlist from './Watchlist';
import MediaLike from './MediaLike';
import Watched from './Watched';
import AddComment from './AddComment';
import Comments from './Comments';
import SimilarMedia from './SimilarMedia';







const TVDetails = ({id,likes,favorite,watched,watchlist,userRating,comments,popularComments}:TvDetailsProps) => {

    const [tvDetails, setTvDetails] = useState<TvShowProps | null>(null);
    const { data: session, status } = useSession();
    const user = useUser(session?.user?.email ||null)!
    const [cast,setCast] = useState<any>([]);
    const [similarMovies,setSimilarMovies] = useState<Series[]>([])
    const [commentsFriends,setCommentsFriends] = useState<CommentProps[]>([]);
    const [friends, setFriends] = useState<any>(null); 
    const API_KEY = '8c4e79ed80f9f915a30a2faece2daa0f'
    const baseUrl = 'https://api.themoviedb.org/3'
    const [loading, setLoading] = useState(true); 
    
    const posterPath = tvDetails?.poster_path
    const numberId = parseFloat(id) 
    let posterUrl = null
    if (posterPath) {
        posterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`
    }
  
    const backdropPath= tvDetails?.backdrop_path
  
    let backdrop = null
    if(backdropPath){
      backdrop = `https://image.tmdb.org/t/p/original/${backdropPath}`
    }
  
    useEffect(()=>{

      const fetchSimilarDetails = async()=>{
        try{
          const response = await fetchData<SeriesResponse>(`${baseUrl}/tv/${id}/recommendations?api_key=${API_KEY}`)
          const movieDetailsData = response.results
          setSimilarMovies(movieDetailsData)
        }catch (error) {
          console.error(error)
      }
        
      }
      fetchSimilarDetails()
    },[id])
 
    useEffect(() => {
   
  
      const fetchData = async () => {
        try {
          const activity = await getFriendsReviews(user._id, numberId);
          setFriends(activity);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
    
      fetchData();
    }, [user?._id, numberId]); 
  
  
    
    useEffect(() => {
     
    
      const fetchData = async () => {
        try {
         const comments = await getFriendsComments(user._id,numberId)
         setCommentsFriends(comments)
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
    
      fetchData();
    }, [user?._id, numberId]); 
  
  
    const friendWatchedData = friends?.friendWatchedData 
  const friendRatingData = friends?.friendRatingData 
   
  

     
      useEffect(()=>{
        const fetchSeriesDetails = async()=>{
          try{
            const response = await fetchData<TvShowProps>(`${baseUrl}/tv/${id}?api_key=${API_KEY}&language=en-US`)
            const seriesDetailsData = response
            setTvDetails(seriesDetailsData)
          }catch (error) {
            console.error(error)
        }
          
        }
        fetchSeriesDetails()
      },[id])
    
      useEffect(()=>{
        const fetchCastData = async()=>{
          try{
            const response = await fetchData(`${baseUrl}/tv/${id}/credits?api_key=${API_KEY}&language=en-US`)
            const castData = response
            setCast(castData)
          }catch(error){
            console.error(error)
          }
        }
        fetchCastData()
      },[id])
      
      const similarMovie = similarMovies?.slice(0,6)
      const castData = cast?.cast?.slice(0, 20);

      const firstAirDate = tvDetails?.first_air_date;
    const year = firstAirDate ? new Date(firstAirDate).getFullYear() : undefined;
  return (
    <div className='flex w-full md:max-w-7xl mx-auto  items-center flex-col min-h-screen relative  '>
        <div className='w-full h-[574px]  overflow-hidden relative '>
          <img
                src={backdrop || ""}
                alt=""
                className='object-cover'
            />
            <div className='backdropmask '></div>
        </div>  
        <div className='mt-[-340px]  md:mt-[-100px] z-30  w-[80%] gap-[50px] flex   '>
                <div className='w-1/4  flex flex-col'>
                    <div className='w-full sticky top-2'>
                    <div className='relative w-full '>
                      <img
                      src={posterUrl || ""}
                      className='object-cover rounded-[5px]'
                      alt=""
                      />
                    </div>
                    <div>
                         
                    </div>
                    </div>
                </div> 
                <div className='pr-2 md:pr-0 w-3/4 h-full  flex flex-col   break-words'>
                    <div>
                    <div>
                    <p className='text-[30px] font-heavitas text-[#fff]'>{tvDetails?.name}  <span className='text-[16px] text-[#def] font-graphikRegular'>{year}</span> </p>
                    </div>
                    <div className='flex mt-7 gap-10'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-4'>
                                <p className='text-[14px] text-[#9ab] uppercase'>{tvDetails?.tagline}</p>
                                <p className='text-[18px] text-[#9ab] font-graphikRegular'>
                                {tvDetails?.overview}
                                </p>
                            </div>
                            <div className=' flex flex-col md:flex-row gap-10  mt-4'>
                            <span className='text-[#00e054] font-graphikRegular '>Genres:</span>
                            <div className='flex flex-col md:flex-row gap-4 '>
                              {tvDetails?.genres?.map((genre) => (
                              <div key={genre.id} className='flex '>
                                <span className='bg-[#283038]  text-[#9ab] px-2 hover:text-[#fff] flex items-center justify-center rounded-[2px] shadow-md shadow-dark-1'>{genre.name}</span>
                              </div>
                             ))} 
                          </div>
                            </div>
                            <div className='mt-[50px]'>
                            <div className='movie-runtime flex gap-4'>
                              {tvDetails?.episode_run_time && <p>{tvDetails?.episode_run_time}</p>}
                              <span>Seasons: {tvDetails?.number_of_seasons}</span>
                              <span>Episodes: {tvDetails?.number_of_episodes}</span>
                            </div>
                            </div>
                        </div>                  
                        <div className='hidden md:flex max-h-[300px]'>
                    <div className='  bg-dark-3 shadow-md shadow-black  rounded-[5px] py-[15px] px-[50px] flex flex-col gap-[10px] items-start '>
                    <Watched
                    numberId={numberId}
                    userId={user?._id}
                    type="serie"
                    watched={watched}
                    />
                    <MediaLike
                    numberId={numberId}
                    userId={user?._id}
                    type="serie"
                    likes={likes}
                    />
                    <Watchlist
                    numberId={numberId}
                    userId={user?._id}
                    type="serie"
                    watchlist={watchlist}
                    />
                <div>
                     <Favorites
                     numberId={numberId}
                     userId={user?._id}
                     type="serie"
                     favorite={favorite}
                     /> 
                </div>
                  <div className='flex items-center justify-start gap-[10px] cursor-pointer'>
                 <Rating
                 numberId={numberId}
                 userId={user?._id}
                 type="serie"
                 userRating={userRating}
                 />
  </div>
                  </div>
                  </div>
                    </div>
                    </div>
                    <div className='flex flex-col w-full   mt-10 '>
                  <h1 className='text-[#00e054]'>Cast:</h1>
                  <div className='flex overflow-x-auto custom-scrollbar gap-4 w-full  pt-[10px]'>
                    <div className='flex gap-4'>
                    {castData?.map((people:any)=>(
                    <div key={people?.id} className='flex flex-col gap-1 min-w-[150px]'>
                        <img src={`https://image.tmdb.org/t/p/w200${people.profile_path}`} alt="" className='w-full h-full ' />
                        <span className='text-[12px] text-[#def] '>{people.name}</span>
                        <span className='text-[12px] '>{people.character}</span>

                    </div>
                ))}
                  </div>                           
                 
                  </div>
                </div>
                    <div className='mt-10 flex flex-col gap-2'>
                      <h1>Activity From Friends</h1>
                      <div className='grid grid-cols-12 gap-4'>
                      {friendWatchedData?.map((item:WatchedItem,i:number)=>(
                    <div className='cols-span-1 flex flex-col items-center' key={item._id}>
                      {friendRatingData[i]?.image ? <img src={friendRatingData[i]?.image} className='' alt="" /> : <img src="/assets/user.png" className='' alt="" />}
                      <span>{friendRatingData[i]?.rating}</span>
                    </div> 
                   ))            
                   }
                      </div>
                    </div>
                    <div className='mt-10 flex flex-col gap-2'>
                     <h1>Add Review</h1>        
                     <div className='w-full'>
                    <AddComment
                    userId={user?._id}
                    numberId={numberId}
                    mediaType="serie"
                    />
                     </div>
                </div>
                    <div className='mt-10 flex flex-col '>
                          <h1>Reviews From Friends</h1>
                          <div className='flex flex-col gap-5 mt-5'>
                          {commentsFriends?.map((comment)=>(
                                   <Comments 
                                   id={comment._id}
                                   userId={comment.userId._id}
                                   name={comment.userId.username}
                                   mediaId={comment.mediaId}
                                   image={comment.userId.image}
                                   text={comment.text}
                                   createdAt={comment.createdAt}
                                   key={comment._id}
                                   currentUser={user?._id}
                                   />
                       )) }
                          
                          </div>
                    </div>
                    <div className='mt-10'>
                          <h1>Popular Reviews</h1>
                          <div className='flex flex-col gap-5 mt-5'>
                          {popularComments.map((comment,i)=>(
                          <Comments 
                          id={comment._id}
                          userId={comment.userId}
                          name={comment.username}
                          mediaId={comment.mediaId}
                          image={comment.image}
                          text={comment.text}
                          createdAt={comment.createdAt}
                          key={comment._id}
                          currentUser={user?._id}
                          />
                        
                        )) }
                            
                          </div>
                    </div>
                    <div className='mt-10'>
                      <h1>Recent Reviews</h1>
                      <div className='flex flex-col gap-2 mt-1'>
                       {comments.map((comment)=>(
                        <Comments
                        id={comment._id}
                        userId={comment.userId}
                        name={comment.name}
                        mediaId={comment.mediaId}
                        image={comment.image}
                        text={comment.text}
                        createdAt={comment.createdAt}
                        key={comment._id}
                        currentUser={user?._id}
                        />
                       ))}
                      </div>
                </div>
                    <div className='mt-10 flex flex-col gap-2'>
                          <h1>Similar Series</h1>
                          <div className='grid grid-cols-6 gap-2'> 
                         {similarMovie?.map((movie)=>(
                         <SimilarMedia 
                         image={movie.poster_path}
                         id={movie.id}
                         key={movie.id}
                         mediaType="serie"
                         />
                         ))}
                         
                      </div>
                    </div>
                </div>                           
         </div>    
    </div>
  )
}

export default TVDetails