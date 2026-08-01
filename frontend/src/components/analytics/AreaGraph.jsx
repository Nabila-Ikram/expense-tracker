import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import data from '../dashboard/Bar_dummy_data';
const AreaGraph = () => {
  return (
     <div className='h-full w-full '>
          <ResponsiveContainer>
            <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

    <XAxis dataKey="month" />

    <YAxis />

    <Tooltip />

    <Legend />

    <Area
      type="monotone"
      dataKey="income"
      stroke="#9B59B6"
      fill="#9B59B6"
    />
            </AreaChart>
            </ResponsiveContainer>
            </div>
  )
}

export default AreaGraph