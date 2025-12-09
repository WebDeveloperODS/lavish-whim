'use client'
import { Oval } from "react-loader-spinner";

export default function Loading(){
      return <div className="w-full h-[70vh] flex flex-col justify-center items-center gap-4">
            <Oval 
                  visible={true}
                  height="40"
                  width="40"
                  color="#D4AF37"
                  secondaryColor="#F5DEB3"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  strokeWidth={3}
                  strokeWidthSecondary={3}
            />
            <h3 className="text-md uppercase tracking-wide font-bold">Searching stock...</h3>
      </div>
}