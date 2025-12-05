import { NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";

export async function PUT(req) {
  try {
    const { product_id, bestSelling } = await req.json();
    // console.log(product_id, status)
    if (!product_id || bestSelling === undefined) {
      return NextResponse.json(
        { error: "product_id and bestselling are required" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "public/content/products.json");

    const fileData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(fileData);

    const productIndex = products.findIndex((p) => p.product_id === product_id);

    if (productIndex === -1) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    products[productIndex].bestSelling = bestSelling;
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");

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