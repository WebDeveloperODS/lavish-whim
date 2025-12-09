import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";

export async function GET(){
      try {
            const products = await executeQuery("SELECT * FROM products")
            // console.log("Products fetched:", products.length)
            return NextResponse.json(products)
      } catch (error) {
            console.error("Get products error:", error)
            return NextResponse.json("Failed to fetch products")
      }
}