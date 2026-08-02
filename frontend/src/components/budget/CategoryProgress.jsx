import React from "react";
import Progress_bar from "./Progress_bar";

const CategoryProgress = ({budgets,transactions}) => {
  return (
    
  <div className="grid grid-cols-2 gap-5 p-5">
    {budgets.map((budget) => {

      const spent=transactions.filter(t=>t.category==budget.category && t.transaction_type=="expense").reduce((acc,curr)=>{
return acc+curr.amount
      },0)

      const percentage = budget.limit == 0 ? 0: Math.round((spent / budget.limit) * 100);
      return (
        <div
            key={budget.category}
            className="bg-linear-to-r from-gray-900 to-purple-900 rounded-2xl border border-white/20"
        >
            <Progress_bar
                title={budget.category}
                spent={spent}
                budget={budget.limit}
                percentage={percentage}
            />
        </div>
      );
    })}
  </div>
);
}


export default CategoryProgress;