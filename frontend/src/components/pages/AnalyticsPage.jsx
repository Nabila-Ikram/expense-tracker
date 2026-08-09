import React, { use, useContext, useState } from 'react'
import Sidebar from '../dashboard/Sidebar'
import NavBar from '../dashboard/NavBar'
import Analytics from '../analytics/Analytics'
import { ThemeContext } from '../../context/ThemeProvider'
const AnalyticsPage = () => {
 const {theme}=useContext(ThemeContext)
  const [menuClick, setmenuClick] = useState(false)
  return (
    <div  className={`h-screen ${
    theme === "dark"
      ? "background text-white"
      : "whitebg text-black"
  } w-full`}>
        <div className=' h-16 md:h-[10%] w-full'>
        <NavBar setmenuClick={setmenuClick}/>
        </div>
        <div className='flex h-[calc(100%-4rem)]  md:h-[90%]'>
        {menuClick && <div className='w-16 md:w-[20%] '>
      <Sidebar/>
     {/* JSX only accepts expressions, not statements (if, for, while). */}
         </div>
}

            <div className=' flex flex-col flex-1 min-h-0 '> 
            <Analytics/>
             </div>
            

 </div>
    </div>
  )
}

export default AnalyticsPage
