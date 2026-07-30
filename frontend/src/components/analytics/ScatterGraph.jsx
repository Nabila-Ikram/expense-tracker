
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
import data from "./Scatter_dummy_data";
const ScatterGraph = () => {
  return (
    <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
  <ScatterChart data={data}>

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
      name="Income vs Expense"
      data={data}
      fill="#A855F7"
    />

  </ScatterChart>
</ResponsiveContainer>

    </div>
  )
}

export default ScatterGraph