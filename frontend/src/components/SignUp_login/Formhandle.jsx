import React, { useState } from 'react'
import Welcome from '../../others/Welcome'
import Signup from './Signup'
import Login from './Login'

const Formhandle = () => {
const [IsLogin, setIsLogin] = useState(false)
  return (
  <div className=' flex items-center  relative justify-center h-3/4  w-2/3  bg-none border border-fuchsia-300 rounded-xl '>
    {/* // making parent for welcome(child) so that browser not automatically asume webpage as parent
    // position: relative makes the parent the reference point for its absolutely positioned children.
    // absolute t lets you move an element anywhere inside its parent without Flexbox trying to keep it in place.
    // The element leaves the normal layout (Flexbox or normal document flow no longer controls its position). */}
It looks for the nearest parent with position: relative (or absolute/fixed) and uses that parent as its reference.
      <Welcome   IsLogin={IsLogin} setIsLogin={setIsLogin}/>

        <div className= {`w-[40%] h-[70%]   absolute right-0 p-2 mr-4  ${IsLogin ? "-translate-x-115" : "translate-x-0"}`}>
         {IsLogin? <Login /> : <Signup/>}      
     </div>


     {/* : 
     welcome moves from left to right  and form container moves from right to left
     using - for backward direction */}

{/* For translateX(%) 
The percentage is based on the element's own width, not its parent's width. 
// left/right changes the element's actual position in the layout.
// translateX() only moves where the element is DRAWN (visually).
// The original position is preserved, so removing translateX() returns it back.*/}
        
      </div>

  )
}

export default Formhandle
