import React from 'react'
import { GrTransaction } from "react-icons/gr";
const Addtrans_form = () => {
  return (
                <form className="w-[90%] max-w-5xl h-[80%] p-4 rounded-2xl bg-white/10 backdrop-blur-md
                      border border-white/20 shadow-2xl flex flex-col">
                      <div className='w-full h-[10%] justify-center items-center flex gap-2 text-3xl text-center'>
                        <h1><GrTransaction size={30} /></h1>
                <h1> <b> Add Transaction</b></h1>
                </div>
                <div className='flex justify-center items-center  flex-1  flex-col gap-2'>
                    <div className='flex w-full justify-center items-center gap-4'>
                            <div className='flex-1 flex-col  flex gap-2 w-full'>
                            <label htmlFor="amount">Amount</label>
                             <input type='number' placeholder='Enter amount' min={0.0} step={0.01} className='flex-1 h-12 focus:ring-1 focus:ring-purple-400 border border-white/20  outline-none p-2 rounded-sm'></input>
                             </div>
                            <div className='flex-1 flex-col flex gap-2 w-full'>
                         <label htmlFor="category">Category</label>
                        <input type='text' placeholder='Enter category'  className='flex-1 h-12 focus:ring-1 focus:ring-purple-400 border border-white/20   outline-none p-2  rounded-sm'></input>
                        </div>
                        </div>
                    <div className='flex  w-full justify-center items-center gap-4'>
                        <div className='flex-1  flex-col flex gap-2 w-full'>
                            <label htmlFor="date">Date</label>
                           <input type='date'  className='flex-1 h-12 focus:ring-1 focus:ring-purple-400 border border-white/20 outline-none p-2  rounded-sm'></input>
                           </div>
                           <div className='flex-1 flex-col flex gap-2 w-full'>
                    <label>Transaction Type</label>
                    <div className='flex gap-2'>
                    <button  className='bg-linear-to-r from-red-900  to-red-700 text-center flex-1 h-10 rounded-sm'>Expense</button>
                    <button  className='bg-linear-to-r from-green-900  to-green-700 text-center flex-1 h-10 rounded-sm'>Income</button>
                    </div>
                    </div>
                    </div>
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
             <textarea
               placeholder="Enter Description"
                className="w-full h-40 focus:ring-1 focus:ring-purple-400 border border-gray-300 outline-none p-2 rounded-sm resize-none"
                             ></textarea>
                             <div>
                             <button className='bg-linear-to-r from-orange-500  to-pink-600 text-center flex-1 h-10 rounded-sm w-full '>Save Transaction</button>
                             </div>
</div>
                    </div>
                </form>
  )
}

export default Addtrans_form