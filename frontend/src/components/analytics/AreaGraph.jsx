
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

const AreaGraph = ({transactions}) => {
  
  
  const TotalExpense=transactions.reduce((acc,curr)=>{
  if(curr.transaction_type=="expense"){
      return acc+curr.amount
  }
  return acc
  },0)
   const TotalIncome=
  transactions.reduce((acc,curr)=>{
  if(curr.transaction_type=="income"){
      return acc+curr.amount
  }
  return acc
  },0)
  // starting value of acc
  
  const balance=TotalIncome - TotalExpense

const monthlyBalance = {};

const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
];

transactions.forEach((curr) => {
  const date = new Date(curr.iso_date);
    const month = date.getMonth();
    const monthName = months[month];

    if (!monthlyBalance[monthName]) {
        monthlyBalance[monthName] = 0;
    }

    if (curr.transaction_type === "income") {
        monthlyBalance[monthName] += curr.amount;
    } else if (curr.transaction_type === "expense") {
        monthlyBalance[monthName] -= curr.amount;
    }
});

const AreaChartData = months
  .filter((month) => monthlyBalance[month] !== undefined)
  .map((month) => ({
    month,
    balance: monthlyBalance[month]
  }));

  return (
     <div className='h-full w-full '>
          <ResponsiveContainer>
            <AreaChart data={AreaChartData}>
            <CartesianGrid strokeDasharray="3 3" />

    <XAxis dataKey="month" />

    <YAxis />

    <Tooltip />

    <Legend />

    <Area
      type="monotone"
      dataKey="balance"
      stroke="#9B59B6"
      fill="#9B59B6"
    />
            </AreaChart>
            </ResponsiveContainer>
            </div>
  )
}

export default AreaGraph