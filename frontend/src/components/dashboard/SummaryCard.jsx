import { MdAttachMoney } from "react-icons/md";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { API_URL } from "../../api";
import React, { use, useEffect, useState } from 'react'
// import data from "./graph_dummydata"
const SummaryCard = () => {

   const [transactions, setTransactions] = useState([])
    const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
    const email=loggedInUser?.email
    
   useEffect(() => {
  if (!email) {
    alert("Please login again.");
    return;
  }

  async function fetchTransactions() {
    try {
      const response = await fetch(
        `${API_URL}/transactions/${encodeURIComponent(email)}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true"
          }
        }
      );

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

// acc → accumulator (running total)
// curr → current transaction

const monthlyBalance = {};

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

    if (curr.transaction_type === "income") {
        monthlyBalance[monthName] += curr.amount;
    } else if (curr.transaction_type === "expense") {
        monthlyBalance[monthName] -= curr.amount;
    }
});
const LineChartData = Object.entries(monthlyBalance).map(([month, balance]) => {
    return {
        month,
        balance
    };
});


  return (
    <div className='w-[95%] md:w-[90%] bg-linear-to-r from-[rgba(205,139,186,0.8)] to-[rgba(168,113,211,0.9)] m-3  p-3 md:p-5 border border-fuchsia-300 rounded-sm '>
        <div className='h-12 bg-linear-to-r from-gray-500 to-purple-900 flex justify-around  items-center '  >
            <div className='h-auto min-h-12 flex flex-col md:flex-row items-center'> Total Balance  
                <div className='flex'><MdAttachMoney size={25}/><h1>{balance}</h1> </div>
                 </div>
                <div className='h-auto min-h-12 flex flex-col md:flex-row items-center'> Total Expense 
                <div className='flex'><MdAttachMoney size={25}/><h1>{TotalExpense}</h1> </div>
                 </div>
            <div className='h-auto min-h-12 flex flex-col md:flex-row items-center'> Total Income
                <div className='flex'><MdAttachMoney size={25}/><h1>{TotalIncome}</h1> </div>
                 </div>
            
        </div>
        <div className=' h-auto flex flex-wrap bg-linear-to-r from-gray-700 to-purple-900 rounded-sm  justify-around items-center'>
            <h1><u>1 Year</u></h1>
            <h1><u>6 Months</u></h1>
            <h1><u>3 Months</u></h1>
            <h1><u>1 Month</u></h1>
        </div>
        
        <div className='flex-1 w-full h-48 md:h-64'>
            {/* ResponsiveContainer makes the chart automatically fit the parent div's width and height. */}
<ResponsiveContainer width="100%" height="100%" >
    <LineChart data={LineChartData}>
         {/* LineChart is the main container that renders the graph using the provided data array. */}
        <XAxis dataKey={"month"}
        axisLine={{ stroke: "#ffffff" }}
         tick={{ fill: "#ffffff" }}
        tickLine={{ stroke: "#ffffff" }}
//         axisLine  → Main axis line
// tickLine  → Small tick marks
// tick       → Label text (Jan, Feb, Mar...)
// stroke     → Line colour
// fill       → Text colour
        />
         {/* XAxis displays labels on the horizontal axis.
            dataKey="month" tells Recharts to use the 'month' property
            from each object in the data array. */}
               <Tooltip /> 
               {/* // When the user hovers:balnace automatically appears */}

        <Line dataKey={"balance"}
         stroke="purple"
    strokeWidth={4}
     type="monotone"/>
         {/* YAxis displays the vertical scale (values).
            It automatically uses the numeric values from the chart data. */}
        

    </LineChart>
</ResponsiveContainer>
       </div>
      
    </div>
  )
}

export default SummaryCard
