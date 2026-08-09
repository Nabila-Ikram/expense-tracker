import React, { useState,useEffect } from 'react'
import { use } from 'react'

const GoalsForm = ({ongoalAdded,goal}) => {
 const [Title, setTitle] = useState('')
 const [Target, setTarget] = useState('')
 const [Saved, setSaved] = useState('')
 const [Date, setDate] = useState('')

 useEffect(() => {
    if(goal){
        setTitle(goal.title);
        setTarget(goal.target);
        setSaved(goal.saved);
        setDate(goal.iso_date);
    }
},[goal]);

   async function submitHandler(e){
 e.preventDefault()

 try {

 const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

 const goalData={
      email:loggedInUser.email,
      title:Title,
      target:Number(Target),
      saved:Number(Saved),
      date:Date
 }


 let response;


 if(goal){

    response = await fetch(
    `http://127.0.0.1:5000/accounts/${loggedInUser.email}/goals/${goal.goal_id}`,
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(goalData)
    }
    )

 }
 else{

    response = await fetch(
    "http://127.0.0.1:5000/goals",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(goalData)
    }
    )

 }


 const data=await response.json();


 if(response.ok){

    alert(
      goal 
      ? "Goal Updated Successfully!"
      : "Goal Added Successfully!"
    );

    setTitle("")
    setTarget("")
    setSaved("")
    setDate("")

    ongoalAdded()

 }

 else{
    alert(data.error)
 }


 }catch(error){
    console.log(error)
    alert("Something went wrong")
 }

}

  return (
    <form  onSubmit={(e)=>{
      submitHandler(e)

    }}
    
    className='flex flex-col gap-3 w-full shadow-2xl rounded-xl md:rounded-2xl backdrop-blur-md 
    border border-white  p-3 bg-white/20' >


        <div className=' flex   flex-col md:flex-row   gap-2 md:gap-4  p-2 md:p-5'>

            <div className='flex-1 flex flex-col'>
            <label htmlFor="title">Title</label>
        <input onChange={(e)=>{
          setTitle(e.target.value)
        }} value={Title}
        
         type='text' placeholder='Enter title' className='flex-1 focus:ring-1 focus:ring-purple-400 border border-gray-300 outline-none p-2 rounded-sm resize-none '></input>
        </div>


              <div className='flex flex-1 flex-col'>
        <label htmlFor="target">Target</label>
        <input onChange={(e)=>{
          setTarget(e.target.value)
        }} value={Target}
        type='number' min={0} step={0.05} placeholder='target' className='flex-1 focus:ring-1 focus:ring-purple-400 border border-gray-300 outline-none p-2 rounded-sm resize-none '></input>
        </div>

        </div>
        <div className=' flex flex-col md:flex-row  gap-2 md:gap-4 p-5'>

            <div className='flex flex-1 flex-col  '>
            <label htmlFor="saved">Saved</label>
        <input onChange={(e)=>{
          setSaved(e.target.value)
        }} value={Saved}
        
        type='number' placeholder='saved' min={0} step={0.05} className='flex-1 focus:ring-1 focus:ring-purple-400 border border-gray-300 outline-none p-2 rounded-sm resize-none'></input>
        </div>



          <div className='flex flex-1 flex-col'>
        <label htmlFor="date">Date</label>
        <input  onChange={(e)=>{
          setDate(e.target.value)
        }} value={Date}
        type='date'
         className='flex-1 focus:ring-1 focus:ring-purple-400 border border-gray-300 outline-none p-2 rounded-sm resize-none'></input>
        </div>
        </div>


<div className="flex justify-center mt-2 md:mt-4 ">
  <button
    type="submit"
    className="w-full sm:w-60 h-10 rounded-md bg-linear-to-r from-orange-500 to-pink-600 hover:opacity-90 transition"
  >
    { goal? "Update Goal":"Save Goal"}
  </button>
</div>

      
        </form>
        
  )
}

export default GoalsForm