import React from "react";

const Transaction = (props) => {
async function delete_req(){
  const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
 const email=loggedInUser.email
 try{
 const response = await fetch(
              `http://127.0.0.1:5000/accounts/${email}/transactions/${props.id}`,
              {
              method:'DELETE'
              }
          );
          const data=await response.json()

          if (response.ok) {
    props.onDelete(props.id);
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
                 text-white p-5 shadow-lg"
    >
      {/* Top */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="bg-linear-to-r from-orange-500 to-pink-600 px-3 py-1 rounded-lg text-sm">
          {props.id}
        </span>

        <span className="bg-linear-to-r from-orange-500 to-pink-600 px-3 py-1 rounded-lg text-sm">
          {props.date}
        </span>
      </div>

      {/* Middle */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1 bg-gray-500/60 rounded-md py-2 text-center text-sm">
          ${props.amount}
        </div>

        <div className="flex-1 bg-gray-500/60 rounded-md py-2 text-center text-sm">
          {props.category}
        </div>

        <div className="flex-1 bg-gray-500/60 rounded-md py-2 text-center text-sm">
          {props.transaction_type}
        </div>
      </div>

      {/* Description */}
      <p className="bg-gray-500/60 rounded-md p-2 text-sm">
        {props.description}
      </p>

      
      <button onClick={delete_req}
        className="bg-gray-500/60 rounded-md p-2 text-sm flex-1 w-full mt-2 hover:bg-red-800" >Delete</button>
      
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