'use client'

import Link from "next/link";
// import Image from "next/image"
import { useEffect, useState } from "react"
function formatPKR(num) {
  return new Intl.NumberFormat('en-PK', { style: 'decimal', minimumFractionDigits: 0 }).format(num);
}

const OrderCard = ({order, setReload})=> {
      const [orderStatus, setOrderStatus] = useState(order.orderStatus);
      const [paymentStatus, setPaymentStatus] = useState(order.payment_status);
      const OrderStatusChange = async () => {
            const res = await fetch('/api/database/orders/update-order-status', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },   
                  body: JSON.stringify({ orderId: order.order_id, orderStatus: orderStatus, paymentStatus: paymentStatus }),   
            })
            if(res.ok){
                  setReload(true);
            }
      }
      useEffect(() => {
            if((orderStatus.trim() !== '' && orderStatus !== order.orderStatus) || (paymentStatus.trim() !== '' && paymentStatus !== order.payment_status)){
                  OrderStatusChange();
            }
      },[orderStatus, paymentStatus])
      return (
      <div className="grid lg:grid-cols-[90%_10%] 2xl:grid-cols-[93%_7%] p-4 border rounded-lg shadow-sm shadow-black/8">
            <div className="grid grid-cols-4 gap-2 text-sm border-r">
                  <h3 className="flex items-center gap-2"><b>Customer: </b>{order.customerName}</h3>
                  <h3 className="flex items-center gap-2"><b>Contact No# </b>{order.contactNo}</h3>
                  <h3 className="flex items-center gap-2 text-nowrap"><b>E-Mail: </b> {order.email}</h3>
                  <h3 className="flex items-center gap-2"><b>Ordered On: </b>{order.dated.split('T')[0]}</h3>
                  <h3 className="flex items-center gap-2"><b>Total: </b>{formatPKR(order.total)} PKR</h3>
                  <h3 className="flex items-center gap-2"><b>Payment: </b>{order.payment_thru}</h3>
                  {/* <h3 className="flex items-center gap-2 capitalize"><b>Payment Status: </b>{order.payment_status}</h3> */}
                  <div className="flex items-center gap-2">
                        <h3 className="capitalize"><b>Payment Status: </b></h3>
                        <select name="paymentStatus" className={'border p-1 rounded-md border-black'} onChange={(e) => setPaymentStatus(e.target.value)} value={paymentStatus}>
                              <option value={''}>Status</option>
                              <option value={'waiting'}>Waiting</option>
                              <option value={'done'}>Done</option>
                              <option value={'cancelled'}>Cancelled</option>
                        </select>
                  </div>
                  <div className="flex items-center gap-2">
                        <h3 className="capitalize"><b>Order Status: </b></h3>
                        <select name="orderStatus" className={'border p-1 rounded-md border-black'} onChange={(e) => setOrderStatus(e.target.value)} value={orderStatus}>
                              <option value={''}>Status</option>
                              <option value={'new'}>New</option>
                              <option value={'completed'}>Completed</option>
                              <option value={'cancelled'}>Cancelled</option>
                              <option value={'under packaging'}>Under packaging</option>
                              <option value={'list of delivery'}>List of delivery</option>
                        </select>
                  </div>
            </div>
            <div className="flex items-center justify-center">
                  <Link href={`/portal/dashboard/orders-management/${order.order_id}`} className="text-sm font-bold underline underline-offset-4 decoration-red-700 decoration-2">View</Link>
            </div>
      </div>
      )
}

export default function OrdersTable(){
      const [orders, setOrders] = useState([])
      const [reload, setReload] = useState(false)
      const fetchOrders = async () => {
            const res = await fetch('/api/database/orders/get-all-orders')
            const data = await res.json()
            if(data){
                  setOrders(data)
            }
      }
      useEffect(() => {
            fetchOrders()
      },[])
      useEffect(() => {
            if(reload === true){
                  fetchOrders()
                  setReload(false)
            }
      },[reload])
      return <div className="flex flex-col gap-4 mt-3">
            {
                  orders.length > 0 ? orders.map((order, index) => (
                        <OrderCard key={index} order={order} setReload={setReload}/>
                  )) : <div className="p-4 border border-neutral-200 rounded-md shadow-sm shadow-black/5">
                        No orders found.
                  </div>
            }
      </div>
}