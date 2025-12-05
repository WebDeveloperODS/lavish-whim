'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SearchSection from './search-section';
import CartButton from './cart-button';
import { Menu } from '@/app/lib/menu-items';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import SideMenu from './side-menu';
import { ChevronDown } from 'lucide-react';

const Header = () => {
      const pathname = usePathname()
      const router = useRouter()
      const [onPortal, setOnPortal] = useState(false)
      const [forDrop, setForDrop] = useState(-1)
      useEffect(() => {
            if(pathname.startsWith('/portal/dashboard')){
                  setOnPortal(true)
            }else {
                  setOnPortal(false)
            }
      },[pathname])
      return (
            <div className={onPortal ? 'hidden' : `flex flex-col relative w-full border-b shadow-sm shadow-neutral-100`}>
                  
                  <div className='flex items-center justify-center bg-black w-full'>
                        <div className='container capitalize hidden lg:grid items-center grid-cols-1 lg:grid-cols-3 text-white py-1 text-xs lg:text-sm'>
                              <h3 className='hidden lg:block tracking-wider font-poppins text-start'>Welcome to <b>Lavish Whim</b></h3>
                              <h3 className='tracking-wider font-poppins'><Link className='underline' href={'https://chat.whatsapp.com/BbDKVESs8p6E39fn0n8o6V?mode=hqrc'}>Join Us On WhatsApp</Link> and get 10% Off on your next order.</h3>
                              <h3 className='capitalize text-right mx-auto lg:mr-0'>Free delivery all over the Pakistan</h3>
                        </div>
                        <div className='block lg:hidden lg:container py-1 bg-black text-white text-xs lg:text-sm overflow-hidden'>
                              <div className='flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]'>
                                    <div className='flex items-center gap-16 mx-4'>
                                          <h3 className='capitalize'>Pakistan's best online jewelry store, offering premium quality</h3>
                                          <h3 className='font-bold tracking-wider font-poppins'><Link className='underline' href={'https://chat.whatsapp.com/BbDKVESs8p6E39fn0n8o6V?mode=hqrc'}>Join Us On WhatsApp</Link> and get 10% Off on your next order.</h3>
                                          <h3 className='capitalize'>Minimum Order Required of Rs.1,399</h3>
                                    </div>
                                    <div className='flex items-center gap-16 mx-4' aria-hidden="true">
                                          <h3 className='capitalize'>Pakistan's best online jewelry store, offering premium quality</h3>
                                          <h3 className='font-bold tracking-wider font-poppins'><Link href={'https://chat.whatsapp.com/BbDKVESs8p6E39fn0n8o6V?mode=hqrc'}>Join Us On WhatsApp</Link> and get 10% Off on your next order.</h3>
                                          <h3 className='capitalize'>Minimum Order Required of Rs.1,399</h3>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className={`relative flex flex-col container`}>
                        <div className='grid grid-cols-3 items-center py-2 w-full'>
                              {
                                    window.innerWidth > 999 && <SearchSection /> 
                              }
                              {
                                    window.innerWidth <= 999 && <><SideMenu /></>
                              }
                              <Image onClick={() => router.replace('/')} src='/images/logo.png' priority className='h-[6rem] cursor-pointer w-auto mx-auto' height={500} width={500} alt='Lavish Whim - Logo'/>
                              <CartButton />
                        </div>
                        <div className='hidden lg:flex items-center justify-center gap-12 w-full my-2'>
                              {
                                    Menu.map((item, index) => item.childs || item.image ? <div key={index} className='relative'>
                                          <Link href={item.link} className={`capitalize tracking-wide font-bold px-1 flex items-center gap-2 ${item.link === '' ? 'cursor-not-allowed': 'cursor-pointer'} text-black hover:text-red-700`} onMouseEnter={() => setForDrop(index)}>{item.title} <ChevronDown className='w-5 h-auto stroke-[2.4px]' /></Link>
                                          {
                                                forDrop === index && <div onMouseLeave={() => setForDrop(-1)} className='absolute -left-10 top-8 shadow-md shadow-black/60 border-8 rounded-lg left-0 bg-neutral-50 shadow-lg border w-[500px] grid grid-cols-2 z-50'>
                                                      <div className=''>
                                                            <Image src={item.image} className='w-auto h-full' width={200} height={200}/>
                                                      </div>
                                                      <div className='flex flex-col justify-center p-4 gap-3'>
                                                            {
                                                                  item.childs && item.childs.map((child, cIndex) => <Link key={cIndex} className='capitalize tracking-wide font-medium px-1 hover:underline decoration-red-700 underline-offset-4' href={child.link}>{child.title.replaceAll('-',' ')}</Link>)
                                                            }
                                                            {
                                                                  item.context && <h3>{item.context}</h3>
                                                            }
                                                      </div>
                                                </div>
                                          }
                                    </div> : <Link className='capitalize tracking-wide font-bold px-1 hover:text-red-700' onMouseEnter={() => setForDrop(-1)} href={item.link} key={index}>{item.title}</Link>) 
                              }
                        </div>
                  </div>
            </div>
      )
}

export default Header