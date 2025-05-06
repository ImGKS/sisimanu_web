import React, { useState } from 'react'
import { BASE_URL } from '../utils/urlConstant';
import axios from 'axios';
import  batch  from "../assets/tickmark.png"
import { toast } from 'react-toastify';

const RequestCard = ({ user }) => {

  const [showButtons, setShowButtons] = useState(true);

  const handleRequest = async (status, id) => {
    try { 
      await axios.post(BASE_URL + `/request/review/${status}/${id}`,{}, {withCredentials: true})
      toast.success("Request status updated successfullt.")
      setShowButtons(false)
    } catch  (error) {
      console.log("errror", error)
      toast.error("Something went wrong.")
    }
  }
    return (
      <div className="w-full max-w-3xl mx-auto p-5">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl border border-white/20 p-3 flex flex-col md:flex-row items-center gap-3">
          <img
            src={user?.profilePic || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-white/30 shadow-md"
          />
  
            <div className="text-white flex-1">
                  <div className="flex items-center">
                    <h2 className="text-2xl font-semibold">{user?.firstName + " " + user?.lastName}</h2>
                    {user?.isPremium &&
                      <img src={batch} alt="icon" className="h-7 w-7 mx-1" />
                    }
                  </div>
                <h2 className="text-lg text-white/70 mb-2">{user?.age}, {user?.gender}</h2>
            </div>
            {showButtons && <>
              <button
                className="px-4 cursor-pointer py-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white font-medium transition duration-200"
                onClick={()=>handleRequest("accepted", user._id)}
                >
                  Accept
              </button>
              <button 
                className="px-4 cursor-pointer py-2 bg-gray-400 hover:bg-gray-500 rounded-lg text-white font-medium transition duration-200"
                onClick={()=>handleRequest("rejected", user._id)}
              >
                  Ignore
              </button>
            </>}
        </div>
      </div>
    );
  };
  

export default RequestCard