import React from 'react'

const Footer = () => {
  return (
    <footer className='w-[100%] bg-[#000000] mt-[50px] h-[150px] flex flex-col font-thebold '>
        <div className='flex w-[100%] md:w-[500px]  m-auto gap-[20px] items-center justify-center '>
          <span className='cursor-pointer'>About</span>
          <span className='cursor-pointer'>News</span>
          <span className='cursor-pointer'>Help</span>
          <span className='cursor-pointer'>Terms</span>
          <span className='cursor-pointer'>API</span>
          <span className='cursor-pointer'>Contact</span>
        </div>
        <div className='flex  w-[100%] md:w-[600px] px-3 md:px-0 m-auto items-center justify-center text-[14px]  '>
          <span>© Zoombackcamera Limited. Made by Gurkan Maral. Film data from TMDb.</span>
        </div>
    </footer>
  )
}

export default Footer