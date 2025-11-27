'use client'
import { useState } from "react";
import SectionHead1 from "../components/main-heading";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";

export default function FAQs(){
      const faqsList =[
            {
                  question: 'Are there any hidden charges when I shop online?',
                  answer: <>No. The price you see is the final price, including the shipping fee, which is waived for All type of orders. We ensure <b>transparent online pricing.</b></>
            },
            {
                  question: 'How long will it take to get my order in Pakistan?',
                  answer: <>Our fast delivery Pakistan service aims to get your product to you within <b>3–5 working days.</b></>
            },
            {
                  question: 'Can I cancel a Lavish Whim online order?',
                  answer: <>Yes, you can cancel if the request is made <b>within 24 hours</b> of placing the order and <b>before the item is processed for shipping.</b></>
            },
            {
                  question: 'What is your return policy for online purchases?',
                  answer: <>We offer an easy <b>14-day return and exchange policy.</b> Items must be unused, with all original tags attached. For details, see our full Return Policy.</>
            },
            {
                  question: 'How quickly will I receive my refund/store credit?',
                  answer: <>Once your return is received and inspected (usually <b>3–5 days</b>), a refund or store credit will be issued. Bank refunds typically take <b>2–10 business days</b> to appear on your statement.</>
            },
      ]

      const [activeNo, setActiveNo] = useState(-1);

      return <div className="flex flex-col items-center gap-2 mt-14 lg:mt-20">
            <SectionHead1 className={'font-bold uppercase tracking-wider underline underline-offset-4 decoration-3 decoration-red-700'}>Frequently Asked Questions (FAQs)</SectionHead1>
            <h3 className="text-md lg:text-lg tracking-wide capitalize font-semibold">Find quick answers to common queries about Lavish Whim online orders, returns, and delivery in Pakistan.</h3>
            <div className="mt-6 flex flex-col gap-4">
                  {
                        faqsList.map((faq,index) => 
                              <div key={index} className="border border-neutral-300 rounded-xl overflow-hidden bg-white shadow-sm">
                                    <div 
                                          onClick={() => setActiveNo(activeNo === index ? -1 : index)}
                                          className="flex items-center justify-between p-5 lg:p-6 cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors duration-200"
                                    >
                                          <h3 className="text-md lg:text-lg font-semibold tracking-wide pr-8">{faq.question}</h3>
                                          {activeNo === index ? 
                                                <ChevronUp className="w-6 h-6 stroke-[2.5] text-red-700"/> : 
                                                <ChevronDown className="w-6 h-6 stroke-[2.5] text-neutral-600"/>
                                          }
                                    </div>
                                    <div className={`grid transition-all duration-500 ease-in-out ${activeNo === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                          <div className="overflow-hidden">
                                                <div className="p-5 lg:p-6 pt-2 text-neutral-700 text-md lg:text-lg tracking-wide leading-relaxed">
                                                      {faq.answer}
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        )
                  }
            </div>
      </div>
}