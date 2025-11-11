'use client'
import { addToCart, removeFromCart } from '@/store/slices/cartSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { MdDelete } from "react-icons/md";

const Extra = () => {
      const dispatch = useDispatch();
      const items = useSelector((state) => state.cart.items);     
      return (
      <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center border p-10 gap-4 mt-10'>
                  <h1>Item 1</h1>
                  <h1>100</h1>
                  
                  <button className='' onClick={() => dispatch(addToCart({id: '1',title: 'item 1', price: '100', qty: 1}))}>Add to cart</button>
            </div>
            <div className='flex flex-col items-center justify-center border p-10 gap-4 mt-10'>
                  <h1>Item 2</h1>
                  <h1>200</h1>
                  
                  <button className='' onClick={() => dispatch(addToCart({id: '2',title: 'item 2', price: '200', qty: 1}))}>Add to cart</button>
            </div>
            <div className='flex flex-col items-center justify-center border p-10 gap-4 mt-10'>
                  {
                        items.map((item) => (
                              <div key={item.id} className='flex flex-col items-center justify-center border p-4 gap-2'>
                                    <h1>{item.title}</h1>
                                    <h1>{item.price}</h1>
                                    <h1>{item.qty}</h1>
                                    <MdDelete onClick={() => dispatch(removeFromCart({id: item.id}))}/>
                              </div>
                        ))
                  }
            </div>
      </div>
  )
}

export default Extra