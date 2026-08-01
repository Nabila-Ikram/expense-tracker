
import React, { use, useState } from 'react'
import Sidebar from '../dashboard/Sidebar'
import NavBar from '../dashboard/NavBar'
import BudgetHandler from '../budget/BudgetHandler'
const BudgetPage = () => {
  const [menuClick, setmenuClick] = useState(false)
  return (
    <div className="background h-screen flex flex-col">

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