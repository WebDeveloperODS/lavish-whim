import executeQuery from "app/lib/database"
import { NextResponse } from "next/server"

export async function GET(){
      try {
            const products = await executeQuery("SELECT * FROM products WHERE bestSelling=1 ORDER BY dated DESC,last_updated_on DESC LIMIT 8")
            // console.log("Best eight products fetched:", products.length)
            return NextResponse.json(products)
      } catch (error) {
            console.error("Get best eight products error:", error)
            return NextResponse.json("Failed to fetch best eight products")
      }
}