import React, { useEffect, useState } from 'react'
import Budget_divs from './Budget_divs'
import Progress_bar from './Progress_bar'
import CategoryProgress from './CategoryProgress'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../api'
const BudgetHandler = () => {
    const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
    const email = loggedInUser?.email
    const [Budgets, setBudgets] = useState([])
    const [transactions, setTransactions] = useState([])


    useEffect(() => {
  async function fetchBudgets() {
    if (!email) {
      alert("Please login again.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/budget/${email}`, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });

      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setBudgets(data);
      } else {
        setBudgets([]);
        alert(data.error || "Failed to fetch budgets");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  fetchBudgets();
}, [email]);

useEffect(() => {
  async function fetchTransactions() {
    if (!email) {
      alert("Please login again.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/transactions/${email}`, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });

      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setTransactions(data);
      } else {
        setTransactions([]);
        alert(data.error || "Failed to fetch transactions");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  fetchTransactions();
}, [email]);

function deleteBudget(id){
          setBudgets((prev)=>{
               return prev.filter( b=>b.budget_id!==id)
  
          })
          
      }
  const monthlyBudget=Budgets.reduce((acc,curr)=>{
       return curr.limit+acc

  },0)

  const totalSpent=transactions.filter(t=>t.transaction_type =="expense").reduce((acc,curr)=>{
    return acc+curr.amount

  },0 )

  const remaining=monthlyBudget-totalSpent
const budgetUsed = monthlyBudget === 0
  ? 0
  : Math.min(Math.round((totalSpent / monthlyBudget) * 100), 100)




   const nav=useNavigate()
  return (
    <div className='flex flex-col w-full p-3 md:p-8'>
        <Budget_divs monthlyBudget={monthlyBudget} totalSpent={totalSpent} remaining={remaining} budgetUsed={budgetUsed}/>
        {/* passing data to child */}
       
        <Progress_bar
    title="Monthly Budget Progress"
    spent={totalSpent}
    budget={monthlyBudget}
    percentage={budgetUsed}
    showDelete={false}

   
       
/>

<div className="p-3 md:p-5">
    <h1 className="text-xl md:text-2xl font-bold  mb-2 md:mb-4 ml-2 md:ml-4">
        Category Budgets
    </h1>
    <CategoryProgress   budgets={Budgets} transactions={transactions} onDelete={deleteBudget}/>
    <button  onClick={()=>{
        nav("/budget/add")

    }}
    className='bg-linear-to-r from-orange-500  to-pink-600 text-center flex-1  rounded-sm   w-30 md:w-40 h-12
  m-1 md:m-5 font-bold text-white md:text-xl text-sm'>Add Budget</button>
</div>
   </div>
  


  )
}

export default BudgetHandler