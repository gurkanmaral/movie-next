import UserReviews from '@/components/UserReviews'
import { getUserReviews } from '@/lib/actions/user.actions'
import React from 'react'

const page = async({params}:{params:{id:string}}) => {

    const {id} = params

    const reviews = await getUserReviews(id)



    const serializedReviews = reviews.map((item)=>({
        _id:item._id.toString(),
        userId:item._id.toString(),
        mediaId:item.mediaId,
        mediaType:item.mediaType,
        text:item.text,
        createdAt:item.createdAt,
        likes: item.likes ? item.likes.map((like:Like) => ({
          userId: like?.userId?.toString(),
          createdAt: like?.createdAt,
        })) : [],

    }))

  return (
    <div className='w-full h-full'>
       <UserReviews 
       id={id}
       serializedReviews={serializedReviews}
       />

    </div>
  )
}

export default page