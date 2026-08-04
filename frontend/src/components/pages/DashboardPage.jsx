import React, { use, useState } from 'react'
import Sidebar from '../dashboard/Sidebar'
import NavBar from '../dashboard/NavBar'
import SummaryCard from '../dashboard/SummaryCard'
import Transaction from '../dashboard/Transaction'
import Transactions from '../dashboard/Transactions'
import BarGraph from '../dashboard/BarGraph'
import { ThemeContext } from '../../context/ThemeProvider'
import { useContext } from 'react'


const DashboardPage = () => {
  const {theme}=useContext(ThemeContext)
  const [menuClick, setmenuClick] = useState(false)
  return (
    <div  className={`h-screen ${
    theme === "dark"
      ? "background text-white"
      : "whitebg text-black"
  } w-full`}>
        <div className=' h-[10%] w-full'>
        <NavBar setmenuClick={setmenuClick}/>
        </div>
        <div className='flex h-[90%]'>
        {menuClick && <div className=' w-[20%] '>
      <Sidebar/>
     {/* JSX only accepts expressions, not statements (if, for, while). */}
         </div>
}
            
            <div className=' flex flex-col flex-1  justify-center  items-center'>
              <SummaryCard/>
              <span className='text-white text-2xl  p-3'><b>Recent Transactions</b></span>
              <Transactions/>
             
            </div>
 </div>
    </div>
  )
}

export default DashboardPage
