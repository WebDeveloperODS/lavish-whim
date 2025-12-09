// app/api/json-data/delete-product/route.js

import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { product_id } = await request.json();

    if (!product_id) {
      return NextResponse.json(
        { error: "product_id is required" },
        { status: 400 }
      );
    }

    await executeQuery('DELETE FROM products WHERE product_id = ?;', [product_id]);

    return NextResponse.json(
      { status: 200 }
    );

  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}