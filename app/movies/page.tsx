"use client";

import { fetchData } from '@/utils/fetchData';
import FilmCard from '@/components/FilmCard';
import Pagination from '@mui/material/Pagination';
import React, { ChangeEvent, useEffect, useState } from 'react'




const Page = () => {
  const [movies, setMovies] = useState<Film[]>([]);
  
  const API_KEY = '8c4e79ed80f9f915a30a2faece2daa0f'
  const baseUrl = 'https://api.themoviedb.org/3'
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [topRated, setTopRated] = useState(false);
  const totalPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity.desc');
 
  useEffect(()=>{
    const movieGenres = async()=>{
      try{
        const response = await fetchData<GenreResponse>(`${baseUrl}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        const genresData = response.genres
        setGenres(genresData)
      }catch(error) {
              console.error(error)
          }
    }
    movieGenres()
  },[])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (topRated) {
          const response = await fetchData <FilmsResponse>(
            `${baseUrl}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`
          );
          const topRatedFilms = response.results;
          setMovies(topRatedFilms);
        } else if (selectedGenre) {
          const response = await fetch(
            `${baseUrl}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${selectedGenre}&sort_by=${sortBy}&vote_count.gte=1000&page=${currentPage}`
          );
          const data = await response.json();
          const movies = data.results;
          setMovies(movies);
        } else {
          const response = await fetchData<FilmsResponse>(
            `${baseUrl}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${currentPage}`
          );
          const popularFilms = response.results;
          setMovies(popularFilms);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [selectedGenre, currentPage, topRated,sortBy]);
   
  const handleGenreSelect = (event:ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedGenre(value !== "All" ? value : '');
    setCurrentPage(1);
    setTopRated(false);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleTopRatedClick = () => {
    setTopRated(true);
    setSelectedGenre('');
    setCurrentPage(1);
  };

  const handlePopularClick = () =>{
    setSelectedGenre('')
    setTopRated(false)
  }

  const handleSortByChange = (event:ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSortBy(value);
  };

  


  return (

    <div className='max-w-[1440px] mx-auto flex mt-[50px] flex-col '>
        <div className='films-cat flex w-full md:w-[1200px] m-auto h-[50px] relative justify-between items-center'>
            <div className='hidden md:flex font-heavitas text-[15px] md:text-[30px]'>
                    <h1>FILMS</h1>
            </div>
            <div className='flex justify-center items-center  md:justify-end gap-[50px] font-heavitas  w-full'>
                <div className={!topRated && selectedGenre === '' ? 'text-[#00e054] text-[15px] md:text-[20px]' : 'text-[15px] md:text-[20px]'}
                onClick={handlePopularClick} style={{cursor:'pointer'}}>
                    <span>Popular</span>
                </div>
                <div className={topRated ? 'text-[#00e054] text-[15px] md:text-[20px]' : 'text-[15px] md:text-[20px]'}
                 onClick={handleTopRatedClick} style={{ cursor: 'pointer' }}>
                    <span>Top Rated</span>
                </div>
                <div className='gap-[5px] hidden md:flex'>
                <label htmlFor="genreSelect" className="text-[15px] md:text-[20px] genre-label">Select a genre:</label>
                <select className='' id="genreSelect" 
              style={{
                background: '#14181c url(../assets/bg.png)',
                color: 'white',
                borderRadius: '8px', 
              }} onChange={handleGenreSelect}>
                  <option style={{color:"white"}}>All</option> 
                  {genres?.map((genre)=>(
                    <option value={genre.id} key={genre.id} style={{color:"white"}}>
                      {genre.name}
                      </option>
                    ))}
              </select> 
                </div>
                {selectedGenre && <div className='gap-[5px] flex'>
        <label htmlFor="sortBySelect" className="text-[12px] md:text-[20px] ">
          Sort by:
        </label>
        <select
          id="sortBySelect"
          value={sortBy}
          onChange={handleSortByChange}
          style={{
            background: '#14181c url(../assets/bg.png)',
            color: 'white',
            borderRadius: '8px', 
          }} 
        >
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Rating</option>
        </select>
      </div>}
            </div>
        </div>
        <div className='flex flex-wrap gap-[50px] items-center justify-center mt-[50px] '>
               {movies.map((film)=>(
                <FilmCard 
                key={film.id}
                film={film}
                />
               ))}
            </div>
       <div className='w-full m-auto flex items-center justify-center mt-[20px] h-[100px]'>
        <Pagination
          color='primary' 
          defaultPage={1}
          page={currentPage}
          count={totalPage} 
          onChange={handlePageChange} 
          size='medium'
          sx={{
            '& .Mui-selected': {
              color: 'red', 
            },
            '& .MuiPaginationItem-page': {
              color: 'white', 
            },
            '& .MuiPaginationItem-root': {
              color: 'white', 
            },
          }}
        />
         
        </div>
    </div>
  )
}

export default Page