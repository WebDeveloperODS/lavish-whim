// app/api/json-data/delete-product/route.js

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "content", "products.json");

export async function DELETE(request) {
  try {
    const { product_id } = await request.json();

    if (!product_id) {
      return NextResponse.json(
        { error: "product_id is required" },
        { status: 400 }
      );
    }

    // Read the file
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "Products file not found" },
        { status: 404 }
      );
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(fileData);

    // Filter out the product
    const filteredProducts = products.filter(p => p.product_id !== product_id);

    if (filteredProducts.length === products.length) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(filteredProducts, null, 2), "utf-8");

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