import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/urlConstant'
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const[emailId, setEmailId] = useState("");
    const[password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/login`, 
                { emailId, password },
                {withCredentials: true}
            );   
            dispatch(addUser(res?.data))
            toast.success("Login successful.")
            navigate("/feed");
        } catch (error) {
            console.log("Error :", error);
            toast.error(error?.response?.data?.error)
        }
    }

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center overflow-hidden">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl p-8 w-96 text-white">
            <h2 className="text-2xl font-semibold mb-4 text-center">Welcome to Sisimaru</h2>
            <form>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                    placeholder="you@example.com"
                    value={emailId}
                    onChange={(e) => {
                        e.preventDefault()
                        setEmailId(e.target.value)}
                    }
                    />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                    type="password"
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                        e.preventDefault()
                        setPassword(e.target.value)}
                    }
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold cursor-pointer"
                onClick={handleLogin}
                >
                Login
            </button>
            </form>
            <p className="text-sm text-center mt-4">
            Not a user? <Link to="/signup" className="text-blue-300 hover:underline">Sign up</Link>
            </p>
        </div>
    </div>  
  )
}

export default Login