import React from 'react'
import transactions  from './Trans_dummy_data'
import Transaction from './Transaction'

const Transactions = () => {
  return (
    <div className='flex flex-wrap  overflow-y-auto h-[50%] w-[50%]'>
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