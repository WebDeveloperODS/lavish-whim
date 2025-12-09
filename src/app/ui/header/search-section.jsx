'use client'
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import Image from "next/image";
import { useRef } from "react";

const SearchSection = () => {
      const [searchCall, setSearchCall] = useState(false)
      const [searchText, setSearchText] = useState('');
      const [productsList, setProductsList] = useState([]);
      const [products, setProducts] = useState([]);
      useEffect(() => {
            const fetchProducts = async () => { 
                  const res = await fetch('/api/database/products');
                  const data = await res.json();
                  setProducts(data);
                  setProductsList(data);
            }
            fetchProducts();
      }, [])    
      const searchRef = useRef(null)
      useEffect(()=> {
            let filtered = [...products];
            if(searchText.trim() != ''){
                  filtered = filtered.filter(p => p.title.toLowerCase().includes(searchText.toLowerCase()));      
            }
            setProductsList(filtered);
      },[searchText])
      const handleBackdropClick = (e) => { 
            if (searchRef.current && !searchRef.current.contains(e.target)) 
            {
                  setSearchCall(false);
                  setSearchText('');
            } 
      };
      return  <div className={`flex items-center gap-3 w-fit pl-2 ${searchCall ? 'bg-neutral-100/60 rounded-md shadow-sm shadow-neutral-400' : ''}`} onClick={handleBackdropClick}>
            {
                  searchCall ? <IoIosCloseCircle onClick={() => setSearchCall(false)} className='h-6 w-auto text-neutral-500 cursor-pointer'/> : <FaSearch onClick={() => setSearchCall(true)} className='h-4 w-auto text-neutral-800 cursor-pointer' />
            }
            {
                  searchCall && <div ref={searchRef} className='relative w-full max-w-[250px]'>
                        <input type='text' name="searchText" id="searchText" value={searchText || ''} onChange={(e) => setSearchText(e.target.value)} className='w-full p-2 bg-transparent text-sm' placeholder='Search for products...' />
                        {
                              searchCall && searchText.trim() != '' && productsList.length > 0 && <div className='absolute top-full left-0 z-50 bg-white shadow-md shadow-neutral-300 w-[300px] max-w-[300px] max-h-[400px] overflow-y-auto'>
                                    {productsList.map((product, index) => (
                                          <div key={index} className='flex gap-3 p-3 border-b last:border-b-0 hover:bg-neutral-100 cursor-pointer'>
                                                <Image src={product.images[0]} alt={product.title} height={50} width={50} className='h-12 w-12 object-cover object-center'/>
                                                <h4 className='font-semibold text-sm'>{product.title}</h4>
                                          </div>
                                    ))}
                              </div>
                        }
                  </div>
            }
            
      </div>
}

export default SearchSection