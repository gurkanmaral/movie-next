"use client";
import { createNewComment } from '@/lib/actions/user.actions';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

interface CommentProps{
    userId:string;
    numberId:number;
    mediaType:string;
}

const AddComment = ({userId,numberId,mediaType}:CommentProps) => {

    const [text,setText] = useState("")

    const pathname = usePathname()

    const handleAddComment = async (e:any) =>{
        e.preventDefault()
      
        await createNewComment(userId,numberId, mediaType ,text,pathname)
        
        setText("")
      }
   
        
  return (
    <form onSubmit={handleAddComment}>
                       <textarea value={text} onChange={(e)=>setText(e.target.value)} className='w-full rounded-[5px] outline-none border-white border bg-black p-2'  cols={10}  rows={5}  ></textarea>
                      <button type='submit'>
                          Send
                      </button>
                     </form>
  )
}

export default AddComment