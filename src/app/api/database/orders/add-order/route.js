import executeQuery from "app/lib/database"
import { NextResponse } from "next/server"

export async function POST(req){
      try {
            const data = await req.json()
            // console.log(data)
            const products = data.products ?? []
            const customer = data.customer;
            const address = data.address;
            // console.log(products, customer, address)
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
                        dated TIMESTAMP
                  );
            `)
            await executeQuery(`
                  CREATE TABLE IF NOT EXISTS ordered_products (
                        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT(UUID()) ,
                        order_id CHAR(36) NOT NULL,
                        product_id TEXT NOT NULL,
                        title TEXT NOT NULL,
                        image TEXT,
                        qty INT NOT NULL,
                        price TEXT NOT NULL,
                        discounted BOOLEAN DEFAULT FALSE,
                        discounted_price TEXT DEFAULT 0,
                        FOREIGN KEY (order_id) REFERENCES orders (order_id));
            `)
            const response = await executeQuery('INSERT INTO orders (customerName,contactNo,email,gender, street,city,state,country,zipCode,dated) VALUES (?,?,?,?,?,?,?,?,?,NOW());',
                  [customer.fullname, customer.contact, customer.email, customer.gender, address.street, address.city, address.state, address.country, address.zipCode ?? '']
            )
            if(response){
                  const orderData = await executeQuery('SELECT order_id FROM orders WHERE dated=NOW() AND customerName=? AND contactNo=? AND email=?;',[customer.fullname, customer.contact, customer.email])
                  const orderId = orderData[0].order_id
                  const values = products.map(p => [
                        orderId,
                        p.id,
                        p.title,
                        p.image,
                        p.qty,
                        p.price,
                        p.discounted,
                        p.discountedPrice ?? "0"
                  ])
                  const placeholders = values.map(() => "(?,?,?,?,?,?,?,?)").join(",")

                  const resp = await executeQuery(
                  `INSERT INTO ordered_products 
                  (order_id,product_id,title,image,qty,price,discounted,discounted_price) 
                  VALUES ${placeholders}`,
                  values.flat()
                  )

                  if(resp){
                        return NextResponse.json({status: 200 , message: 'Successful'})
                  }else{
                        return NextResponse.json({status: 302, message: 'Failed to add ordered products.'})
                  }
                  
            }else{
                  return NextResponse.json({status: 302, message: 'Failed to add order customer details.'})
            }
      } catch {
            return NextResponse.json({status: 500})
      }
}