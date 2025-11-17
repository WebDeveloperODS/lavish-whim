'use client'
import { Menu } from "app/lib/menu-items";
import { ChevronRight } from "lucide-react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { PiEnvelopeDuotone, PiPhoneCallDuotone } from "react-icons/pi";

export default function SideMenu() {
      const pathname = usePathname()
      const searchParams = useSearchParams();
      const category = searchParams.get('category');
      const [showMenu, setShowMenu] = useState(false);      
      const [childsCalled, setChildsCalled] = useState(-1);      
      return (
            <>
                  <HiMenuAlt2 onClick={() => setShowMenu(true)} className="h-7 w-7 cursor-pointer text-black "/>
                  <div className={`fixed top-0 left-0 w-full h-full bg-black/30 z-50 transition-all ease-in-out duration-300 ${showMenu ? 'translate-x-0':'-translate-x-full'}`}>
                        <div className={`w-[86%] relative p-6 h-full bg-white transition-all ease-in-out delay-100 duration-700 ${showMenu ? 'translate-x-0':'-translate-x-full'} `}>
                              <X className="absolute top-2 right-2 bg-black p-1 rounded-md text-white stroke-[3px]" onClick={() => setShowMenu(false)}/>
                              <div className="flex flex-col items-center h-full">
                                    <Image src={'/images/logo.png'} className="w-32 h-auto" width={500} height={300} alt="Lavish whim - mobile side menu"/>
                                    <div className="w-full flex flex-col gap-3 mt-10 max-h-[70%] h-[70%] overflow-y-auto">
                                          {
                                                Menu.map((item,index) => item.childs ? <div className="" key={index}>
                                                      <button onClick={() => {
                                                            if(childsCalled === index) { 
                                                                  setChildsCalled(-1)
                                                            } else {
                                                                  setChildsCalled(index)
                                                            }
                                                      }} className={`flex justify-between items-center text-md  capitalize tracking-wide w-full border-b  px-2 py-1 ${childsCalled === index || category ? 'font-bold border-neutral-800':'font-semibold border-neutral-200'}`}>{item.title} <ChevronRight className={`w-5 h-auto ${childsCalled === index ? 'rotate-90 stroke-[3px]' :  category ? 'rotate-180 stroke-[3px]' :'stroke-[2px]'}`}/></button>
                                                      <div className={`ml-2 flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${childsCalled === index ? 'max-h-96 mt-2': 'max-h-0'}`}>
                                                            {
                                                                  item.childs.map((child, index_2) => <Link onClick={() => {setChildsCalled(-1), setShowMenu(false)}} className={`flex justify-between items-center text-sm capitalize tracking-wide w-full border-b px-2 py-1 ${category === child.title ? 'font-bold border-neutral-800':'font-semibold border-neutral-200'}`} href={child.link} key={index_2}>
                                                                        {child.title.replace('-', ' ')} <ChevronRight className={`w-5 h-auto ${category === child.title ? 'rotate-180 stroke-[3px]' : 'stroke-[2px]'}`}/>
                                                                  </Link> )
                                                            }  
                                                      </div>
                                                </div> : <Link className={`flex justify-between items-center text-md capitalize tracking-wide w-full border-b px-2 py-1 ${pathname === item.link ? 'font-bold border-neutral-800':'font-semibold border-neutral-200'}`} href={item.link} key={index}>
                                                      {item.title} <ChevronRight className={`w-5 h-auto ${pathname === item.link ? 'rotate-180 stroke-[3px]' : 'stroke-[2px]'}`}/>
                                                </Link>)
                                          }
                                    </div>
                                    <div className="flex flex-col w-full items-center  gap-3 px-2">
                                          <h4 className="flex items-center gap-2 text-sm tracking-wide border-b border-black px-1 pb-1">
                                                <PiPhoneCallDuotone className="w-5 h-auto"/> (+92) 327 4952566
                                          </h4>
                                          <h4 className="flex items-center gap-2 text-sm tracking-wide border-b border-black px-1 pb-1">
                                                <PiEnvelopeDuotone className="w-5 h-auto"/> lavishwhim@gmail.com</h4>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      )     
}