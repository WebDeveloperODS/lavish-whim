'use client'
import { bagsTypes } from "app/lib/product-categories";
import SectionHead1 from "../components/main-heading";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function CategoriesList(){
      const [hoverCall, setHoverCall] = useState(-1)
      return(
            <div className="container flex flex-col items-center gap-8 justify-center">
                  <SectionHead1 className='font-bold uppercase tracking-wider underline underline-offset-4 decoration-3 decoration-red-700'>Types Of Bags We Provide</SectionHead1>                  
                  <div className="w-full grid grid-cols-1 lg:flex lg:flex-wrap gap-4 lg:gap-8 lg:justify-center">
                        {
                              bagsTypes.map((bag,index)=> <div className="flex lg:w-[15vw] 2xl:w-[17vw] flex-col items-center gap-3 border pb-3" key={index}>
                                    <div className="h-[16rem] lg:h-[21rem] w-full relative" onMouseEnter={() => setHoverCall(index)} onMouseLeave={() => setHoverCall(-1)}>
                                          <Image className="w-full h-full object-center border-b object-cover" src={`${bag.image}`} width={500} height={500} alt={`${bag.title} - Bag - By Lavish Whim`} />
                                          {
                                                hoverCall === index ? <div className="absolute inset-0 z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black/40">
                                                      <Link href={bag.link} className="px-5 font-bold italic py-2 bg-white rounded-full">Shop Now</Link>
                                                </div> : null
                                          }
                                    </div>
                                    <h3 className="text-sm lg:text-md 2xl:text-lg uppercase text-center [x-4] tracking-wide">{bag.title.replaceAll('-',' ')}</h3>
                              </div>)
                        }
                  </div>
            </div>
      )
}