import ProfileFilms from '@/components/ProfileFilms'
import { getUserFilms } from '@/lib/actions/user.actions'
import React from 'react'

const page = async({params}:{params:{id:string}}) => {

  const {id} = params

  const films = await getUserFilms(id,"movie")
  

  const serializedFilms = films.map((film)=>({
    _id:film._id.toString(),
    userId:film.userId.toString(),
    mediaId:film.mediaId,
    createdAt:film.createdAt,
  }))

 
  return (
    <div className='w-full h-full'>
      <ProfileFilms 
      id={id}
      serializedFilms={serializedFilms}
      />

    </div>
  )
}

export default page