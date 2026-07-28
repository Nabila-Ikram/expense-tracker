import React from 'react'

import { MdSpaceDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoAnalytics } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { LuSettings } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
  return (
    <div className='w-full h-full'>
      
    <ul className='bg-linear-to-r from-[rgba(55,65,81,0.8)] to-[rgba(88,28,135,0.9)] text-white flex  flex-col justify-around gap-6 h-full  p-5'> 
       <li className='flex gap-3'><MdSpaceDashboard size={25} /><h1> Dashboard</h1></li>
        <li className='flex gap-3'><GrTransaction size={25} /> <h1> Transaction</h1></li>
       <li className='flex gap-3'><IoAnalytics  size={25}/> <h1> Analytics</h1></li>
       <li className='flex gap-3'><MdAttachMoney size={25} /><h1>Budget</h1></li>
       <li className='flex gap-3'><GoGoal  size={25}/><h1>Goals</h1></li>
       <li className='flex gap-3'><LuSettings  size={25}/><h1> Settings</h1></li>
       <li className='flex gap-3'> <CiLogout  size={25}/><h1> Logout</h1></li>
       </ul>
       
    </div>
  )
}

export default Sidebar
