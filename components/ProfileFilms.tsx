"use client";
import {useState,useEffect} from "react";
import useUser from "@/utils/useUser";
import { useSession } from "next-auth/react";



const ProfileFilms = ({id,serializedFilms}:ProfileFilmsProps) => {

    const { data: session, status } = useSession();
    const user = useUser(session?.user?.email ||null)!
    const [films,setFilms] = useState<userFilmswithData[]>([])
  
    const baseUrl = 'https://api.themoviedb.org/3'
    const API_KEY = '8c4e79ed80f9f915a30a2faece2daa0f'
    const mediaIds = serializedFilms.map((film) => film.mediaId)



   useEffect(()=>{

    const fetchMovieData = async () =>{
        try {
            const moviePromises = mediaIds.map((id) =>
            fetch(`${baseUrl}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits&include_image_language=en,null`)
          );
          const movieResponses = await Promise.all(moviePromises);
         
          const movieData = await Promise.all(movieResponses.map((response) => response.json()));

          const moviesWithCreatedAt = movieData.map((movie, index) => ({
            id: movie.id,
            poster_path: movie.poster_path,
            title: movie.title,
            release_year: new Date(movie.release_date).getFullYear(),
            createdAt: serializedFilms[index].createdAt,
          }));  
          setFilms(moviesWithCreatedAt)
        } catch (error) {
            console.log(error)
        }

    }
    fetchMovieData()
   },[id])

  return (
    <div className='w-full px-4 md:px-0 md:max-w-5xl mx-auto mt-[40px] flex flex-col '>
        <div className='border-b border-[#456] flex justify-between '>
            <p>Watched</p>
            <div className="hidden md:flex gap-4">
                <p>rating</p>
                <p>Decade</p>
                <p>GENRE</p>
                <p>Sort by RELEASE DATE</p>
            </div>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-2">
           {films.map((item)=>(
                <div key={item.id} className="col-span-3 md:col-span-1 rounded-[3px] bg-gradient-to-r from-transparent via-white to-transparent hover:border-[#00e054] hover:border-[1px] h-full  border-transparent border-[1px] border-[#def] shadow-md transition duration-100 ease-linear ">
                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt=""  className=" "/>
        </div>
           ))
           }
          
        </div>
    </div>
  )
}

export default ProfileFilms