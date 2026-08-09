import React from "react";
import Progress_bar from "./Progress_bar";

const CategoryProgress = ({budgets,transactions,onDelete}) => {
 

  return (
    
  <div className="grid grid-cols-1 md:grid-cols-2  gap-2 md:gap-5 p-3 md:p-5">
    {budgets.map((budget) => {

      const spent=transactions.filter(t=>t.category==budget.category && t.transaction_type=="expense").reduce((acc,curr)=>{
return acc+curr.amount
      },0)

      const percentage = budget.limit == 0 ? 0: Math.round((spent / budget.limit) * 100);
      return (
        <div
            key={budget.budget_id}
            className="bg-linear-to-r text-white from-gray-900 to-purple-900 rounded-sm md:rounded-2xl border  min-w-0  border-white/20"
        >
            <Progress_bar
                id={budget.budget_id}
                title={budget.category}
                spent={spent}
                budget={budget.limit}
                percentage={percentage}
                showDelete={true}
                onDelete={onDelete}
                showEdit={true}
            />
        </div>
      );
    })}
  </div>
);
}


export default CategoryProgress;