'use client';
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WelcomePopUp(){
    const images_d = ['/images/pop-up/2.jpg']
    const images_m = ['/images/pop-up/1.jpg']
    const [showPopUp, setShowPopUp] = useState(false);
    const [mobileView, setMobileView] = useState(() => {
        if(window.innerWidth > 800){
            return false
        } else{
            return true
        }
    });
    useEffect(() => {
        if( images_d.length > 0 && images_m.length > 0){
            setShowPopUp(true)
        }
    },[])

    
    return  showPopUp && (
        <div className="fixed bottom-0 left-0 w-full h-full bg-black/70 z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-6 lg:gap-5 rounded-lg relative">
                <X className="absolute top-2 right-2 bg-black p-1 cursor-pointer rounded-md text-white stroke-[3px]"  onClick={() => setShowPopUp(false)} />
                {
                    mobileView && images_m.map((i,index) => <Image key={index} src={i} className="h-auto w-[95vw] rounded-lg" alt={`Lavish whim - home popup - ${index+1}`} width={700} height={400}/>)
                }
                {
                    !mobileView && images_d.map((i,index) => <Image key={index} src={i} className="w-[75vw] h-auto rounded-lg" alt={`Lavish whim - home popup - ${index+1}`} width={1300} height={800}/>)
                }
                <Link className="text-md bg-white font-bold text-black p-3 rounded-lg " href={'/bags-by-lavish-whim'}>Explore Now</Link>
            </div>
        </div>
    )
}