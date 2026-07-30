import React from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import data from './pieChart_dummy_data';
const COLORS = [
  "rgba(34,197,94,0.6)",    // Emerald Green
  "rgba(59,130,246,0.9)",   // Royal Blue
  "rgba(168,85,247,0.6)",   // Purple
  "rgba(236,72,153,0.9)",   // Pink
  "#9B59B6",   // Amber
];

const PieChartGraph = () => {
  {/* data -> Array used to create the pie slices. */}
  {/* dataKey -> Property containing the numeric value for each slice. */}
  {/* nameKey -> Property containing the label for each slice. */}
//   cx="35%" → Shift pie left so the vertical legend on the right has room.
// cy="50%" → Center vertically.
// outerRadius="80%" → Responsive radius instead of a fixed pixel value.
//{/* Cell components are children of Pie and control the style of each slice. */}
  return (
    <div className='h-full w-full bg-gary-400'>
        <ResponsiveContainer>
            <PieChart>
              <Pie
  data={data}
  dataKey="amount"
  nameKey="category"
  cx="35%"
  cy="50%"

  outerRadius="80%"
  labelLine={{ stroke: "#9ca3af", strokeWidth: 1 }}
  label={({ percent }) =>
    ` ${(percent * 100).toFixed(0)}%`
  }

>
  <Tooltip />
  <Legend
    layout="vertical"
    align="right"
    verticalAlign="middle"
    wrapperStyle={{ fontSize: 12, lineHeight: "20px" }}
/>
  {data.map((entry, index) => (
    <Cell
      key={index}
      fill={COLORS[index]}
    />
  ))}
</Pie>

            </PieChart>
        </ResponsiveContainer>
</div>
  )
}

export default PieChartGraph
