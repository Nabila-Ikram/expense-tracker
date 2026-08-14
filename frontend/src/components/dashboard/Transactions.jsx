import React, { use, useEffect, useState } from 'react'

import Transaction from './Transaction'
import { API_URL } from "../../api";
const Transactions = () => {
   const [transactions, setTransactions] = useState([])
    const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
 const email = loggedInUser?.email;
//    useEffect(() => {
//   async function fetchTransactions() {
//     try {
//       const response = await fetch(
//         `${API_URL}/transactions/${email}`
//       );

//       console.log("URL:", `${API_URL}/transactions/${email}`);
//       console.log("Status:", response.status);

//       const text = await response.text();

//       console.log("Response:", text);

//       const data = JSON.parse(text);

//       setTransactions(data);

//     } catch (error) {
//       console.log("Fetch error:", error);
//     }
//   }



  useEffect(() => {
    if (!email) {
      alert("Please login again.");
      return;
    }

    async function fetchTransactions() {
        try {
            const response = await fetch(
                `${API_URL}/transactions/${encodeURIComponent(email)}`,{
            
                headers: { "ngrok-skip-browser-warning": "true" }
            });
            const data = await response.json();
           if (response.ok && Array.isArray(data)) {
          setTransactions(data);
        } else {
       setTransactions([]);
       console.error(data.error || "Failed to fetch transactions");
}
        } catch (err) {
            console.error("Failed to fetch transactions:", err);
        }
    }

    fetchTransactions();
}, [email]);


//   fetchTransactions();
// }, [email]);



// 5 != "5"     // false (because "5" is converted to 5)

// 5 !== "5"    // true (number and string are different types)
const DeleteTransaction=(id)=>{
    setTransactions((prev)=>{
    return prev.filter((transaction)=>transaction.trans_id!==id)
    })
}


// React state should never be modified directly.
// Instead, create a new array and update the state with it.
// React detects state changes by comparing references (old array vs new array).
// If we mutate the original array (push, pop, splice, etc.), its reference stays
// the same, so React may not detect the change correctly and the UI can become inconsistent.
// filter() returns a new array, which lets React know the state has changed.
// This is the standard React pattern: the child (Transaction) performs the action, and the parent (Transactions) updates the state because it owns the data.
// Empty dependency array ([]) means run only once on the initial render.
//React follows the principle of immutability (treat state as read-only).
  return (
    
<div className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-2 md:gap-4 p-3 md:p-5 overflow-y-auto w-full">
     {transactions.map((t) => (
        <Transaction
    key={t.trans_id}
    transaction={t}
    onDelete={DeleteTransaction}
   
/>
    ))}
    </div>
  )
}

export default Transactions