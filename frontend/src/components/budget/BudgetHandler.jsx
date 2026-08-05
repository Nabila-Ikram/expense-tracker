import React, { useEffect, useState } from 'react'
import Budget_divs from './Budget_divs'
import Progress_bar from './Progress_bar'
import CategoryProgress from './CategoryProgress'
import { useNavigate } from 'react-router-dom'

const BudgetHandler = () => {
      const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
    const email=loggedInUser.email
    const [Budgets, setBudgets] = useState([])
    useEffect(()=>{
        async function fetchbudgets() {

            const response= await fetch(`http://127.0.0.1:5000/budget/${email}`)
            const data= await response.json()
             setBudgets(data)
        }
        fetchbudgets()
       

    },[email])
   
    

const [transactions, setTransactions] = useState([])
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
const budgetUsed= monthlyBudget==0? 0:
Math.round((totalSpent/monthlyBudget)*100)




   const nav=useNavigate()
  return (
    <div className='flex flex-col w-full p-8'>
        <Budget_divs monthlyBudget={monthlyBudget} totalSpent={totalSpent} remaining={remaining} budgetUsed={budgetUsed}/>
        {/* passing data to child */}
       
        <Progress_bar
    title="Monthly Budget Progress"
    spent={totalSpent}
    budget={monthlyBudget}
    percentage={budgetUsed}
    showDelete={false}

   
       
/>

<div className="p-5">
    <h1 className="text-2xl font-bold  mb-4">
        Category Budgets
    </h1>
    <CategoryProgress   budgets={Budgets} transactions={transactions} onDelete={deleteBudget}/>
    <button  onClick={()=>{
        nav("/budget/add")

    }}
    className='bg-linear-to-r from-orange-500  to-pink-600 text-center flex-1  rounded-sm w-40 h-12 m-5 font-bold text-white text-xl'>Add Budget</button>
</div>
   </div>
  


  )
}

export default BudgetHandler