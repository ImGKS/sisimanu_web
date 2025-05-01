import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from './components/Footer/Footer'

const Body = () => {
  return (
    <div className='flex flex-col justify-between  h-screen overflow-hidden'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body