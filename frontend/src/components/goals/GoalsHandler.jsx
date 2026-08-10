import React, { useState ,useEffect} from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import GoalsForm from "./GoalsForm";
import GoalsTable from "./GoalsTable";
import { API_URL } from "../../api";

const GoalsHandler = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
      const email=loggedInUser.email
      const [goals, setgoals] = useState([])



//       const fetchgoals = async () => {
//   console.log('🔍 fetchgoals called!');
//   console.log('📧 Email:', email);
  
//   if (!email) {
//     console.log('❌ No email, returning');
//     return;
//   }
  
//   try {
//     const url = `${API_URL}/goals/${email}`
//     ;
//     console.log('🔗 Fetching URL:', url);
    
//     const response = await fetch(url);
//     console.log('📡 Response status:', response.status);
    
//     const data = await response.json();
//     console.log('📦 Data received:', data);
    
//     if (Array.isArray(data)) {
//       console.log('✅ Setting goals:', data.length);
//       setgoals(data);
//     }
//   } catch (error) {
//     console.error('❌ Error:', error);
//   }
// };
      
          async function fetchgoals() {
  
               try{
              const response=await fetch(`${API_URL}/goals/${email}`
                ,{
            
                headers: { "ngrok-skip-browser-warning": "true" }
            }
              )
              const data= await response.json()
               setgoals(data)
               }catch(error){
                console.log(error)
               alert("Something went wrong")
               }
          }
          useEffect(()=>{
          fetchgoals()
      },[email]) 
      
// useEffect fetches data only on initial render (or when dependencies change).
// Later, we call fetchGoals() directly whenever we need fresh data
// (e.g., after adding, editing, or deleting a goal).


 function deleteGoal(id){
  setgoals((prev)=>{
      return prev.filter(g=>g.goal_id!==id)
  })

 }
  return (
  

    <div className="flex flex-col h-screen w-full ">

      <div className="flex-1 flex justify-center items-center flex-col ">
        <div>
         <h1 className="p-2 text-xl md:text-2xl   font-bold">Add Goal</h1>
         </div>
      <div className="w-[80%]">
     <GoalsForm 
   ongoalAdded={()=>{
      fetchgoals();
      setSelectedGoal(null);// returning to add goal
   }}
   goal={selectedGoal}
/>
      </div>
    </div>
      
     
    <div className="flex-1 overflow-y-auto">
    <GoalsTable goals={goals}    onEdit={setSelectedGoal} onDelete={deleteGoal}
    />
    </div>
    

    </div>
  );
};

export default GoalsHandler;