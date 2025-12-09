'use client'
import SectionHead2 from "app/ui/components/heading-two";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { PlusCircle, MinusCircle } from "lucide-react";
import { clearCart, increaseCountInCart, removeAllCountFromCart, removeFromCart } from "store/slices/cartSlice";
import { FaDoorOpen, FaWhatsapp } from "react-icons/fa";
import { Trash2Icon } from "lucide-react";
import SectionHead1 from "app/ui/components/main-heading";
import Link from "next/link";
import { colors } from "app/lib/colors";
import { CheckCircle2 } from "lucide-react";

export default function Page(){
      const dispatch = useDispatch();
      const cartItems = useSelector((state) => state.cart.items);
      const [customerCart, setCustomerCart] = useState([]);
      const [displayMsg, setDisplayMsg] = useState(false);
      const [discountCoupon, setDiscountCoupon] = useState('');
      const [couponMsg, setCouponMsg] = useState('');
      const [couponDetails, setCouponDetails] = useState(null);
      const [paymentOption,setPaymentOption] = useState('Cash on delivery')
      const [total, setTotal] = useState(0)
      // const [paymentStatus,setPaymentStatus] = useState('waiting')
      const [customer, setCustomer] = useState({
            fullname: '',
            contact: '',
            email:'',
            gender: '', 
      })
      const [address, setAddress] = useState({
            street: '',
            city: '',
            state:'',
            country: '',
            zipCode: '' 
      })
      
      useEffect(() => {
            setCustomerCart(cartItems);
      }, [cartItems]);

      const subTotal = useMemo(() => {
            return customerCart.reduce((t, i) => t + i.price * i.qty, 0);
      }, [customerCart]);

      const discountTotal = useMemo(() => {
            return customerCart.reduce((t, i) => {
                  if (!i.discounted) return t;
                  const diff = i.price - i.discountedPrice;
                  return t + diff * i.qty;
            }, 0);
      }, [customerCart]);

      useEffect(() => {
            if(discountTotal && subTotal){
                  setTotal(subTotal-discountTotal)
            }
            if(couponDetails){
                  const toCut = (subTotal/100) * couponDetails?.discount_percentage;
                  setTotal(subTotal - discountTotal - toCut)
            }
      },[discountTotal, subTotal, couponDetails])

      const validateOrder = async (e) => {
            e.preventDefault()
            if (customerCart.length === 0) {
                  alert("Your cart is empty.");
                  return;
            }

            if (total <= 0) {
                  alert("Total cannot be zero. Please review your order.");
                  return;
            }

            const orderFinal = {
                  products: customerCart,
                  payment: {
                        subTotal: String(subTotal),
                        discountTotal: String(discountTotal),
                        coupon: couponDetails.coupon_code ?? "",
                        couponDisc: String((subTotal/100)*couponDetails.discount_percentage) ?? '',
                        total: String(total),
                        paymentThru: paymentOption,
                        paymentStatus: 'waiting'
                  },
                  customer: customer,
                  address: address
            }
            const output = await fetch('/api/database/orders/add-order',{
                  method: 'POST',
                  headers: {
                        'content-type':'application/json',
                  },
                  body: JSON.stringify(orderFinal)
            }).then(res => res.json())
            console.log(output)
            if(output.status === 200){
                  setDisplayMsg(true)
                  dispatch(clearCart())
            }
            
      };

      const detectCoupon = async() => {
            const resp = await fetch('/api/database/disc-coupons/check-coupon-code',{
                  method: 'PUT',
                  body: JSON.stringify({coupon_code: discountCoupon})
            })
            if(resp.ok){
                  setCouponMsg('fine');
                  const data = await resp.json()
                  setCouponDetails(data);
            } else {
                  setCouponMsg('not-fine')
            }
      }

      useEffect(() => {
            if(displayMsg === true){
                  const interval = setInterval(() => {
                        window.location.href='/';
                  }, 6*10000); // 10 seconds
                  return () => clearInterval(interval);
            }
      },[displayMsg])

      if(displayMsg){
            return <div className="container h-[60vh] flex flex-col items-center justify-center gap-8 text-center">
                  <SectionHead1 className={'italic font-semibold capitalize tracking-wide underline underline-offset-4 decoration-2 decoration-red-700'}>Thank you for your order</SectionHead1>
                  <h3 className="tracking-wide font-semibold text-md lg:text-lg capitalize">Join <b>LAVISH WHIM</b> on the WhatsApp to get 10% on your next purchase.</h3>
                  <Link className="py-2 px-4 rounded-full font-semibold text-white bg-green-600 flex items-center gap-5 capitalize" href={'https://chat.whatsapp.com/BbDKVESs8p6E39fn0n8o6V?mode=hqrc'}>Let's join lavish whim <FaWhatsapp /></Link>
            </div>
      }
      return (
            <div className="container py-10 lg:pt-16">
                  <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] w-full relative">
                        <div className="flex flex-col gap-4 lg:pr-4">
                              <SectionHead2 className="font-bold uppercase tracking-wider underline underline-offset-4 decoration-3 decoration-red-700">
                                    Checkout Order
                              </SectionHead2>

                              <div className="flex flex-col gap-6 pb-6">
                                    {customerCart.length === 0 ? (
                                    <p className="text-center text-gray-500 py-8">Your cart is empty</p>
                                    ) : (
                                    customerCart.map((item, index) => (
                                          <div key={index} className="flex items-center gap-3 bg-gray-50 shadow-md p-3 rounded-lg">

                                                <div className="relative w-24 h-24 flex-shrink-0">
                                                <Image
                                                      src={item.image}
                                                      alt={item.title}
                                                      fill
                                                      className="object-cover rounded-md"
                                                      sizes="80px"
                                                />
                                                </div>

                                                <div className="flex-1">
                                                <h4 className="font-semibold text-md line-clamp-2">{item.title}</h4>

                                                <div className="flex items-center mt-2 gap-4">
                                                      <div className='flex items-center border px-2 py-1 rounded-full gap-1 capitalize text-sm cursor-pointer'>
                                                            {
                                                                  colors.find(a => a.name.toLowerCase() === item.colour.toLowerCase()) ?  <div className={`w-4 h-4 border border-black rounded-full`} style={{backgroundColor: colors.find(a => a.name.toLowerCase() === item.colour.toLowerCase()).hex}}/> : null
                                                            }
                                                            <h4>{item.colour}</h4>
                                                      </div>
                                                      <div className="text-sm flex gap-3 items-center">
                                                            <h3>Qty:</h3>
                                                            <MinusCircle
                                                                  className="w-4 h-4 cursor-pointer"
                                                                  onClick={() => dispatch(removeFromCart({ id: item.id, colour: item.colour }))}
                                                            />
                                                            <h3>{item.qty}</h3>
                                                            <PlusCircle
                                                                  className="w-4 h-4 cursor-pointer"
                                                                  onClick={() => dispatch(increaseCountInCart({ id: item.id, colour: item.colour }))}
                                                            />
                                                      </div>
                                                </div>

                                                <div className="flex flex-row justify-between items-center">
                                                      <div className="lg:mt-3 flex items-center gap-3">
                                                            {item.discounted ? (
                                                            <div className="flex gap-2 items-end">
                                                                  <span className="text-sm mb-[2px] line-through text-gray-500">
                                                                        Rs. {item.price.toLocaleString("en-PK")} PKR
                                                                  </span>
                                                                  <span className="text-lg font-bold text-red-600">
                                                                        Rs. {item.discountedPrice.toLocaleString("en-PK")} PKR
                                                                  </span>
                                                            </div>
                                                            ) : (
                                                            <span className="text-md lg:text-lg font-bold">
                                                                  Rs. {item.price.toLocaleString("en-PK")} PKR
                                                            </span>
                                                            )}
                                                      </div>

                                                      <button
                                                            onClick={() => dispatch(removeAllCountFromCart({ id: item.id, colour: item.colour }))}
                                                            className="text-red-600 text-sm underline"
                                                      >
                                                            {
                                                                  window.innerWidth < 1024 ? <Trash2Icon className="w-5 h-auto"/> : 'Delete from cart'
                                                            }
                                                      </button>
                                                </div>
                                                </div>
                                          </div>
                                    ))
                                    )}
                              </div>
                        </div>

                        <div className="lg:border-l lg:pl-6 ">
                              <div className="flex flex-col gap-3 text-sm">
                                    <h2 className="font-bold text-lg xl:text-xl">Coupon Code</h2>
                                    <div className={`grid grid-cols-[90%_10%] border-2 rounded-lg ${couponMsg === 'fine' ? 'text-green-600 border-green-600' : ' border-black'}`}>
                                          <input className="rounded-lg active:border-tranparent p-2 uppercase" placeholder="Coupon..." name="discountCoupon" id="discountCoupon" value={discountCoupon} onChange={(e) => setDiscountCoupon(e.target.value.toUpperCase(  ))}/> 
                                          <CheckCircle2 onClick={() => detectCoupon()} className="mx-auto my-auto cursor-pointer"/>
                                    </div>
                                    <h2 className="font-bold text-lg xl:text-xl">Order Summary</h2>
                                    <div className="flex justify-between">
                                          <span>Subtotal</span>
                                          <span>Rs. {subTotal.toLocaleString("en-PK")}</span>
                                    </div>

                                    <div className="flex justify-between">
                                          <span>Shipping</span>
                                          <span>Free</span>
                                    </div>

                                    <div className="flex justify-between text-green-600">
                                          <span>General Discount</span>
                                          <span>- Rs. {discountTotal.toLocaleString("en-PK")}</span>
                                    </div>
                                    <div className={`flex justify-between ${couponDetails ? 'text-green-600':''}`}>
                                          <span>Discount By Coupon</span>
                                          <span>{couponDetails?<>- Rs. {((subTotal/100) * couponDetails.discount_percentage).toLocaleString('en-PK')} </>: '---'}</span>
                                    </div>

                                    <hr className="my-2" />

                                    <div className="flex justify-between font-bold text-lg">
                                          <span>Total</span>
                                          <span>Rs. {total.toLocaleString("en-PK")}</span>
                                    </div>

                                    <hr className="my-2" />
                                    <h2 className="font-bold text-lg xl:text-xl">Payment Options</h2>
                                    <div className="flex items-center gap-2 w-full border-2 border-black rounded-lg p-3 cursor-pointer" onClick={() => setPaymentOption('Cash on delivery')}>
                                          <div className="border-2 p-[2px] border-black w-4 h-4 rounded-full">
                                                <div className="bg-black w-full h-full rounded-full"/>
                                          </div>
                                          <h3 className="flex justify-between items-center w-full text-sm lg:text-md font-bold uppercase tracking-wide">
                                                Cash On Delivery
                                                <FaDoorOpen className="w-6 h-auto"/>      
                                          </h3>
                                    </div>
                                    {/* <div className="flex items-center gap-2 w-full border-2 border-black rounded-lg p-3 cursor-pointer" onClick={() => setPaymentOption('Cash on delivery')}>
                                          <div className="border-2 p-[2px] border-black w-4 h-4 rounded-full">
                                                <div className="bg-black w-full h-full rounded-full"/>
                                          </div>
                                          <h3 className="flex justify-between items-center w-full text-sm lg:text-md font-bold uppercase tracking-wide">
                                                Online payment
                                                <FaDoorOpen className="w-6 h-auto"/>      
                                          </h3>
                                    </div> */}
                              </div>
                        </div>

                  </div>
                  <hr className="my-6"/>
                  <form onSubmit={validateOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <h2 className="font-bold text-lg xl:text-xl col-span-full">Details</h2>
                        <div className="flex flex-col gap-0">
                              <label className="font-semibold text-sm" htmlFor="fullname">Name</label>
                              <input type="text" name="fullname" id="fullname" required className="p-2 rounded-md border" value={customer.fullname} onChange={(e) => setCustomer((prev) => ({...prev, fullname: e.target.value}))} placeholder="Fullname..." />
                        </div>
                        <div className="flex flex-col gap-0">
                              <label className="font-semibold text-sm" htmlFor="email">E-Mail</label>
                              <input type="email" name="email" id="email" required className="p-2 rounded-md border" value={customer.email} onChange={(e) => setCustomer((prev) => ({...prev, email: e.target.value}))} placeholder="E-Mail..." />
                        </div>
                        <div className="flex flex-col gap-0">
                              <label className="font-semibold text-sm" htmlFor="contact">Contact Number</label>
                              <input type="text" name="contact" id="contact" required className="p-2 rounded-md border" value={customer.contact} onChange={(e) => setCustomer((prev) => ({...prev, contact: e.target.value}))} placeholder="03xx-xxxxxxx" />
                        </div>
                        <div className="flex flex-col gap-0">
                              <label className="font-semibold text-sm" htmlFor="gender">Gender</label>
                              <select name='gender' id="gender" required className="p-2 rounded-md border" value={customer.gender} onChange={(e) => setCustomer((prev) => ({...prev, gender: e.target.value}))}>
                                    <option value={''}>Select gender</option>
                                    <option value={'male'}>Male</option>
                                    <option value={'female'}>Female</option>
                              </select>
                        </div>

                        <h2 className="font-bold text-lg xl:text-xl mt-4 col-span-full">Address</h2>
                        <div className="flex flex-col gap-0">
                              <label className="font-semibold text-sm" htmlFor="street">Street</label>
                              <input type="text" name="street" id="street" required className="p-2 rounded-md border" value={address.street} onChange={(e) => setAddress((prev) => ({...prev, street: e.target.value}))} placeholder="House No. / Street No. / Colony..." />
                        </div>
                        <div className="flex flex-col gap-0">
                              <label className="font-semibold text-sm" htmlFor="city">City</label>
                              <input type="text" name="city" id="city" required className="p-2 rounded-md border" value={address.city} onChange={(e) => setAddress((prev) => ({...prev, city: e.target.value}))} placeholder="City..." />
                        </div>
                        <div className="flex flex-col gap-0">
                              <label className="font-semibold text-sm" htmlFor="state">State / Province</label>
                              <input type="text" name="state" id="state" required className="p-2 rounded-md border" value={address.state} onChange={(e) => setAddress((prev) => ({...prev, state: e.target.value}))} placeholder="State / Province..." />
                        </div>
                        <div className="flex flex-col gap-0">
                              <label className="font-semibold text-sm" htmlFor="country">Country</label>
                              <input type="text" name="country" id="country" required className="p-2 rounded-md border" value={address.country} onChange={(e) => setAddress((prev) => ({...prev, country: e.target.value}))} placeholder="Country..." />
                        </div>
                        <div className="flex flex-col gap-0">
                              <label className="font-semibold text-sm" htmlFor="zipCode">ZIP Code</label>
                              <input type="text" name="zipCode" id="zipCode" className="p-2 rounded-md border" value={address.zipCode} onChange={(e) => setAddress((prev) => ({...prev, zipCode: e.target.value}))} placeholder="ZIP Code..." />
                        </div>
                        <div className="col-span-full">
                              <button type="submit" className="bg-black w-full text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">Submit</button>
                        </div>
                  </form>
            </div>
      );
}