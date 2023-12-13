import FilmDetails from "@/components/FilmDetails";
import TVDetails from "@/components/TVDetails"
import { fetchFavoriteUsers, fetchLikedUsers, fetchRatingUser, fetchWatchedUsers, fetchWatchlistUsers, getComments, getFriendsReviews, getPopularComments, getRelation } from "@/lib/actions/user.actions"


const Page = async({params}:{params:{id:string}}) => {

const {id} = params;
const numberId = parseFloat(id)
const likes = await fetchLikedUsers(numberId,"movie")
const favorite = await fetchFavoriteUsers(numberId,"movie")
const watched = await fetchWatchedUsers(numberId,"movie")
const watchlist = await fetchWatchlistUsers(numberId,"movie")
const comments = await getComments(numberId,"movie")
const userRating = await fetchRatingUser(numberId,"movie")
const popularcomments = await getPopularComments(numberId)


const serializedUserRatings = userRating.map((rating) => ({
  _id: rating._id.toString(),
  userId: rating.userId.toString(),
  mediaId: rating.mediaId,
  mediaType: rating.mediaType,
  rating: rating.rating,
  createdAt: rating.createdAt,
  __v: rating.__v,
}));
const serializedComments = comments.map((comment)=>({
  _id: comment._id.toString(),
  userId: comment.userId._id.toString(),
  name:comment.userId.name,
  mediaId:comment.mediaId,
  mediaType:comment.mediaType,
  image:comment.userId.image,
  text:comment.text,
  createdAt: comment.createdAt,
  __v:comment.__v,
}))
  
  
const serializedPopularComments = popularcomments.map((comment)=>({
  _id: comment._id.toString(),
  userId: comment.userId._id.toString(),
  username:comment.userId.username,
  mediaId:comment.mediaId,
  mediaType:comment.mediaType,
  image:comment.userId.image ? comment.userId.image : '',
  text:comment.text,
  createdAt: comment.createdAt,
}))




 


  return (
   
    <div className="w-full md:max-w-[1440px] mx-auto  h-full">
      <FilmDetails 
        id={id}
        likes={likes}
        favorite={favorite}
        watched={watched}
        watchlist={watchlist}
        userRating={serializedUserRatings}
       comments={serializedComments}
       popularComments={serializedPopularComments}
      />
    </div>
  )
}

export default Page