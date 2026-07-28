import React, { use, useState } from 'react'
import Sidebar from './Sidebar'
import NavBar from './NavBar'
import SummaryCard from './SummaryCard'
import Transaction from './Transaction'
import Transactions from './Transactions'

const Dashboard = () => {
  const [menuClick, setmenuClick] = useState(false)
  return (
    <div className=' background w-full h-screen '>
        <div className=' h-[10%] w-full'>
        <NavBar setmenuClick={setmenuClick}/>
        </div>
        <div className='flex h-[90%]'>
        {menuClick && <div className=' w-[20%] '>
      <Sidebar/>
     {/* JSX only accepts expressions, not statements (if, for, while). */}
         </div>
            }
            <div className=' flex flex-col flex-1 '>
              <SummaryCard/>
              <span className='text-white text-2xl pl-3'><b>Recent Transactions</b></span>
              <Transactions/>
              
            </div>
 </div>
    </div>
  )
}

export default Dashboard
