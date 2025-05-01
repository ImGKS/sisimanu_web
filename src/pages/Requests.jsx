import React, { useEffect, useState } from 'react'
import RequestCard from '../components/RequestCard'
import axios from 'axios'
import { BASE_URL } from '../utils/urlConstant'

const Requests = () => {

  const [requests, setRequest] = useState([])

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/received/request", {withCredentials: true})
      setRequest(res?.data?.data)
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchRequest()
  },[])

  if (requests.length === 0) return <h1 className='text-center text-3xl text-white/70'>No Incoming requests found.</h1>
  return (
    <div>
      {requests.map((user) => {
        return <RequestCard user={user.fromUserId} key={user._id} />
      })}
    </div>
  )
}

export default Requests