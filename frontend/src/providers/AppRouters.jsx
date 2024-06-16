import React from 'react'
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom'
import Listoftodo from "./components/menubars/Listoftodo.jsx"
import Calender from './components/menubars/Calender.jsx'
import Stickynotes from './components/menubars/Stickynotes.jsx'
import Dailydairy from './components/menubars/Dailydairy.jsx'
import Homemenu from './components/menubars/Homemenu.jsx'

const App = () => {
  return (
    <>
    
    <BrowserRouter>
    
    <Routes>
      <Route path='/homemenu' element={<Homemenu/>}/>
      <Route path='/listoftodo' element={<Listoftodo/>}/>
      <Route path='/calender' element={<Calender/>}/>
      <Route path='/stickynotes' element={<Stickynotes/>}/>
      <Route path='/dailydairy' element={<Dailydairy/>}/>  
    </Routes>
 

   

    </BrowserRouter>

      </>
  )
}

export default App