'use client'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/product-card';
import Link from 'next/link';
import { Oval } from 'react-loader-spinner';

export default function FeaturedProducts() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/database/products/best-eight');
                const data = await res.json();
                setProducts(data);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, [])

    return (
        <div className='container flex flex-col gap-3 py-14 lg:py-20'>
            <h1 className='text-3xl font-semibold italic underline underline-offset-4'>Featured Products</h1>
            {
                isLoading ? <div className="w-full h-96 flex flex-col justify-center items-center gap-4">
                        <Oval 
                            visible={true}
                            height="30"
                            width="30"
                            color="#D4AF37"
                            secondaryColor="#F5DEB3"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            strokeWidth={3}
                            strokeWidthSecondary={3}
                        />
                        <h3 className="text-sm uppercase tracking-wide font-bold">Exploring Featured Products...</h3>
                    </div> :<>
                    <div className='mt-4 hidden lg:grid lg:grid-cols-4 gap-2 w-full border-b border-neutral-100 pb-10 mb-6'>
                        {products.slice(0, 8).map((product, index) => <ProductCard product={product} key={index} />)}
                    </div>
                    <div className='mt-4 grid grid-cols-2 lg:hidden gap-3 w-full border-b border-neutral-100 pb-10 mb-6'>
                        {products.slice(0, 6).map((product, index) => <ProductCard product={product} key={index} />)}
                    </div>
                </>
            }
            <Link href='/bags-by-lavish-whim' className='border border-black text-md lg:text-lg py-2 px-5 rounded-sm w-fit mx-auto hover:bg-black hover:text-white transition-all ease-in-out duration-300'>
                Explore More Products
            </Link>
        </div>
    )
}
