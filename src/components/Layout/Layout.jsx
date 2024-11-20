import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container pb-[240px] pt-[100px]">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
