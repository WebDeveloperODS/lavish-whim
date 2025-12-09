import executeQuery from "app/lib/database"
import { NextResponse } from "next/server"

export async function POST(req){
      try {
            const data = await req.json()
            console.log(data)
            const products = data.products ?? [];
            const customer = data.customer;
            const address = data.address;
            const payment = data.payment;
            console.log(products, customer, address)
            await executeQuery(`
                  CREATE TABLE IF NOT EXISTS orders (
                        order_id CHAR(36) NOT NULL DEFAULT(UUID()),
                        customerName TEXT,
                        contactNo TEXT,
                        email TEXT,
                        gender TEXT,
                        street TEXT,
                        city TEXT,
                        state TEXT,
                        country TEXT,
                        zipCode TEXT,
                        subTotal TEXT,
                        discountTotal TEXT,
                        coupon_code TEXT,
                        couponDisc TEXT,
                        total TEXT,
                        payment_thru TEXT,
                        payment_status TEXT,
                        orderStaus ENUM("completed","new","cancelled","under packaging","list for delivery") DEFAULT "new",
                        dated TIMESTAMP
                  );
            `)
            await executeQuery(`
                  CREATE TABLE IF NOT EXISTS ordered_products (
                        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT(UUID()) ,
                        order_id CHAR(36) NOT NULL,
                        product_id TEXT NOT NULL,
                        title TEXT NOT NULL,
                        colour TEXT NOT NULL,
                        image TEXT,
                        qty INT NOT NULL,
                        price TEXT NOT NULL,
                        discounted BOOLEAN DEFAULT FALSE,
                        discounted_price TEXT DEFAULT 0,
                        FOREIGN KEY (order_id) REFERENCES orders (order_id));
            `)
            const result = await executeQuery(
                  `INSERT INTO orders 
                  (customerName, contactNo, email, gender, street, city, state, country, zipCode, dated, subTotal, discountTotal, coupon_code, couponDisc, total, payment_thru, payment_status) 
                  VALUES (?,?,?,?,?,?,?,?,?, NOW(),?,?,?,?,?,?,?)
                  RETURNING order_id;`,
                  [
                  customer.fullname,
                  customer.contact,
                  customer.email,
                  customer.gender,
                  address.street,
                  address.city,
                  address.state,
                  address.country,
                  address.zipCode ?? '',
                  payment.subTotal,
                  payment.discountTotal,
                  payment.coupon,
                  payment.couponDisc,
                  payment.total,
                  payment.paymentThru,
                  payment.paymentStatus
                  ]
            );

                  // ✅ DIRECT order id
            const orderId = result[0].order_id;

            // const orderData = await executeQuery('SELECT order_id FROM orders WHERE dated=NOW() AND customerName=? AND contactNo=? AND email=?;',[customer.fullname, customer.contact, customer.email])
            // console.log('Order data: ', orderData)
            // const orderId = orderData[0].order_id
            const values = products.map(p => [
                  orderId,
                  p.id,
                  p.title,
                  p.colour,
                  p.image,
                  p.qty,
                  p.price,
                  p.discounted ?? '',
                  p.discountedPrice ?? '0'
            ])
            const placeholders = values.map(() => "(?,?,?,?,?,?,?,?,?)").join(",")

            const resp = await executeQuery(
            `INSERT INTO ordered_products 
            (order_id,product_id,title,colour,image,qty,price,discounted,discounted_price) 
            VALUES ${placeholders}`,
            values.flat()
            )
            // console.log(resp)
            if(resp ){
                  return NextResponse.json({status: 200 , message: 'Successful'})
            }else{
                  return NextResponse.json({status: 302, message: 'Failed to add ordered products.'})
            }
            
      } catch (error) {
            console.error(error)
            return NextResponse.json({status: 500})
      }
}