'use client';
import { MinusCircle, PlusCircle, X } from 'lucide-react';
import { TbShoppingBag } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useState } from 'react';
import { removeFromCart,increaseCountInCart, removeAllCountFromCart } from '@/store/slices/cartSlice';
import { useRouter } from 'next/navigation';
import { colors } from 'app/lib/colors';

const CartSideView = ({ setShowCart, showCart }) => {
      const cartItems = useSelector((state) => state.cart.items);
      const dispatch = useDispatch()
      const router = useRouter()
      
      const checkoutCalled = () => {
            router.push('/checkout-with-payment')
            setShowCart(false)
      }

      const totalBill = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

      return (
      <div
            className={`fixed inset-0 z-50 flex justify-end bg-black/60 transition-opacity duration-300 ${
            showCart ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setShowCart(false)}
      >
            <div
            className={`w-full max-w-[86%] lg:max-w-md h-full bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
            showCart ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
            >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-xl font-bold">Your Cart ({cartItems.length})</h3>
            <button
                  onClick={() => setShowCart(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition"
            >
                  <X className="h-5 w-5" />
            </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Your cart is empty</p>
            ) : (
                  cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <div className="relative w-20 h-28 lg:h-20 flex-shrink-0">
                              <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover h-full w-auto rounded-md"
                                    sizes="80px"
                              />
                        </div>
                        <div className="flex flex-col w-full gap-1">
                              <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                              <div className='flex flex-row justify-between lg:items-center'>
                                    <div className='flex items-center border px-2 py-1 rounded-full gap-1 capitalize text-xs cursor-pointer'>
                                          {
                                                colors.find(a => a.name.toLowerCase() === item.colour.toLowerCase()) ?  <div className={`w-4 h-4 border border-black rounded-full`} style={{backgroundColor: colors.find(a => a.name.toLowerCase() === item.colour.toLowerCase()).hex}}/> : null
                                          }
                                          <h4>{item.colour}</h4>
                                    </div>
                                    <div className="text-xs lg:text-sm flex gap-3 items-center">
                                          <h3>Qty: </h3>
                                          <MinusCircle className='w-4 h-4 ' onClick={() => dispatch(removeFromCart({id: item.id, colour: item.colour}))}/> 
                                          <h3>{item.qty}</h3> 
                                          <PlusCircle className='w-4 h-4' onClick={() => dispatch(increaseCountInCart({id: item.id, colour: item.colour}))}/>
                                    </div>
                              </div>
                              <div className='flex flex-col lg:flex-row justify-between lg:items-center'>
                                    <p className="font-semibold text-sm">
                                          Rs. {(item.price * item.qty).toLocaleString('en-PK')} PKR
                                    </p>
                                    <button onClick={() => dispatch(removeAllCountFromCart({id: item.id, colour: item.colour}))} className='text-red-600 text-sm underline'>Delete from cart</button>
                              </div>
                        </div>
                  </div>
                  ))
            )}
            </div>

            {/* Total */}
            <div className="border-t p-4 space-y-3">
            <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>Rs. {totalBill.toLocaleString('en-PK')} PKR</span>
            </div>
            <button onClick={checkoutCalled} className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition">
                  Checkout
            </button>
            </div>
            </div>
      </div>
      );
};

const CartButton = () => {
  const [showCart, setShowCart] = useState(false);
  const count = useSelector((state) => state.cart.items.length);

  return (
    <div className="relative flex justify-end ">
      <button onClick={() => setShowCart(true)} className="relative w-fit transition">
        <TbShoppingBag className="h-7 w-7 text-neutral-800" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </button>

      <CartSideView showCart={showCart} setShowCart={setShowCart} />
    </div>
  );
};

export default CartButton;