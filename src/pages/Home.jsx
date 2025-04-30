import React from 'react'
import { useNavigate } from 'react-router';

const Home = () => {

    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/login")
    }

    return (
      <div className="flex justify-center items-center bg-[url('https://img.freepik.com/free-vector/virtual-relationships-online-dating-cartoon-illustration_1284-58111.jpg?t=st=1745969065~exp=1745972665~hmac=4585c9567dd6510a7582226e50bb8765f1e7dfa1dcded641e2be3a710c79171f&w=1380')] bg-cover bg-center h-screen">
        <div className='flex justify-center'>
            <button onClick={handleStart} className="bg-red-800 text-white text-3xl px-12 py-5 rounded-full cursor-pointer">
                Let's Start
            </button>
        </div>
      </div>
    );
};
  
export default Home