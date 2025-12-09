'use client';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { CheckCircleIcon } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';
import { PiWalletDuotone } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import { addToCart } from '@/store/slices/cartSlice';
import { colors } from 'app/lib/colors';
import { event } from 'app/lib/facebook-pixels';

export default function ProductDetailsPopUp({ product, openCall, setOpenCall }) {
      const dispatch = useDispatch()
      const [showPop, setShowPop] = useState(false); 
      const [activeImgIndex, setActiveImgIndex] = useState(0);
      const [quantity, setQuantity] = useState(1);
      const [selectedColour, setSelectedColour] = useState('');
      const [additionStatus, setAdditionStatus] = useState('idle') 
      const [showAlert, setShowAlert] = useState(false) 
      const productImages = JSON.parse(product.images);
      const modalRef = useRef(null);
      const router = useRouter()
      useEffect(() => { 
            const handleEsc = (e) => { 
                  if (e.key === 'Escape') 
                        setShowPop(false); 
                  }; 
            if (showPop) { 
                  window.addEventListener('keydown', handleEsc); 
                  document.body.style.overflow = 'hidden'; 
            } 
            return () => { window.removeEventListener('keydown', handleEsc); document.body.style.overflow = 'unset'; }; 
      }, [showPop]);

      useEffect(() => {
            if(openCall){
                  setShowPop(true)
            }else{
                  setShowPop(false)
            }
      },[openCall])
      const handleBackdropClick = (e) => { 
            if (modalRef.current && !modalRef.current.contains(e.target)) 
                  setShowPop(false); 
      };
      const openModal = () => { 
            setShowPop(true); 
            setActiveImgIndex(0); 
      };
      const directPurchase = () => {
            if(selectedColour !==''){
                  event('Direct purchase', {
                        product: product.title,
                        product_id: product.product_id
                  })
                  dispatch(addToCart({id: product.product_id,image: productImages[0] ,title: product.title, price: product.onSale ? product.salePrice : product.price, qty: quantity, colour: selectedColour}))
                  setShowPop(false)
                  router.replace('/checkout-with-payment')
            }else{
                  setShowAlert(false)
            }
      }
      
      const addToCartFunc = () => {
            if(selectedColour !==''){
                  setAdditionStatus('adding')
                  event("Added product in cart", {
                        product: product.title,
                        product_id: product.product_id
                  })
                  dispatch(addToCart({id: product.product_id, image: productImages[0], title:product.title, price: product.onSale === 1 ? product.salePrice : product.price, qty:quantity, colour: selectedColour }))
                  setTimeout(() => setAdditionStatus('added'), 1000)
                  setTimeout(() => setAdditionStatus('idle'), 2000)
                  setQuantity(1)
                  
            }else{
                  setShowAlert(true)
            }
      }

      const parseDescription = (html) => ({ __html: html?.replace(/<p><br><\/p>/g, '').replace(/&nbsp;/g, ' ') || '' });

      return (
      <>
      <button onClick={() => {event("Product viewed", {
          product: product.title,
          product_id: product.id
        });openModal()}} className="text-sm lg:text-md w-full border border-black text-black font-semibold capitalize p-2 rounded-sm transition-all duration-300 hover:scale-[1.03] hover:bg-black hover:text-white">Let's Order It</button>
      {showPop && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 lg:bg-black/60 p-4 transition-opacity duration-300" onClick={handleBackdropClick}>
                  <div ref={modalRef} className="relative w-full max-w-5xl h-[96vh] lg:h-[42em] lg:max-h-[42em] bg-white rounded-xl shadow-2xl overflow-auto lg:overflow-hidden animate-in fade-in zoom-in duration-300" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
                        <button onClick={() => {setShowPop(false); setOpenCall(false)}} className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition hover:bg-white hover:scale-110" aria-label="Close modal">
                              <X className="h-4 w-4 lg:h-5 lg:w-5" />
                        </button>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[42em] lg:max-h-[42em] lg:overflow-hidden">
                              <div className="flex flex-col lg:h-[42em]">
                                    <div className="relative h-96 lg:h-[80%] overflow-hidden lg:max-h-[80%] bg-gray-50">
                                          <Image src={productImages[activeImgIndex]} alt={`${product.title} - view ${activeImgIndex + 1}`} height={500} width={500} className="w-full h-[100%] object-fit object-center" sizes="(max-width: 768px) 100vw, 50vw" priority={activeImgIndex === 0} />
                                    </div>
                                    <div className="flex gap-2 p-4 lg:h-[20%] overflow-x-auto bg-gray-50">
                                          {productImages.map((image, index) => (
                                                <button key={index} onClick={() => setActiveImgIndex(index)} className={`relative flex-none w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImgIndex === index ? 'border-black scale-105 shadow-md' : 'border-transparent hover:border-gray-400'}`}>
                                                      <Image src={image} alt={`Thumbnail ${index + 1}`} width={80} height={80} className="object-cover w-full h-full" />
                                                </button>
                                          ))}
                                    </div>
                              </div>
                              <div className="flex flex-col gap-5 lg:gap-6 p-6 md:p-8 h-full lg:max-h-[42em]">
                                    <div>
                                          <h1 id="product-modal-title" className="text-xl lg:text-3xl font-bold capitalize">{product.title}</h1>
                                          <div className="lg:mt-3 flex items-center gap-3">
                                                {product.onSale === 1 ? (<div className='flex gap-2 items-end'><span className="text-sm mb-[2px] line-through text-gray-500">Rs. {formatPKR(product.price)} PKR</span><span className="text-lg font-bold text-red-600">Rs. {formatPKR(product.salePrice)} PKR</span></div>) : (<span className="text-lg lg:text-2xl font-bold">Rs. {formatPKR(product.price)} PKR</span>)}
                                                {product.onSale === 1 && <div className="inline-block px-4 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded-full">Sale</div>}
                                          </div>
                                    </div>
                                    <div className={`lg:h-[70%] lg:overflow-auto`}>
                                          {product.description && <div className=" prose-sm max-w-none text-sm lg:text-md text-gray-700" dangerouslySetInnerHTML={parseDescription(product.description)} />}
                                    </div>
                                    <div className='relative flex lg:grid lg:grid-cols-4 gap-1 flex-wrap items-center'>
                                          <div className='w-full lg:col-span-full flex items-center justify-between'>
                                                <h3 className='text-sm font-bold capitalize'>Colour options:</h3>
                                                {
                                                      showAlert === true ? <h3 className='font-bold text-red-600 capitalize text-sm tracking-wide'>Select colour!!!</h3>:null
                                                }
                                          </div>
                                          {
                                                JSON.parse(product.colors).map((c,index) => <div onClick={() => {setSelectedColour(c); setShowAlert(false)}} className={`flex items-center border px-2 py-1 rounded-full gap-1 capitalize text-xs cursor-pointer ${selectedColour === c ? 'border-black font-bold' : ''}`} key={index}>
                                                      {
                                                            colors.find(a => a.name.toLowerCase() === c.toLowerCase()) ?  <div className={`w-4 h-4 border border-black rounded-full`} style={{backgroundColor: colors.find(a => a.name.toLowerCase() === c.toLowerCase()).hex}}/> : null
                                                      }
                                                      <h4>{c}</h4>
                                                </div>)
                                          }
                                    </div>

                                    <div className="grid grid-cols-[15%_85%] gap-3">
                                          <div className='grid grid-rows-[25%_50%_25%] align-center items-center'>
                                                <button className='text-xl bg-black text-white w-full h-full font-semibold'  onClick={() => quantity > 1 && setQuantity(quantity-1)}>-</button>
                                                <h3 className='text-center border h-full w-full flex justify-center items-center'>{quantity}</h3>
                                                <button className='text-lg leading-tight bg-black text-white w-full h-full font-semibold' onClick={() => setQuantity(quantity+1)}>+</button>
                                          </div>
                                          <div className='flex flex-col gap-3'>
                                                <button onClick={addToCartFunc} 
                                                      className={`w-full inline-flex gap-3 text-sm lg:text-md items-center justify-center text-white font-semibold py-3 rounded-md transition ${
                                                            additionStatus === 'adding' ? "bg-gray-800 cursor-not-allowed" : additionStatus === 'added' ? 'bg-green-700': 'bg-black hover:bg-gray-800'
                                                      } capitalize`}>
                                                            { additionStatus === 'adding' ? <>Adding to cart <LoaderCircle className='w-auto h-5 animate-spin'/></> : additionStatus ==='added' ? <>Added to cart <CheckCircleIcon className='w-auto h-5 stroke-3'/></> : <>Add to cart <TbShoppingBagPlus className='w-auto h-5'/></>}
                                                </button>
                                                <button className="w-full inline-flex gap-3 text-sm lg:text-md items-center justify-center border border-black text-black font-semibold py-3 rounded-md transition hover:bg-black hover:text-white" onClick={directPurchase}>Buy Now <PiWalletDuotone className='w-auto h-5'/></button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )}
      </>
      );
}

function formatPKR(num) { return new Intl.NumberFormat('en-PK', { style: 'decimal', minimumFractionDigits: 0 }).format(num); }