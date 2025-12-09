import { NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";
import executeQuery from "app/lib/database";

export async function PUT(req) {
  try {
    const data = await req.json();
    console.log(data)
    await executeQuery(
      `UPDATE products SET title=?, price=?, category=?, type=?, colors=?, bestSelling=?, gender=?, description=?, onSale=?, salePrice=?, status=?, last_updated_on=NOW() WHERE product_id=?;`,
      [
        data.title, 
        data.price,
        data.category,
        data.type,
        JSON.stringify(data.colors),
        data.bestSelling,
        data.gender,
        data.description,
        data.onSale,  
        data.salePrice,
        data.status,
        data.product_id,
      ]
    );

    return NextResponse.json({
      message: "Product status updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}