
import ProfileSeries from '@/components/ProfileSeries'
import { getUserSeries } from '@/lib/actions/user.actions'
import React from 'react'

const page = async({params}:{params:{id:string}}) => {

  const {id} = params

  const series = await getUserSeries(id,"serie")

    const serializedSeries = series.map((film)=>({
    _id:film._id.toString(),
    userId:film.userId.toString(),
    mediaId:film.mediaId,
    createdAt:film.createdAt,
  }))



  return (
    <div>
      <ProfileSeries
      serializedSeries={serializedSeries}
      id={id}
      />
    </div>
  )
}

export default page