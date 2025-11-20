'use client'
import SectionHead2 from "app/ui/components/heading-two";
import ListView from "app/ui/components/portal/products/list-view";
import { useState } from "react";

export default function Page(){
      const [category, setCategory] = useState('');
      const [status, setStatus] = useState('');
      const [saleStatus, setSaleStatus] = useState('');
      
      return(
            <div className="max-w-full">
                  <div className="flex items-center justify-between mb-3">
                        <SectionHead2 className={'font-bold tracking-wide underline underline-offset-3 decoration-2 decoration-red-700'}>All Listed Products</SectionHead2>
                        <div className="flex items-center gap-3">
                              
                              <select name="saleStatus" value={saleStatus} className="px-2 py-1 rounded-full text-sm bg-gray-100" onChange={(e)  => setSaleStatus(e.target.value)}>
                                    <option value=''>Sale Status</option>
                                    <option value='true'>Yes</option>
                                    <option value='false'>No</option>
                              </select>
                              <select name="status" value={status} className="w-[100px] px-2 py-1 rounded-full text-sm bg-gray-100" onChange={(e)  => setStatus(e.target.value)}>
                                    <option value=''>Status</option>
                                    <option value='live'>Live</option>
                                    <option value='not-live'>Not live</option>
                              </select>
                              <select name="category" value={category} className="px-2 py-1 rounded-full text-sm bg-gray-100" onChange={(e)  => setCategory(e.target.value)}>
                                    <option value=''>All Categories</option>
                                    <option value='handbag'>Handbags</option>
                                    <option value='crossbody-bag'>Crossbody Bags</option>
                                    <option value='tote-bag'>Tote bags</option>
                                    <option value='shoulder-bag'>Shoulder bags</option>
                                    <option value='canvas-bag'>Canvas bags</option>
                                    <option value='bridal-bag'>Bridal bags</option>
                              </select>
                        </div>
                  </div>
                  <ListView selectedCategory={category}/>
            </div>
      )
}