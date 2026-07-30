import React from "react";

import RadarGraph from "./RadarGraph";
import PieChartGraph from "./PieChartGraph";
import AreaGraph from "./AreaGraph";
import ScatterGraph from "./ScatterGraph";
import ComposedGraph from "./ComposedGraph";

const Analytics = () => {
  return (
    <div className="background h-screen p-2">

      <h1 className="text-2xl font-bold text-white mb-3 ml-7">
        Financial Analytics
      </h1>

      <div className="grid grid-cols-3 gap-8 p-5">

        {/* Radar */}
        <div className="bg-linear-to-br from-[rgba(30,30,40,.95)] to-[rgba(88,28,135,.75)]
        rounded-2xl p-5 h-55 shadow-xl
        hover:scale-[1.02] transition-all duration-300">

          <h2 className="text-xl font-bold text-white">
            Spending by Category
          </h2>

          <p className="text-gray-300 text-sm mb-3">
            Compare expenses across categories.
          </p>

          <div className="h-[80%]">
            <RadarGraph />
          </div>

        </div>


        {/* Pie */}
        <div className="bg-linear-to-br from-[rgba(30,30,40,.95)] to-[rgba(88,28,135,.75)]
        rounded-2xl p-5 h-55 shadow-xl
        hover:scale-[1.02] transition-all duration-300">

          <h2 className="text-xl font-bold text-white">
            Expense Distribution
          </h2>

          <p className="text-gray-300 text-sm mb-3">
            Percentage spent in each category.
          </p>

          <div className="h-[78%]">
            <PieChartGraph />
          </div>

        </div>


        {/* Area */}
        <div className="bg-linear-to-br from-[rgba(30,30,40,.95)] to-[rgba(88,28,135,.75)]
        rounded-2xl p-5 h-55 shadow-xl
        hover:scale-[1.02] transition-all duration-300">

          <h2 className="text-xl font-bold text-white">
            Balance Trend
          </h2>

          <p className="text-gray-300 text-sm mb-3">
            Monthly balance changes.
          </p>

          <div className="h-[78%]">
            <AreaGraph />
          </div>

        </div>


        {/* Composed */}
        <div className="col-span-2 bg-linear-to-br
        from-[rgba(30,30,40,.95)]
        to-[rgba(88,28,135,.75)]
        rounded-2xl
        p-5
        h-60
        shadow-xl
        hover:scale-[1.02]
        transition-all duration-300">

          <h2 className="text-xl font-bold text-white">
            Budget vs Expense
          </h2>

          <p className="text-gray-300 text-sm mb-3">
            Compare monthly budget, expenses and balance.
          </p>

          <div className="h-[82%]">
            <ComposedGraph />
          </div>

        </div>


        {/* Scatter */}
        <div className="bg-linear-to-br
        from-[rgba(30,30,40,.95)]
        to-[rgba(88,28,135,.75)]
        rounded-2xl
        p-5
        h-60
        shadow-xl
        hover:scale-[1.02]
        transition-all duration-300">

          <h2 className="text-xl font-bold text-white">
            Income vs Expense
          </h2>

          <p className="text-gray-300 text-sm mb-3">
            Relationship between income and spending.
          </p>

          <div className="h-[70%]">
            <ScatterGraph />
          </div>

        </div>


      </div>
    </div>
  );
};

export default Analytics;