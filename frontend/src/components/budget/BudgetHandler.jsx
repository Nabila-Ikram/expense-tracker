import React from 'react'
import Budget_divs from './Budget_divs'
import Progress_bar from './Progress_bar'
import CategoryProgress from './CategoryProgress'

const BudgetHandler = () => {
  return (
    <div className='flex flex-col w-full p-8'>
        <Budget_divs/>
       <Progress_bar
    title="Monthly Budget Progress"
    spent={6000}
    budget={8000}
    percentage={75}
/>
<div className="p-5">
    <h1 className="text-2xl font-bold text-white mb-4">
        Category Budgets
    </h1>
    <CategoryProgress />
</div>
   </div>
  


  )
}

export default BudgetHandler