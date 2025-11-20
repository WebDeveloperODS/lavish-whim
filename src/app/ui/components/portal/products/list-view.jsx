'use client';

import { useEffect, useState } from 'react';
import DetailsCard from './details-card';

export default function ListView({ selectedCategory }) {
      const [reload, setReload] = useState(false)          
      const [products, setProducts] = useState([]);

      async function loadProducts() {
            try {
                  const res = await fetch(`/content/products.json`);
                  const data = await res.json();
                  setProducts(data);
            } catch (error) {
                  console.error("Failed to load products:", error);
            }
      }
      useEffect(() => {
            loadProducts();
      }, []);

      const filteredProducts = selectedCategory ? products.filter( (p) => p.type?.toLowerCase() === selectedCategory.toLowerCase()) : products;

      useEffect(() => {
            if(reload === true){
                  loadProducts()
                  setReload(false)
            }
      },[reload])

      return (
      <div className="flex flex-col">

            <div className="w-full grid grid-cols-1 gap-3 lg:gap-6">
                  {filteredProducts.map((product, idx) => ( <DetailsCard key={product.id ?? idx} product={product} callReload={setReload}/> ))}
            </div>

            {filteredProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
                  {
                        selectedCategory ? <>No products found for “{selectedCategory}”.</> : <>No category selected</>
                  }
            </p>
            )}
      </div>
      );
}
