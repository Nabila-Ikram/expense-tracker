import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import React from 'react'
const ComposedGraph = ({transactions}) => {
const TotalExpense=transactions.reduce((acc,curr)=>{
  if(curr.transaction_type=="expense"){
      return acc+curr.amount
  }
  return acc
  },0)
   const TotalIncome=
  transactions.reduce((acc,curr)=>{
  if(curr.transaction_type=="income"){
      return acc+curr.amount
  }
  return acc
  },0)
  // starting value of acc
  
  const balance=TotalIncome - TotalExpense

const monthlyBalance = {};
const monthlyIncome={};
const monthlyExpense={};

const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];

transactions.forEach((curr) => {
  const date = new Date(curr.iso_date);
    const month = date.getMonth();
    const monthName = months[month];

    if (!monthlyBalance[monthName]) {
        monthlyBalance[monthName] = 0;
    }
     if (!monthlyExpense[monthName]) {
        monthlyExpense[monthName] = 0;
    }

    
    if (!monthlyIncome[monthName]) {
        monthlyIncome[monthName] = 0;
    }
    if (curr.transaction_type === "income") {
        monthlyBalance[monthName] += curr.amount;
        monthlyIncome[monthName]+=curr.amount
    } else if (curr.transaction_type === "expense") {
        monthlyBalance[monthName] -= curr.amount;
        monthlyExpense[monthName]+=curr.amount
    }
});


const composedChartData=months.map((m)=>{
  return {
    month:m,
    income:monthlyIncome[m] || 0 ,
    expense:monthlyExpense[m]  || 0 ,
    balance:monthlyBalance[m] || 0 
    // if no income/expense then instead of undefined give 0 

  }

})

  return (
    <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
  <ComposedChart data={composedChartData}>

    <CartesianGrid strokeDasharray="3 3" />

    <XAxis dataKey="month" />

    <YAxis />

    <Tooltip />

    <Legend />

    <Bar
      dataKey="income"
      fill="purple"
    />

    <Bar
      dataKey="expense"
      fill="rgba(50,84,67,0.5)"
    />

    <Line
      type="monotone"
      dataKey="balance"
      stroke="#A855F7"
      strokeWidth={3}
    />

  </ComposedChart>
</ResponsiveContainer>
    </div>

  )
}

export default ComposedGraph