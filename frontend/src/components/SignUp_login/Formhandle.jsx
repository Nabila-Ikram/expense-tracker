import React, { useState } from 'react'
import Welcome from '../../others/Welcome'
import Signup from './Signup'
import Login from './Login'

const Formhandle = () => {
const [IsLogin, setIsLogin] = useState(false)
  return (
  <div className='  flex flex-col md:flex-row  items-center  relative justify-center  h-[90%] md:h-3/4 w-[90%] md:w-2/3 bg-none border border-fuchsia-300 rounded-xl '>
    {/* // making parent for welcome(child) so that browser not automatically asume webpage as parent
    // position: relative makes the parent the reference point for its absolutely positioned children.
    // absolute t lets you move an element anywhere inside its parent without Flexbox trying to keep it in place.
    // The element leaves the normal layout (Flexbox or normal document flow no longer controls its position). */}
{/* It looks for the nearest parent with position: relative (or absolute/fixed) and uses that parent as its reference. */}
      <Welcome   IsLogin={IsLogin} setIsLogin={setIsLogin}/>
       <div className= {`
w-[80%] md:w-[45%]
h-[55%] md:h-[70%]
transition-transform duration-500 ease-in-out
absolute inset-x-0 mx-auto
md:inset-x-auto
md:right-4 md:mx-0 p-2 
md:top-[15%] top-5

${IsLogin 
? "translate-y-[70%] md:translate-y-0 md:translate-x-[-115%]" 
: "translate-y-[70%] md:translate-y-0"
}
` }>
  
          {/* no horizontal  movement on mobile(stay centered)  just on big screens*/}
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
