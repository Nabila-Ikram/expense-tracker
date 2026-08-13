import React, { useState } from 'react'
import { API_URL } from "../../api";


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const inputClass=`focus:ring-1 focus:ring-purple-400
   border border-gray-300  outline-none 
   w-full max-w-md h-12 p-2 rounded-sm md:rounded-xl`

   async function submitHandler(e){
    e.preventDefault();
    try{
    const response=await fetch(`${ API_URL }/account`,{
      method:'POST',
      headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
      body :JSON.stringify({
        owner_name:name,
        email,
        password,

      })
    })
     const data = await response.json();

if (response.ok) {
 alert("Account created successfully");
  setEmail('')
  setPassword('')
  setName('')


} else {
  alert(data.error);
}


  }catch(error){
    console.error("Signup error:", error);
   alert("Unable to connect to the server.");

  }
     
}
  return (
    <form  onSubmit={submitHandler}
    className=' w-full h-full text-white bg-linear-to-r rounded-xl from-pink-300 to-purple-900 flex flex-col p-5 items-center justify-center gap-5 text-center'>
        <h1 className='text-xl md:text-2xl'> <b>Sign Up </b></h1>

        <input 
         value={name} onChange={(e)=>{
           setName(e.target.value)
        }}
         className={inputClass} type='text' placeholder='Enter your name' required></input>
        <input  value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }}
          className={inputClass}
        type='email' placeholder='Enter your email' required></input>
        <input  value={password} onChange={(e)=>{
           setPassword(e.target.value)
        }}
         className={inputClass}
         type='password' placeholder='Enter your password' required></input>

          <button type='submit'
           className='bg-linear-to-r from-orange-500  to-pink-600 text-center w-full max-w-md h-12 md:rounded-xl rounded-sm'>Sign Up</button>
    </form>
  )
}

export default Signup
