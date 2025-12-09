import executeQuery from 'app/lib/database';
import * as fs from 'fs';
import { NextResponse } from "next/server";
import path from 'path';

async function createProductId() {
  let newId;
  const existingIds = await executeQuery('SELECT product_id FROM products');

  do {
    newId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  } while (existingIds.has(newId)); // Regenerate if ID already exists

  return newId;
}

export async function POST(req) {
      try {
            const data= await req.json();
            // console.log('data from frontend: ', data)
            const productId = await createProductId();
            await executeQuery(`
                        INSERT INTO products (
                        product_id,
                        title, 
                        price,
                        category, 
                        type, 
                        images, 
                        colors, 
                        bestSelling, 
                        gender, 
                        description, 
                        onSale, 
                        salePrice, 
                        dated, 
                        last_updated_on, 
                        status
                        ) 
                        VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW(),?)
                  `,[productId, data.title, data.price, data.category, data.type, JSON.stringify(data.images), JSON.stringify(data.colors), data.bestSelling, data.gender, data.description, data.onSale, data.salePrice, data.status]);
            // console.log('Database upload result: ', upload)

            return NextResponse.json('Success')
      } catch  {
            return NextResponse.json('Unsuccess')
      }
}
