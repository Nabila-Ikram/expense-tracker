import React, { use, useContext, useState } from 'react'
import Sidebar from '../dashboard/Sidebar';
import NavBar from '../dashboard/NavBar'
import { GrTransaction } from "react-icons/gr";
import Addtrans_form from '../dashboard/Addtrans_form';
import { ThemeContext } from '../../context/ThemeProvider';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';


const TransactionEditPage = () => {
  const { trans_id } = useParams(); // getting trans_id from uRL
    const {theme}=useContext(ThemeContext)


const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const email = loggedInUser.email;

const [transaction, setTransaction] = useState(null);

useEffect(() => {
    async function fetchTransaction() {
        const response = await fetch(
            `http://127.0.0.1:5000/accounts/${email}/transactions/${trans_id}`
            // /transactions/edit/abc123
        );
         //React sends: GET /accounts/user@email.com/transactions/abc123
         // then flask gives transaction  
        const data = await response.json();

        if (response.ok) {
            setTransaction(data);
        } else {
            alert(data.error);
        }
    }

    fetchTransaction();
}, [email, trans_id]);




  const [menuClick, setmenuClick] = useState(false)
  return (
    <div   className={`h-screen ${
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
      <div
  className={`flex-1 flex justify-center items-center gap-6 rounded-xl ${
    theme === "dark"
      ? "background text-white"
      : "whitebg text-black"
  }`}
>
    <Addtrans_form transaction={transaction} />
</div>
              {/* backdrop-blur-md → Blurs the background behind the card (glass effect). */}
                 
  


            

 </div>
    </div>
  )
}

export default TransactionEditPage
