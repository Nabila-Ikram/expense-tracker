import React, { useState } from 'react'
const Signup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [name, setname] = useState('')

   async function submitHandler(e){
    e.preventDefault();
    const response=await fetch("http://127.0.0.1:5000/account",{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body :JSON.stringify({
        owner_name:name,
        email,
        password,

      })
    })
     const data = await response.json();
     

       setemail('')
      setpassword('')
      setname('')
}
  return (
    <form  onSubmit={(e)=>{
      submitHandler(e) 
    }}
    className=' w-full h-full text-white  absolute right-0 bg-linear-to-r rounded-xl from-pink-300 to-purple-900 flex flex-col items-center justify-center gap-5 text-center'>
        <h1 className='text-2xl'> <b>Sign Up </b></h1>

        <input 
         value={name} onChange={(e)=>{
           setname(e.target.value)
        }}
         className='focus:ring-1 focus:ring-purple-400 outline-none w-[70%] h-[12%] p-2 border border-gray-300 rounded-sm' type='text' placeholder='Enter your name' required></input>
        <input  value={email} onChange={(e)=>{
          setemail(e.target.value)
        }}
        className='focus:ring-1 focus:ring-purple-400 outline-none border border-gray-300  w-[70%] h-[12%] p-2  rounded-sm'
        type='email' placeholder='Enter your email' required></input>
        <input  value={password} onChange={(e)=>{
           setpassword(e.target.value)
        }}
        className='focus:ring-1 focus:ring-purple-400 border border-gray-300  outline-none  w-[70%] h-[12%] p-2 rounded-sm'
         type='password' placeholder='Enter your password' required></input>
          <button type='submit'
           className='bg-linear-to-r from-orange-500  to-pink-600 text-center md:w-[70%] h-[12%] md:rounded-xl rounded-sm'>Sign Up</button>
    </form>
  )
}

export default Signup
