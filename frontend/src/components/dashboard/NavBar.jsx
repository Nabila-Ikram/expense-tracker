import React from 'react'
import { TfiMenuAlt } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
const hoverClass=`cursor-pointer transition-all duration-200 hover:scale-110 hover:text-purple-300`
const NavBar = ({setmenuClick}) => {
  const navigate=useNavigate()

  return (
    <div className=' text-white w-full h-full flex  gap-1 md:gap-3  p-3 md:p-5 items-center justify-center bg-linear-to-r from-[rgba(55,65,81,0.8)] to-[rgba(88,28,135,0.9)]'>
        <TfiMenuAlt size={35}
      className={hoverClass}
        onClick={()=>{
          setmenuClick(prev=>!prev)
        }} 
        /> 
        <h1 className='hidden md:block text-2xl'><b>Menu</b></h1>

   <ul className="flex w-full items-center justify-end gap-3 md:gap-6 p-1 md:p-3 m-0 md:m-3">

  <div className=" hidden sm:flex items-center gap-3 border border-gray-300 rounded-md px-3 py-2">
    <input
      type="text"
      placeholder="Search..."
      className="outline-none"
    />
    <CiSearch size={22} className="md:w-8" />
  </div>
  <li><IoMdNotifications
  size={28}
   className={hoverClass}
/></li>
  <li><CgProfile
  size={28}
  className={hoverClass}  onClick={() => navigate('/settings')}
/></li>
</ul>
   </div>
  )
}

export default NavBar
