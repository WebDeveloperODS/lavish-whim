import executeQuery from "app/lib/database";

export async function POST(req){
      try {
            const {orderId, orderStatus, paymentStatus} = await req.json();
            console.log(orderId, orderStatus, paymentStatus);
            const resp = await executeQuery(`
                        UPDATE orders SET orderStatus=?, payment_status=?  WHERE order_id =?;
                  `,[orderStatus,paymentStatus, orderId])
            if(resp){
                  return new Response(JSON.stringify({ message: 'Order status updated successfully' }), { status: 200 });
            } else{
                  return new Response(JSON.stringify({ message: 'Failed to update order status' }), { status: 500 });
            }
      } catch (error) {
            return new Response(JSON.stringify({ message: 'Error updating order status' }), { status: 500 });
      }
}