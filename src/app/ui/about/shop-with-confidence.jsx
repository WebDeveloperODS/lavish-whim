import Image from "next/image";
import SectionHead2 from "../components/heading-two";
import Link from "next/link";

export default function ShopWithConfidence(){
      return ( 
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full my-10 lg:my-8">
            <Image className="w-full lg:w-[40vw] h-[30vh] rounded-xl shadow-md object-cover object-center object-fixed" alt="Our Vision - About Lavish Whim" width={800} height={800} src={'/images/about-us/6.jpg'}/>
            <div className="w-full h-auto justify-center flex flex-col gap-3 lg:gap-6 lg:py-5">
                  <SectionHead2 className={'font-bold tracking-wide italic underline underline-offset-4 decoration-2 decoration-red-700'}>Shop With Confidence</SectionHead2>
                  <p className="text-md lg:text-lg tracking-wide">
                        As a leading <b>Pakistani online brand</b>, we are committed to providing a transparent, secure, and rewarding <b>online shopping experience.</b> Discover the latest trends and invest in lasting style—only at Lavish Whim.
                  </p>
                  <Link className="text-sm lg:text-md border-2 border-black w-fit px-4 py-2 rounded-sm font-bold tracking-wide transition-all ease-in-out duration-400 hover:scale-[1.02] hover:text-white hover:bg-black" href={'/bags-by-lavish-whim'}>Shop Now</Link>
            </div>
      </div> 
      )
}