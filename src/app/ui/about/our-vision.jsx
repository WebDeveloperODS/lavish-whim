import Image from "next/image";
import SectionHead2 from "../components/heading-two";
import Link from "next/link";

export default function OurVision(){
      return ( 
      <div className="flex gap-10 w-full my-8">
            <Image className="w-[40vw] h-[30vh] rounded-xl shadow-md object-cover object-center" alt="Our Vision - About Lavish Whim" width={800} height={800} src={'/images/about-us/3.jpg'}/>
            <div className="w-full h-auto flex flex-col justify-center gap-3 lg:gap-6 lg:py-5">
                  <SectionHead2 className={'font-bold tracking-wide italic underline underline-offset-4 decoration-2 decoration-red-700'}>Our Vision</SectionHead2>
                  <p className="text-md lg:text-lg tracking-wide">
                        <b>Lavish Whim</b> was created with a mission to showcase the exceptional quality and artistry found within Pakistan. We are not just an <b>online clothing store</b>; weare curators of high-quality fashion that stands the test of time.
                  </p>
                  <Link className="border-2 border-black w-fit px-4 py-2 rounded-sm font-bold tracking-wide transition-all ease-in-out duration-400 hover:scale-[1.02] hover:text-white hover:bg-black" href={'/bags-by-lavish-whim'}>Explore Our Products</Link>
            </div>
      </div> 
      )
}