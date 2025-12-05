import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";

export async function DELETE(req){
    try {
        const {order_id} = await req.json()
        // console.log('Order to delete: ', order_id);
        await executeQuery('DELETE FROM ordered_products WHERE order_id=?;',[order_id])
        await executeQuery('DELETE FROM orders WHERE order_id=?;',[order_id])
        return NextResponse.json({status: 200})
    } catch {
        return NextResponse.json({status: 500, message: 'Failed to delete order'})
    }
}