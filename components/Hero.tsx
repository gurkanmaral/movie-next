"use client";
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const Hero = () => {

    const session = useSession();
   

  return (
    <div className='flex flex-col'>
        <div className='relative m-auto'>
            <div className=' flex'>
                <Image 
                src="/assets/herobanner.jpeg"
                alt="hero"
                width={1240}
                height={700}
                className='object-contain opacity-[0.8] '
                
                />
                <div className='hidden md:flex absolute top-10 left-14 text-[25px] lg:text-[50px] font-heavitas text-[#fff]'>
                  <p>Discover movies and series.</p>
                </div>
                <div className='hidden md:flex absolute bottom-10 right-[50px] text-[18px] lg:text-[25px] font-heavitas text-[#fff]'>
                          <p>Keep track of films and series you&apos;ve watched. <br /> And follow your friends.</p>
                </div>
                {session.status !== "authenticated" && 
                <Link href="/register" className='absolute bottom-[40%] md:bottom-14 left-[40%] md:left-[50px] bg-[#000000] p-[10px] rounded-[10px] text-[#fff]'>
                    <button>
                        JOIN NOW
                    </button>
                </Link>
                }
            </div>           
        </div>
    </div>
  )
}

export default Hero