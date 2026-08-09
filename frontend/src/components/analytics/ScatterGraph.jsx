
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import React from 'react'
const ScatterGraph = ({transactions}) => {

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


     if (!monthlyExpense[monthName]) {
        monthlyExpense[monthName] = 0;
    }

    
    if (!monthlyIncome[monthName]) {
        monthlyIncome[monthName] = 0;
    }
    if (curr.transaction_type === "income") {
       monthlyIncome[monthName] += Number(curr.amount);
    } else if (curr.transaction_type === "expense") {
       monthlyExpense[monthName] += Number(curr.amount);
    }
});




const ScatterChartData= months.map((m)=>{
  return {
    month:m,
    income:monthlyIncome[m] || 0 ,
    expense:monthlyExpense[m]  || 0 ,

    // if no income/expense then instead of undefined give 0 
  };
});


  return (
    <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
  <ScatterChart data={ScatterChartData}>

    <CartesianGrid strokeDasharray="3 3" />

    <XAxis
      dataKey="income"
      name="Income"
    />

    <YAxis
      dataKey="expense"
      name="Expense"
    />
    <Tooltip/>
    <Legend/>

    <Scatter
      data={ScatterChartData}
      name="Income vs Expense"
      fill="#A855F7"
    />

  </ScatterChart>
</ResponsiveContainer>

    </div>
  )
}

export default ScatterGraph