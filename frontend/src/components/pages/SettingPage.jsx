import React, { use, useState } from 'react'
import Sidebar from '../dashboard/Sidebar'
import NavBar from '../dashboard/NavBar'
import SettingHandler from '../setting/SettingHandler'


const SettingPage = () => {
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
            <SettingHandler/>
             </div>
            

 </div>
    </div>
  )
}

export default SettingPage
