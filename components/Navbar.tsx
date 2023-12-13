"use client";
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import NavbarInput from './NavbarInput'
import useUser from '@/utils/useUser';
import { usePathname } from 'next/navigation';
import {useEffect, useState} from "react";

const Navbar = () => {

  const { data: session, status } = useSession();
  const pathname = usePathname()
  const [hover,setHover] = useState<boolean>(false)
  const [email, setEmail] = useState<string | null>(null);

  
  useEffect(() => {
    setEmail(session?.user?.email || null);
  }, [session]);

  const user = useUser(email);
  
  const isSerieDetailsPage = pathname.startsWith("/serie-details/");
  const isMovieDetailsPage = pathname.startsWith("/movie-details/");
  let serieId;

if (isSerieDetailsPage) {
 
  serieId = pathname.split("/")[2]; 
}


  const handleSignOut = async() =>{
    await signOut();
  }


  if (status === 'loading') {
    return <div>Loading...</div>; 
  }
  return (
    <nav className={`${isSerieDetailsPage || isMovieDetailsPage ? 'navbar' : 'bg-[#14181c]  shadow-emerald-500 shadow-lg'}`}>
        <div className={`max-w-5xl mx-auto h-[72px]  text-[#9ab]  ${isSerieDetailsPage || isMovieDetailsPage ? 'text-white': 'text-[#9ab' } `}>
        <div className='  max-w-[1440px] m-auto w-full h-full justify-between flex flex-row relative items-center'>
              <div className='flex items-center justify-center gap-[5px]'>
                <Link href="/" >
                            <Image 
                            src="/sauron.png"
                            alt="logo"
                            width={40}
                            height={40}
                            className='object-cover hidden md:flex'
                            />
                </Link>
                <Link href="/">
                <span className='text-[16px] md:text-[20px] font-heavitas text-[#fff]  '>ZoomBackCamera</span>
                </Link>
              </div>
               {/* <div className='hidden sm:flex bg-white rounded-[5px]  px-[10px] h-[50%] '>
                <NavbarInput />
               </div> */}
               <div className='hidden lg:flex justify-center items-center font-heavitas gap-[30px]  '>
               {
                           status === "authenticated" ? (
                           <div className='flex gap-4 relative ' 
                           onMouseEnter={() => setHover(true)}
                           onMouseLeave={() => setHover(false)}
                           >
                              <div className={`flex items-center gap-3 p-2  cursor-pointer  ${hover && 'bg-[#89a] text-[#fff] shadow-md shadow-[#000000]'} rounded-[2px]  `}
                              
                              >
                              {user?.image ? (
                                <img src={user?.image} alt="" className='w-8 h-8 rounded-[50%]' />
                              ) : 
                              <img src="/assets/user.png" alt="" className='w-8 h-8  rounded-[50%]'  />
                              }
                              <p className='text-[15px] font-graphikBold  tracking-wider uppercase'>{user?.username}</p>                      
                            </div>
                            {hover && 
                           <div className='bg-[#89a] shadow-md shadow-[#000000] gap-2 flex flex-col  py-2 absolute bottom-[-259px] z-[99999] w-full rounded-[2px] text-[#000000] border-t border-[#000000]  '> 
                           <Link href={`/`} className='hover:bg-[#000000] hover:text-[#fff] pl-2'>
                                <p>Home</p>
                               </Link>
                               <Link href={`/profile/${user?._id}`} className='hover:bg-[#000000] hover:text-[#fff] pl-2'>
                                <p>Profile</p>
                               </Link>
                               <Link href={`/profile/${user?._id}`} className='hover:bg-[#000000] hover:text-[#fff] pl-2'>
                                <p>Films</p>
                               </Link>
                               <Link href={`/profile/${user?._id}`} className='hover:bg-[#000000] hover:text-[#fff] pl-2'>
                                <p>Series</p>
                               </Link>
                               <Link href={`/profile/${user?._id}`} className='hover:bg-[#000000] hover:text-[#fff] pl-2'>
                                <p>Reviews</p>
                               </Link>
                               <Link href={`/profile/${user?._id}`} className='hover:bg-[#000000] hover:text-[#fff] pl-2'>
                                <p>Watchlist</p>
                               </Link>
                               <Link href={`/profile/${user?._id}`} className='hover:bg-[#000000] hover:text-[#fff] pl-2'>
                                <p>Likes</p>
                               </Link>
                               <button className='items-start flex hover:bg-[#000000] hover:text-[#fff] pl-2'  
                              onClick={handleSignOut} >
                                  Logout
                              </button>
                              </div>}      
  
                           </div>
                          ) :
                         ( <Link href="/login">
                          <span>Login</span>
                             </Link>)
                            
                        }
                        <Link href="/movies" className='hover:text-[#fff]'>
                            <span>Films</span>
                        </Link>
                        <Link href="/series" className='hover:text-[#fff]'>
                            Series
                        </Link>
                        <div className='hidden sm:flex rounded-[5px]  px-[10px] h-[50%] '>
                          <NavbarInput />
                        </div>
                       
                       
               </div>
               <div className='flex lg:hidden '>
                   <Image 
                   src="/hamburger.svg"
                   alt="hamburger"
                   width={40}
                   height={40}
                   className='cursor-pointer'
                   
                   />
                </div>
        </div>
        </div>
    </nav>
  )
}

export default Navbar