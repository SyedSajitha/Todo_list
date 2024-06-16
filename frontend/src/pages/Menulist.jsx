import { MenuIcon } from 'lucide-react'
import React from 'react'
import {  Sheet,SheetContent, SheetTrigger } from '../components/shad/ui/sheet'
import Menubar from './Menubar'

const Menulist = () => {
  return (
    <div className='mt-2'>
        <Sheet>
            <SheetTrigger>
                <MenuIcon/>
            </SheetTrigger>
            <SheetContent side='left'>
              <div>
                <Menubar/>
              </div>
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default Menulist