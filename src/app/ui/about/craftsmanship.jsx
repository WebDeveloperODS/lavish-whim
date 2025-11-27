import Image from "next/image";
import SectionHead2 from "../components/heading-two";
import Link from "next/link";

export default function CraftsmanshipWithConfidence(){
      return ( 
      <div className="flex gap-10 w-full my-8">
            <div className="w-full h-auto justify-center flex flex-col gap-3 lg:gap-6 lg:py-5">
                  <SectionHead2 className={'font-bold tracking-wide italic underline underline-offset-4 decoration-2 decoration-red-700'}>Craftsmanship & Quality Assurance</SectionHead2>
                  <p className="text-md lg:text-lg tracking-wide">
                        We focus intensely on <b className="capitalize">quality craftsmanship</b>, partnering with skilled local artisans who utilize the finest materials. Whether it's a meticulously stitched handbag or a perfectly tailored apparel piece, every <b>Lavish Whim</b> item is a testament to luxury and durability.
                  </p>
                  <Link className="border-2 border-black w-fit px-4 py-2 rounded-sms font-bold tracking-wide transition-all ease-in-out duration-400 hover:scale-[1.02] hover:text-white hover:bg-black " href={'/bags-by-lavish-whim'}>Shop Now</Link>
            </div>
            <Image className="w-[40vw] h-[30vh] rounded-xl shadow-md object-cover object-center object-fixed" alt="Our Vision - About Lavish Whim" width={800} height={800} src={'/images/about-us/4.jpg'}/>
      </div> 
      )
}