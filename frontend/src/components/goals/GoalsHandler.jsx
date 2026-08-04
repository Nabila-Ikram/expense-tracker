import React, { useState ,useEffect} from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import GoalsForm from "./GoalsForm";
import GoalsTable from "./GoalsTable";

const GoalsHandler = () => {
  const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
      const email=loggedInUser.email
      const [goals, setgoals] = useState([])
      
          async function fetchgoals() {
  
              const response=await fetch(`http://127.0.0.1:5000/goals/${email}`)
              const data= await response.json()
               setgoals(data)
          }
          useEffect(()=>{
          fetchgoals()
      },[email]) 
      
// useEffect fetches data only on initial render (or when dependencies change).
// Later, we call fetchGoals() directly whenever we need fresh data
// (e.g., after adding, editing, or deleting a goal).

  return (
  

    <div className="flex flex-col h-screen w-full ">

      <div className="flex-1 flex justify-center items-center flex-col ">
        <div>
         <h1 className="p-2 text-2xl   font-bold">Add Goal</h1>
         </div>
      <div className="w-[80%]">
      <GoalsForm ongoalAdded={fetchgoals}/>
      </div>
    </div>
      
     
    <div className="flex-1 overflow-y-auto">
    <GoalsTable goals={goals}/>
    </div>
    

    </div>
  );
};

export default GoalsHandler;