"use client"

import {zodResolver} from '@hookform/resolvers/zod'
import { getOneUser, updateUser } from "@/lib/actions/user.actions";
// import {  useUploadThing } from "@/lib/uploadthing";
import useUser from "@/utils/useUser";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Input } from './ui/input';
import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { isBase64Image } from '@/lib/utils';

export const UserValidation = z.object({
  profile_photo:z.string().min(1).url(),
  name: z.string().min(3).max(30),

})


const Update = () => {

    const { data: session, status } = useSession();
    const user = useUser(session?.user?.email ||null)!
    const [name,setName] = useState("");
    const [files, setFiles] = useState<File[]>([])
    const [userInfo,setUserInfo] = useState<UserType | null>(null)
   
    interface UserType {
      image: string;
      name:string;
    }

const router = useRouter();

    // const {startUpload} = useUploadThing("imageUploader")

const form = useForm<z.infer<typeof UserValidation>>({
        resolver: zodResolver(UserValidation),
        defaultValues: {
          profile_photo: userInfo ? userInfo.image : "",
          name: userInfo ? userInfo.name : "",
        }
    })

    useEffect(()=>{
      const fetchUser = async()=>{

        try {
            const userInfo = await getOneUser(user?._id)
            setUserInfo(userInfo)

            form.reset({
              profile_photo: userInfo.image,
              name: userInfo.name,
            });
        } catch (error) {
          console.log(error)
        }
      }
      fetchUser()
  },[user?._id,form])

    if (!user) return null;

    

    const handleImage = (e:ChangeEvent<HTMLInputElement>,fieldChange: (value:string)=>void)=>{
      e.preventDefault()

      const fileReader = new FileReader();
      if(e.target.files && e.target.files.length > 0){
        const file = e.target.files[0];

        setFiles(Array.from(e.target.files));

        if(!file.type.includes('image')) return;

        fileReader.onload = async (event)=>{
          const imageDataUrl = event.target?.result?.toString() || '';

          fieldChange(imageDataUrl);

        }
        fileReader.readAsDataURL(file);
      }
    
    }

   const uploadImage = async(imagePath:string)=>{
      try {
  
          const response = await fetch(`https://movie-next-fawn-zeta.vercel.app/api/upload`,{
              method: 'POST',
              body: JSON.stringify({path: imagePath})
          })
          
          return response.json();
      } catch (error) {
          throw error
      }
  }

    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
      try {
        const blob = values.profile_photo;
        const hasImageChanged = isBase64Image(blob);

        if(hasImageChanged) {
          const imageUrl = await uploadImage(values.profile_photo);
  
          if (imageUrl.url) {
            values.profile_photo = imageUrl.url 
          }
        }
        
    
        
      
        await updateUser({
          userId: user._id,
          name: values.name,
          image: values.profile_photo,
        });
        router.push(`/profile/${user._id}`)
      } catch (error) {
        console.error('Error uploading image or updating user:', error);
      }
    };
  

  return (
    <div className="max-w-3xl mx-auto  mt-10 min-h-screen">
      <Form {...form}>
        <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)} >
        <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className='flex items-center gap-4'>
                <FormLabel className='account-form_image-label'>
                  {field.value?(
                    <Image 
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className='rounded-full object-contain'

                    />

                  ): (
                    <Image
                    src="/assets/user.png"
                    alt="profile photo"
                    width={50}
                    height={50}
                    className=' object-contain'
                    />
                  )}
                </FormLabel>
                <FormControl className='flex-1 text-base-semibold text-gray-200'>
                  <Input type='file' accept='image/*'
                  placeholder='Upload a photo'
                  className='account-form_image-input'
                  onChange={(e)=> handleImage(e,field.onChange)}
                  />
                </FormControl>
                <FormMessage  />
              </FormItem>
            )}
          />
                 <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className='flex flex-col gap-3 w-full'>
                <FormLabel className='text-base-semibold text-light-2'>
                  Name
                </FormLabel>
                <FormControl >
                  <Input type='text' 
                  className='account-form_input no-focus'
                  {...field}
                  />
                </FormControl>
                <FormMessage  />
              </FormItem>
            )}
          />
 <Button type="submit" className='text-[#fff] bg-dark-1'>Submit</Button>
        </form>
      </Form> 
        
    </div>
  )
}

export default Update