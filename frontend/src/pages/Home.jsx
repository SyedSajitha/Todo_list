import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import homeback from '../images/homeback.jpg'
import Homemenubar from './Homemenubar'
import Menulist from './Menulist'

 
const Home = () => {
  return (
    
    <div className=' relative h-screen bg-black'>
      
     <img src={homeback} alt='homeback' className='w-full h-full object-cover '/>
      
      <div className=' flex justify-between space-x-2 absolute top-3 left-6  dark:bg-black'>
      
      <Menulist/>
       <Homemenubar/>
      <UserButton className='absolute '></UserButton>
     
      </div>
 
        
     </div>
  )
}

export default Home