"use client";
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import React from 'react'

const SecondHero = () => {

  const session = useSession();

 
  return (
    <div className=''>
       {session.status === "authenticated" && 
       <div className=' text-[25px] md:text-[40px] w-full text-white font-thebold m-auto flex items-center justify-center mt-[20px] '>
          <span> WELCOME {session?.data?.user?.name}</span>
        </div>}
        <div className='mt-[50px] w-[70%] m-auto flex flex-col gap-[50px] md:gap-[2px]'>
            <div className='w-full h-full flex flex-col md:flex-row items-center justify-center gap-[20px] md:gap-[1px]'>
              <div className='' style={{flex:1}}>
                  <Image
                  src="/assets/banner-2.jpg"
                  alt="hero-2"
                  width={250}
                  height={300}
                  className='object-contain rounded-[10px] shadow '
                  />
              </div>
              <div style={{flex:2}} className='text-[20px] md:text-[25px] font-heavitas w-[250px] '>
                  <span>Track the movies and series you&apos;ve watched.</span>
              </div>
            </div>
            <div className='w-full h-full flex items-center justify-center flex-col md:flex-row-reverse  gap-[20px] md:gap-[1px]'>
              <div className='' style={{flex:1}}>
                  <Image
                  src="/assets/banner-6.jpg"
                  alt="hero-2"
                  width={250}
                  height={300}
                  className='object-contain rounded-[10px] shadow '
                  />
              </div>
              <div style={{flex:2}} className='text-[20px] md:text-[25px] font-heavitas w-[250px] '>
                  <span>Like the movies and series you&apos;ve enjoyed.</span>
              </div>
            </div>
            <div className='w-full h-full flex flex-col md:flex-row items-center justify-center gap-[20px] md:gap-[1px]'>
              <div className='' style={{flex:1}}>
                  <Image
                  src="/assets/banner-5.jpg"
                  alt="hero-2"
                  width={250}
                  height={300}
                  className='object-contain rounded-[10px] shadow '
                  />
              </div>
              <div style={{flex:2}} className='text-[20px] md:text-[25px] font-heavitas w-[250px]'>
                  <span>Comment on films and series and check other people&apos;s reviews.</span>
              </div>
            </div>
            <div className='w-full h-full flex items-center justify-center flex-col md:flex-row-reverse  gap-[20px] md:gap-[1px]'>
              <div className='' style={{flex:1}}>
                  <Image
                  src="/assets/banner-7.jpg"
                  alt="hero-2"
                  width={250}
                  height={300}
                  className='object-contain rounded-[10px] shadow '
                  />
              </div>
              <div style={{flex:2}} className='text-[20px] md:text-[25px] font-thebold w-[250px] '>
                  <span>Show your favorite movies and series on your profile.</span>
              </div>
            </div>
        </div>

    </div>
  )
}

export default SecondHero