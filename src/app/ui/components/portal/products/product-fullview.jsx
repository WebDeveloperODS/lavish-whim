'use client';

import { bagsTypes } from 'app/lib/product-categories';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function formatPKR(num) {
      if (!num) return '';
      return new Intl.NumberFormat('en-PK', {
      style: 'decimal',
      minimumFractionDigits: 0,
      }).format(num);
}

export default function ProductDetails({ product_id }) {
      const [newImages, setNewImages]  = useState([])
      const [product, setProduct] = useState({
            title: '',
            price: 0,
            salePrice: 0,
            description: '',
            images: [],
            colors: [],
            category: '',
            type: '',
            onSale: false,
            bestSelling: false,
            status: 'not-live',
            gender: 'female',
      });
      const [originalProduct, setOriginalProduct] = useState(null);
      const [productColors, setProductColors] = useState([]);
      const [newColor, setNewColor] = useState('');
      const [editing, setEditing] = useState(false);
      const [loading, setLoading] = useState(true);
      const [deleting, setDeleting] = useState(false);
      const [saving, setSaving] = useState(false);
      const [error, setError] = useState('');

      const modules = {
            toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'code-block'],
                  ['clean'],
            ],
      };

      const getProduct = async () => {
            try {
                  setLoading(true);
                  const response = await fetch('/api/json-data/get-product', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ product_id }),
                  });

                  if (!response.ok) throw new Error('Failed to fetch product');
                  const data = await response.json();
                  const normalized = {
                        ...data,
                        onSale: data.onSale === true || data.onSale === 'true',
                        bestSelling: data.bestSelling === true || data.bestSelling === 'true',
                  };

                  setProduct(normalized);
                  setOriginalProduct(normalized);
                  setProductColors(normalized.colors || []);
            } catch (err) {
                  setError(err.message);
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            if (product_id) getProduct();
      }, [product_id]);

      const startEditing = () => {
            setOriginalProduct({ ...product });
            setEditing(true);
      };

      const cancelEditing = () => {
            setProduct(originalProduct);
            setProductColors(originalProduct.colors || []);
            setEditing(false);
      };

      const saveProduct = async () => {
            setSaving(true);
            try {
                  const formData = new FormData()
                  formData.append('product_id', product_id);
                  formData.append('title', product.title);
                  formData.append('colors', productColors);
                  formData.append('price', product.price);
                  formData.append('onSale', product.onSale);
                  formData.append('salePrice', product.salePrice);
                  formData.append('category', product.category);
                  formData.append('type', product.type);
                  formData.append('gender', product.gender);
                  formData.append('bestSelling', product.bestSelling);
                  formData.append('status', product.status);
                  formData.append('description', product.description);
                  formData.append('images', newImages);
                  console.log(formData)
                  const payload = {
                        ...product,
                        colors: productColors,
                        price: Number(product.price),
                        salePrice: product.onSale ? Number(product.salePrice || 0) : 0,
                  };

                  const res = await fetch('/api/json-data/updation-of-product', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ product_id, ...payload }),
                  });

                  if (!res.ok) throw new Error('Failed to update');
                        setEditing(false);
                  await getProduct();
            } catch (err) {
                  alert('Save failed: ' + err.message);
            } finally {
                  setSaving(false);
            }
      };

      const removeColor = (index) => {
            setProductColors((prev) => prev.filter((_, i) => i !== index));
      };

      const addColor = () => {
            if (!newColor.trim()) return;
            setProductColors((prev) => [...prev, newColor.trim()]);
            setNewColor('');
      };

      const handleFileEntry = (e) => {
            const newFiles = Array.from(e.target.files)
            console.log(newFiles)
            setNewImages((prev) => ([...prev, ...newFiles]))
      }

      const removeImage = (index) => {
            console.log(index)
            setProduct(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
      }

      const deleteProduct = async() => {
            setDeleting(true)
            const res = await fetch('/api/json-data/deletion-of-product', {
                  method: 'DELETE',headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({product_id})
            })
            const output = await res.json()
            if(output.status ===200){
                  setDeleting(false)
                  window.location.href = '/portal/dashboard/products-list'
            }
      }

      if (loading) return <div className="p-8 text-center">Loading product...</div>;
      if (error) return <div className="p-8 text-red-600 text-center">{error}</div>;

      return (
      <div className="grid grid-cols-2 gap-6 p-4">
            <div className="col-span-full flex flex-col gap-4 bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold underline decoration-red-700 underline-offset-4">
                        Product Images
                  </h3>
                  <div className="grid grid-cols-7 gap-6">
                        { product.images.length > 0 ? product.images?.map((img, i) => (
                              <div key={i} className="relative w-36 h-36 bg-white rounded-lg overflow-hidden shadow">
                                    <Image src={img} alt={`${product.title} - image ${i + 1}`} fill className="object-cover" />
                                    {editing && (
                                    <button onClick={()=>removeImage(i)} className="absolute top-2 right-2 bg-white p-1 rounded shadow hover:bg-gray-200">
                                          <AiTwotoneDelete className="w-5 h-5 text-red-600" />
                                    </button>
                                    )}
                              </div>
                        )): 
                        <h3>No Product Image</h3>
                        }
                  </div>
                  {editing && (
                        <>
                              <label htmlFor='images' className='cursor-pointer text-blue-600 text-sm underline font-bold'>+ Add Images</label>
                              <input id='images' type='file' name='images' required multiple hidden onChange={handleFileEntry} accept='image/png, image/jpeg, image/jpg' />
                        </>
                  )}
            </div>

            {/* Colors */}
            <div className="col-span-full bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold underline decoration-red-700 underline-offset-4 mb-4">
                        Colors
                  </h3>
                  <div className="bg-white p-4 rounded-lg">
                        <div className="flex flex-wrap gap-3 mb-4">
                              {productColors.map((color, i) => (
                              <div key={i} className="flex items-center gap-2 bg-gray-50 border rounded-full px-4 py-2">
                              <div className="w-6 h-6 rounded-full border-2 border-gray-300" style={{ backgroundColor: color }} />
                                    <span className="capitalize">{color}</span>
                                    {editing && (
                                          <button onClick={() => removeColor(i)} className="text-red-500 hover:text-red-700 ml-2" >
                                          ✕
                                          </button>
                                    )}
                              </div>
                              ))}
                        </div>

                        {editing && (
                              <div className="flex gap-3">
                              <input type="text" placeholder="e.g. #ff0000 or red" value={newColor} onChange={(e) => setNewColor(e.target.value)} className="flex-1 border rounded px-3 py-2" onKeyDown={(e) => e.key === 'Enter' && addColor()} />
                                    <button onClick={addColor} className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700" >
                                          Add Color
                                    </button>
                              </div>
                        )}
                  </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold underline decoration-red-700 underline-offset-4 mb-3">
                        Product Title
                  </h3>
                  <input type="text" value={product.title || ''} onChange={(e) => setProduct((p) => ({ ...p, title: e.target.value }))} disabled={!editing} className="w-full p-3 border rounded bg-white disabled:bg-gray-50" />
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold underline decoration-red-700 underline-offset-4 mb-3">
                        Price (PKR)
                  </h3>
                  <input type="text" value={product.price || ''} onChange={(e) => setProduct((p) => ({ ...p, price: Number(e.target.value) }))} disabled={!editing} className="w-full p-3 border rounded bg-white disabled:bg-gray-50" placeholder="0" />
                  <p className="text-sm text-gray-600 mt-1">{formatPKR(product.price)}</p>
            </div>

            <div className="col-span-full bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold underline decoration-red-700 underline-offset-4 mb-4">
                        Description
                  </h3>
                  {editing ? (
                        <ReactQuill theme="snow" value={product.description || ''} onChange={(val) => setProduct((p) => ({ ...p, description: val }))} modules={modules} className="bg-white"/>
                  ) : (
                        <div className="prose prose-sm max-w-none bg-white p-4 rounded border min-h-32" dangerouslySetInnerHTML={{ __html: product.description || '<p>No description</p>',}} />
                  )}
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold underline decoration-red-700 underline-offset-4 mb-3">
                        On Discount?
                  </h3>
                  <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                              <input type="radio" checked={product.onSale === true} onChange={() => setProduct((p) => ({ ...p, onSale: true }))} disabled={!editing} />
                              Yes
                        </label>
                        <label className="flex items-center gap-2">
                              <input type="radio" checked={product.onSale === false} onChange={() => setProduct((p) => ({ ...p, onSale: false }))} disabled={!editing} />
                              No
                        </label>
                  </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold underline decoration-red-700 underline-offset-4 mb-3">
                        Discounted Price (PKR)
                  </h3>
                  <input type="text" value={product.onSale ? product.salePrice || '' : ''} placeholder='----' onChange={(e) => setProduct((p) => ({ ...p, salePrice: Number(e.target.value) || 0 }))} disabled={!editing || !product.onSale} className="w-full p-3 border rounded bg-white disabled:bg-gray-50" />
                  {product.onSale && <p className="text-sm text-gray-600 mt-1">{formatPKR(product.salePrice)}</p>}
            </div>

            {/* Category & Type */}
            <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold underline decoration-red-700 underline-offset-4 mb-3">
                        Category
                  </h3>
                  <select value={product.category || ''} onChange={(e) => setProduct((p) => ({ ...p, category: e.target.value, type: '' }))} disabled={!editing} className="w-full p-3 border rounded bg-white" >
                        <option value="">Select category</option>
                        <option value="bags">Bags</option>
                        <option value="jewellery">Jewellery</option>
                  </select>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold underline decoration-red-700 underline-offset-4 mb-3">
                        Product Type
                  </h3>
                  <select value={product.type || ''} onChange={(e) => setProduct((p) => ({ ...p, type: e.target.value }))} disabled={!editing || !product.category} className="w-full p-3 border rounded bg-white capitalize" >
                        <option value="">Select type</option>
                        {product.category === 'bags' &&
                              bagsTypes.map((bag) => (
                              <option key={bag.title} value={bag.title}>
                                    {bag.title.replaceAll('-',' ')}
                              </option>
                        ))}
                  </select>
            </div>

            {/* Best Selling, Status, Gender */}
            {['bestSelling', 'status', 'gender'].map((field) => (
            <div key={field} className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold underline decoration-red-700 underline-offset-4 mb-3">
                        { field === 'bestSelling' ? 'Best Selling?' : field === 'status' ? 'Product Status' : 'Target Gender'}
                  </h3>
                  <div className="flex gap-8">
                        {(field === 'bestSelling'
                        ? [
                              { label: 'Yes', value: true },
                              { label: 'No', value: false },
                        ]
                        : field === 'status'
                        ? [
                              { label: 'Live', value: 'live' },
                              { label: 'Not Live', value: 'not-live' },
                        ]
                        : [
                              { label: 'Male', value: 'male' },
                              { label: 'Female', value: 'female' },
                        ]
                        ).map((opt) => (
                              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                          type="radio"
                                          checked={product[field] === opt.value}
                                          onChange={() => setProduct((p) => ({ ...p, [field]: opt.value }))}
                                          disabled={!editing}
                                    />
                                    {opt.label}
                              </label>
                        ))}
                  </div>
            </div>
            ))}

            {/* Action Buttons */}
            <div className="col-span-full flex justify-center gap-6 py-8">
                  {editing ? (
                        <>
                              <button onClick={saveProduct} disabled={saving} className="px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-70" >
                                    {saving ? 'Saving...' : 'Save Changes'}
                              </button>
                              <button onClick={cancelEditing} className="px-8 py-3 bg-gray-600 text-white rounded hover:bg-gray-700" >
                                    Cancel
                              </button>
                        </>
                  ) : (
                        <button onClick={startEditing} className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800" >
                              Edit Product
                        </button>
                  )}
                  <button onClick={() => deleteProduct()} className="px-8 py-3 bg-red-700 text-white rounded hover:bg-red-800">
                        {
                  deleting ? 'Deleting....' : "Delete It"
                  }
                  </button>
            </div>
      </div>
      );
}