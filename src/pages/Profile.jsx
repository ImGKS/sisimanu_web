import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FeedCard from '../components/FeedCard';
import { BASE_URL } from '../utils/urlConstant';
import { addUser } from '../store/userSlice';
import { toast } from 'react-toastify';

const Profile = () => {
  const user = useSelector((store) => store?.user)
  const dispatch = useDispatch()

  useEffect(() => {},[user])

  const[firstName, setFirstName] = useState(user?.firstName);
  const[lastName, setLastName] = useState(user?.lastName);
  const[gender, setGender] = useState(user?.gender);
  const[age, setAge] = useState(user?.age);
  const[about, setAbout] = useState(user?.about);
  const[profilePic, setProfilePic] = useState(user?.profilePic);

  const isPremium = user?.isPremium

  const handleSave = async(e) => {
      e.preventDefault();
      try {
          const res = await axios.patch( BASE_URL + "/profile/edit", 
              { firstName, lastName, gender, age, about, profilePic },
              {withCredentials: true}
          );   
          toast.success("Profile updated successfully.")
          dispatch(addUser(res?.data?.data))
      } catch (error) {
          console.log("Error :", error.message);
          toast.error("Something went wrong. Please try again.")
      }
  }


  return (
    <div className='flex justify-center items-center '>
      <div className="flex items-center justify-center bg-cover bg-center mx-10 ">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl px-8 py-2 w-96 text-white">
            <h3 className="text-2xl font-semibold mb-2 text-center">Edit Profile</h3>
            <form className=' h-[70vh] overflow-y-scroll px-2'>
              <div className="mb-1">
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                      placeholder="Enter your first name here"
                      value={firstName}
                      onChange={(e) => {
                          e.preventDefault()
                          setFirstName(e.target.value)
                          
                      }}
                  />
              </div>
              <div className="mb-1">
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                      placeholder="Enter your last name here"
                      value={lastName}
                      onChange={(e) => {
                          e.preventDefault()
                          setLastName(e.target.value)
                          
                      }}
                  />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-white">Gender</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-radio text-pink-500 mr-2"
                    />
                    Male
                  </label>
                  <label className="flex items-center text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-radio text-pink-500 mr-2"
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="mb-1">
                  <label className="block text-sm font-medium mb-1">Age</label>
                  <input
                      type="number"
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                      placeholder="Enter your age here"
                      value={age}
                      onChange={(e) => {
                          e.preventDefault()
                          setAge(e.target.value)
                          
                      }}
                  />
              </div>
              <div className="mb-1">
                  <label className="block text-sm font-medium mb-1">ProfilePic URL</label>
                  <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                      placeholder="Enter your pic url here"
                      value={profilePic}
                      onChange={(e) => {
                          e.preventDefault()
                          setProfilePic(e.target.value)
                          
                      }}
                  />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1 text-white">About</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none resize-none"
                  placeholder="Write about yourself here"
                  value={about}
                  rows={4}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div> 
              <div className='flex justify-center'>
                <button 
                  type="submit" 
                  className="w-50 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold cursor-pointer"
                  onClick={handleSave}
                  >
                  Save Profile
                </button>
              </div>
            </form>
        </div>
      </div>  
      <FeedCard user={{firstName, lastName, profilePic, age, about, gender, isPremium}} />
    </div>
  )
}

export default Profile