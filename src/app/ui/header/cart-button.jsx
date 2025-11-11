'use client'
import React from 'react'
import { TbShoppingBag } from "react-icons/tb";
import { useSelector } from 'react-redux';
const CartButton = () => {
      const count = useSelector((state) => state.cart.items.length)
      return (
            <div className='flex justify-end items-center relative'>
                  <TbShoppingBag className='h-6 w-auto text-neutral-800 cursor-pointer mr-0!'/>
                  <h5 className='absolute bg-black -top-[5px] -right-1 h-fit text-white text-xs px-1 py-1/2 rounded-full'>{count}</h5>
            </div>
      )
}

export default CartButton