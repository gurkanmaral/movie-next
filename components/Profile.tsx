"use client";
import { addRelation } from "@/lib/actions/user.actions";
import useUser from "@/utils/useUser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {useEffect, useState} from "react"
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";




const navlinks = [
  {
    name:"Profile",
    href:"/profile",
  },
  {
    name:"Activity",
    href:"/activity/",
  },
  {
    name:"Films",
    href:"/films",
  },
  {
    name:"Series",
    href:"/profile-series",
  },
  {
    name:"Watchlist",
    href:"/watchlist",
  },
  {
    name:"Reviews",
    href:"/reviews",
  },
  {
    name:"Likes",
    href:"/likes",
  },

]

const Profile = ({id,name,username,image,follow,followed,favorites,movieCount,serieCount,profileComments,seriesFavorites,userRatings,serializedWatchlist}:ProfileProps) => {

    const { data: session, status } = useSession();
    const user = useUser(session?.user?.email ||null)!
    const [favMovies, setFavMovies] = useState<MovieDetails[]>([])
    const pathname=usePathname()
    const [favSeries,setFavSeries] = useState<TvShowProps[]>([])
    const API_KEY = '8c4e79ed80f9f915a30a2faece2daa0f'
    const [combinedWatchlist,setCombinedWatchlist] = useState<CombinedWatchlist[]>([]);
    const [combinedComments, setCombinedComments] = useState<MediaItem[]>([]);
    const baseUrl = 'https://api.themoviedb.org/3'

    const handleClick = async() =>{

      await addRelation(user._id,id,pathname)

    }

useEffect(()=>{
  const fetchFavMovie = async()=>{
    if(favorites){

      try{
        const promises = favorites.map((id)=> fetch(`${baseUrl}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits&include_image_language=en,null`))
        const responses = await Promise.all(promises);
        const moviesData = await Promise.all(responses.map((response)=>response.json()))
        setFavMovies(moviesData)
      }catch(error){
        console.log(error)
      }
    }
  }
  fetchFavMovie()

},[favorites])

useEffect(()=>{
  const fetchFavMovie = async()=>{
    if(seriesFavorites){

      try{
        const promises = seriesFavorites.map((id)=> fetch(`${baseUrl}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits&include_image_language=en,null`))
        const responses = await Promise.all(promises);
        const moviesData = await Promise.all(responses.map((response)=>response.json()))
        setFavSeries(moviesData)
      }catch(error){
        console.log(error)
      }
    }
  }
  fetchFavMovie()

},[favorites])


   const isFollowing = follow.some((item)=> item.followerId === user?._id)

   

  
const movieMediaIds = profileComments.filter((comment)=> comment.mediaType === "movie")
const seriesMediaIds = profileComments.filter((comment)=> comment.mediaType === "serie")
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
  
        setCombinedComments((prevMedia) => {
          const uniqueMedia = new Set([...prevMedia.map((item) => item.id), ...moviesWithCreatedAt.map((item) => item.id), ...seriesWithCreatedAt.map((item) => item.id)]);
          const newMediaItems = [...uniqueMedia].map((id) => {
            const movieItem = moviesWithCreatedAt.find((item) => item.id === id);
            const seriesItem = seriesWithCreatedAt.find((item) => item.id === id);
            const userRating = userRatings?.find((rating) => rating.mediaId === id);
            // Check if it's a movie or series
            const mediaType = movieItem ? 'movie' : 'series';
        
            // Combine the data
            const combinedItem = (movieItem || seriesItem) as MediaItem;
            if (combinedItem) {
              combinedItem.userRating = userRating?.rating ?? undefined;
            }
        
            return combinedItem; 
          });
        
          return newMediaItems as MediaItem[]; 
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchWatchedMediaData();
  }, [id]);

 
  const movieMediaIdsWatchlist = serializedWatchlist.filter((comment)=> comment.mediaType === "movie")
  const seriesMediaIdsWatchlist = serializedWatchlist.filter((comment)=> comment.mediaType === "serie")
  const movieCommentWatchlist = movieMediaIdsWatchlist.map((comment)=> comment.mediaId)
  const serieCommentWatchlist = seriesMediaIdsWatchlist.map((comment)=>comment.mediaId)



useEffect(() => {
  const fetchWatchedMediaData = async () => {
    try {
      const moviePromises = movieCommentWatchlist.map((id) =>
        fetch(`${baseUrl}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits&include_image_language=en,null`)
      );
      const seriesPromises = serieCommentWatchlist.map((id) =>
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
        createdAt: movieMediaIdsWatchlist[index].createdAt,
        type: "movie",
      }));

      const seriesWithCreatedAt = seriesData.map((serie, index) => ({
        id: serie.id,
        poster_path: serie.poster_path,
        title: serie.name,
        release_year: new Date(serie.first_air_date).getFullYear(),            
        createdAt: seriesMediaIdsWatchlist[index].createdAt,
        type: "series",
      }));

      setCombinedWatchlist((prevMedia) => {
        const uniqueMedia = new Set([...prevMedia.map((item) => item.id), ...moviesWithCreatedAt.map((item) => item.id), ...seriesWithCreatedAt.map((item) => item.id)]);
        return [...uniqueMedia].map((id) => {
          const movieItem = moviesWithCreatedAt.find((item) => item.id === id);
          const seriesItem = seriesWithCreatedAt.find((item) => item.id === id);
          return movieItem || seriesItem as CombinedWatchlist;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchWatchedMediaData();
}, [id]);

  return (
    <div className=" grid grid-cols-1 items-center  w-full md:max-w-5xl mx-auto">
        <div className="col-span-1 flex flex-col md:flex-row gap-4 md-gap-0 items-center  md:justify-between px-2">
          <div className="flex gap-4 items-center">
            <div>
              {image ? <img src={image} alt=""  className="w-[100px] h-[100px] rounded-full object-cover border border-[#456]" />
              : <img src="/assets/user.png" className="w-[100px] h-[100px]  rounded-full border border-[#456]" alt="" />}
            </div>
            <div className="flex flex-col items-start gap-2">
                <p className="font-bold text-[20px]">{name}</p>
                <div>
                  <p className="text-[#9ab] text-[14px]"></p>
                </div>
                {id === user?._id ? (
                  <Link href="/settings"  className="text-[#c8d4e0] pt-[2px] pb-[2px] tracking-wide px-[10px]  bg-[#567] rounded-[3px] text-[15px]  inset-shadow">
                      Edit Profile
                  </Link>
                ) : (
                  <button onClick={handleClick} className="border p-1 rounded-[5px] hover:text-[#fff]">
                  {!isFollowing ? 'follow' : 'unfollow'}
                     </button>
                )}
            </div>
          </div>
          <div className="flex gap-5">
              <Link href={`/films/${id}`} className="flex flex-col  items-center ">
                <p className="text-[#fff]">{movieCount.length}</p>
                <p>FILMS</p>
              </Link>
              <Link href={`/profile-series/${id}`} className="flex flex-col  items-center">
                <p  className="text-[#fff]">{serieCount.length}</p>
                <p>SERIES</p>
              </Link>
              <div className="flex flex-col  items-center">
                <p  className="text-[#fff]">0</p>
                <p>LIST</p>
              </div>
              <div className="flex flex-col  items-center">
                <p  className="text-[#fff]"> {follow.length}</p>
                <p>Followers</p>
              </div>
              <div className="flex flex-col  items-center">
                <p  className="text-[#fff]">{followed.length}</p>
                <p>Following</p>
              </div>
          </div>
        </div>
        <div className="hidden md:flex col-span-1 gap-10   mt-6   border border-[#24303c] rounded-[5px] justify-center items-center">
              {navlinks.map((item)=>(
                <Link href={`${item.href}/${id}`} key={item.name} className={`cursor-pointer ${"Profile" === item.name ? ' border-b-[#00e054]' : 'text-[#9ab]'} h-full  min-h-[40px] items-center justify-center flex`}>
                <p >{item.name}</p>
            </Link>
              ))}      
        </div>
        <div className="col-span-1 mt-8">
              <div className="grid grid-cols-3 gap-[100px]">
                  <div className="col-span-3 md:col-span-2 flex flex-col px-2 md:px-0 ">                   
                    <div>
                      <h1>FAVORITE FILMS</h1>
                      <div className="grid grid-cols-4 gap-3 mt-1 border-t border-[#456] pt-3 ">
                         {favMovies.map((item)=>{
                           return(
                            <Link href={`/movie-details/${item.id}`} className="col-span-1  border  border-[#abcdef] rounded-[3px] border-solid border-opacity-30 hover:border-opacity-70 transition-all " key={item.id}>
                           <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}  className=" w-full h-full " alt=""  />
                          
                       </Link>
                           )
                         })}
                         
                      </div> 
                    </div> 
                    <div className="mt-8 w-full ">
                        <div className="  gap-[100px]">
                          <div className="w-full ">
                             <h1>FAVORITE SERIES</h1>
                              <div className="grid grid-cols-4 gap-3 mt-1 border-t border-[#456] pt-3">
                              {favSeries.map((item)=>{
                           return(
                            <Link href={`/serie-details/${item.id}`} className="col-span-1 border  border-[#abcdef] rounded-[3px] border-solid border-opacity-30 hover:border-opacity-70  " key={item.id}>
                           <img src={`https://image.tmdb.org/t/p/original/${item.poster_path || ""}`}  className="w-full h-full" alt=""  />                       
                       </Link>
                           )
                         })}
                                 
                              </div>  
                            <div>
                        </div>
                  </div>              
              </div>
        </div>
          <div className="mt-8">
            <div className="flex  justify-between ">
                <div className="">
                  <h1>Recent Reviews</h1>
                </div>
                <button>
                 <p className="text-[14px]" >More</p>
                </button>
            </div>
            {combinedComments.map((item)=>(
               <div key={item.id} className="grid grid-cols-8 gap-5 border-t pt-4 border-[#456] pb-5 ">
               <Link href={item.type === "series" ? `/serie-details/${item.id}` : `/movie-details/${item.id}`} 
               className="col-span-2 md:col-span-1">
                     <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} />
               </Link>
               <div className="col-span-6 md:col-span-7 flex flex-col mt-[-5px]   gap-2 ">
                   <div className="flex items-start justify-start  ">
                     <p className="text-[24px] text-white  font-bold">{item?.title} <span className="text-[18px] font-normal text-[#456]" >{item.release_year}</span></p>
                   </div>
                   <div>
                     <p className="text-[#678] text-[14px]"> <span className="text-[#00e054]">{item.userRating}</span>  Watched at {new Date(item.createdAt).toLocaleDateString('en-US')}</p>
                   </div>
                 
                   <div className="flex flex-col gap-4">
                                <p className="text-[#99AABB] font-semibold text-[16px]">{item.text}</p>
                                <div className="flex">                               
                                    {item?.likes?.some((like) => like.userId === user?._id) ? (
                                             <div className="flex items-center  gap-3 justify-center">
                                                 <FavoriteOutlinedIcon /> 
                                                <span>{item?.likes?.length}</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center  gap-3 justify-center">
                                                <div className="items-center flex justify-center">
                                                  <FavoriteBorderOutlinedIcon /> 
                                                  <span>{item?.likes?.length}</span>
                                                </div>
                                                <span>Like review</span>
                                                
                                            </div>
                                        )}                                   
                                </div>
                            </div>
               </div>
             </div>
            ))}
          </div>
          <div className=" mt-8">
            <div className="flex border-b border-[#456] justify-between ">
                <div className="">
                  <h1>Popular Reviews</h1>
                </div>
                <button>
                  <p className="text-[14px]" >More</p>
                </button>
            </div>
          </div>
                    <div>
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-1 flex flex-col ">
                      <div className=" flex flex-col">
                        <div className="flex flex-col">
                          <h1 className="text-[#9ab] border-b  border-[#456] ">WATCHLIST</h1>  
                         {combinedWatchlist.length > 1 && <Link href={`/watchlist/${id}`} className="flex flex-row-reverse  rounded-[5px]  mt-2 border-2 cursor-pointer border-transparent hover:border-[#fff]  hover:border-2">
                            {combinedWatchlist.map((item, index) => (
                              <div
                                className={`relative overflow-hidden ${index === combinedWatchlist.length - 1 ? '' : 'ml-[-20%]'}`}
                                key={item.id}
                              >
                                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} className="h-full rounded-[5px] border border-[#456]" alt="" />
                                
                              </div>
                          ))}
                             
                          </Link>}
                        </div>
                        <div className="mt-3 border-b border-[#456] pb-[1px] ">
                            <div>
                              <h1 className="text-[#9ab]">DIARY</h1>
                            </div>
                            <div>

                            </div>
                        </div>
                      </div>
                  </div>
              </div>
        </div>
        
    </div>
  )
}

export default Profile