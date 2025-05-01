import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { BASE_URL } from '../utils/urlConstant'

const ViewProfileCard = () => {

    const params = useParams()
    const userId = params.userId;

    const [ userData, setUserData] = useState([])

    const getProfileData = async () => {
        try {
            const res = await axios.get(BASE_URL + "/profile/" + userId, 
                {withCredentials: true}
            );   
            setUserData(res.data.data)
        } catch (error) {
            console.log("Error :", error.message);
        } 
    }

    useEffect (() => {
        getProfileData()
    },[])

  return (
    <div className="flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-8 w-80 flex flex-col items-start text-white">
        <div className="w-full flex justify-center">
          <img
            src={ userData.profilePic}
            alt="Profile"
            className="w-50 h-50 border border-white/30  rounded-2xl  shadow-md mb-4"
          />
        </div>
        <h2 className="text-2xl font-semibold">{userData.firstName + " " + userData.lastName}</h2>
        <p>{userData.age}, {userData.gender}</p>
        <p>{userData.about}</p>
        <div className="w-full flex justify-center space-x-4 mt-4">
          <button className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 cursor-pointer">
            message
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewProfileCard