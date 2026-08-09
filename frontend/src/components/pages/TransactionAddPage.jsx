// "trans_id":self.trans_id,
//          "date" :self.date.strftime("%d/%m/%y %I:%M %p") ,
//          "amount": self.amount,
//          "category":self.category,
//          "transaction_type":self.transaction_type,
//          "description":self.description
import React, { use, useContext, useState } from 'react'
import Sidebar from '../dashboard/Sidebar';
import NavBar from '../dashboard/NavBar'
import { GrTransaction } from "react-icons/gr";
import Addtrans_form from '../dashboard/Addtrans_form';
import { ThemeContext } from '../../context/ThemeProvider';


const TransactionAddPage = () => {
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
      <div
  className={`flex-1 flex justify-center items-center gap-6 rounded-xl ${
    theme === "dark"
      ? "background text-white"
      : "whitebg text-black"
  }`}
>
    <Addtrans_form />
</div>
              {/* backdrop-blur-md → Blurs the background behind the card (glass effect). */}
                 
  

 </div>
    </div>
  )
}

export default TransactionAddPage