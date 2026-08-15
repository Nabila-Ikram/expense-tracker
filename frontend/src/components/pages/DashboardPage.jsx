import React, { use, useState } from 'react'
import Sidebar from '../dashboard/Sidebar'
import NavBar from '../dashboard/NavBar'
import SummaryCard from '../dashboard/SummaryCard'
import Transaction from '../dashboard/Transaction'
import Transactions from '../dashboard/Transactions'
import { ThemeContext } from '../../context/ThemeProvider'
import { useContext } from 'react'


const DashboardPage = () => {
  const [search, setSearch] = useState("");
  const {theme}=useContext(ThemeContext)
  const [menuClick, setmenuClick] = useState(false)
  return (
    <div  className={`h-screen ${
    theme === "dark"
      ? "background text-white"
      : "whitebg text-black"
  } w-full`}>
        <div className=' h-16 md:h-[10%] w-full'>
        <NavBar setmenuClick={setmenuClick} 
          search={search}
         setSearch={setSearch}
          />
         {/* now nav bar is controlling search value */}
        </div>
        <div className='flex h-[calc(100%-4rem)]  md:h-[90%]'>
        {menuClick && <div className='w-16 md:w-[20%] '>
      <Sidebar/>
     {/* JSX only accepts expressions, not statements (if, for, while). */}
         </div>
}
            
            <div className=' flex flex-col flex-1 min-h-0   items-center'>
              <SummaryCard/>
              <span className=' text-xl md:text-2xl  p-3'><b>Recent Transactions</b></span>
             <Transactions
           search={search}
        />
             
            </div>
 </div>
    </div>
  )
}

export default DashboardPage
