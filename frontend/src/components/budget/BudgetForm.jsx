import React, { useContext, useEffect, useState } from 'react'
import { use } from 'react';
import { MdAttachMoney } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeProvider';

const BudgetForm = ({budget}) => {
  const{theme}=useContext(ThemeContext)
    const [Category, setCategory] = useState('')
    const [Limit, setLimit] = useState('')
    const [Month, setMonth] = useState('')
    const nav=useNavigate()

    useEffect(()=>{
    if(budget){
      setCategory(budget.category)
      setLimit(budget.limit)
      setMonth(budget.month)
    }
    },[budget])


const inputClass = `
flex-1 h-12 outline-none p-2 rounded-sm focus:ring-1 focus:ring-purple-400
${theme === "dark"
  ? "border-white/20 text-white"
  : "border-gray-300 bg-white text-black"}
`;

    async function submitHandler(e){

        e.preventDefault()
        try{
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        const addBudget={
            email:loggedInUser.email,
            category:Category,
            limit:Number(Limit),
            month:Month
        };

        if(budget){
        const response = await fetch(
  `http://127.0.0.1:5000/accounts/${loggedInUser.email}/budget/${budget.budget_id}`,
  {
        method:'PUT',
        headers:{
        "Content-Type": "application/json",
      },
    body :JSON.stringify(addBudget),
    })
    const data = await response.json();
    if (response.ok) {
     alert("Budget Update Successfully!");

        nav('/budget')
 }
    else {
      alert(data.error);
    }
}
  
    else{
        const response=await fetch("http://127.0.0.1:5000/budget",{
        method:'POST',
        headers:{
        "Content-Type": "application/json",
      },
    body :JSON.stringify(addBudget),
    })
    const data = await response.json();
    if (response.ok) {
     alert("Budget Added Successfully!");

        setCategory('')
        setLimit('')
        setMonth('')
        nav('/budget')
 }
    else {
      alert(data.error);
    }
}
}
    catch (error) {
    console.log(error);
    alert("Something went wrong.");
  }
 }
  return (
    <div className={`h-screen flex flex-col justify-center items-center ${
      theme === "dark"
        ? "background text-white"
        : "whitebg text-black"
    }`} >
   <form onSubmit={(e)=>{
                     submitHandler(e)
                   }}
                   className="  w-[80%] h-[70%] p-4 rounded-2xl bg-white/10 backdrop-blur-md
                         border border-white/20 shadow-2xl flex flex-col">
                         <div className='w-full h-[10%] justify-center items-center flex gap-2 text-3xl text-center'>
                           <h1> <MdAttachMoney size={25} /></h1>
                   <h1> <b>{budget? "Update Budget":"Add Budget"}</b></h1>
                   </div>
                   <div className='flex justify-center items-center  flex-1  flex-col gap-2'>
                       <div className='flex w-full justify-center items-center gap-5'>
                               
                               <div className='flex-1 flex-col flex gap-2 w-full'>
                            <label htmlFor="category">Category</label>
                            <input onChange={(e)=>{
                                     setCategory(e.target.value)
                                }} value={Category}
                            type='text' placeholder='Enter category'  className={inputClass}></input>
                           </div>
                           <div className='flex-1 flex-col  flex gap-2 w-full'>
                               <label htmlFor="limit">Limit</label>
                                <input onChange={(e)=>{
                                     setLimit(e.target.value)
                                }} value={Limit}
                                type='number' placeholder='Enter amount' min={0.0} step={0.01} className={inputClass}></input>
                                </div>
                           </div>
                       <div className='flex  w-full justify-center items-center gap-4'>
                           <div className='flex-1  flex-col flex gap-2 '>
                               <label htmlFor="month">Month</label>
                              <input onChange={(e)=>{
                                     setMonth(e.target.value)
                                }} value={Month}
                              type="month"  className={inputClass}/>
                              </div>
                             
                                
                                </div>
                                <button  type='submit'
                                className='bg-linear-to-r from-orange-500  to-pink-600 text-center w-40 h-12 rounded-sm text-xl font-bold m-5 '>{budget? "Update Budget":"Save Budget"}</button>
   </div>
                      
                   </form>
                   </div>
  )
}

export default BudgetForm
