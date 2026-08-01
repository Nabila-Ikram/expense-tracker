import React from 'react'
import { MdAttachMoney } from "react-icons/md";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import data from "./graph_dummydata"
const SummaryCard = () => {
  return (
    <div className=' text-white w-[90%] bg-linear-to-r from-[rgba(205,139,186,0.8)] to-[rgba(168,113,211,0.9)] m-3 p-5 border border-fuchsia-300 rounded-sm '>
        <div className='h-12 bg-linear-to-r from-gray-500 to-purple-900 flex justify-around  items-center '  >
            <div className='flex flex-col'> Total Balance  
                <div className='flex'><MdAttachMoney size={25}/><h1>  208390</h1> </div>
                 </div>
                <div className='flex flex-col'> Total Expense 
                <div className='flex'><MdAttachMoney size={25}/><h1>  208390</h1> </div>
                 </div>
            <div className='flex flex-col'> Total Income
                <div className='flex'><MdAttachMoney size={25}/><h1>  208390</h1> </div>
                 </div>
            
        </div>
        <div className=' h-12  bg-linear-to-r from-gray-700 to-purple-900 rounded-sm flex justify-around items-center'>
            <h1><u>1 Year</u></h1>
            <h1><u>6 Months</u></h1>
            <h1><u>3 Months</u></h1>
            <h1><u>1 Month</u></h1>
        </div>
        
        <div className='flex-1 w-full h-30 '>
            {/* ResponsiveContainer makes the chart automatically fit the parent div's width and height. */}
<ResponsiveContainer width="100%" height="100%" >
    <LineChart data={data}>
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
    strokeWidth={4}/>
     type="monotone"
         {/* YAxis displays the vertical scale (values).
            It automatically uses the numeric values from the chart data. */}
        

    </LineChart>
</ResponsiveContainer>
       </div>
      
    </div>
  )
}

export default SummaryCard
