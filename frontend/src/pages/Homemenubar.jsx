import React, { useEffect, useState } from 'react'
import { Button } from '../components/shad/ui/button'

const Homemenubar = () => {
  const [theme, setTheme] = useState('light')
 
  useEffect(()=>{
  if (theme === "dark"){
    document.documentElement.classList.add("dark");
  } else{
    document.documentElement.classList.remove("dark")
  }
  }, [theme]);
  const handleThemeSwitch =()=>{
setTheme(theme === "dark" ? "light" : "dark");
  };
  

  return (
    <div className='flex flex-row   dark:bg-black ' >
     {/*} <Button variant='link'></Button> */}
     
      <Button variant='link' className='font-bold text-xl'>Home</Button> 
      <Button variant='link' className='font-bold text-xl'>About Us</Button> 
      <Button variant='link' className='font-bold text-xl' onClick={handleThemeSwitch}>Theme</Button> 
      <Button variant='link' className='font-bold text-xl'>Logout</Button>
      
    </div>
  )
}

export default Homemenubar