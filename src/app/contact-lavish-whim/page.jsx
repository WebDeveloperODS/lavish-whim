'use client'
import SectionHead1 from "app/ui/components/main-heading";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { PiEnvelopeDuotone, PiPhoneCallDuotone } from "react-icons/pi";
import { TiSocialAtCircular } from "react-icons/ti";

export default function Page(){
      const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  contactNumber: formData.get('contact-number'),
                  message: formData.get('message'),
            };
            console.log('Form Data Submitted:', data);
            // Here you can add further processing like sending data to a server
      }
      return(
            <div className="container py-6 lg:pt-14">
                  <div className="grid grid-cols-1 gap-6 lg:gap-0 lg:grid-cols-[65%_35%]">
                        <div className="">
                              <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                                    <SectionHead1 className={'font-semibold italic underline underline-offset-4'} >Contact Us</SectionHead1>
                                    <div className="flex flex-col gap-1">
                                          <label htmlFor="name">Name</label>
                                          <input type="text" id="name" name="name" placeholder="Enter your full name" className="border border-neutral-400 rounded-md px-3 py-2" required/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                          <label htmlFor="email">Email</label>
                                          <input type="email" id="email" name="email" placeholder="Enter your email" className="border border-neutral-400 rounded-md px-3 py-2" required/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                          <label htmlFor="contact-number">Contact Number</label>
                                          <input type="text" id="contact-number" name="contact-number" placeholder="Enter your contact number" className="border border-neutral-400 rounded-md px-3 py-2" required/>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                          <label htmlFor="message">Message</label>
                                          <textarea rows={3} id="message" name="message" placeholder="Enter your message" className="border border-neutral-400 rounded-md px-3 py-2" required/>
                                    </div>
                                    <button type="submit" className="w-fit bg-black text-white py-2 px-5 rounded-sm hover:bg-white hover:text-black border border-black transition-all ease-in-out duration-300">Submit</button>
                              </form>
                        </div>
                        <div className="flex flex-col gap-10 lg:px-8 justify-center">
                              <div className="flex flex-col items-start gap-2 w-full p-4 border border-neutral-200 shadow-md shadow-black/10 rounded-md">
                                    <PiPhoneCallDuotone className="h-8 w-auto text-red-700" />
                                    <h3 className="text-lg font-bold underline underline-offset-2 decoration-red-700">Phone</h3>
                                    <h4 className="text-sm tracking-wide">You can reach us at the following phone number for any inquiries or assistance:</h4>
                                    <h4 className="text-lg tracking-wide font-bold">(+92) 327 4952566</h4>
                              </div>
                              <div className="flex flex-col items-start gap-2 w-full p-4 border border-neutral-200 shadow-md shadow-black/10 rounded-md">
                                    <PiEnvelopeDuotone className="h-8 w-auto text-red-700" />
                                    <h3 className="text-lg font-bold underline underline-offset-2 decoration-red-700">E-Mail</h3>
                                    <h4 className="text-sm tracking-wide">
                                          For any questions or support, feel free to email us at:
                                    </h4>
                                    <h4 className="text-lg tracking-wide font-bold">
                                          lavishwhim@gmail.com
                                    </h4>
                              </div>
                              <div className="flex flex-col items-start gap-2 w-full p-4 border border-neutral-200 shadow-md shadow-black/10 rounded-md">
                                    <TiSocialAtCircular className="h-8 w-auto text-red-700" />
                                    <h3 className="text-lg font-bold underline underline-offset-2 decoration-red-700">Follow Us At</h3>
                                    <h4 className="text-sm tracking-wide">For getting updated about the promotions, deals and sales follow us on:</h4>
                                    <div className="flex gap-3">
                                          <Link className="p-1 border-2 border-red-700 rounded-md" href={'https://www.facebook.com/share/p/18ftHFuCrH/'}><FaFacebook onClick={() => router} className="w-5 h-auto text-red-700"/> </Link>
                                          <Link className="p-1 border-2 border-red-700 rounded-md" href={'https://www.instagram.com/lavishwhim?igsh=NzhjN3J1eDRubm44'}><FaInstagram className="w-5 h-auto text-red-700"/> </Link>
                                          <Link className="p-1 border-2 border-red-700 rounded-md" href={'https://www.tiktok.com/@lavishwhim.com?_t=ZS-8zub8ARmxuL&_r=1'}><FaTiktok className="w-5 h-auto text-red-700"/></Link>
                                    </div>
                                    
                              </div>
                        </div>
                  </div>
            </div>
      )
}