"use server";
import mongoose, { Types } from "mongoose";
import Favorite from "../models/favorites.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache";
import Like from "../models/likes.model";
import Watchlist from "../models/watchlist.model";
import Watched from "../models/watched.model";
import Rating from "../models/rating.model";
import Comment from "../models/comments.model";
import Relation from "../models/relation.model";
import Activity from "../models/activity.model";
import { connect } from "http2";

interface Update {
  userId: string;
  image:string;
  name:string;

}
interface Params{
    userId:string;
    mediaId:number;
    mediaType:string;
    path:string;
}
interface Favorite {
  mediaId:number

}

export const getUser = async(email:string) =>{

    try {
        connectToDB()
        const user = await User.findOne({ email });

        const userObject = {
          _id: user._id.toString(),
          username: user.username,
          name: user.name,
          email: user.email,
          image:user.image,
          bgImage:user.bgImage,
          
        };
    
        return userObject;
      } catch (error) {
     
        throw new Error('Error while fetching user by email');
      }

}
export async function getOneUser(id:string) {

  connectToDB()

  try {

    const user = await User.findById(id)

    return user

  } catch (error) {
    console.error("Error while fetching  user:", error);
    throw new Error("Unable to fetch  user");
  }

  
}


export async function getSearchedUsers(searchParam: string) {
  connectToDB();

  try {
    const users = await User.find({
      name: { $regex: searchParam, $options: 'i' }, 
    });

    return users;
  } catch (error) {
    console.error("Error while fetching users:", error);
    throw new Error("Unable to fetch users");
  }
}
export async function updateUser({ userId,image, name }: Update) {
  connectToDB();

  try {
    
    await User.findByIdAndUpdate(userId,{image,name});
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function likeMovie(mediaId: number, userId: string, mediaType:string,path: string) {
  connectToDB();

  try {
    const liked = await Like.findOne({ userId, mediaId, mediaType });
    

    if (liked) {
    
      await Like.findOneAndRemove({ _id: liked._id });

      await Activity.findOneAndRemove({
        userId,
        mediaId,
        mediaType,
        actionType: 'like',
      });
    } else{
      const newLike = new Like({
        userId,
        mediaId,
        mediaType,
      });

       await newLike.save();
       await createActivity(userId,undefined, mediaId, mediaType, 'like',undefined);
    }
    revalidatePath(path)
  } catch (error) {
    console.error("Error while liking thread:", error);
    throw new Error("Unable to like/unlike thread");
  }
}


export async function fetchLikedUsers(mediaId: number,mediaType?:string) {
  connectToDB();

  try {
    const like = await Like.find({ mediaId, mediaType });

    if (!like) {
      throw new Error('like not found');
    }

   
    const likedUsers = like.map((like: { userId: mongoose.Types.ObjectId }) =>
      like.userId.toString() 
    );

    return likedUsers;
  } catch (error) {
    console.error("Error while fetching liked users:", error);
    throw new Error("Unable to fetch liked users");
  }
}

export async function addSeriesFavorite(mediaId: number, userId: string, mediaType: string, path: string) {
  connectToDB();

  try {
    
    const existingFavoritesCount = await Favorite.countDocuments({ userId, mediaType });

    
    const maxFavorites = 4; 

    if (existingFavoritesCount < maxFavorites) {
      
      const favorite = await Favorite.findOne({ userId, mediaId, mediaType });

      if (favorite) {
        
        await Favorite.findOneAndRemove({ _id: favorite._id });
      } else {
        
        const newFavorite = new Favorite({
          userId,
          mediaId,
          mediaType,
        });

        await newFavorite.save();
      }

      revalidatePath(path);
    } else {
     
      throw new Error('User has reached the maximum limit of favorites for this media type.');
    }
  } catch (error) {
    console.error("Error while liking thread:", error);
    throw new Error("Unable to like/unlike thread");
  }
}

export async function fetchFavoriteUsers(mediaId: number,mediaType:string) {
  connectToDB();

  try {
    const favorite = await Favorite.find({ mediaId, mediaType });

    if (!favorite) {
      throw new Error('Thread not found');
    }

   
    const likedUsers = favorite.map((like: { userId: mongoose.Types.ObjectId }) =>
      like.userId.toString() 
    );

    return likedUsers;
  } catch (error) {
    console.error("Error while fetching liked users:", error);
    throw new Error("Unable to fetch liked users");
  }
}
export async function watchMovie(mediaId: number, userId: string, mediaType:string,path: string) {
  connectToDB();

  try {
    const watched = await Watched.findOne({ userId, mediaId, mediaType });
   
    if (watched) {
   
      await Watched.findOneAndRemove({ _id: watched._id });

      await Activity.findOneAndRemove({
        userId,
        mediaId,
        mediaType,
        actionType: 'watched',
      });
    } else{
      const newWatched = new Watched({
        userId,
        mediaId,
        mediaType,
      });

       await newWatched.save();

       await createActivity(userId,undefined, mediaId, mediaType, 'watched',undefined);
    }
    revalidatePath(path)
  } catch (error) {
    console.error("Error while watched media:", error);
    throw new Error("Unable to watched/unwatch meida");
  }
}
export async function fetchWatchedUsers(mediaId: number,mediaType:string) {
  connectToDB();

  try {
    const watched = await Watched.find({ mediaId, mediaType });

    if (!watched) {
      throw new Error('like not found');
    }

   
    const watchedUsers = watched.map((like: { userId: mongoose.Types.ObjectId }) =>
      like.userId.toString() 
    );

    return watchedUsers;
  } catch (error) {
    console.error("Error while watched media:", error);
    throw new Error("Unable to watched/unwatch meida");
  }
}



export async function addWatchlist(mediaId: number, userId: string, mediaType:string,path: string) {
  connectToDB();

  try {
    const watchlist = await Watchlist.findOne({ userId, mediaId, mediaType });
    
    if (watchlist) {
     
      await Watchlist.findOneAndRemove({ _id: watchlist._id });

     
      await Activity.findOneAndRemove({
        userId,
        mediaId,
        mediaType,
        actionType: 'watchlist',
      });
    } else{
      const newWatchlist = new Watchlist({
        userId,
        mediaId,
        mediaType,
      });

       await newWatchlist.save();
       await createActivity(userId,undefined, mediaId, mediaType, 'watchlist',undefined);
    }
    revalidatePath(path)
  } catch (error) {
    console.error("Error while liking thread:", error);
    throw new Error("Unable to like/unlike thread");
  }
}

export async function fetchWatchlistUsers(mediaId: number,mediaType:string) {
  connectToDB();

  try {
    const watchlist = await Watchlist.find({ mediaId, mediaType });

    if (!watchlist) {
      throw new Error('like not found');
    }

   
    const watchlistUsers = watchlist.map((like: { userId: mongoose.Types.ObjectId }) =>
      like.userId.toString() 
    );

    return watchlistUsers;
  } catch (error) {
    console.error("Error while fetching liked users:", error);
    throw new Error("Unable to fetch liked users");
  }
}


export async function addRating(mediaId:number,userId:string,mediaType:string,rating:number,path:string){
 
  connectToDB()

try {
   const newRating = new Rating({
    userId,
    mediaId,
    mediaType,
    rating,
   })

   await newRating.save()
   await createActivity(userId,undefined, mediaId, mediaType, 'rating',rating);
   revalidatePath(path)
  
} catch (error) {
  console.error("Error while liking thread:", error);
    throw new Error("Unable to like/unlike thread");
}

}

export async function fetchRatingUser(mediaId:number,mediaType:string){
  connectToDB();

  try {
    const userRatings = await Rating.find({ mediaId, mediaType });
    return userRatings;

  } catch (error) {
    console.error("Error while fetching liked users:", error);
    throw new Error("Unable to fetch liked users");
  }
}
export async function getUserRating(userId:string){
  connectToDB();

  try {
    const ratings = await Rating.find({userId:userId})

    return ratings
  } catch (error) {
    console.log(error)
  }
}

export async function deleteRating(mediaId:number,userId:string,mediaType:string,path:string){
 
  connectToDB()

try {
  const rating = await Rating.findOne({ userId, mediaId, mediaType });

  await Rating.findOneAndRemove({ _id: rating._id });
  await Activity.findOneAndRemove({
    userId,
    mediaId,
    mediaType,
    actionType: 'rating',
  });

   revalidatePath(path)
  
} catch (error) {
  console.error("Error while liking thread:", error);
    throw new Error("Unable to like/unlike thread");
}

}

export async function createNewComment(userId:string,mediaId:number,mediaType:string,text:string,path:string){

  connectToDB()

  try {

    const newComment = new Comment({
      userId,
      mediaId,
      mediaType,
      text
    })
    await newComment.save()
    revalidatePath(path)

  } catch (error) {
    console.error("Error while adding comment:", error);
    throw new Error("Unable to create comment");
  }

}

export async function getComments(mediaId:number,mediaType:string){

  connectToDB()

  try {
      const commentsQuery = Comment.find({
        mediaId:mediaId,
        mediaType:mediaType
      }).sort({createdAt:"desc"}).populate({path:"userId", model:User})

      return commentsQuery;
  } catch (error) {
    console.error("Error while getting comment:", error);
    throw new Error("Unable to get comments");
  }

}

export async function addLikeToComment(commentId:string,userId:string,path:string){
  
  connectToDB()

  try {
      const  comment = await Comment.findById(commentId)
      
      if(!comment){
        throw new Error('Comment not found');
      }
       
       const existingLike = comment.likes.find((like: { userId: string }) => like.userId.toString() === userId.toString());

       if (existingLike){
         
         comment.likes.pull(existingLike); 
       }else{
        comment.likes.push({ userId: userId})
       }
       await comment.save(); 
       revalidatePath(path)
  } catch (error) {
    console.error("Error while liking Comment:", error);
    throw new Error("Unable to like that comment");
  }
}


export async function fetchCommentLikes(id:string){

  connectToDB();
  try {
     const comment = await Comment.findById(id)

     if(!comment){
      throw new Error('comment not found');
     }
     const likedUsers = comment.likes.map((like: { userId: mongoose.Types.ObjectId }) =>
     like.userId.toString() 
   );
   return likedUsers;
  } catch (error) {
    console.error("Error while fetching liked users:", error);
    throw new Error("Unable to fetch liked users");
  }
}

export async function getRelation(userId:string){

  connectToDB()

  try {

    const followers = await Relation.find({ followedUser: userId })
    .populate('followerUser', 'name'); 

    const following = await Relation.find({ followerUser: userId })
      .populate('followedUser', 'name'); 

    return { followers, following };
    
  } catch (error) {
    console.error("Error while get relation", error);
    throw new Error("Unable to get relation users");
  }
}

export async function addRelation(followerId:string,followedId:string,path:string){
  
  connectToDB()
  try {
    
    const existingRelation = await Relation.findOne({
      followerUser: followerId,
      followedUser: followedId,
    })
    if (existingRelation) {

      await Relation.findOneAndRemove({
        followerUser: followerId,
        followedUser: followedId,
      })
    } else {

      await Relation.create({
        followerUser: followerId,
        followedUser: followedId,
        createdAt: new Date(),
      });
    }

    revalidatePath(path)
  } catch (error) {
    console.error("Error while adding relation", error);
    throw new Error("Unable to add relation users");
  }
}

export async function userFavoriteMedia(userId:string,mediaType:string) {
  connectToDB();

  try {
    const favorite = await Favorite.find({userId, mediaType });

    if (!favorite) {
      throw new Error('Thread not found');
    }

   
    const favoriteItems = favorite.map((like: { mediaId: number}) =>
      like.mediaId 
    );

    return favoriteItems;
  } catch (error) {
    console.error("Error while fetching liked users:", error);
    throw new Error("Unable to fetch liked users");
  }
}

export async function ProfileComments(userId:string){

  connectToDB()

  try {

    const comments = await Comment.find({userId})
    
    if(!comments){
      throw new Error('comment not found');
    }

    return comments

  } catch (error) {
    console.error("Error while fetching comments :", error);
    throw new Error("Unable to fetch comments");
  }
  
}

export async function createActivity(userId: string, followerUser: string | undefined, mediaId: number | undefined, mediaType: string | undefined, actionType: string, rating?: number): Promise<void> {

  const newActivity = new Activity({
    userId,
    followerUser,
    mediaId,
    mediaType,
    actionType,
    rating,
    createdAt: new Date(),
  });

  await newActivity.save();

}

export async function getActivities(userId:string){

  connectToDB()

  try {

    const activities = await Activity.find({
      userId:userId
    }).sort({ createdAt: -1 }).populate({path:"userId", model:User});

    return activities
  } catch (error) {
    console.error("Error while getting activities", error);
    throw new Error("Unable to get activities");
  }

}

export async function getUserFilms(userId:string,mediaType:string){
  connectToDB()
  try {

    const films = await Watched.find({
      userId:userId,
      mediaType:mediaType
    })

    return films
  } catch (error) {
    console.error("Error while getting user films", error);
    throw new Error("Unable to get user films");
  }
}
export async function getUserFilmIds(userId: string, mediaType: string) {
  connectToDB();
  try {
    const films = await Watched.find({
      userId: userId,
      mediaType: mediaType,
    });

   
    const filmIds = films.map((film) => film.mediaId.toString());

    return filmIds;
  } catch (error) {
    console.error("Error while getting user films", error);
    throw new Error("Unable to get user films");
  }
}
export async function getUserSeries(userId:string,mediaType:string){
  connectToDB()
  try {

    const films = await Watched.find({
      userId:userId,
      mediaType:mediaType
    })

    return films
  } catch (error) {
    console.error("Error while getting user films", error);
    throw new Error("Unable to get user films");
  }
}

export async function getUserWatchlist(userId:string){
  connectToDB()
  try {

    const films = await Watchlist.find({
      userId:userId,
    })

    return films
  } catch (error) {
    console.error("Error while getting user films", error);
    throw new Error("Unable to get user films");
  }
}

export async function getUserReviews(userId:string){
  connectToDB()
  try {

    const films = await Comment.find({
      userId:userId,
    })

    return films
  } catch (error) {
    console.error("Error while getting user films", error);
    throw new Error("Unable to get user films");
  }
}

export async function getUserLikes(userId:string){
  connectToDB()
  try {

    const films = await Like.find({
      userId:userId,
    })

    return films
  } catch (error) {
    console.error("Error while getting user films", error);
    throw new Error("Unable to get user films");
  }
}

export async function getFriendsReviews(userId: string, mediaId: number) {
  connectToDB();

  try {

    const friends = await Relation.find({ followedUser: userId });
    const friendIds = friends.map((friend) => friend.followerUser.toString());
    const mappedFriendIds = friendIds.map((id) => id);

    console.log("friendIds:", friendIds);

    const friendWatchedData = await Watched.find({
      userId: { $in: mappedFriendIds },
      mediaId: mediaId,
    }).populate('userId', 'username').lean(); 

    console.log("friendWatchedData:", friendWatchedData);

    const friendRatingData = await Rating.find({
      userId: { $in: mappedFriendIds },
      mediaId: mediaId,
    })
      .populate('userId', 'username rating image')
      .sort({ createdAt: -1 })
      .lean();

    console.log("friendRatingData:", friendRatingData);

    return { friendWatchedData, friendRatingData };
  } catch (error) {
    console.error("Error while getting friends activity", error);
    throw new Error("Unable to get friends activity");
  }
}

export async function getFriendsComments (userId:string,mediaId:number) {
  connectToDB();

  try {
    const friends = await Relation.find({ followedUser: userId });
    const friendIds = friends.map((friend) => friend.followerUser.toString());
    const mappedFriendIds = friendIds.map((id) => id);

    const comments = await Comment.find({
      userId: {$in :mappedFriendIds},
      mediaId:mediaId,
    }).populate('userId', 'username image')
    .sort({ createdAt: -1 })
    .exec(); 

    const commentsAsObjects = comments.map((comment) => comment.toObject());

    return commentsAsObjects;



  } catch (error) {
    console.error("Error while getting friends activity", error);
    throw new Error("Unable to get friends activity");
  }
}

export async function getPopularComments(mediaId: number) {
  connectToDB();

  try {
    const commentsWithLikes = await Comment.aggregate([
      {
        $match: {
          mediaId: mediaId,
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
    ]);

    
    commentsWithLikes.sort((a, b) => b.likesCount - a.likesCount);

    const popularComments = [];
    const otherComments = [];

    for (const comment of commentsWithLikes) {
      if (comment.likesCount > 0) {
        popularComments.push(comment);
      } else {
        otherComments.push(comment);
      }
    }

   
    otherComments.sort((a, b) => b.createdAt - a.createdAt);

   
    const combinedComments = popularComments.concat(otherComments).slice(0, 3);

    const populatedComments = await Comment.populate(combinedComments, {
      path: 'userId',
      select: 'username image',
    });

    return populatedComments;
  } catch (error) {
    console.error("Error while getting comments", error);
    throw new Error("Unable to get comments");
  }
}


