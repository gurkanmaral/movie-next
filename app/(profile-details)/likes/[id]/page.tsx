import UserLikes from '@/components/UserLikes';
import { getUserLikes } from '@/lib/actions/user.actions'
import React from 'react'

const page = async({params}:{params:{id:string}}) => {

    const {id} = params
    
    const likes = await getUserLikes(id);


    const serializedLikes = likes.map((item)=>({
        _id:item._id.toString(),
        userId:item._id.toString(),
        mediaId:item.mediaId,
        mediaType:item.mediaType,
        createdAt:item.createdAt,
       

    }))


  return (
    <div className='w-full h-full'>
        <UserLikes 
        id={id}
        serializedLikes={serializedLikes}
        />

    </div>
  )
}

export default page