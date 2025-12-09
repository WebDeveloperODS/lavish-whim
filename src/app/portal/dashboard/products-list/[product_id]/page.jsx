'use client'
import ProductDetails from "app/ui/components/portal/products/product-fullview";
import { ChevronLeftCircle } from "lucide-react";
import Link from "next/link";

export default async function Page(props){
      const params = await props.params;
      const product_id = await params.product_id
      return <div className="container flex flex-col gap-2">
            <Link href="/portal/dashboard/products-list" className="flex items-center gap-2 text-xs bg-black text-white font-bold italic tracking-wide w-fit border px-2 py-1 border-black rounded-full"><ChevronLeftCircle className="w-4 h-auto"/> Return</Link>
            <ProductDetails product_id={product_id}/>
      </div>
}