import React, { useContext,useState,useEffect } from 'react'
import { API_URL } from "../../api";
import  { NotificationContext } from "../../context/NotificationProvider";
const GoalsForm = ({ongoalAdded,goal}) => {
  const { addNotification } = useContext(NotificationContext);
 const [Title, setTitle] = useState('')
 const [Target, setTarget] = useState('')
 const [Saved, setSaved] = useState('')
 const [Date, setDate] = useState('')
 const inputClass=`flex-1 focus:ring-1
  focus:ring-purple-400 
  border border-gray-300 
  outline-none p-2 rounded-sm resize-none`

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
 if (!loggedInUser) {
  alert("Please login again.");
  return;
}

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
      `${API_URL}/accounts/${loggedInUser.email}/goals/${goal.goal_id}`,
    
    {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "ngrok-skip-browser-warning": "true"
      },
      body:JSON.stringify(goalData)
    }
    )

 }
 else{

    response = await fetch(
    `${ API_URL }/goals`,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "ngrok-skip-browser-warning": "true"
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
    
  addNotification(
    `Goal ${goal ? "updated" : "added"} successfully`,
    "success"
  );

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
    <form  onSubmit={submitHandler}
    
    className='flex flex-col gap-3 w-full shadow-2xl rounded-xl md:rounded-2xl backdrop-blur-md 
    border border-white  p-3 bg-white/20' >


        <div className=' flex   flex-col md:flex-row   gap-2 md:gap-4  p-2 md:p-5'>

            <div className='flex-1 flex flex-col'>
            <label htmlFor="title">Title</label>
        <input onChange={(e)=>{
          setTitle(e.target.value)
        }} value={Title}
        
         type='text' required placeholder='Enter title' className={inputClass}></input>
        </div>


              <div className='flex flex-1 flex-col'>
        <label htmlFor="target">Target</label>
        <input onChange={(e)=>{
          setTarget(e.target.value)
        }} value={Target}
        type='number' min={0} step={0.05} placeholder='target'  required className={inputClass}></input>
        </div>

        </div>
        <div className=' flex flex-col md:flex-row  gap-2 md:gap-4 p-5'>

            <div className='flex flex-1 flex-col  '>
            <label htmlFor="saved">Saved</label>
        <input onChange={(e)=>{
          setSaved(e.target.value)
        }} value={Saved}
        
        type='number'  required placeholder='saved' min={0} step={0.05} className={inputClass}></input>
        </div>



        <div className='flex flex-1 flex-col'>
        <label htmlFor="date">Date</label>
        <input  onChange={(e)=>{
          setDate(e.target.value)
        }} value={Date}
        type='date' required
       className={inputClass}></input>
        </div>
        </div>


<div className="flex justify-center mt-2 md:mt-4 ">
  <button
    type="submit"
    className="w-full sm:w-60 h-10 rounded-md hover:opacity-90 
    bg-linear-to-r from-orange-500 to-pink-600
               text-white font-semibold
               shadow-lg shadow-pink-500/20
               transition-all duration-200
               hover:from-orange-600 hover:to-pink-700
               hover:shadow-xl hover:shadow-pink-500/30
               focus:outline-none focus:ring-2
               focus:ring-pink-400 focus:ring-offset-2"
  >
    { goal? "Update Goal":"Save Goal"}
  </button>
</div>

      
        </form>
        
  )
}

export default GoalsForm