import UserWatchlist from '@/components/UserWatchlist'
import { getUserWatchlist } from '@/lib/actions/user.actions'
import React from 'react'



const page = async({params}:{params:{id:string}}) => {

    const {id} = params

    const watchlist = await getUserWatchlist(id)
  

    const serializedWatchlist = watchlist.map((item)=>({
        _id:item._id.toString(),
        userId:item.userId.toString(),
        mediaId:item.mediaId,
        mediaType:item.mediaType,
        createdAt:item.createdAt,
    }))

  return (
    <div className='w-full h-full'>
        <UserWatchlist 
        id={id}
        serializedWatchlist={serializedWatchlist}
        />

    </div>
  )
}

export default page