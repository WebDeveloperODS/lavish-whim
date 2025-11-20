'use client'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React from 'react'

const PortalHeader = () => {
      const signOutFunction = async () =>{
            await signOut({callbackUrl: '/portal'})
      }
      return (
            <div className='sticky top-0 bg-white z-[100] flex items-center justify-end px-2 py-auto border-b border-black/50 min-h-12 h-12 max-h-12 '>                
                  <button onClick={signOutFunction} className={`flex items-center gap-2 py-1 px-2 rounded-md text-white text-sm  font-bold bg-red-800 transition-all ease-in-out duration-300 hover:scale-[1.03]`}>Sign Out <LogOut className='stroke-2 h-5 w-auto' /></button>
            </div>
      )
}

export default PortalHeader