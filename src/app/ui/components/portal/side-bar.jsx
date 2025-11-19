'use client'
import { PortalMenu } from 'app/lib/portal-menu'
import { ChevronRight } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = ({menuCall}) => {
      const pathname = usePathname()
      const signOutFunction = async () =>{
            await signOut({callbackUrl: '/portal'})
      }
      return (
            <div className='h-screen w-auto border-r border-black/50 p-4 relative flex flex-col gap-6'>
                  {

                  }
                  <Image className={`${menuCall ? "w-32" : 'w-8'} h-auto mx-auto`} src={'/images/logo.png'} width={200} height={200} alt='Lavish Whim - Portal Icon'/>
                  <div className='flex flex-col gap-1'>
                        {
                              PortalMenu.map((item, index) => <Link key={index} className={`relative flex items-center gap-2 rounded-lg ${menuCall ? 'text-sm' : 'text-lg'} transition-color ease-in-out duration-400 p-2 ${pathname === item.link ? 'bg-gray-300': 'hover:bg-gray-300'}`} href={item.link}>
                                    {item.icon} {
                                          menuCall ? item.title : null
                                    } {
                                          menuCall === true && pathname === item.link ? <ChevronRight className='w-auto h-5 absolute right-1' /> : null
                                    }
                              </Link>)
                        }
                  </div>
                  <button onClick={signOutFunction} className='absolute bottom-3 rounded-md text-white text-md font-b/old px-4 py-2 bg-red-800 transition-all ease-in-out duration-300 hover:scale-[1.03]'>Sign Out</button>
            </div>
      )
}

export default SideBar