"use client";

import { addRating, deleteRating } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";

interface RatingProps {
  numberId:number,
  userId:string,
  type:string,
  userRating:RatingPropss[];
}
interface RatingPropss {
  _id: string; 
  userId: string; 
  mediaId: number;
  mediaType: string;
  rating: number;
  createdAt: Date;
  __v: number;
}
const Rating = ({numberId,userId,type,userRating}:RatingProps) => {

    const [rating, setRating] = useState("")

    const currentUserRating = userRating.find((rating) => rating.userId === userId);

    const pathname = usePathname()

    const handleRating = async (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const newRating = parseInt(rating);

        await addRating(numberId,userId,type,newRating,pathname)
    }

   
  return (
    <div className="">
       {currentUserRating ? (
                  <div className='flex gap-[20px] pl-4'>
                    <p className="text-[#00e054] text-[20px]">{currentUserRating.rating}</p>
                    <button onClick={async () =>{
                      await deleteRating(numberId,userId,type,pathname)
                    }}>
                      <span>delete</span>
                    </button>
                  </div>
                  ) : (
      <form className="flex gap-[5px]"
            onSubmit={handleRating}>
      <select   
      value={rating}
      onChange={(e)=>setRating(e.target.value)}          
        className="border-none text-[#000000] rounded-[5px] bg-[#fff] px-1   cursor-pointer "
      >
        <option value="">Rate</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <button type="submit" className="border-none rounded-[5px]  cursor-pointer ">
        Submit Rating
      </button>
    </form>
          )}
    </div>
  )
}

export default Rating