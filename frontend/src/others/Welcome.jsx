import React from 'react'

const Welcome = ({IsLogin,setIsLogin}) => {

  return (
    <div className={`text-white w-[50%]  absolute left-0  h-full flex flex-col   items-center justify-center gap-7 p-4 text-sm1 ${IsLogin ? "translate-x-full" : "translate-x-0"}`}> 
          <h1 className='md:text-6xl  text-center'><b>Welcome!</b></h1>
          <p>To our online banking system <br></br>Avail different services just by one click...</p>
          <button onClick= {()=>{IsLogin ?setIsLogin(false):setIsLogin(true)}} // here needs arrow function so it calls only when click  otherwise updates immediately)
           className='bg-linear-to-r from-orange-500  to-pink-600 p-2  md:w-[40%] h[8%] md:rounded-xl rounded-sm'>{IsLogin ? "Sign Up" :"Login" }</button>
          </div>
        //   onClick={setIsLogin(false)}
        //   setIsLogin(false); // run now
        //  onClick={() => setIsLogin(false)}
  )
}

export default Welcome
