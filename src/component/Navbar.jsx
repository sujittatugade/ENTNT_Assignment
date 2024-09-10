import React from 'react'
import logo from "../movielogo.png"
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <>
    <div className='flex border space-x-8 items-center m-2'>
    <img className='w-[50px]  bg-white justify-center' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiJhIqEHyKWfMffoqLcJxfFlhLR7C4e01W8g&s"} alt="" />
    <Link to="/" className='text-blue-600'>Home</Link>
    <Link to="/watchlist" className='text-blue-600'>WatchList</Link>
    </div>
    </>
  )
}
export default Navbar 
