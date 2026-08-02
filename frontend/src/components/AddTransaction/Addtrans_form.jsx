import React, { useState } from 'react'
import { GrTransaction } from "react-icons/gr";
const Addtrans_form = () => {
  const [Amount, setAmount] = useState('')
  const [Category, setCategory] = useState('')
  const [Date, setDate] = useState('')
  const [Transaction_Type, setTransaction_Type] = useState('')
  const [Description, setDescription] = useState('')
  async function submitHandler(e){
    e.preventDefault()
 try {
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const addTransaction={
     email:loggedInUser.email,
      amount:Number(Amount),
      category:Category,
      transaction_type:Transaction_Type,
      description :Description,
      date:Date,
};
const response=await fetch("http://127.0.0.1:5000/transactions",{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
    body :JSON.stringify(addTransaction),
})
  const data = await response.json();

  if (response.ok) {
      alert("Transaction Added Successfully!");

      setAmount("");
      setCategory("");
      setDate("");
      setTransaction_Type("");
      setDescription("");
    } else {
      alert(data.error);
    }

  } catch (error) {
    console.log(error);
    alert("Something went wrong.");
  }
}

  return (
                <form onSubmit={(e)=>{
                  submitHandler(e)
                }}
                className="w-[90%] max-w-5xl h-[80%] p-4 rounded-2xl bg-white/10 backdrop-blur-md
                      border border-white/20 shadow-2xl flex flex-col">
                      <div className='w-full h-[10%] justify-center items-center flex gap-2 text-3xl text-center'>
                        <h1><GrTransaction size={30} /></h1>
                <h1> <b> Add Transaction</b></h1>
                </div>
                <div className='flex justify-center items-center  flex-1  flex-col gap-2'>
                    <div className='flex w-full justify-center items-center gap-4'>
                            <div className='flex-1 flex-col  flex gap-2 w-full'>
                            <label htmlFor="amount">Amount</label>
                             <input onChange={(e)=>{
                                  setAmount(e.target.value)
                             }} value={Amount}
                             type='number' placeholder='Enter amount' min={0.0} step={0.01} className='flex-1 h-12 focus:ring-1 focus:ring-purple-400 border border-white/20  outline-none p-2 rounded-sm'></input>
                             </div>
                            <div className='flex-1 flex-col flex gap-2 w-full'>
                         <label htmlFor="category">Category</label>
                         <input onChange={(e)=>{
                                  setCategory(e.target.value)
                             }} value={Category}
                         type='text' placeholder='Enter category'  className='flex-1 h-12 focus:ring-1 focus:ring-purple-400 border border-white/20   outline-none p-2  rounded-sm'></input>
                        </div>
                        </div>
                    <div className='flex  w-full justify-center items-center gap-4'>
                        <div className='flex-1  flex-col flex gap-2 w-full'>
                            <label htmlFor="date">Date</label>
                           <input onChange={(e)=>{
                                  setDate(e.target.value)
                             }} value={Date}
                           type='date'  className='flex-1 h-12 focus:ring-1 focus:ring-purple-400 border border-white/20 outline-none p-2  rounded-sm'></input>
                           </div>
                           <div className='flex-1 flex-col flex gap-2 w-full'>
                    <label>Transaction Type</label>
                    <div className='flex gap-2'>
                    <button  type='button' 
                     onClick={()=>{
                      setTransaction_Type('expense')
                    }}  
                    className='bg-linear-to-r from-red-900  to-red-700 text-center flex-1 h-10 rounded-sm'>Expense</button>
                    <button  type='button'
                    onClick={()=>{
                      setTransaction_Type('income')
                    }}  
                     className='bg-linear-to-r from-green-900  to-green-700 text-center flex-1 h-10 rounded-sm'>Income</button>
                    </div>
                    </div>
                    </div>
                  <div className="w-full flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
             <textarea  onChange={(e)=>{
                                  setDescription(e.target.value)
                             }} value={Description}
               placeholder="Enter Description"
                className="w-full h-40 focus:ring-1 focus:ring-purple-400 border border-gray-300 outline-none p-2 rounded-sm resize-none"
                             ></textarea>
                             <div>
                             <button  type='submit'
                             className='bg-linear-to-r from-orange-500  to-pink-600 text-center flex-1 h-10 rounded-sm w-full '>Save Transaction</button>
                             </div>
</div>
                    </div>
                </form>
  )
}
               

export default Addtrans_form