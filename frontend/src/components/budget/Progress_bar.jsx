import { use } from 'react'

const Progress_bar = ({id,title,spent,budget,percentage,showDelete,onDelete}) => {
    const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'))
  const email=loggedInUser.email
async  function deleteReq(){

  try{
  const response= await fetch(`http://127.0.0.1:5000/accounts/${email}/budgets/${id}`,
    {
    method:"DELETE"
    }
  )
  const data=await response.json()
    if (response.ok) {
    onDelete(id);
  } else {
    alert(data.error);
  }
}catch(error){
   alert(error.message);
}
}
  
  
  return (
    <div className='  flex flex-col p-5 m-5 gap-2 '>
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
{showDelete &&
<button onClick={deleteReq}
className="bg-gray-500/60 rounded-md p-2 text-sm flex-1 w-full mt-2 hover:bg-red-800 " >Delete Budget</button>}
</div>
  )
}

export default Progress_bar