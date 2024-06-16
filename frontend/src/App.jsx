import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Authentication from "./components/Authentication.jsx";
import Home from "./pages/Home.jsx"
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Listoftodo from "./components/menubars/Listoftodo.jsx"
import Calender from './components/menubars/Calender.jsx'
import Stickynotes from './components/menubars/Stickynotes.jsx'
import Dailydairy from './components/menubars/DiaryEntry.jsx'
import Menubar from "./pages/Menubar.jsx";
 
export default function App() {
  return (
    
       <BrowserRouter>
      <SignedOut>
        <Authentication/>
      </SignedOut>
      <SignedIn >
        {/* <Home/> */}
      {/* </SignedIn> */}
      
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/listoftodo' element={<Listoftodo/>}/>
      <Route path='/calender' element={<Calender/>}/>
      <Route path='/stickynotes' element={<Stickynotes/>}/>
      <Route path='/dailydairy' element={<Dailydairy/>}/>  
      <Route path='/menubar' element={<Menubar/>}/>
    </Routes>
    </SignedIn>
      </BrowserRouter>

  )
}