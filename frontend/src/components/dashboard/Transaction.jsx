import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { API_URL } from "../../api";
import { useNavigate } from "react-router-dom";
const Transaction = ({transaction, onDelete}) => {
const navigate = useNavigate();

async function delete_req(){

  const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
 const email=loggedInUser.email
 try{
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
  } else {
    alert(data.error);
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

        <span className=" truncate max-w-28 bg-linear-to-r from-orange-500 to-pink-600 px-3 py-1 rounded-lg text-sm">
          {transaction.date}
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
        className="bg-gray-500/60 rounded-md p-2 text-sm flex-1 mt-2 hover:bg-red-800" >Delete</button>
        
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