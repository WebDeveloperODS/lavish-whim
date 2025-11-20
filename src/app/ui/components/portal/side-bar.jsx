'use client'
import { PortalMenu } from 'app/lib/portal-menu'
import { ArrowLeftFromLineIcon } from 'lucide-react'
import { ArrowRightFromLineIcon } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const SideBar = ({menuCall, setMenuCall}) => {
      const pathname = usePathname()
      const [hoverTitle, setHoverTitle] = useState(-1)
      
      return (
            <div className={`h-screen w-auto border-r border-black/50 relative flex flex-col ${menuCall === true ? 'p-4 gap-6' : 'gap-3 items-center'}`}>
                  {
                        menuCall === true ? <Image className={`w-32 h-auto mx-auto`} src={'/images/logo.png'} width={200} height={200} alt='Lavish Whim - Portal Icon'/> : <h1 className='flex text-center w-full items-center justify-center tracking-wider text-2xl font-bold px-2 py-3 min-h-12 h-12 max-h-12 border-b border-black/50'>L.W</h1>
                  } 
                  
                  <div className={`flex flex-col gap-1 ${menuCall === false ? 'px-5 w-full': ''}`}>
                        {
                              PortalMenu.map((item, index) => <Link  onMouseLeave={() => setHoverTitle(-1)} onMouseEnter={() => setHoverTitle(index)} key={index} className={`relative flex items-center gap-2 rounded-lg ${menuCall ? 'text-sm' : 'text-lg'} transition-all ease-in-out duration-400 p-2 ${pathname === item.link ? 'bg-gray-300': 'hover:bg-gray-300'}`} href={item.link}>
                                    <div className={menuCall === false ? 'w-full relative object-cover': 'w-5 h-5'}>
                                          {item.icon}
                                    </div>
                                    {
                                          !menuCall && hoverTitle === index && <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-medium px-3 py-2 rounded-md whitespace-nowrap z-50 shadow-lg">
                                                {item.title}
                                          </div> 
                                    } 
                                    {
                                          menuCall ? item.title : null
                                    } 
                                    {
                                          menuCall === true && pathname === item.link ? <ChevronRight className='w-auto h-5 absolute right-1' /> : null
                                    }
                              </Link>)
                        }
                  </div>
                  <button onClick={
                        () => {
                              if(menuCall === true) { 
                                    setMenuCall(false)
                              } else{
                                    setMenuCall(true)
                              }
                        }
                  } className={`absolute flex items-center gap-2 bottom-3 rounded-md text-white text-md font-bold bg-red-800 transition-all ease-in-out duration-300 hover:scale-[1.03] ${!menuCall ? 'p-2': 'px-4 py-2 '}`}>{menuCall ? <><ArrowLeftFromLineIcon className='stroke-2 h-5 w-auto'/> Close</> : <ArrowRightFromLineIcon className='stroke-2 h-5 w-auto' />}</button>
            </div>
      )
}

export default SideBar