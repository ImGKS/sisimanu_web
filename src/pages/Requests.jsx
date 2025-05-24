import React, { useEffect, useState } from 'react'
import RequestCard from '../components/RequestCard'
import axios from 'axios'
import { BASE_URL } from '../utils/urlConstant'
import { toast } from 'react-toastify'

const Requests = () => {

  const [requests, setRequest] = useState([])

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/received/request", {withCredentials: true})
      setRequest(res?.data?.data);
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong.")
    }
  }

  useEffect(() => {
    fetchRequest()
  },[])

  
  const handleRequest = async (status, id) => {
    try { 
      await axios.post(BASE_URL + `/request/review/${status}/${id}`,{}, {withCredentials: true})
      toast.success("Request status updated successfully.")
      const updatedUsers = requests?.filter(user => user?.fromUserId?._id !== id);
      setRequest(updatedUsers)
    } catch  (error) {
      console.log("errror", error)
      toast.error("Something went wrong.")
    }
  }

  if (requests.length === 0) return <h1 className='text-center text-3xl text-white/70'>No Incoming requests found.</h1>
  return (
    <div className='overflow-y-scroll h-200 sm:block'>
      {requests.map((user) => {
        return <RequestCard user={user.fromUserId} key={user._id} handleRequest={handleRequest} />
      })}
    </div>
  )
}

export default Requests