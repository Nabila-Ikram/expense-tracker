import { use } from 'react'

const Progress_bar = ({title,spent,budget,percentage}) => {
  return (
    <div className=' text-white flex flex-col p-5 m-5 gap-2 '>
        <h1  className="text-2xl font-bold mt-1">{title}</h1>
<h1  className="font-bold mt-1">Spent: $ {spent} &nbsp;&nbsp; Budget: ${budget}</h1>
    <div className="flex items-center gap-3">
    <div className="w-[90%] h-3 bg-gray-700 rounded-full">
         <div
            className="h-full bg-purple-500 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
    </div>

    <span className="font-semibold">{percentage}%</span>
</div>
</div>
  )
}

export default Progress_bar