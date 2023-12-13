import Activities from '@/components/Activities'
import { getActivities } from '@/lib/actions/user.actions'
import React from 'react'

const page = async({params}:{params:{id:string}}) => {

    const {id} = params

    
    const activities = await getActivities(id)

   
    const serializedActivities = activities.map((activity)=>({
        _id:activity._id.toString(),
        userId:activity.userId._id.toString(),
        name:activity.userId.name,
        mediaId:activity.mediaId,
        mediaType:activity.mediaType,
        actionType:activity.actionType,
        createdAt:activity.createdAt,
        rating:activity.rating,
    }))

    if(!id){
      return (
        <p>Loading..</p>
      )
    }

  return (
    <div className='w-full h-full'>
        <Activities 
        id={id}
        serializedActivities={serializedActivities}
        />
    </div>
  )
}

export default page