import { NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";
import executeQuery from "app/lib/database";

export async function PUT(req) {
  try {
    const { product_id, bestSelling } = await req.json();

    console.log("Received data for update:", { product_id, bestSelling });
    await executeQuery(`UPDATE products SET bestSelling=?, last_updated_on=NOW() WHERE product_id=?;`, [
      bestSelling,
      product_id,
    ]);
    return NextResponse.json({
      message: "Product bestSelling updated successfully",
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