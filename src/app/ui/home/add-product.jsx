'use client'
import React, { useState } from 'react'
import { X } from "lucide-react"

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: '',
    category: '',
    price: '',
    images: []
  })

  // ✅ Append new selected images (don’t overwrite previous ones)
  const handleFileEntry = (e) => {
    const newFiles = Array.from(e.target.files)

    setProductData(prev => ({
      ...prev,
      images: [...prev.images, ...newFiles] // append
    }))
  }

  // ✅ Remove specific image
  const removeImage = (index) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmission = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", productData.title)
    formData.append("category", productData.category)
    formData.append("price", productData.price)

    productData.images.forEach((file) => {
      formData.append("images[]", file)
    })

    const res = await fetch(process.env.NEXT_PUBLIC_IMAGES_UPLOAD_SERVER, {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    console.log("Upload Response:", data)
    const finaledProduct = {
      title: productData.title,
      price: productData.price,
      category: productData.category,
      images: data,
    }
    const check = await fetch('/api/json-data/addition-of-product',{
      method:'POST',
      body: JSON.stringify(finaledProduct),
    }).then(res => res.json())
    if(check.ok){
      alert(check)
    }
}

  return (
    <div>
      <form className='w-80 flex flex-col gap-5' onSubmit={handleSubmission}>

        {/* PRODUCT TITLE */}
        <div className='flex flex-col gap-1'>
          <label htmlFor='title'>Product Title</label>
          <input
            type="text"
            className="border"
            value={productData.title}
            onChange={e => setProductData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        {/* CATEGORY */}
        <div className='flex flex-col gap-1'>
          <label>Category</label>
          <select
            className="border"
            value={productData.category}
            onChange={e => setProductData(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">Select category</option>
            <option value="jewellery-set">jewellery set</option>
            <option value="bags">bags</option>
            <option value="earings">earings</option>
            <option value="pendants">pendants</option>
            <option value="rings">rings</option>
            <option value="bracelets-&-bangles">bracelets & bangles</option>
          </select>
        </div>

        {/* PRICE */}
        <div className='flex flex-col gap-1'>
          <label>Product price</label>
          <input
            type="text"
            className="border"
            value={productData.price}
            onChange={e => setProductData(prev => ({ ...prev, price: e.target.value }))}
          />
        </div>

        {/* IMAGES */}
        <div className='flex flex-col'>
          <label htmlFor='images' className='cursor-pointer border p-4 rounded-md bg-neutral-100 hover:bg-neutral-200 relative'>
            {productData.images.length > 0 ? (
              <div className='flex flex-col gap-2'>
                <div className='grid grid-cols-2 gap-2'>
                  {productData.images.map((image, index) => (
                    <div key={index} className="relative w-full h-24">
                      <img
                        src={URL.createObjectURL(image)}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                        onClick={() => removeImage(index)}
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>

                <span className='text-blue-600 underline text-sm'>
                  + Add More Images
                </span>
              </div>
            ) : (
              <span className='text-gray-600 font-medium'>+ Add Images</span>
            )}

            <input
              type="file"
              id="images"
              name='images'
              multiple
              hidden
              onChange={handleFileEntry}
              accept="image/png, image/jpeg, image/jpg"
            />
          </label>
        </div>

        <button type="submit" className='bg-black text-white py-2 rounded'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddProduct
