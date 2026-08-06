import React from 'react'

import { MdSpaceDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoAnalytics } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { LuSettings } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='w-full h-full'>
      
    <ul className='bg-linear-to-r from-[rgba(55,65,81,0.8)] to-[rgba(88,28,135,0.9)] text-white flex  flex-col justify-around gap-6 h-full p-5'> 
       <li >
       <Link to='/dashboard' className="flex gap-3 w-full p-2 rounded-lg hover:bg-white/10 transition">
        <MdSpaceDashboard size={25} /><h1> Dashboard</h1>
        </Link>
        </li>
        <li>
          <Link to= '/transactions' className="flex gap-3 w-full p-2 rounded-lg hover:bg-white/10 transition"><GrTransaction size={25} /> <h1> Transaction</h1>
          </Link></li>
        

          <li>
        <Link to='/transactionHistory' className="flex gap-3 w-full p-2 rounded-lg hover:bg-white/10 transition"><GrTransaction size={25} /><h1>Transaction History</h1>
        </Link></li>
       <li>
        <Link to = '/analytics'className="flex gap-3 w-full p-2 rounded-lg hover:bg-white/10 transition">
           <IoAnalytics  size={25}/> <h1> Analytics</h1>
           </Link></li>
       <li>
      <Link to = '/budget'className="flex gap-3 w-full p-2 rounded-lg hover:bg-white/10 transition">
      <MdAttachMoney size={25} /><h1>Budget</h1>
      </Link></li>

       <li>
        <Link to='/goals' className="flex gap-3 w-full p-2 rounded-lg hover:bg-white/10 transition"><GoGoal  size={25}/><h1>Goals</h1>
        </Link></li>

        <li>
        <Link to='/settings' className="flex gap-3 w-full p-2 rounded-lg hover:bg-white/10 transition"><LuSettings size={25}/><h1>Settings</h1>
        </Link></li>

        

       {/* <li className='flex gap-3'> <CiLogout  size={25}/><h1> Logout</h1></li> */}
       </ul>
        
    </div>
  )
}

export default Sidebar
