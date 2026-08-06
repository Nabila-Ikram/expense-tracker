import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import NavBar from "../dashboard/NavBar";
import BudgetForm from "../budget/BudgetForm";
import { ThemeContext } from "../../context/ThemeProvider";
import { useParams } from "react-router-dom";


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




  const [menuClick,setMenuClick] = useState(false);



return (

<div
className={`h-screen w-full ${
theme==="dark"
?"background text-white"
:"whitebg text-black"
}`}
>


<div className="h-[10%]">
<NavBar setmenuClick={setMenuClick}/>
</div>



<div className="flex h-[90%]">


{
menuClick &&
<div className="w-[20%]">
<Sidebar/>
</div>
}



<div className="flex-1 flex justify-center items-center">


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