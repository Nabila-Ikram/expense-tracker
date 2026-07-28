import React, { use, useState } from 'react'
const Login = () => {
const [email, setemail] = useState('')
const [password, setpassword] = useState('')
const [loggedInUser, setloggedInUser] = useState(null)

 async function submitHandler(e){
e.preventDefault();
// fetch is js function whccih send http request
//means react is sending req to login
//await means:
//"Wait here until Flask replies
const response=await fetch("http://127.0.0.1:5000/login",{
  method:'POST' ,// need bcz default is GET
  //Headers are extra information sent with the request.
headers:{
    "Content-Type":"application/json" //Without this header, Flask may not recognise the body as JSON, so:
// request.get_json() may return None.
},
body: JSON.stringify({ //This is the actual data you're sending.
  //But HTTP requests can't send JavaScript objects directly.
  //converts the object into a JSON string.
    email,
    password
    //data = request.get_json()
//Flask converts the JSON string back into a Python dictionary.
})
})
const data = await response.json();
if(response.ok)
{
  setloggedInUser(data)
localStorage.setItem('loggedInUser',JSON.stringify(data))
}

else
  console.log(data.error); // if login fails dont save the info to local storage (error is property)
  
//response.json() reads the body and converts it into a JavaScript object
// response = the entire HTTP response (status, headers, body).
//await response.json() = extracts just the JSON body and turns it into a JavaScript object you can use.

setemail('')
setpassword('')
}
  return (
    <>
     <form className=' w-full h-full text-white   bg-linear-to-r rounded-xl from-pink-300 to-purple-900 flex flex-col items-center justify-center gap-5 text-center'
      onSubmit={(e)=>{
      submitHandler(e)
    }}>
        <h1 className='text-2xl'> <b> Login </b></h1>
        <input  value={email} onChange={(e)=>{
          setemail(e.target.value)
        }}
        className='focus:ring-1 focus:ring-purple-400 border border-gray-300  outline-none w-[70%] h-[12%] p-2  rounded-sm'
        type='email' placeholder='Enter your email' required></input>
        <input  value={password} onChange={(e)=>{
           setpassword(e.target.value)
        }}
        className='focus:ring-1 focus:ring-purple-400 border border-gray-300  outline-none  w-[70%] h-[12%] p-2 rounded-sm'
         type='password' placeholder='Enter your password' required></input>
          <button type='submit'
           className='bg-linear-to-r from-orange-500  to-pink-600 p-2  md:w-[70%] h-[12%] md:rounded-xl rounded-sm'>Login</button>
           </form>
    </>
  )
}

export default Login
