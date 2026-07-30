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
import data from "./Radar_dummy_data";
import React from 'react'

const RadarGraph = () => {
  return (
    <div className="w-full h-full">
        <ResponsiveContainer>
            <RadarChart data={data}>
                <PolarGrid /> 
                {/* It creates the web behind the graph. */}
                <PolarAngleAxis dataKey="category" />
                {/* PolarAngleAxis -> Displays category names around the radar chart. */}
                <PolarRadiusAxis />
                <Tooltip/>
                  <Legend/>
<Radar
    dataKey="amount"
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