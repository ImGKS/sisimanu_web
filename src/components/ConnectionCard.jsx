import React from 'react'
import { useNavigate } from 'react-router';
import  batch  from "../assets/tickmark.png"

const ConnectionCard = ({ user }) => {

  const navigate = useNavigate();

  const handleView = (id) => {
    navigate("/viewProfile/"+id)
  }

  const handleChat = (id) => {
    navigate("/chat/"+id)
  }

    return (
      <div className="w-full max-w-3xl mx-auto p-1">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl border border-white/20 px-5 py-2 flex flex-col md:flex-row items-center gap-3">
          <img
            src={user?.profilePic || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-white/30 shadow-md"
          />
  
            <div className="text-white flex-1">
              <div className='flex items-center'>
                <h1 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h1>
                <img src={batch} alt="icon" className="h-7 w-7 mx-1" />
              </div>
                <h2 className="text-lg text-white/70 mb-2">{user?.age}, {user?.gender}</h2>
            </div>
            <div className='flex gap-5'>
              <button className="px-4 cursor-pointer py-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white font-medium transition duration-200"
                onClick={()=>handleChat(user?._id)}
              >
                Chat
              </button>
              <button className="px-4 cursor-pointer py-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white font-medium transition duration-200"
                onClick={()=>handleView(user?._id)}
              >
                View Profile
              </button>
            </div>
        </div>
      </div>
    );
  };
  

export default ConnectionCard