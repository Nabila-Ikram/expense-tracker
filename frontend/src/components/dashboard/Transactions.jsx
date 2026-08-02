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
// Empty dependency array ([]) means run only once on the initial render.
  return (
    <div className="grid grid-cols-3 gap-4  p-5 overflow-y-auto w-full">
     {transactions.map((t) => (
         <Transaction
        amount={t.amount}
        id={t.trans_id}
        date={t.date}
        category={t.category}
        transaction_type={t.transaction_type}
        description={t.description}
        />
    ))}
    </div>
  )
}

export default Transactions