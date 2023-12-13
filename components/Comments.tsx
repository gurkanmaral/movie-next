"use client"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { addLikeToComment, fetchCommentLikes } from '@/lib/actions/user.actions';
import {useState,useEffect} from "react"
import { usePathname } from "next/navigation";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Link from "next/link";



const Comments = ({id,userId,name,mediaId,image,text,createdAt,currentUser}:CommentType) => {
    const [likes, setLikes] = useState<any[]>([]);
    const pathname = usePathname()

    
    

    useEffect(() => {
        const fetchLikes = async () => {
          try {
            const likes = await fetchCommentLikes(id);
            setLikes(likes || []); 
          } catch (error) {
            console.error('Error fetching likes:', error);
          }
        };
    
        fetchLikes();
      }, [id]);
      const handleLikeClick = async (id: string, currentUser: string, pathname: string) => {
        try {
         
          const newLikes = isCurrentUserLiked 
              ? likes.filter((like) => like !== currentUser) 
              : [...likes, currentUser];
          setLikes(newLikes);
      
          
          await addLikeToComment(id, currentUser, pathname);
        } catch (error) {
          console.error('Error handling like:', error);
          
        }
      };

    
  
    const isCurrentUserLiked = likes?.includes(currentUser);
    return (
    <div key={id} className='grid grid-cols-10   pt-5 pb-2 border-[#2c3440] border-t '>
    <div className='col-span-1  '>
      {image ? (
             <Link href={`/profile/${userId}`} className="rounded-full">
                <img src={image} alt="" className="w-[50px] h-[50px] object-cover  rounded-[50%]" />
             </Link>
      ): <Link href={`/profile/${userId}`} className="rounded-full ">
            <img src="/assets/user.png" alt="" className="w-[50px] h-[50px] object-cover  rounded-[50%]" />
      </Link> 
      }
    </div>
    <div className='col-span-9    flex-col flex gap-4'>
      <p className="text-gray-400">Review by <span className="text-white font-bold">{name}</span></p>
      <p>
        {text}
      </p>
      <div className="flex items-center ">
        {!isCurrentUserLiked ? <FavoriteBorderOutlinedIcon className='w-[18px] h-[18px] cursor-pointer  '
        onClick={async()=>{
            await handleLikeClick(id,currentUser,pathname)
        }}
        />       
        : <FavoriteOutlinedIcon className='w-[18px] h-[18px] text-red-500 cursor-pointer text-[#D2122E]' 
        onClick={async()=>{
            await handleLikeClick(id,currentUser,pathname)
        }}
        /> }
       <p> {likes?.length}</p>
      </div>
    </div>
   </div>
  )
}

export default Comments