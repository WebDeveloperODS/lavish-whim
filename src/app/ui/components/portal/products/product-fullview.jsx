'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import { AiTwotoneDelete } from "react-icons/ai";
function formatPKR(num) {
  return new Intl.NumberFormat('en-PK', { style: 'decimal', minimumFractionDigits: 0 }).format(num);
}
export default function ProductDetails({product_id}){
      const [product, setProduct] = useState({})
      const [editing, setEditing] = useState(false)
      const getProduct = async() => {
            const response = await fetch('/api/json-data/get-product',{
                  method:'PUT',
                  body: JSON.stringify({product_id})
            })
            const data = await response.json()
            setProduct(data)
      }
      useEffect(() => {
            getProduct()
      },[])
      return (
            <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-full flex flex-col gap-2 bg-gray-100 p-4 rounded-md">
                        <h3 className="col-span-full tracking-wide capitalize underline underline-offset-3 decoration-2 decoration-red-700 font-semibold">Product images</h3>
                        <div className="grid grid-cols-7 gap-y-6">
                              {
                                    product.images && product.images.map((image,index) => <div className="relative w-36 h-36">
                                          <Image className="object-cover object-center" key={index} src={image} fill/>
                                          { 
                                                editing && <div className="absolute top-2 right-2 p-[1px] bg-white cursor-pointer">
                                                      <AiTwotoneDelete className="h-4 w-4"/>
                                                </div>
                                          }
                                    </div>)
                              }
                        </div>
                  </div>
                  <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md">
                        <h3 className="col-span-full tracking-wide capitalize underline underline-offset-3 decoration-2 decoration-red-700 font-semibold">Product Title</h3>
                        <input type="text" name="title" id="title" value={product.title} className="w-full p-2 rounded-md bg-white" disabled={!editing ? true : false}/>
                  </div>
                  <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md">
                        <h3 className="col-span-full tracking-wide capitalize underline underline-offset-3 decoration-2 decoration-red-700 font-semibold">Price (PKR)</h3>
                        <input type="text" name="price" id="price" value={String(formatPKR(product.price))} className="w-full p-2 rounded-md bg-white" disabled={!editing ? true : false}/>
                  </div>
            </div>
      )
}