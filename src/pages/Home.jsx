import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import bg from "../assets/background/bg.png"

const Home = () => {

    const navigate = useNavigate();
    const user = useSelector(store => store.user)
    
    const handleStart = () => {
      if (!user?._id) {
        navigate("/login")
      } else {
        navigate("/feed")
      }
    }

    return (
      <div className="flex flex-col justify-center items-center" >
        <img src={bg} alt='bg' className='h-100 w-100' />
        <div className='flex justify-center'>
            <button onClick={handleStart} className="bg-rose-400 text-white text-2xl px-8 py-3 rounded-full cursor-pointer">
                Let's Start
            </button>
        </div>
      </div>
    );
};
  
export default Home