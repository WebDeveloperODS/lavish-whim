'use client'
import React, { useState } from 'react'
import { X } from "lucide-react"
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { colors } from 'app/lib/colors'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const AddProduct = () => {
  const [productData, setProductData] = useState({ title: '', category: '', type:'', price: '', images: [], colors: [], bestSelling: 'false', gender: '', description: '', onSale: 'false', salePrice: '' })
  const [newColor, setNewColor] = useState('')
  const handleFileEntry = (e) => {
    const newFiles = Array.from(e.target.files)
    setProductData(prev => ({ ...prev, images: [...prev.images, ...newFiles] }))
  }

  const removeImage = (index) => {
    setProductData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
  }

  const handleSubmission = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", productData.title)
    formData.append("category", productData.category)
    formData.append("price", productData.price)
    productData.images.forEach(file => formData.append("images[]", file))

    const res = await fetch(process.env.NEXT_PUBLIC_IMAGES_UPLOAD_SERVER, { method: "POST", body: formData })
    const data = await res.json()

    const finalProduct = { 
      title: productData.title, 
      price: productData.price, 
      category: productData.category, 
      type: productData.type, 
      images: data, 
      colors: productData.colors, 
      bestSelling: productData.bestSelling, 
      gender: productData.gender,
      status: 'live',
      description: productData.description,
      onSale: productData.onSale,
      salePrice: productData.salePrice,
      dated: new Date(),
      last_updated_on: new Date()
    }
    const check = await fetch('/api/json-data/addition-of-product', { method: 'POST', body: JSON.stringify(finalProduct) }).then(res => res.json())

    if (check === 'Success') {
      alert('Product added successfully!')
      setProductData({ title: '', category: '', type:'', price: '', images: [], colors: [], bestSelling: 'false', gender: '', description: '', onSale: 'false', salePrice: '' })
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'code-block'],
      ['clean']
    ]
  }

  return (
    <div className=''>
      <form className=' border border-neutral-100 flex flex-col grid grid-cols-2 gap-5 bg-neutral-100 p-6 rounded-md shadow-md' onSubmit={handleSubmission}>
        {/* Product Title */}
        <div className='flex flex-col gap-1'>
          <label htmlFor='title'>Product Title</label>
          <input id='title' type='text' required className='border rounded px-2 py-1' value={productData.title} onChange={e => setProductData(prev => ({ ...prev, title: e.target.value }))} />
        </div>

        {/* Category */}
        <div className='flex flex-col gap-1'>
          <label>Category</label>
          <select className='border rounded px-2 py-1' required value={productData.category} onChange={e => setProductData(prev => ({ ...prev, category: e.target.value }))}>
            <option value=''>Select category</option>
            <option value='jewellery-set'>Jewellery Set</option>
            <option value='bags'>Bags</option>
          </select>
        </div>
        
        {
          productData.category === 'bags' ? <div className='flex flex-col gap-1'>
          <label>Bag Type</label>
          <select className='border rounded px-2 py-1' required value={productData.type} onChange={e => setProductData(prev => ({ ...prev, type: e.target.value }))}>
            <option value=''>Select bag type</option>
            <option value='handbag'>Handbag</option>
            <option value='crossbody-bag'>Crossbody bag</option>
            <option value='tote-bag'>Tote bag</option>
            <option value='shoulder-bag'>Shoulder bag</option>
            <option value='canvas-bag'>Canvas bag</option>
            <option value='bridal-bag'>Bridal bag</option>
            <option value='handmade-crochet-bags'>Handmade crochet bag</option>
          </select>
        </div> : productData.category === 'jewellery' ? <div className='flex flex-col gap-1'>
          <label>Jewellery Type</label>
          <select className='border rounded px-2 py-1' required value={productData.type} onChange={e => setProductData(prev => ({ ...prev, type: e.target.value }))}>
            <option value=''>Select jewellery type</option>
            <option value='jewellery-sets'>Jewellery Sets</option>
            <option value='earings'>Earings</option>
            <option value='pendants'>Pendants</option>
            <option value='rings'>Rings</option>
            <option value='bracelets-and-bangles'>Bracelets & bangles</option>
          </select>
        </div> : null
        }

        {/* Price */}
        <div className='flex flex-col gap-1'>
          <label>Product Price</label>
          <input type='number' required className='border rounded px-2 py-1' value={productData.price} onChange={e => setProductData(prev => ({ ...prev, price: e.target.value }))} />
        </div>

        {/* Sale */}
        <div className='flex flex-col gap-1'>
          <label>Is product having any sale?</label>
          <div className='flex items-center gap-6 w-full bg-white px-2 py-1 rounded border'>
            <label className='cursor-pointer flex items-center gap-1'><input required type='radio' name='onSale' checked={productData.onSale === 'true'} onChange={() => setProductData(prev => ({ ...prev, onSale: 'true' }))} /> Yes</label>
            <label className='cursor-pointer flex items-center gap-1'><input required type='radio' name='onSale' checked={productData.onSale === 'false'} onChange={() => setProductData(prev => ({ ...prev, onSale: 'false' }))} /> No</label>
          </div>
        </div>
        
        {/* On Sale */}
        <div className='flex flex-col gap-1'>
          <label>On Sale Price</label>
          <input type='number' required={productData.onSale === 'true' ? true: false} className='border rounded px-2 py-1' value={productData.salePrice} onChange={e => setProductData(prev => ({ ...prev, salePrice: e.target.value }))} />
        </div>

        {/* Best Selling */}
        <div className='flex flex-col gap-1'>
          <label>Is it best selling?</label>
          <div className='flex items-center gap-6 w-full bg-white px-2 py-1 rounded border'>
            <label className='cursor-pointer flex items-center gap-1'><input type='radio' name='bestSelling' checked={productData.bestSelling === 'true'} onChange={() => setProductData(prev => ({ ...prev, bestSelling: 'true' }))} /> Yes</label>
            <label className='cursor-pointer flex items-center gap-1'><input type='radio' name='bestSelling' checked={productData.bestSelling === 'false'} onChange={() => setProductData(prev => ({ ...prev, bestSelling: 'false' }))} /> No</label>
          </div>
        </div>

        {/* Gender */}
        <div className='flex flex-col gap-1'>
          <label>Target Gender</label>
          <select id='gender' name='gender' required className='border rounded px-2 py-1' value={productData.gender} onChange={e => setProductData(prev => ({ ...prev, gender: e.target.value }))}>
            <option value=''>Select target gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>
        {/* Product Colors */}
        <div className='flex flex-col col-span-full'>
          <label className='font-medium mb-2'>Product Colors</label>
          <div className='border p-4 rounded-md bg-neutral-100 hover:bg-neutral-200'>
            {productData.colors.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-3'>
                {productData.colors.map((color, index) => (
                  <div key={index} className='flex items-center gap-2 bg-white border rounded-full px-3 py-1 shadow-sm'>
                    {
                      colors.find(c => c.name.toLowerCase() === color.toLowerCase()) && <div className='w-5 h-5 rounded-full border' style={{ backgroundColor: colors.find(c => c.name.toLowerCase() === color.toLowerCase())?.hex }}></div> 
                    }
                    <span className='text-sm capitalize text-gray-700'>  {colors.find(c => c.name.toLowerCase() === color.toLowerCase())?.name || color}</span>
                    <button type='button' onClick={() => setProductData(prev => ({ ...prev, colors: prev.colors.filter((_, i) => i !== index) }))} className='text-red-500 hover:text-red-700 text-xs'>✕</button>
                  </div>
                ))}
              </div>
            )}
            <div className='flex gap-2'>
              <input type='text' placeholder='Enter color name or hex code' required={productData.colors.length === 0} value={newColor} onChange={e => setNewColor(e.target.value)} className='border rounded-md px-3 py-1 flex-1 outline-none focus:ring-2 focus:ring-blue-300' />
              <button type='button' onClick={() => { if (!newColor.trim()) return; setProductData(prev => ({ ...prev, colors: [...prev.colors, newColor.trim()] })); setNewColor('') }} className='bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600'>Add</button>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className='flex flex-col col-span-full' >
          <label className='font-medium mb-2'>Description</label>
          <ReactQuill theme='snow' required value={productData.description} className='pb-10 bg-white' onChange={(value) => setProductData((prev) => ({ ...prev, description: value }))} modules={modules} placeholder='Write detailed product description here...'/>
        </div>
        {/* Images */}
        <div className='flex flex-col gap-1 col-span-full'>
          <label>Product Images</label>
          <div className='border p-4 rounded-md bg-white hover:bg-neutral-100'>
            {productData.images.length > 0 ? (
              <div className='flex flex-col gap-2'>
                <div className='grid grid-cols-7 gap-2'>
                  {productData.images.map((image, index) => (
                    <div key={index} className='relative w-full h-24'>
                      <img src={URL.createObjectURL(image)} alt='preview' className='w-full h-full object-cover rounded-md' />
                      <button type='button' className='absolute top-1 right-1 bg-white rounded-full p-1 shadow' onClick={() => removeImage(index)}>
                        <X className='w-4 h-4 text-red-600' />
                      </button>
                    </div>
                  ))}
                </div>
                <label htmlFor='images' className='cursor-pointer text-blue-600 underline text-sm'>+ Add More Images</label>
              </div>
            ) : (
              <label htmlFor='images' className='cursor-pointer text-gray-600 font-medium'>+ Add Images</label>
            )}
            <input id='images' type='file' name='images' required multiple hidden onChange={handleFileEntry} accept='image/png, image/jpeg, image/jpg' />
          </div>
        </div>
        <div className='col-span-full flex justify-center items-center '>
            <button type='submit' className='bg-black w-fit mx-auto hover:bg-gray-900 text-white px-3 py-2 rounded font-medium'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
