import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/urlConstant'
import ConnectionCard from '../components/ConnectionCard';

const Connection = () => {

  const [userConnection, setUserConnection] = useState([]);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {withCredentials: true})
      setUserConnection(res?.data?.data)
    } catch (error) {
      console.log("error", error);
      
    }
  }

  useEffect(() => {
    fetchConnections()
  },[])

  if (userConnection?.length === 0) return <h1 className='text-center text-3xl text-white/70'>No connection found.</h1>

  return (
    <>
      <h2 className='text-center text-3xl my-5 text-white'>Connections</h2>
      <div className='flex flex-col gap-2 mx-2 justify-start items-start h-[700px] overflow-y-scroll'>
        {userConnection?.map((user) => {
          return  <ConnectionCard user={user} key={user?._id} />
        })}
      </div>
    </>
  )
}

export default Connection