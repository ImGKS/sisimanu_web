import axios from 'axios';
import React, { useState } from 'react'

const SignUp = () => {
    const[emailId, setEmailId] = useState('');
    const[password, setPassword] = useState('');

    const handleSignUp = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/signup", 
                { emailId, password },
                {withCredentials: true}
            );   

            console.log("res", res);
            
        } catch (error) {
            console.log("Error :", error.message);
        }
    }

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center overflow-hidden">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl px-8 py-4 w-96 text-white">
            <h2 className="text-2xl font-semibold mb-3 text-center">Welcome to TinderGO</h2>
            <form>
                <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                        placeholder="Enter your first name here"
                        // value={firstName}
                        onChange={(e) => {
                            e.preventDefault()
                            // setEmailId(e.target.value)
                            
                        }}
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                        placeholder="Enter your last name here"
                        // value={lastName}
                        onChange={(e) => {
                            e.preventDefault()
                            // setEmailId(e.target.value)
                            
                        }}
                    />
                </div>
                <div className="mb-2">
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
                <div className="mb-2">
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
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Profile Pic</label>
                    <input
                        type="file"
                        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                        placeholder="you@example.com"
                        // value={emailId}
                        onChange={(e) => {
                            e.preventDefault()
                            setEmailId(e.target.value)}
                        }
                        />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold cursor-pointer"
                    onClick={handleSignUp}
                    >
                    Sign up
                </button>
            </form>
            <p className="text-sm text-center mt-2">
            Already a user? <a href="/login" className="text-blue-300 hover:underline">Sign in</a>
            </p>
        </div>
    </div>  
  )
}

export default SignUp