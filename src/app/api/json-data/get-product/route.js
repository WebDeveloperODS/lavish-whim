import { NextResponse } from "next/server";
import path from "path";
import * as fs from 'fs'
import executeQuery from "app/lib/database";
export async function PUT(req){
      try {
            const {product_id} = await req.json();
            const product = await executeQuery('SELECT * FROM products WHERE product_id=?',[product_id]);
            // const filePath = path.join(process.cwd(), "public/content/products.json")
            // const fileData= fs.readFileSync(filePath, 'utf-8')
            // const products = JSON.parse(fileData)
            // const productById = products.filter(p => p.product_id === product_id)
            // console.log(product)
            return NextResponse.json(product[0])
      } catch (error) {
            console.error(error)
            return NextResponse.json({message: 'Failed to get product details', status: 500})            
      }
}