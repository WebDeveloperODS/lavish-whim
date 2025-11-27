import Image from "next/image";
import SectionHead1 from "../components/main-heading";

export default function AboutIntro(){
      return(
            <div className="flex flex-col w-full py-8">
                  <img className="object-cover object-center w-full h-[65vh] rounded-xl shadow-md" src={'/images/about-us/1.jpg'} alt="About Lavish Whim - 1"/>
                  <div className="flex flex-col gap-3 justify-center items-center mt-8 lg:mt-12">
                        <SectionHead1 className={'font-bold text-center uppercase tracking-wider underline underline-offset-4 decoration-3 decoration-red-700'}>The Home of Quality Pakistani Fashion</SectionHead1>
                        <p className="text-md lg:text-lg capitalize tracking-wide text-center"><b>Lavish Whim</b> is a proud Pakistani brand, your dedicated <b>online shopping destination</b> for premium accessories and contemporary <b>Pakistani fashion.</b> We blend exquisite craftsmanship with modern aesthetics to bring you products that define effortless style.</p>
                  </div>
            </div>
      )
}