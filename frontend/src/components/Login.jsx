import React from 'react'

const Login = () => {
  return (
    <div className=' w-full h-full text-white   bg-linear-to-r rounded-xl from-pink-300 to-purple-900 flex flex-col items-center justify-center gap-5 text-center'>
        <h1 className='text-2xl'> <b> Login </b></h1>
        <input  className='focus:ring-1 focus:ring-purple-400 border border-gray-300  outline-none w-[70%] h-[12%] p-2  rounded-sm'
        type='email' placeholder='Enter your email' required></input>
        <input className='focus:ring-1 focus:ring-purple-400 border border-gray-300  outline-none  w-[70%] h-[12%] p-2 rounded-sm'
         type='password' placeholder='Enter your password' required></input>
          <button className='bg-linear-to-r from-orange-500  to-pink-600 p-2  md:w-[70%] h-[12%] md:rounded-xl rounded-sm'>Login</button>
    </div>
  )
}

export default Login
