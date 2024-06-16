import { Button } from '@/components/shad/ui/button'

import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Menubar =()=>{
  const [searchTerm , setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const filteredButtons =[
   {label : 'Home', variant:'outline' , path:"/" },
   {label : 'List of ToDo', variant:'outline', path:"/listoftodo" },
   {label : 'Calender', variant:'outline' , path : '/calender'},
   {label : 'Sticky Notes', variant:'outline' , path: '/stickynotes'},
   {label : 'Daily Dairy', variant:'outline', path: '/dailydairy' },
  ].filter((button) =>
    button.label.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className='flex flex-col justify-content space-between relative my-10 mx-10 gap-4'>
         <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-pink-500 focus:ring-pink-500 focus:ring-1 sm:text-sm  dark:bg-black"
         type='text'
         placeholder='Search for buttons.....'
         value={searchTerm}
         onChange={(e)=> setSearchTerm(e.target.value)} />
         {filteredButtons.length > 0 ?(
         filteredButtons.map((button)=>(
          <Button  key={button.label} variant={button.variant} className= "dark:bg-black"
          onClick={()=> navigate(button.path)}>
            {button.label} 
          </Button>
         ))
        ) : (
          <div>No Results Found </div>
        )}
        </div>
  )
}

export default Menubar
        

       {/* <Button variant='outline' >Home</Button>
        <Button variant='outline' >List of ToDo</Button>
        <Button variant='outline'>Calender</Button>
        <Button variant='outline'>Sticky Notes</Button>
  <Button variant='outline'>Daily Dairy</Button>*/}
        