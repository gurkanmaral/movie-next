import Profile from '@/components/Profile'
import { ProfileComments, getOneUser, getRelation, getUserFilmIds, getUserRating, getUserWatchlist, userFavoriteMedia } from '@/lib/actions/user.actions'
import React from 'react'


const Page = async({params}:{params:{id:string}}) => {

    const {id} = params
    
    const profileUser = await getOneUser(id)



    const followersAndFollowing = await getRelation(id)
    const userComments = await ProfileComments(id)
    const ratings = await getUserRating(id)
    const favorites = await userFavoriteMedia(id,"movie")
    const seriesFavorites = await userFavoriteMedia(id,"serie")
    const watchlist = await getUserWatchlist(id)
    const movieCount = await getUserFilmIds(id,'movie')
    const serieCount = await getUserFilmIds(id,'serie')
    const filteredWatchlist = watchlist.slice(0,5)
    
    const serializedWatchlist = filteredWatchlist.map((item)=>({
        _id:item._id.toString(),
        userId:item.userId.toString(),
        mediaId:item.mediaId,
        mediaType:item.mediaType,
        createdAt:item.createdAt,
    }))
    const follow = followersAndFollowing.followers.map((item)=> ({
        _id:item._id.toString(),
        followerId:item.followerUser._id.toString(),
        name:item.followerUser.name
    }))

    const followed = followersAndFollowing.following.map((item)=> ({
        _id:item._id.toString(),
        followedId:item.followedUser._id.toString(),
        name:item.followerUser.name
    }))

    const profileComments = userComments.map((item)=>({
        _id:item._id.toString(),
        userId: item.userId._id.toString(),
        mediaId:item.mediaId,
        mediaType:item.mediaType,
        text:item.text,
        createdAt:item.createdAt,
        likes: item.likes ? item.likes.map((like:Like) => ({
            userId: like.userId?.toString(),
            createdAt: like.createdAt,
          })) : [],
    }))
    const userRatings: userRatingsProps[] = (ratings || []).map((item) => ({
        _id: item._id.toString(),
        userId: item.userId._id.toString(),
        mediaId: item.mediaId,
        mediaType: item.mediaType,
        rating: item.rating,
        createdAt: item.createdAt,
      }));

    return (
    <div className='profile-layout  w-full mx-auto h-full'>
        <div className='w-full md:max-w-[1440px] mx-auto h-full pt-[50px]'>
        <Profile 
        id={id}
        name={profileUser.name}
        username={profileUser.username}
        image={profileUser.image}
        follow={follow}
        followed={followed}
        favorites={favorites}
        profileComments={profileComments}
        seriesFavorites={seriesFavorites}
        userRatings={userRatings}
        serializedWatchlist={serializedWatchlist}
        movieCount={movieCount}
        serieCount={serieCount}
        />
        </div>
        

    </div>
  )
}

export default Page