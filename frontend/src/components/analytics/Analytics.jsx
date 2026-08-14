import React, { useEffect, useState } from "react";
import RadarGraph from "./RadarGraph";
import PieChartGraph from "./PieChartGraph";
import AreaGraph from "./AreaGraph";
import ScatterGraph from "./ScatterGraph";
import ComposedGraph from "./ComposedGraph";
import { API_URL } from "../../api";
const Analytics = () => {
const [transactions, setTransactions] = useState([])
      const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
    const email = loggedInUser?.email     
     useEffect(() => {
       if (!email) {
      alert("Please login again.");
      return;
    }
      async function fetchTransactions() {
        try{
          const response = await fetch(
              `${API_URL}/transactions/${email}`,
                {
                    headers: { "ngrok-skip-browser-warning": "true" }
                }
          );
  
          const data = await response.json();  
       
      if (response.ok && Array.isArray(data)) {
        setTransactions(data);
      } else {
        setTransactions([]);
        alert(data.error || "Failed to fetch transactions");
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
      }    
      fetchTransactions();
  }, [email]);



const [Budgets, setBudgets] = useState([])
    useEffect(()=>{
        if (!email) {
      alert("Please login again.");
      return;
    }
        async function fetchbudgets() {
          try{

            const response=await fetch(`${ API_URL }/budget/${email}`,
                {
                    headers: { "ngrok-skip-browser-warning": "true" }
                })
            const data= await response.json()
      if (response.ok && Array.isArray(data)) {
       setBudgets(data);
}      else {
      setBudgets([]);
         alert(data.error || "Failed to fetch budgets");
}
      }catch(error)
              {
          console.log(error);
          alert("Something went wrong");
              }
        }
        fetchbudgets()
    },[email])



  return (
    <div className=" h-screen p-2 overflow-y-auto">

     <h1 className="text-xl md:text-2xl font-bold mb-3 ml-3 md:ml-7">
        Financial Analytics
      </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-3 md:p-5">
        {/* Radar */}
        <div className="bg-linear-to-br from-[rgba(30,30,40,.95)] to-[rgba(88,28,135,.75)]
        rounded-2xl p-2 md:p-5 h-64 md:h-60 shadow-xl
         md:hover:scale-[1.02] transition-all duration-300">

          <h2 className="text-sm md:text-xl font-bold text-white">
            Spending by Category
          </h2>

          <p className="text-gray-300 text-sm mb-1 md:mb-3">
            Compare expenses across categories.
          </p>

       <div className="h-40 md:h-36">
            <RadarGraph   Budgets={Budgets}/>
          </div>
        </div>


        {/* Pie */}
        <div className="bg-linear-to-br from-[rgba(30,30,40,.95)] to-[rgba(88,28,135,.75)]
        rounded-2xl  p-2 md:p-5 h-64 md:h-60 shadow-xl
        md:hover:scale-[1.02] transition-all duration-300">

          <h2 className="text-sm md:text-xl font-bold text-white">
            Expense Distribution
          </h2>

          <p className="text-gray-300 text-sm mb-3">
            Percentage spent in each category.
          </p>

        <div className="h-40 md:h-36">
            <PieChartGraph  Budgets={Budgets}/>
          </div>

        </div>


        {/* Area */}
        <div className="bg-linear-to-br from-[rgba(30,30,40,.95)] to-[rgba(88,28,135,.75)]
        rounded-2xl p-2 md:p-5 h-64 md:h-60 shadow-xl
        md:hover:scale-[1.02] transition-all duration-300">

          <h2 className=" text-sm md:text-xl font-bold text-white">
            Balance Trend
          </h2>

          <p className="text-gray-300 text-sm mb-3">
            Monthly balance changes.
          </p>

         <div className="h-40 md:h-36">
            <AreaGraph  transactions={transactions}/>
          </div>

        </div>


        {/* Composed */}
        <div className="md:col-span-2 bg-linear-to-br
        from-[rgba(30,30,40,.95)]
        to-[rgba(88,28,135,.75)]
        rounded-2xl
       p-2 md:p-5 h-64 md:h-60
        shadow-xl
        md:hover:scale-[1.02]
        transition-all duration-300">

          <h2 className="text-sm md:text-xl font-bold text-white">
            Budget vs Expense
          </h2>

          <p className="text-gray-300 text-sm mb-3">
            Compare monthly budget, expenses and balance.
          </p>

         <div className="h-40 md:h-36">
            <ComposedGraph transactions={transactions}/>
          </div>
        </div>


        {/* Scatter */}
        <div className="bg-linear-to-br
        from-[rgba(30,30,40,.95)]
        to-[rgba(88,28,135,.75)]
        rounded-2xl
        p-2 md:p-5 h-64 md:h-60
        shadow-xl
        md:hover:scale-[1.02]
        transition-all duration-300">

          <h2 className="text-sm md:text-xl font-bold text-white">
            Income vs Expense
          </h2>

          <p className="text-gray-300 text-sm mb-1 md:mb-3">
            Relationship between income and spending.
          </p>
          <div className="h-40 md:h-36">
            <ScatterGraph transactions={transactions} />
          </div>
        </div>


      </div>
    </div>
  );
};

export default Analytics;