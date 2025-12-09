'use client'
import { Trash2Icon } from "lucide-react"
import { useEffect, useState } from "react"

export default function CouponsTable(){
    const [coupons, setCoupons] = useState(null)
    const [deleting, setDeleting] = useState('')
    const [firstTry, setFirstTry] = useState(true)
    const formatDate = (date) => {
        return `${String(date).split('-')[2].padStart(2,"00")}-${String(date).split('-')[1].padStart(2,"00")}-${String(date).split('-')[0].padStart(4,"0000")}`
    }

    const GetCoupons = async () => {
        const response = await fetch('/api/database/disc-coupons/get-all-coupons');
        if(response.ok){
            const data = await response.json();
            setCoupons(data);
        }
        setFirstTry(false)
    };
    useEffect(() => {
        GetCoupons()    
    },[])

    const DeleteCoupon = async (id) => {
        setDeleting(id);
        const resp = await fetch('/api/database/disc-coupons/delete-coupon', {
            method: 'DELETE',
            body:JSON.stringify({id:id})
        })
        if(resp.ok){
            GetCoupons()
            setDeleting('');
        } else{
            setDeleting('');
        }
    }

    return(
        <div className="flex flex-col w-full gap-1">
            <div className="grid grid-cols-[22%_22%_22%_22%_12%] rounded-lg px-4 py-3 bg-neutral-100" >
                <h3 className="flex items-center font-bold tracking-wide justify-center border-r-2 border-black">Discount Title</h3>
                <h3 className="flex items-center font-bold tracking-wide justify-center border-r-2 border-black">Coupon Code</h3>
                <h3 className="flex items-center font-bold tracking-wide justify-center border-r-2 border-black">Discount %</h3>
                <h3 className="flex items-center font-bold tracking-wide justify-center border-r-2 border-black">Created On</h3>
                <h3 className="flex items-center font-bold tracking-wide justify-center">-</h3>
            </div>
            {
                coupons ? coupons.map((coupon) => <div key={coupon.id} className="grid relative grid-cols-[22%_22%_22%_22%_12%] border-b px-4 py-2">
                    <h3 className="border-r-2 border-black/20 text-center">{coupon.title}</h3>
                    <h3 className="border-r-2 border-black/20 text-center">{coupon.coupon_code}</h3>
                    <h3 className="border-r-2 border-black/20 text-center">{coupon.discount_percentage}</h3>
                    <h3 className="border-r-2 border-black/20 text-center">{formatDate(String(coupon.created_on).split("T")[0])}</h3>
                    <h3 className="flex items-center justify-center gap-3">
                        <Trash2Icon onClick={() => DeleteCoupon(coupon.id)} className="w-5 h-auto text-red-700 cursor-pointer " />
                    </h3>
                    <div className={deleting === coupon.id ? `absolute top-0 left-0 w-full bg-black/20 cursor-not-allowed z-100 inset-0`: null}/>

                </div> ) : <div className="flex h-80 items-center justify-center">
                    <h3 className="font-semibold tracking-wide text-center">
                        {
                            firstTry ? 'Loading Data....' : 'No Coupon Available...'
                        }
                    </h3>
                </div>
            }
        </div>
    )
}