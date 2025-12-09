'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddCoupon(){
    const router = useRouter()
    const [discount, setDiscount] = useState({
        title: '',
        coupon_code: '',
        discount_percentage: '',
    })
    const handleSubmission = async(e) => {
        e.preventDefault();
        const resp = await fetch('/api/database/disc-coupons/add-new-coupon',{
            method: "POST",
            headers: {
                "Content-type": 'application/json',
            },
            body: JSON.stringify(discount)
        })
        if(resp.ok){
            router.refresh();
        }
    }
    return <form onSubmit={handleSubmission} className="grid grid-cols-[27%_27%_27%_15%] gap-x-4 gap-y-1 rounded-lg p-4 bg-neutral-100">
        <h2 className="col-span-full text-lg font-bold tracking-wide">Add New Coupon</h2>
        <input type="text" name="title" id="title" required className="bg-neutral-50 px-2 py-1 rounded-md border border-black/60" placeholder="Discount coupon title" value={discount.title} onChange={(e) => setDiscount((prev) => ({...prev, title:e.target.value}))}/>
        <input type="text" name="coupon_code" id="coupon_code" required className="bg-neutral-50 px-2 py-1 rounded-md border border-black/60 uppercase placeholder:capitalize" placeholder="Coupon Code" value={discount.coupon_code} onChange={(e) => setDiscount((prev) => ({...prev, coupon_code:String(e.target.value).toUpperCase()}))}/>
        <input type="number" name="dicount_percentage" id="dicount_percentage" required className="bg-neutral-50 px-2 py-1 rounded-md border border-black/60" placeholder="Discount percentage" value={discount.discount_percentage} onChange={(e) => setDiscount((prev) => ({...prev, discount_percentage:e.target.value}))}/>
        <button className="bg-black px-3 py-1 rounded-md text-white" type="submit">
            Add Coupon 
        </button>
    </form>
}