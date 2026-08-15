import React, { useContext} from 'react'
// import goals from './GoalsDummy_data';
import {API_URL} from "../../api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { NotificationContext } from "../../context/NotificationProvider";

const GoalsTable = ({goals,onDelete,onEdit}) => {
   const {addNotification}=useContext(NotificationContext)
  const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
  const email=loggedInUser?.email
async function delete_rq(goal_id) {
   if (!email) {
            alert("Please login again.");
           return;
       }

   try{
 const response = await fetch(
              `${API_URL}/accounts/${email}/goals/${goal_id}`,
              {
              method:'DELETE',
                headers: { "ngrok-skip-browser-warning": "true" }
            }
          );
          const data=await response.json()

          if (response.ok) {
    onDelete(goal_id);
    addNotification("Goal deleted successfully!", "success");
    
  } else {
    alert(data.error);
     addNotification(data.error || "Failed to delete goal.", "error");
}
}catch(error){
   alert(error.message);
}

}
  return (
    
    <div className="p-2 md:p-5">
          <h1 className="text-sm md:text-2xl font-bold  mb-2 md:mb-5">
            🎯 Financial Goals
          </h1>
    
          <div className="overflow-x-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
            <table className="w-full min-w-max ">
              <thead className="bg-white/10">
                <tr className="text-left">
                  <th className="p-2 md:p-4">Goal</th>
                  <th className="p-2 md:p-4">Target</th>
                  <th className="p-2 md:p-4">Saved</th>
                  <th className="p-2 md:p-4">Remaining</th>
                  <th className="p-2 md:p-4">Progress</th>
                  <th className="p-2 md:p-4">Deadline</th>
                  <th className="p-2 md:p-4">Status</th>
                  <th className="p-2 md:p-4">Actions</th>
                </tr>
              </thead>
    
              <tbody>
                {goals.map((goal) => {
                   const remaining = Math.max(goal.target - goal.saved, 0);
                 const percentage = Math.min(
             Math.round((goal.saved / goal.target) * 100),
100
);
                  
    
                  return (
                    <tr
                      key={goal.goal_id}
                      className="border-t border-white/10 hover:bg-white/5"
                    >
                      <td className=" p-2 md:p-4">{goal.title}</td>
    
                      <td className="p-2 md:p-4">${goal.target}</td>
    
                      <td className="p-2 md:p-4">${goal.saved}</td>
    
                      <td className="p-2 md:p-4">
                        ${remaining}
                      </td>
    
                      <td className="p-2 md:p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-gray-700 rounded-full">
                            <div
                              className="h-full bg-purple-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
    
                          <span>{percentage}%</span>
                        </div>
                      </td>
    
                      <td className="p-4">{goal.date}</td>
    
                      <td className="p-4">
                        {percentage === 100 ? (
                          <span className="text-green-400 font-semibold">
                            ✅ Completed
                          </span>
                        ) : (
                          <span className="text-yellow-400 font-semibold">
                            ⏳ In Progress
                          </span>
                        )}
                      </td>
    
                      <td className="p-4">
                        <div className="flex gap-4 text-lg">
                          <FaEdit onClick={()=>{
                            onEdit(goal)
                          }}
                          className="cursor-pointer hover:text-blue-400" />
                          <FaTrash  onClick={()=>{
                            delete_rq(goal.goal_id)
                          }}
                          className="cursor-pointer hover:text-red-400" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          </div>
  )
}

export default GoalsTable