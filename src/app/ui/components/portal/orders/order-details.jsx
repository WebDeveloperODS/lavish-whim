'use client'
import Image from "next/image"
import { useEffect, useState } from "react"
import SectionHead2 from "../../heading-two";
import { useRouter } from "next/navigation";

function formatPKR(num) {
    return new Intl.NumberFormat('en-PK', { style: 'decimal', minimumFractionDigits: 0 }).format(num);
}
const InnerHead = ({children}) => {
    return <h3 className="font-bold capitalize tracking-wide underline underline-offset-4 decoration-red-700">{children}</h3>
}
const Product = ({product}) => {
    return <div className="grid grid-cols-[20%_78%] gap-3 p-2 bg-neutral-50 rounded-lg">
        <Image className="w-auto h-fit border border-black/80 rounded-lg" src={product.image} alt={`${product.title} - image`} width={70} height={70}/>
        <div className="flex flex-col gap-1 justify-center">
            <h3 className="text-sm capitalize truncate"><b>{product.title}</b></h3>
            <h3 className="text-sm capitalize"><b>Color:</b> {product.colour}</h3>
            <h3 className="text-sm capitalize"><b>Quantity:</b> {product.qty}</h3>
        </div>
    </div>
}

export default function OrderDetails({order_id}){
    const [order, setOrder] = useState(null)
    const [orderStatus, setOrderStatus] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('')
    const [updateCall, setUpdateCall] = useState(false)
    const router = useRouter()
    const getOrder = async () => {
        const res = await fetch(`/api/database/orders/get-order-by-id`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({order_id})
        })
        if(res.ok){
            const data = await res.json()
            setOrder(data)
        } else {
            console.log('Failed to fetch order', res.statusText)
        }
    }
    const updateOrder = async() => {
        const res = await fetch('/api/database/orders/update-order-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },   
            body: JSON.stringify({ orderId: order.order_id, orderStatus: orderStatus, paymentStatus: paymentStatus }),   
        })
        if(res.ok){
            getOrder();
            setUpdateCall(false)
        }
    }

    const deleteOrder = async() => {
        const data = await fetch('/api/database/orders/delete-order',{
            method: 'DELETE',
            body: JSON.stringify({order_id: order_id})
        }).then(res => res.json())
        if(data.status === 200){
            router.back()
        }
    }

    useEffect(() => {
        if(order){
            setOrderStatus(order.orderStatus)
            setPaymentStatus(order.payment_status)
        }
    },[order])

    useEffect(() => {
        getOrder();
    }, [order_id]);
    return(
        <div className="grid grid-cols-[70%_30%] gap-4">
            <div className="flex flex-col gap-2">
                <SectionHead2 className={'tracking-wide mx-auto font-bold underline underline-offset-4 decoration-2 decoration-red-700 mb-3'}>Order Details</SectionHead2>
                <InnerHead>Customer:</InnerHead>
                <div className="grid grid-cols-2 border rounded-md mb-3">
                    <h3 className="py-2 px-4 border rounded-tl-md capitalize"><b>Name:</b> {order?.customerName}</h3>
                    <h3 className="py-2 px-4 border rounded-tr-md"><b>Contact No:</b> {order?.contactNo}</h3>
                    <h3 className="py-2 px-4 border rounded-bl-md"><b>E-Mail:</b> {order?.email}</h3>
                    <h3 className="py-2 px-4 border rounded-br-md capitalize"><b>Gender:</b> {order?.gender}</h3>
                </div>
                <InnerHead>Address:</InnerHead>
                <div className="grid grid-cols-2 border rounded-md mb-3">
                    <h3 className="py-2 px-4 border rounded-tl-md capitalize"><b>Street:</b> {order?.street}</h3>
                    <h3 className="py-2 px-4 border rounded-tr-md capitalize"><b>City:</b> {order?.city}</h3>
                    <h3 className="py-2 px-4 border rounded-bl-md capitalize"><b>State/Province:</b> {order?.state}</h3>
                    <h3 className="py-2 px-4 border rounded-br-md capitalize"><b>Country:</b> {order?.country}</h3>
                </div>
                <InnerHead>Others:</InnerHead>
                <div className="grid grid-cols-2 border rounded-md mb-3">
                    <h3 className="py-2 px-4 border rounded-tl-md"><b>Ordered On:</b> {String(order?.dated).split('T')[0]}</h3>
                    <h3 className="py-2 px-4 border rounded-tr-md"><b>Sub Total:</b> {formatPKR(order?.subTotal)}</h3>
                    <h3 className="py-2 px-4 border"><b>Discounted:</b> {formatPKR(order?.discountTotal)}</h3>
                    <h3 className="py-2 px-4 border"><b>Discount Coupon:</b> </h3>
                    <h3 className="py-2 px-4 border"><b>Total Bill:</b> {formatPKR(order?.total)}</h3>
                    <h3 className="py-2 px-4 border"><b>Payment Through:</b> {order?.payment_thru}</h3>
                    <h3 className={updateCall ? "flex flex-wrap gap-2 items-center pl-4 border rounded-bl-md border-black" :"py-2 px-4 border rounded-bl-md capitalize"}><b>Payment Status:</b> {
                        updateCall ? <select value={paymentStatus} name="paymentStatus" onChange={(e)=> setPaymentStatus(e.target.value)} className="border border-black border-l-2 h-full grow px-2 py-2 capitalize">
                            <option value={''}>Payment status...</option>
                            <option value={'waiting'}>Waiting</option>
                            <option value={'done'}>Done</option>
                            <option value={'cancelled'}>Cancelled</option>
                        </select> : paymentStatus
                    }</h3>
                    <h3 className={updateCall ? "flex flex-wrap gap-2 items-center pl-4 border rounded-br-md border-black" :"py-2 px-4 border rounded-br-md capitalize"}><b>Order Status:</b> {
                        updateCall ? <select value={orderStatus} name="orderStatus" onChange={(e)=> setOrderStatus(e.target.value)} className="border border-black border-l-2 rounded-br-md h-full grow px-2 py-2 capitalize">
                            <option value={''}>Order status...</option>
                            <option value={'new'}>New</option>
                            <option value={'completed'}>Completed</option>
                            <option value={'cancelled'}>Cancelled</option>
                            <option value={'under packaging'}>Under packaging</option>
                            <option value={'list for delivery'}>List for delivery</option>
                        </select>: orderStatus
                    }</h3>
                </div>

                <div className="flex items-center justify-center gap-5 mt-3">
                    {
                        updateCall ? <>
                        <button onClick={() => updateOrder()} className="font-bold tracking-wide capitalize px-4 py-2 rounded-sm bg-green-600 text-white transition-all duration-400 ease-in-out hover:scale-105">Save</button>
                        <button onClick={() => setUpdateCall(false)} className="font-bold tracking-wide capitalize px-4 py-2 rounded-sm bg-sky-700 text-white transition-all duration-400 ease-in-out hover:scale-105">Cancel</button>
                        </>: 
                        <button onClick={() => setUpdateCall(true)} className="font-bold tracking-wide capitalize px-4 py-2 rounded-sm bg-black text-white transition-all duration-400 ease-in-out hover:scale-105">Update order</button>
                    }
                    <button onClick={() => deleteOrder()} className="font-bold tracking-wide capitalize px-4 py-2 rounded-sm bg-red-700 text-white transition-all duration-400 ease-in-out hover:scale-105">Delete order</button>
                </div>

            </div>
            <div className="flex flex-col gap-2 p-4 h-[75vh] rounded-lg overflow-auto bg-neutral-200">
                <InnerHead>Products</InnerHead>
                <div className="flex flex-col gap-5">
                    {
                        order?.products.map((product,index) => <Product key={index} product={product}/>)
                    }
                </div>
            </div>
        </div>
    );
}