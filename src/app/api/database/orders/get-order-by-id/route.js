import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";

export async function PUT(req){
    try {
        const {order_id} = await req.json();
        console.log(order_id)
        const order = await executeQuery(`SELECT * FROM orders WHERE order_id = ?`, [order_id])
        const orderedProducts = await executeQuery(`SELECT * FROM ordered_products WHERE order_id = ?`, [order_id])
        const orderWithProducts = {
            ...order[0],
            products: orderedProducts
        }
        console.log('Order:', orderWithProducts)
        return NextResponse.json(orderWithProducts)
    } catch (error) {
        return NextResponse.json({message: 'Failed to fetch order', status: 500})
    }
}