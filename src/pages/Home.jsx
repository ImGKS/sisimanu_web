import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import bg from "../assets/background/bg.png"

const Home = () => {

    const navigate = useNavigate();
    const user = useSelector(store => store.user)

    const handleStart = () => {
      if (!user) {
        navigate("/login")
      } else {
        navigate("/feed")
      }
    }

    return (
      <div className="flex flex-col justify-center items-center" >
        <img src={bg} alt='bg' />
        <div className='flex justify-center'>
            <button onClick={handleStart} className="bg-red-800 text-white text-3xl px-12 py-5 rounded-full cursor-pointer">
                Let's Start
            </button>
        </div>
      </div>
    );
};
  
export default Home