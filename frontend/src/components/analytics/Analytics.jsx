import React, { useEffect, useState } from "react";
import RadarGraph from "./RadarGraph";
import PieChartGraph from "./PieChartGraph";
import AreaGraph from "./AreaGraph";
import ScatterGraph from "./ScatterGraph";
import ComposedGraph from "./ComposedGraph";
const Analytics = () => {

const [transactions, setTransactions] = useState([])
      const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
      const email=loggedInUser.email
      
     useEffect(() => {
      async function fetchTransactions() {
          const response = await fetch(
              `http://127.0.0.1:5000/transactions/${email}`
          );
  
          const data = await response.json();
  
          setTransactions(data);
       
          
      }``
     
      fetchTransactions();
  }, [email]);

 const [Budgets, setBudgets] = useState([])
    useEffect(()=>{
        async function fetchbudgets() {

            const response=await fetch(`http://127.0.0.1:5000/budget/${email}`)
            const data= await response.json()
             setBudgets(data)
        }
        fetchbudgets()
       

    },[email])

  return (
    <div className=" h-screen p-2">

      <h1 className="text-2xl font-bold t mb-3 ml-7">
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
            <RadarGraph   Budgets={Budgets}/>
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
            <PieChartGraph  Budgets={Budgets}/>
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
            <AreaGraph  transactions={transactions}/>
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
            <ComposedGraph transactions={transactions}/>
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
            <ScatterGraph transactions={transactions} />
          </div>

        </div>


      </div>
    </div>
  );
};

export default Analytics;