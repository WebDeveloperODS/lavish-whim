'use client'
import { Oval } from "react-loader-spinner";

export default function Loading(){
      return (
            <div className="h-screen w-screen bg-white fixed top-0 left-0 z-[2000] inset-0 flex flex-col items-center justify-center gap-4">
                  <Oval 
                        visible={true}
                        height="60"
                        width="60"
                        color="#D4AF37"
                        secondaryColor="#F5DEB3"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                  />
                  <h3 className="text-md uppercase tracking-wide font-bold">Loading...</h3>
            </div>
      )
}