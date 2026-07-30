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
import data from "./Composed_dummy_data";

const ComposedGraph = () => {
  return (
    <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
  <ComposedChart data={data}>

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