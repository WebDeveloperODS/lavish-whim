'use client';
import Image from 'next/image';
import { useState } from 'react';
import ProductDetailsPopUp from './product-details-popup';
import { event } from 'app/lib/facebook-pixels';

function formatPKR(num) {
  return new Intl.NumberFormat('en-PK', { style: 'decimal', minimumFractionDigits: 0 }).format(num);
}

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const allImages = JSON.parse(product.images);
  const hasHoverImg = allImages[1] !== undefined;
  const defaultImg = allImages[0];
  const hoverImg = allImages[1] ?? defaultImg;

  return (
    <div className="flex flex-col border rounded-sm shadow-sm overflow-hidden h-full">
      <div
        className="relative min-h-[12rem] h-[13rem] lg:h-[21rem] w-full cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={isHovered && hasHoverImg ? hoverImg : defaultImg}
          alt={product.title}
          fill
          onClick={() => {event("Product viewed", {
            product: product.title,
            product_id: product.id
          });setOpenPop(true)}}
          className="object-cover object-center transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.onSale && (
          <span className="absolute bottom-4 left-4 bg-neutral-700 text-white text-xs font-extrabold uppercase tracking-wide rounded-xl px-2 py-1">
            Sale
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between flex-grow p-4 gap-3">
        <h3 onClick={() => {event("Product viewed", {
          product: product.title,
          product_id: product.id
        });setOpenPop(true)}} className="lg:line-clamp-2 text-md lg:text-lg font-bold capitalize lg:tracking-wide hover:underline cursor-pointer">
          {product.title}
        </h3>

        <div className="mt-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-1 lg:gap-2">
            {product.onSale ? (
              <>
                <span className="text-xs lg:text-sm line-through text-gray-500">
                  Rs. {formatPKR(product.price)} PKR
                </span>
                <span className="text-sm lg:text-lg font-semibold text-red-600">
                  Rs. {formatPKR(product.salePrice)} PKR
                </span>
              </>
            ) : (
              <span className="text-sm lg:text-lg font-semibold">
                Rs. {formatPKR(product.price)} PKR
              </span>
            )}
          </div>
          <ProductDetailsPopUp product={product} openCall={openPop} setOpenCall={setOpenPop}/>
        </div>
      </div>
    </div>
  );
}