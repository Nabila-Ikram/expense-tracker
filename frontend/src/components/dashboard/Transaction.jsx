import React from 'react'
// amount,category,transaction_type,description="",trans_id=None,date=None
const Transaction = (props) => {
  return (
    <div className=' text-white bg-linear-to-r from-[rgba(55,65,81,0.8)] to-[rgba(88,28,135,0.9)]  min-h-40 w-full m-3 p-3 flex flex-col rounded-xl '>
        <div className='flex  justify-between items-center h-[20%]'>
        <button className=' bg-linear-to-r from-orange-500  to-pink-600 text-center md:w-[60%] h-8  md:rounded-xl rounded-sm'>{props.id}</button>
        <button className=' bg-linear-to-r from-orange-500  to-pink-600 text-center md:w-[35%] h-8  md:rounded-xl rounded-sm'>{props.date}</button>
        </div>
        <div className='flex justify-around items-center p-3 m-3 h-[30%]'>
          <button className='bg-gray-400 w-[25%] h-8 rounded-sm'> {props.amount}</button>
            <button className='bg-gray-400 w-[25%] h-8 rounded-sm'>{props.category}</button>
              <button className='
              bg-gray-400 w-[25%] h-8 rounded-sm'>{props.transaction_type}</button>
        </div>
        <div className=' flex justify-center items-center flex-1'>
            <p className="bg-gray-400 p-2 rounded-xl w-full">
{props.description}
</p>
        </div>
      
    </div>
  )
}

export default Transaction
