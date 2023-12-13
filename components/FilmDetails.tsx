"use client";
import { fetchData } from '@/utils/fetchData';
import React, { useEffect, useState,useCallback } from 'react'
import {  useSession } from 'next-auth/react';
import useUser from '@/utils/useUser';
import Comments from './Comments';
import Rating from './Rating';
import Watched from './Watched';
import MediaLike from './MediaLike';
import Watchlist from './Watchlist';
import Favorites from './Favorites';
import AddComment from './AddComment';
import { getFriendsComments, getFriendsReviews, getRelation } from '@/lib/actions/user.actions';
import SimilarMedia from './SimilarMedia';


const defaultTvDetails: MovieDetails = {
  adult: false,
  backdrop_path: '',
  belongs_to_collection: null,
  budget: 0,
  genres: [],
  homepage: '',
  id: 0,
  imdb_id: '',
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  poster_path: '',
  production_companies: [],
  production_countries: [],
  release_date: '',
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: '',
  tagline: '',
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0
};

const FilmDetails = ({id,likes,favorite,watched,watchlist,userRating,comments,popularComments}:TvDetailsProps) => {

  const [friends, setFriends] = useState<any>(null); 
    const [tvDetails, setTvDetails] = useState<MovieDetails>(defaultTvDetails);
    const { data: session } = useSession();
    const user = useUser(session?.user?.email ||null)!
    const [similarMovies,setSimilarMovies] = useState<Film[]>([])
   const [cast,setCast] = useState<any>([]);
   const [loading, setLoading] = useState(true); 
  const [commentsFriends,setCommentsFriends] = useState<CommentProps[]>([]);
   const numberId = parseInt(id)
  

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


   
    const API_KEY = '8c4e79ed80f9f915a30a2faece2daa0f'
    const baseUrl = 'https://api.themoviedb.org/3'


   
    const posterPath = tvDetails?.poster_path
       
  let posterUrl = null
  if (posterPath) {
      posterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`
  }

  const backdropPath= tvDetails?.backdrop_path

  let backdrop = null
  if(backdropPath){
    backdrop = `https://image.tmdb.org/t/p/original/${backdropPath}`
  }

  useEffect(() => {
    const fetchSimilarDetails = async () => {
      try {
        const response = await fetchData<FilmsResponse>(`${baseUrl}/movie/${id}/recommendations?api_key=${API_KEY}`);
  
        if (response && response.results) {
         
          const movieDetailsData = response.results; 
          setSimilarMovies(movieDetailsData);
        } else {
          console.error('API response does not have expected structure:', response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSimilarDetails();
  }, [id]);
const similarMovie = similarMovies?.slice(0,6)

      useEffect(()=>{
        const fetchMovieDetails = async()=>{
          try{
            const response = await fetchData<MovieDetails>(`${baseUrl}/movie/${id}?api_key=${API_KEY}&language=en-US`)
            const movieDetailsData = response
            setTvDetails(movieDetailsData)
          }catch (error) {
            console.error(error)
        }
          
        }
        fetchMovieDetails()
      },[id])
     
      useEffect(()=>{
        const fetchCastData = async()=>{
          try{
            const response = await fetchData<any>(`${baseUrl}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
            const castData = response
            setCast(castData)
          }catch(error){
            console.error(error)
          }
        }
        fetchCastData()
      },[id])
    
      const directors = cast?.crew?.filter((member: any) => member.job === 'Director').map((director: any) => director.name);
     
      const castData = cast?.cast?.slice(0, 20);

     
  return (
    <div className='flex w-full md:max-w-7xl   items-center flex-col min-h-screen relative  '>
    <div className='w-full h-[574px]  overflow-hidden relative '>
        <img
           src={backdrop || ""}
            alt=""
            className='object-cover'
        />
        <div className='backdropmask '></div>
    </div>  
    <div className=' mt-[-340px] md:mt-[-100px] z-30  w-[80%] gap-[50px] flex   '>
            <div className='w-1/4  flex flex-col'>
                <div className='w-full sticky top-2'>
                <div className='relative w-full '>
                  <img
                  src={posterUrl || "" }
                  className='object-cover rounded-[5px]'
                  alt=""
                  />
                </div>
                <div>
                      ASDASDA
                </div>
                </div>
            </div> 
            <div className='pr-2 md:pr-0 w-3/4 h-full  flex flex-col   break-words'>
                <div>
                <div>
                <p className='text-[30px] font-heavitas text-[#fff]'>{tvDetails?.original_title}  <span className='text-[16px] text-[#def] font-graphikRegular'>{new Date(tvDetails?.release_date).getFullYear()}</span> <span className='text-[#9ab] text-[18px] font-graphikRegular'>Directed by</span> <span className='text-[18px] text-[#def] font-graphikRegular'>{directors}</span></p>
                </div>
                <div className='flex mt-7  gap-10 '>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4'>
                            <p className='text-[14px] text-[#9ab] uppercase'>{tvDetails?.tagline}</p>
                            <p className='text-[18px] text-[#9ab] font-graphikRegular '>
                            {tvDetails?.overview}
                            </p>
                        </div>
                        <div className='flex flex-col md:flex-row gap-10  mt-4'>
                          <span className='text-[#00e054] font-graphikRegular '>Genres:</span>
                          <div className='flex flex-col md:flex-row gap-4'>
                              {tvDetails?.genres?.map((genre) => (
                              <div key={genre.id} className='movie-genre-1 '>
                                <span className='bg-[#283038] text-[#9ab] hover:text-[#fff] p-1 rounded-[2px] shadow-md shadow-dark-1'>{genre.name}</span>
                              </div>
                             ))} 
                          </div>
                        </div>
                        <div className='mt-[50px]'>
                          <span className='font-graphikRegular'>{tvDetails?.runtime} min</span>
                        </div>
                    </div>                  
                    <div className='hidden md:flex'>
                    <div className='  bg-dark-3 shadow-md shadow-[#000000]  rounded-[5px] py-[15px] px-[50px] flex flex-col gap-[10px] items-start '>
                    <Watched 
                    numberId={numberId}
                    userId={user?._id}
                    type="movie"
                    watched={watched}
                    />
                    <MediaLike 
                    numberId={numberId}
                    userId={user?._id}
                    type="movie"
                    likes={likes}
                    />
                    <Watchlist 
                    numberId={numberId}
                    userId={user?._id}
                    type="movie"
                    watchlist={watchlist}
                    />
                <div>
                     <Favorites 
                     numberId={numberId}
                     userId={user?._id}
                     type="movie"
                     favorite={favorite}
                     /> 
                </div>
                  <div className='flex items-center justify-start gap-[10px] cursor-pointer'>
                 <Rating 
                 numberId={numberId}
                 userId={user?._id}
                 type="movie"
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
                   ))            }
                    
                  </div>
                </div>
                <div className='mt-10 flex flex-col gap-2'>
                     <h1>Add Review</h1>        
                     <div className='w-full'>
                    <AddComment 
                    userId={user?._id}
                    numberId={numberId}
                    mediaType="movie"
                    />
                     </div>
                </div>
                <div className='mt-10 flex flex-col '>
                      <h1>Reviews From Friends</h1>
                      <div className='flex flex-col gap-1 mt-1'>
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
                                   currentUser={user?._id.toString()}
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
                      <h1>Similar Films</h1>
                      <div className='grid grid-cols-6 gap-2'> 
                         {similarMovie?.map((movie)=>(
                         <SimilarMedia 
                         image={movie.poster_path}
                         id={movie.id}
                         key={movie.id}
                         mediaType="film"
                         />
                         ))}
                         
                      </div>
                </div>
            </div>                           
     </div>    
</div>
  )
}

export default FilmDetails

