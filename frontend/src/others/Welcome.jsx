import React from 'react'

const Welcome = ({IsLogin,setIsLogin}) => {

  return (
    <div className={`text-white absolute   left-0 top-0  h-[50%] md:h-full flex w-full md:w-[50%] flex-col   items-center justify-center gap-7 p-4 text-sm1 ${IsLogin ? "translate-x-0 md:translate-x-full transition-transform duration-500 ease-in-out" : "translate-x-0"}`}> 
          <h1 className='md:text-6xl  text-center'><b>Welcome!</b></h1>
          <p>To our online banking system <br></br>Avail different services just by one click...</p>
          <button onClick= {()=>{IsLogin ?setIsLogin(false):setIsLogin(true)}} // here needs arrow function so it calls only when click  otherwise updates immediately)
           className='bg-linear-to-r from-orange-500  to-pink-600 p-2  w-[40%] h-10 md:rounded-xl rounded-sm'>{IsLogin ? "Sign Up" :"Login" }</button>
          </div>
        //   onClick={setIsLogin(false)}
        //   setIsLogin(false); // run now
        //  onClick={() => setIsLogin(false)}
  )
}

export default Welcome
