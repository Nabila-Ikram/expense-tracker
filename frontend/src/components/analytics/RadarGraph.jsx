import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
} from "recharts";

import React from 'react'

const RadarGraph = ({Budgets}) => {
  const budgets={};
{Budgets.forEach((budget)=>{
   if (!budgets[budget.category]) {
        budgets[budget.category] = 0;
    }
  budgets[budget.category]+= budget.limit
})}

const RadarChartData = Object.entries(budgets).map(([category, limit]) => {
    return {
       category,
       limit
    };
});
  return (
    <div className="w-full h-full">
        <ResponsiveContainer>
            <RadarChart data={RadarChartData}>
                <PolarGrid /> 
                {/* It creates the web behind the graph. */}
                <PolarAngleAxis dataKey="category" />
                {/* PolarAngleAxis -> Displays category names around the radar chart. */}
                <PolarRadiusAxis />
                <Tooltip/>
                  <Legend/>
<Radar
    dataKey="limit"
    stroke="#A855F7"
    fill="#A855F7"
    fillOpacity={0.6}
  />
            </RadarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default RadarGraph