import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

  
const PopularSeriesCard = ({serie}:PopularSeriesCard) => {

    if (!serie) {
        // Handle the case where movie is not defined
        return null;
      }

      const posterPath = serie.poster_path;
      const posterUrl = posterPath
        ? `https://image.tmdb.org/t/p/original/${posterPath}`
        : null;

  return (
    <div className='flex flex-col'>
        <Link href={`/serie-details/${serie.id}`}>
            <div className=' h-[250px] w-[165px]  '>
            {posterUrl && (
            <Image
              src={posterUrl}
              alt="ada"
              width={165}
              height={250}
              className="cursor-pointer rounded-[10px] image-hover"
            />
          )}
            </div>
            <div className=' work-break w-[150px] mt-[15px] flex ml-[5px] font-heavitas '>
                <p>{serie.name}</p>
            </div>
        </Link>

    </div>
  )
}

export default PopularSeriesCard