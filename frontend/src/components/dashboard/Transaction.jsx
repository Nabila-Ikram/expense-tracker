import React, { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { API_URL } from "../../api";
import { useNavigate } from "react-router-dom";
import { DateContext } from "../../context/PreferencesProvider";
import { NotificationContext } from "../../context/NotificationProvider";
const Transaction = ({transaction, onDelete}) => {
const {addNotification}=useContext(NotificationContext)
const navigate = useNavigate();
const {date}=useContext(DateContext)
function formatDate(transactionDate) {
  const d = new Date(transactionDate); 
  // converting into js date

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  if (date === "DD/MM/YYYY") {
    return `${day}/${month}/${year}`;
  }

  if (date === "MM/DD/YYYY") {
    return `${month}/${day}/${year}`;
  }

  return `${year}-${month}-${day}`;
}

async function delete_req(){

  const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
const email = loggedInUser?.email;
 try{
   if (!email) {
      alert("Please login again.");
      return;
    }
 const response = await fetch(
              `${ API_URL }/accounts/${email}/transactions/${transaction.trans_id}`,
              {
              method:'DELETE'
              ,
              headers: { "ngrok-skip-browser-warning": "true" }
              }
          );
          const data=await response.json()

          if (response.ok) {
    onDelete(transaction.trans_id);
    addNotification("Transaction deleted successfully!", "success");
} else {
    addNotification(data.error || "Failed to delete transaction.", "error");
}
}catch(error){
   alert(error.message);
}
}
  return (
    <div
      className="w-full rounded-xl border border-white/20
                 bg-linear-to-r from-[rgba(55,65,81,0.8)]
                 to-[rgba(88,28,135,0.9)]
                 text-white p-3 sm:p-6  shadow-lg"
    >
      {/* Top */}
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-3">
        <span className=" truncate max-w-28 bg-linear-to-r from-orange-500 to-pink-600 px-3 py-1 rounded-lg text-sm">
          {transaction.trans_id}
        </span>

       <span className="truncate max-w-28 bg-linear-to-r from-orange-500 to-pink-600 px-3 py-1 rounded-lg text-sm">
  {formatDate(transaction.date)}
</span>
      </div>

      {/* Middle */}
     <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
        <div className="flex-1 bg-gray-500/60 rounded-md py-2 text-center text-sm">
          ${transaction.amount}
        </div>

        <div className="flex-1 bg-gray-500/60 rounded-md py-2 text-center text-sm">
          {transaction.category}
        </div>

        <div className="flex-1 bg-gray-500/60 rounded-md py-2 text-center text-sm">
          {transaction.transaction_type}
        </div>
      </div>

      {/* Description */}
      <p className="bg-gray-500/60 rounded-md p-2 text-sm">
        {transaction.description}
      </p>


      <div className=" flex flex-col sm:flex-row gap-2 md:gap-4">
      <button onClick={delete_req} 
        className="bg-gray-500/60 rounded-md p-2 text-sm flex-1 mt-2 hover:bg-red-800" >
          Delete</button>
        
      <button onClick={() => {
    navigate(`/transactions/edit/${transaction.trans_id}`);
}}
    type="button"

    className="flex-1 flex items-center justify-center gap-2 p-2  md:mt-2 rounded-md hover:bg-blue-400 bg-gray-500/60"
>
    Edit
    <FaEdit className="cursor-pointer text-xl" />
</button >
         
          </div>
        </div>
      
    
    // Click Delete.
// Send DELETE request to Flask.
// Flask deletes the transaction from transactions.json.
// Flask returns success (200 OK).
// props.onDelete(props.id) runs.
// Parent updates its state with filter().
// React re-renders, and the transaction disappears immediately.
  );
};

export default Transaction;