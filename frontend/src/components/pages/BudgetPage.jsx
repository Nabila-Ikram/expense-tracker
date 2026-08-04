
import React, { use, useState } from 'react'
import Sidebar from '../dashboard/Sidebar'
import NavBar from '../dashboard/NavBar'
import BudgetHandler from '../budget/BudgetHandler'
import { ThemeContext } from '../../context/ThemeProvider'
import { useContext } from 'react'
const BudgetPage = () => {
    const {theme}=useContext(ThemeContext)
  const [menuClick, setmenuClick] = useState(false)
  return (
    <div   className={`h-screen flex flex-col ${
      theme === "dark"
        ? "background text-white"
        : "whitebg text-black"
    }`}
  >

   <div className="h-[10%] w-full">
    <NavBar setmenuClick={setmenuClick} />
</div>

<div className="flex h-[90%]">
    {menuClick && (
        <div className="w-[20%]">
            <Sidebar />
        </div>
    )}

    <div className="flex-1 overflow-y-auto">
        <BudgetHandler />
    </div>
    </div>


</div>
  )
}

export default BudgetPage