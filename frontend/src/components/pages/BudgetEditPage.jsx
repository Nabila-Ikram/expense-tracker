import BudgetForm from "../budget/BudgetForm";
import React, { use, useContext, useState } from 'react'
import Sidebar from '../dashboard/Sidebar';
import NavBar from '../dashboard/NavBar'
import { ThemeContext } from '../../context/ThemeProvider';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
const BudgetEditPage = () => {

  const { budget_id } = useParams();
  const { theme } = useContext(ThemeContext);

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  const email = loggedInUser.email;

  const [budget,setBudget] = useState(null);

  useEffect(()=>{

    async function fetchBudget(){

      try{

        const response = await fetch(
          `http://127.0.0.1:5000/accounts/${email}/budget/${budget_id}`
        );


        const data = await response.json();


        if(response.ok){

          setBudget(data);

        }
        else{

          alert(data.error);

        }

      }
      catch(error){

        alert(error.message);

      }

    }


    fetchBudget();


  },[email,budget_id]);




  const [menuClick,setmenuClick] = useState(false);

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



<div className={`flex-1 flex justify-center items-center gap-6 rounded-xl ${
    theme === "dark"
      ? "background text-white"
      : "whitebg text-black"
  }`}
>


{
budget &&
<BudgetForm budget={budget}/>
}


</div>


</div>



</div>

)

}


export default BudgetEditPage;