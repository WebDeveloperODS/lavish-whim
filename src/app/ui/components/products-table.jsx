'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import products from '../../../../public/content/products.json';
import ProductCard from './product-card';
import { X } from 'lucide-react';
import { Oval } from 'react-loader-spinner';

export default function ProductsTable({ category: propCategory = '' }) {
      const router = useRouter();
      const [products, setProducts] = useState([]);
      const [selectedCategory, setSelectedCategory] = useState('');
      const [filtered, setFiltered] = useState('');
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
            const fetchProducts = async () => {
                  try {
                        setIsLoading(true);

                        const res = await fetch('/api/database/products');

                        if (!res.ok) {
                        throw new Error("Failed to fetch products");
                        }

                        const data = await res.json();
                        console.log("Fetched products:", data);
                        setProducts(Array.isArray(data) ? data : []);

                  } catch (error) {
                        console.error("Product fetch error:", error);
                        setProducts([]);
                  } finally {
                        setIsLoading(false);
                  }
            }
            fetchProducts();
      },[])

      useEffect(() => {
      if (propCategory) {
            setSelectedCategory(propCategory);
      } else {
            setSelectedCategory('');
      }
      }, [propCategory]);
      const getPrice = (product) => {
            return product.onSale ? product.salePrice : product.price;
      }
      const displayedProducts = useMemo(() => {
            let filteredProducts = [...products.sort((a, b) => new Date(b.dated) - new Date(a.dated))];
            filteredProducts = filteredProducts.filter(p => p.status === 'live')
            if(selectedCategory) {
                  const lower = selectedCategory.toLowerCase();         
                  if (lower) {
                        filteredProducts = filteredProducts.filter(p => p.type.toLowerCase() === lower);
                  }
            }
            if(filtered ){
                  if(filtered === 'price-asc'){
                        filteredProducts.sort((a, b) => getPrice(a) - getPrice(b));
                  } else if (filtered === 'price-desc'){
                        filteredProducts.sort((a, b) => getPrice(b) - getPrice(a));
                  } else if (filtered === 'name-asc'){
                        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
                  } else if (filtered === 'name-desc'){
                        filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
                  }
            }
            return filteredProducts;
      }, [products, selectedCategory, filtered]);

      const clearFiltered = () => {
            const newUrl = new URL(window.location);
            newUrl.searchParams.delete('category');
            router.push(newUrl.pathname + newUrl.search, { scroll: false });
      };

      const pretty = selectedCategory.replace(/-/g, ' ');

      // useEffect(() => {
      //       if (filtered === 'price-asc') {
      // },[filtered])

      return (
      <div className="flex flex-col">
            <div className="flex justify-between items-center my-5 lg:my-3">
                  <div className="hidden lg:flex gap-2">
                        {selectedCategory && (
                              <h4 className="flex items-center gap-1 font-semibold text-xs p-2 bg-neutral-200 rounded-full w-fit capitalize">
                                    <X onClick={() => { clearFiltered(); setSelectedCategory('')}} className="cursor-pointer w-4 stroke-[4px] h-auto"/>
                              {pretty}
                              </h4>
                        )}
                  </div>
                  <div className='grid grid-cols-2 w-full lg:w-fit lg:flex items-center gap-2'>
                        <select className='flex items-center gap-1 w-full lg:w-fit font-semibold text-xs py-2 px-3 border border-black rounded-sm w-fit capitalize' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} >
                              <option value=''>All Categories</option>
                              <option value='handbag'>Handbags</option>
                              <option value='crossbody-bag'>Crossbody Bags</option>
                              <option value='tote-bag'>Tote bags</option>
                              <option value='shoulder-bag'>Shoulder bags</option>
                              <option value='canvas-bag'>Canvas bags</option>
                              <option value='bridal-bag'>Bridal bags</option>
                              <option value='handmade-crochet-bag'>Handmade crochet bags</option>
                        </select>
                        <select className='flex items-center gap-1  w-full lg:w-fit font-semibold text-xs py-2 px-3 border border-black rounded-sm w-fit capitalize' value={filtered} onChange={(e) => setFiltered(e.target.value)} >
                              <option value=''>Sort By</option>
                              <option value='price-asc'>Price: Low to High</option>
                              <option value='price-desc'>Price: High to Low</option>
                              <option value='name-asc'>Name: A to Z</option>
                              <option value='name-desc'>Name: Z to A</option>
                        </select>
                  </div>
            </div>
            {
                  isLoading ? <div className="w-full h-96 flex flex-col justify-center items-center gap-4">
                        <Oval 
                              visible={true}
                              height="40"
                              width="40"
                              color="#D4AF37"
                              secondaryColor="#F5DEB3"
                              ariaLabel="oval-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                              strokeWidth={3}
                              strokeWidthSecondary={3}
                        />
                        <h3 className="text-md uppercase tracking-wide font-bold">Searching stock...</h3>
                  </div> : <>
                        <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
                              {displayedProducts.map((product, idx) => (
                                    <ProductCard
                                          key={product.id ?? idx}
                                          product={product}
                                    />
                              ))}
                        </div>

                        {displayedProducts.length === 0 && (
                        <p className="text-center text-gray-500 mt-8">
                              {
                                    pretty ? `No products found for “{pretty}”.` : 'No products available at the moment.'
                              }
                        </p>
                        )}
                  </>
            }
      </div>
      );
}