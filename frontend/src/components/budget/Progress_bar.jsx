import { FaEdit} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../../api";
import { NotificationContext } from "../../context/NotificationProvider";
import { useContext } from "react";
const Progress_bar = ({id,title,spent,budget,percentage,showDelete,onDelete,showEdit}) => {
  const navigate=useNavigate()
  const {addNotification}=useContext(NotificationContext)
    const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
  const email = loggedInUser?.email
async  function deleteReq(){
 if (!email) {
  alert("Please login again.")
  return
}
  try{
  const response= await fetch(`${ API_URL }/accounts/${email}/budgets/${id}`,
    {
    method:"DELETE",
   headers: { "ngrok-skip-browser-warning": "true" }
            }
  )
  const data=await response.json()
    if (response.ok) {
    onDelete(id);
    addNotification("Budget delete successfully","success")
    
  } else {
   addNotification(data.error || "Failed to delete budget.", "error");
  }
}catch(error){
   alert(error.message);
}
}
  
  
  return (
    <div className='  flex flex-col  p-3 md:p-5 m-2 md:m-5 gap-2 '>
        <h1  className="text-xl md:text-2xl font-bold mt-1">{title}</h1>
<h1  className="font-bold mt-1">Spent: $ {spent} &nbsp;&nbsp; Budget: ${budget}</h1>
    <div className="flex items-center gap-3">
    <div className="flex-1 h-3 bg-gray-700 rounded-full">
         <div
            className="h-full bg-purple-500 rounded-full"
           style={{ width: `${Math.min(percentage, 100)}%` }}
            // Also, Math.min(percentage, 100) prevents the visual bar from going beyond 100% if someone spends more than their budget.
          ></div>
    </div>

    <span className="font-semibold">
  {Math.min(percentage, 100)}%
</span>
</div>



{showDelete && showEdit &&
<div className="flex flex-col sm:flex-row gap-2">
<button onClick={deleteReq}
className="bg-gray-500/60 rounded-md p-2 text-sm flex-1 w-full mt-2 hover:bg-red-800 " >Delete Budget</button>
{showEdit && (
    <button
      onClick={() => navigate(`/budget/edit/${id}`)}
      className="bg-gray-500/60 rounded-md p-2
                 flex items-center justify-center
                 hover:bg-blue-400"
    >
      <FaEdit className="text-xl" />
      <span className="ml-2 sm:hidden">Edit</span>
    </button>
  )}

</div>
}
</div>
  )
}

export default Progress_bar