import React, { use, useEffect, useState } from 'react'

import Transaction from './Transaction'

const Transactions = () => {
   const [transactions, setTransactions] = useState([])
    const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
    const email=loggedInUser.email
   useEffect(() => {
    async function fetchTransactions() {
        const response = await fetch(
            `http://127.0.0.1:5000/transactions/${email}`
        );

        const data = await response.json();

        setTransactions(data);
    }

    fetchTransactions();
}, [email]);

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