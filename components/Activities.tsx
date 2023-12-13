"use client";
import {useEffect, useState} from "react";
import useUser from '@/utils/useUser';
import moment from 'moment';
import { useSession } from 'next-auth/react';

const Activities = ({serializedActivities,id}:ActivityProps) => {

    const { data: session, status } = useSession();
    const user = useUser(session?.user?.email ||null)!
   const [userAcvitiy,setUserActivity] = useState<combinedActivities[]>([]);
   const baseUrl = 'https://api.themoviedb.org/3'
   const API_KEY = '8c4e79ed80f9f915a30a2faece2daa0f'



    // function getActionSentence(actionType:string, rating:number, mediaId:string) {
    //     switch (actionType) {
    //       case 'like':
    //         return `liked ${mediaId}`;
    //       case 'watched':
    //         return `watched ${mediaId}`;
    //       case 'rating':
    //         return `rated ${rating}/10 for mediaId ${mediaId}`;
    //       case 'watchlist':
    //         return `added ${mediaId} to your watchlist`;
    //       default:
    //         return ''; 
    //     }
    //   }
      const mediaMovieType = serializedActivities.filter((item)=> item.mediaType === "movie")
      const mediaSerieType = serializedActivities.filter((item)=> item.mediaType === "serie")
      const mediaMovieIds = mediaMovieType.map((item)=>item.mediaId)
      const mediaSerieIds = mediaSerieType.map((item)=> item.mediaId)
      
    useEffect(()=>{

      const fetchUserActivity = async () =>{

          try {
            const moviePromises = mediaMovieIds.map((id)=>
            fetch(`${baseUrl}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits&include_image_language=en,null`)
          )
          const seriesPromises = mediaSerieIds.map((id)=>
          fetch(`${baseUrl}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits&include_image_language=en,null`)
          )

          const movieResponses = await Promise.all(moviePromises)
          const seriesResponses = await Promise.all(seriesPromises)

          const movieData = await Promise.all(movieResponses.map((response)=> response.json()))
          const serieData = await Promise.all(seriesResponses.map((response)=> response.json()))

          const moviesWithData: Activity[] = movieData.map((movie, index)=>({
              id:movie.id,              
              title: movie.title,
              type: "movie",
              actionType: mediaMovieType[index].actionType,
              name:mediaMovieType[index].name,
              userId:mediaMovieType[index].userId,
              rating: movie.rating ?? null, 
              createdAt:mediaMovieType[index].createdAt,
          }))
          const seriesWithData: Activity[] = serieData.map((movie, index)=>({
            id:movie.id,              
            title: movie.name,
            type: "serie",
            actionType: mediaSerieType[index].actionType,
            name:mediaSerieType[index].name,
            userId:mediaSerieType[index].userId,
            rating: movie.rating ?? null, 
            createdAt:mediaSerieType[index].createdAt,
        }))
        const allActivities: Activity[]  = [...moviesWithData, ...seriesWithData];

        
      const groupedActivities: GroupedActivities = allActivities.reduce((groups: GroupedActivities, activity: Activity) => {
        const key = activity.id;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(activity);
        return groups;
      }, {});

      const combinedActivities: combinedActivities[] = Object.values(groupedActivities).map((group) => {
        const uniqueActionTypes = [...new Set(group.map((activity) => activity.actionType))];
      
        const combinedItem: ActivityData[] = uniqueActionTypes.map((actionType) => {
          const activity = group.find((activity) => activity.actionType === actionType);
      
          
          return {
            type: actionType || '', 
            rating: activity?.rating ?? null, 
          };
        });
      
        return {
          id: group[0].id,
          title: group[0].title,
          type: group[0].type,
          userId: group[0].userId,
          name: group[0].name,
          createdAt: group[0].createdAt,
          activities: combinedItem,
        };
      });
      
      setUserActivity(combinedActivities);
          } catch (error) {
            console.log(error)
          }
      }
      fetchUserActivity()
    },[id])

const generateDescription = (activity:any) => {
  switch (activity.type) {
    case 'watched':
      return 'watched ';
    case 'like':
      return 'liked ';
    case 'watchlist':
      return `added  to your watchlist`;
    case 'rating':
      return `rated `;
    default:
      return activity.type;
  }
};

const sortedUserActivity = userAcvitiy
  .slice()
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());



const getActivityDescription = (activities:ActivityData[],title: string) => {
  const activityTypes = ['watched', 'like', 'watchlist', 'rating'];

  const sortedActivities = activities
    .slice()
    .sort((a, b) => activityTypes.indexOf(b.type) - activityTypes.indexOf(a.type));

  const description = sortedActivities
    .map((activity) => generateDescription(activity))
    .filter((activity) => activity !== '');

  if (description.length > 1) {
    const lastItem = description.pop();
    return `${description.join(' ')} and ${lastItem}`;
  } else {
    return description[0] || '';
  }
};

  return (
    <div className='max-w-5xl mx-auto mt-[40px] flex flex-col  '>
        <div className='border-b border-[#456] '>
            <p>{user?._id === id ? 'You' : sortedUserActivity[0]?.name}</p>
        </div>
        <div>
        {sortedUserActivity.map((item) => (
        <div key={item.id} className='p-2 bg-[#1c232a] border-t border-[#111] flex justify-between'>
          <p className='text-[15px]'>
            {item.userId === user?._id ? 'You' : item.name}{' '}
            {getActivityDescription(item.activities, item.title)} <span className="text-[#fff]">{item.title}</span> on{' '}
            {moment(item.createdAt).format('dddd MMM D, YYYY')}
          </p>
          <p className='text-[12px]'>{moment(item.createdAt).fromNow()}</p>
        </div>
      ))}
        </div>

    </div>
  )
}

export default Activities