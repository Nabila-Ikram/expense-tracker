import React from 'react'
import {
ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend, 
  //  "represent colors belong to which field"
   CartesianGrid,
  Tooltip,
} from "recharts";

import data from './Bar_dummy_data';
const BarGraph = () => {
  return (
    <div className='h-full w-full '>
      <ResponsiveContainer>
        <BarChart data={data}>
         
          {/* //strokeDasharray="3 3"  grid dashed lines 3px space then 3px*/}
         <CartesianGrid strokeDasharray="3 3"  stroke="rgba(255,255,255,0.4)"/>
         {/* offset moves the axis label by a number of pixels.
    Negative = closer to the chart.
    Positive = farther from the chart. */}
    <XAxis
  dataKey="month" />
            <YAxis/>
            <Tooltip />
            <Legend />
           
            {/* radius={[10,10,0,0]} rounded the top corners only */}
            <Bar dataKey="income"  fill="purple"
             barSize={30}  name={"Income$"} 
             radius={[10,10,0,0]} /> // Bars can be made thinner or wider
            <Bar dataKey="expense" name={"Expense$"} 
             fill="rgba(50,84,67,0.5)" barSize={30}  radius={[10,10,0,0]}/>
        

        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarGraph