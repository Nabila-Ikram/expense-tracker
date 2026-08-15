import { TfiMenuAlt } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from "react";
import { NotificationContext } from "../../context/NotificationProvider";
const hoverClass=`cursor-pointer transition-all duration-200 hover:scale-110 hover:text-purple-300`
const NavBar = ({setmenuClick ,search, setSearch }) => {
  const navigate=useNavigate()
const { notifications } = useContext(NotificationContext);
  const [notificationOpen, setNotificationOpen] = useState(false);

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
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="outline-none"
/>
    <CiSearch size={22} className="md:w-8" />
  </div>
<li className="relative">
  <IoMdNotifications
    size={28}
    className={hoverClass}
    onClick={() => setNotificationOpen(prev => !prev)}
  />

  {notifications.length > 0 && (
    <span
      className="
        absolute
        -top-2
        -right-2
        min-w-5
        h-5
        px-1
        rounded-full
        bg-red-500
        text-white
        text-xs
        font-bold
        flex
        items-center
        justify-center
        border-2
        border-gray-800
      "
    >
      {notifications.length}
    </span>
  )}

{notificationOpen && (
  <div
    className="absolute right-0 top-10 mt-3 w-72
               rounded-xl border border-white/20
               bg-gray-900/95 backdrop-blur-md
               shadow-2xl z-50 text-white"
  >
    {/* Header */}
    <div className="flex items-center justify-between
                    px-4 py-3 border-b border-white/10">

      <h3 className="font-semibold text-lg">
        Notifications
      </h3>

      <span className="text-xs text-gray-400">
        {notifications.length} new
      </span>

    </div>

    {/* Notifications */}
    {notifications.length === 0 ? (

      <div className="px-4 py-6 text-center text-sm text-gray-400">
        No notifications
      </div>

    ) : (

      notifications.map((notification) => (
        <div
          key={notification.id}
          className="px-4 py-3 border-b border-white/10
                     hover:bg-white/10 cursor-pointer"
        >
          <p className="text-sm font-medium">
            {notification.message}
          </p>
        </div>
      ))

    )}

  </div>
)}
 
</li>
  <li><CgProfile
  size={28}
  className={hoverClass}  onClick={() => navigate('/settings')}
/></li>
</ul>
   </div>
  )
}

export default NavBar
