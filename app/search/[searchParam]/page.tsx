
import Search from '@/components/Search'
import { getSearchedUsers } from '@/lib/actions/user.actions';
import React from 'react'

const page = async({params}:{params:{searchParam:string}}) => {

    const {searchParam} = params

    const decodedSearchParam = decodeURIComponent(searchParam);
    const users = await getSearchedUsers(decodedSearchParam)

    const serializedUsers = users.map((user)=>({
      id:user._id.toString(),
      image:user.image || "",
      name:user.name,
      username:user.username

    }))


  return (
    <div className='w-full h-full'>
        <Search 
        searchParam={decodedSearchParam}
        serializedUsers={serializedUsers}
        />
    </div>
  )
}

export default page