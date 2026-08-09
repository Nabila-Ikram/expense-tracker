import React, { useContext, useState } from 'react'
import { GrTransaction } from "react-icons/gr";
import { ThemeContext } from '../../context/ThemeProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Addtrans_form = ({transaction}) => {
  const nav=useNavigate()
  const {theme}=useContext(ThemeContext)
  const [Amount, setAmount] = useState('')
  const [Category, setCategory] = useState('')
  const [Date, setDate] = useState('')
  const [Transaction_Type, setTransaction_Type] = useState('')
  const [Description, setDescription] = useState('')

  useEffect(() => {
    if (transaction) {
        setAmount(transaction.amount);
        setCategory(transaction.category);
        setDate(transaction.iso_date);
        setTransaction_Type(transaction.transaction_type);
        setDescription(transaction.description);
    }
}, [transaction]);
// using useeffect bcz the transaction was first nulla nd then filled so state changes 

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
if(transaction){
  const response = await fetch(
  `http://127.0.0.1:5000/accounts/${loggedInUser.email}/transactions/${transaction.trans_id}`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addTransaction),
  }
);

const data = await response.json();

if (response.ok) {
  alert("Transaction Updated Successfully!");
  nav('/transactionHistory')
  
} else {
  alert(data.error);
}
}
else{
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
  }

  } catch (error) {
    console.log(error);
    alert("Something went wrong.");
  }

}

  
const inputClass = `
flex-1 h-12 outline-none p-2 rounded-sm focus:ring-1 focus:ring-purple-400
${theme === "dark"
  ? "border-white/20 text-white"
  : "border-gray-300 bg-white text-black"}
`;


const textareaClass = `
    w-full  h-32 md:h-40 outline-none p-2 rounded-sm resize-none focus:ring-1 focus:ring-purple-400
    ${
      theme === "dark"
        ? "border border-white/20 text-white placeholder:text-gray-300"
        : "border border-gray-300 bg-white text-black placeholder:text-gray-500"
    }
  `;

  return (
                <form onSubmit={(e)=>{
                  submitHandler(e)
                }}
                  className={`w-[90%] min-h-[70%] md:h-[80%] max-w-5xl p-4 rounded-xl md:rounded-2xl backdrop-blur-md
  shadow-2xl flex flex-col ${
    theme === "dark"
      ? "bg-white/10 border border-white/20 text-white"
      : "bg-white/60 border border-gray-300 text-black"
  }`}>
                      <div className="w-full flex justify-center items-center
                gap-2 text-sm md:text-3xl text-center">
                        <h1><GrTransaction size={30} /></h1>
                <h1>
    <b>{transaction ? "Edit Transaction" : "Add Transaction"}</b>
</h1>
                </div>
                <div className='flex justify-center items-center  flex-1  flex-col gap-2'>
                    <div className='flex flex-col md:flex-row w-full justify-center items-center gap-2 md:gap-4'>
                            <div className='flex-1 flex-col  flex gap-2 w-full'>
                            <label htmlFor="amount">Amount</label>
                             <input onChange={(e)=>{
                                  setAmount(e.target.value)
                             }} value={Amount}
                             type='number' placeholder='Enter amount' min={0.0} step={0.01} className={inputClass}></input>
                             </div>
                            <div className='flex-1 flex-col flex gap-2 w-full'>
                         <label htmlFor="category">Category</label>
                         <input onChange={(e)=>{
                                  setCategory(e.target.value)
                             }} value={Category}
                         type='text' placeholder='Enter category'  className={inputClass}></input>
                        </div>
                        </div>
                    <div className='flex flex-col md:flex-row w-full justify-center items-center  gap-2 md:gap-4'>
                        <div className='flex-1  flex-col flex gap-2 w-full'>
                            <label htmlFor="date">Date</label>
                           <input onChange={(e)=>{
                                  setDate(e.target.value)
                             }} value={Date}
                           type='date'  className={inputClass}></input>
                           </div>
                           <div className=' flex-col flex gap-2 w-full'>
                    <label>Transaction Type</label>
                    <div className=' flex-1 flex flex-col md:flex-row gap-2'>
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
                className={textareaClass} ></textarea>
                             <div>
                             <button  type='submit'
                             className='bg-linear-to-r from-orange-500  to-pink-600 text-center h-10 rounded-sm w-full '>{transaction ? "Update Transaction" : "Save Transaction"}</button>
                             </div>
</div>
                    </div>
                </form>
  )
}
               

export default Addtrans_form