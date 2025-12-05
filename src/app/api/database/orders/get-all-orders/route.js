import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";

export async function GET(){
      try {
            const orders = await executeQuery(`
                        SELECT * FROM orders ORDER BY dated DESC;
                  `)
            const orderedProducts = await executeQuery('SELECT * FROM ordered_products;')
            const ordersWithProducts = orders.map(order => {
                  return {
                        ...order,
                        products: orderedProducts.filter(prod => prod.order_id === order.order_id)
                  }
            })
            // console.log(ordersWithProducts);
            return NextResponse.json(ordersWithProducts);
      } catch (error) {
            return new Response({ status: 404, statusText: 'Error fetching orders' });
      }
}