import React from 'react'
import transactions  from './Trans_dummy_data'
import Transaction from './Transaction'

const Transactions = () => {
  return (
    <div className="grid grid-cols-2 gap-4  p-5 overflow-y-auto w-full">
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