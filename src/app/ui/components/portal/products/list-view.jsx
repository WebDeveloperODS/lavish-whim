'use client';

import { useEffect, useState } from 'react';
import DetailsCard from './details-card';

export default function ListView({ countFunc, productsFilter, searchContent,selectedCategory }) {
      const [reload, setReload] = useState(false)          
      const [products, setProducts] = useState([]);
      async function loadProducts() {
            try {
                  const res = await fetch(`/content/products.json`);
                  const data = await res.json();
                  setProducts(data);
                  // countFunc(data.length)
            } catch (error) {
                  console.error("Failed to load products:", error);
            }
      }
      useEffect(() => {
            loadProducts();
      }, []);
      const byProductFilter = (product) => {
            if (!productsFilter) return true;

            switch (productsFilter) {
                  case "best-selling-yes":
                        return product.bestSelling === 'true';
                  case "best-selling-no":
                        return product.bestSelling === 'false';
      
                  case "status-live":
                        return product.status === 'live';
                  case "status-not-live":
                        return product.status === 'not-live';
      
                  case "with-discount":
                        return product.onSale ==='true';
                  case "with-no-discount":
                        return product.onSale ==='false';
      
                  default:
                        return true;
            }
      };
      const byCategory = (product) => {
            if (!selectedCategory) return true;   // No category selected → show all
            return product.type?.toLowerCase() === selectedCategory.toLowerCase();
      };
      const bySearchContent = (product) => {
            if (!searchContent) return true;   // No category selected → show all
            return product.title?.toLowerCase().includes(searchContent.toLowerCase());
      };
      const filteredProducts = products.sort((a, b) => new Date(b.dated) - new Date(a.dated)).filter(bySearchContent).filter(byCategory).filter(byProductFilter);
      countFunc(filteredProducts.length)

      

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
