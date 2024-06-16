import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import './authanimate.css'

const Authentication = () => {
  return (
    <div>
<div>
  <body>
   <div className="wrapper">
    <h2>Animated Background</h2>
    <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
   </div>
</body>
        </div>
    <div className='h-screen flex flex-col items-center justify-center'>
        <SignIn/>
    </div>
    </div>
  )
}
export default Authentication