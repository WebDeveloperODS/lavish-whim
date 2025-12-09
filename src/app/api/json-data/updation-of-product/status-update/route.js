import { NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";
import executeQuery from "app/lib/database";

export async function PUT(req) {
  try {
    const { product_id, status } = await req.json();
    console.log(product_id, status)
    await executeQuery(`UPDATE products SET status=?, last_updated_on=NOW() WHERE product_id=?;`, [
      status,
      product_id,
    ]);
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