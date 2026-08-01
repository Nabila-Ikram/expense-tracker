// "trans_id":self.trans_id,
//          "date" :self.date.strftime("%d/%m/%y %I:%M %p") ,
//          "amount": self.amount,
//          "category":self.category,
//          "transaction_type":self.transaction_type,
//          "description":self.description
import React, { use, useState } from 'react'
import Sidebar from '../dashboard/Sidebar'
import NavBar from '../dashboard/NavBar'
import { GrTransaction } from "react-icons/gr";
import Addtrans_form from '../AddTransaction/Addtrans_form';

const TransactionAddPage = () => {
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
            <div className=' flex-1 justify-center items-center text-white flex gap-6  rounded-xl  '>
              {/* backdrop-blur-md → Blurs the background behind the card (glass effect). */}
                 
   <Addtrans_form/>
            </div>


            

 </div>
    </div>
  )
}

export default TransactionAddPage