import React, { use, useState } from 'react'
import Sidebar from '../dashboard/Sidebar'
import NavBar from '../dashboard/NavBar'
import Analytics from '../analytics/Analytics'
import GoalsHandler from '../goals/GoalsHandler'
import { ThemeContext } from '../../context/ThemeProvider'
import { useContext } from 'react'

const GoalsPage = () => {
  const [menuClick, setmenuClick] = useState(false)
  const {theme}=useContext(ThemeContext)
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


            <div className=' flex flex-col flex-1  overflow-y-auto'> 
            <GoalsHandler/>
             </div>
            

 </div>
    </div>
  )
}

export default GoalsPage
