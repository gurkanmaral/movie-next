import ProfileBar from '@/components/ProfileBar'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {


  return (
    <div className=' w-full h-[100vh] profile-layout'>
        <div className='pt-0 md:pt-10'>
        <ProfileBar />
        </div>
        {children}
    
    </div>
  )
}

export default Layout