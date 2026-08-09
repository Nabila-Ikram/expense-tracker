import React, { use, useEffect, useState } from 'react'

const Budget_divs = ({monthlyBudget,totalSpent,remaining,budgetUsed}) => {




// rounded to nearest integer
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3   gap-3 md:gap-5 p-3 md:p-5 text-white">

      {/* Monthly Budget */}
      <div className="bg-linear-to-r from-gray-900 to-purple-900 rounded-2xl border border-white/20 shadow-2xl p-5">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2 md:p-4">
          <h1 className="font-semibold">💜 Monthly Budget</h1>
          <h1 className="text-xl md:text-3xl font-bold mt-1 md:mt-3">${monthlyBudget}</h1>
        </div>
      </div>

      {/* Total Spent */}
      <div className="bg-linear-to-r from-gray-900 to-purple-900 rounded-2xl border border-white/20 shadow-2xl p-5">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl  p-2 md:p-4">
          <h1 className="font-semibold">🔴 Total Spent</h1>
          <h1 className="text-xl md:text-3xl font-bold mt-1 md:mt-3">${totalSpent}</h1>
        </div>
      </div>

      {/* Remaining */}
      <div className="bg-linear-to-r from-gray-900 to-purple-900 rounded-2xl border border-white/20 shadow-2xl p-5">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2 md:p-4">
          <h1 className="font-semibold">🟢Remaining</h1>
          <h1 className="text-xl md:text-3xl font-bold mt-1 md:mt-3">${remaining}</h1>
        </div>
      </div>

      {/* Budget Used */}
      <div className="bg-linear-to-r from-gray-900 to-purple-900 rounded-2xl border border-white/20 shadow-2xl p-5">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2 md:p-4">
          <h1 className="font-semibold">🔵 Budget Used</h1>
          <h1 className="text-xl md:text-3xl font-bold mt-1 md:mt-3">{budgetUsed}%</h1>
        </div>
      </div>

    </div>
  )
}

export default Budget_divs