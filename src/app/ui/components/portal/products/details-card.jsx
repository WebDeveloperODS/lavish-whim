'use client';
import Image from 'next/image';
import Link from 'next/link';

function formatPKR(num) {
  return new Intl.NumberFormat('en-PK', { style: 'decimal', minimumFractionDigits: 0 }).format(num);
}

const ProductStatus = ({productId, status,reload}) => {
      const updateStatus = async () => {
            let newStatus = status === 'live' ? 'not-live' : 'live'
            const response = await fetch('/api/json-data/updation-of-product/status-update',{
                  method: 'PUT',
                  body: JSON.stringify({product_id: productId, status:newStatus})
            })
            const output = await response.json()
            if(output.status === 200){
                  reload(true)
            }
      }
      return(
            <div onClick={updateStatus} className='flex items-center gap-2 cursor-pointer'> 
                  <h3 className=''>Live</h3> 
                  <div className={`w-8 h-4 p-1 flex items-center ${status === 'live' ? 'justify-start bg-green-600/60':'justify-end bg-neutral-200'} rounded-full border-2 border-black`}>
                        <div className={`w-2 h-2 bg-black rounded-full`}/>
                  </div> 
                  <h3 className=''>Not live</h3>
            </div>
      )
}

export default function DetailsCard({ product, callReload }) {
      const defaultImg = product.images[0];

      return (
      <div className="grid grid-cols-[12%_88%] min-h-32 p-2 border rounded-sm shadow-sm ">
            <div className="relative h-full w-full cursor-pointer overflow-hidden">
                  <Image src={defaultImg} alt={product.title} fill className="object-cover object-center transition-transform duration-300 hover:scale-105"/>
            </div>

            <div className="flex flex-col items-start p-2 gap-1">
                  <h3 className="w-fit text-sm lg:text-lg font-bold capitalize lg:tracking-wide hover:underline cursor-pointer">
                        {product.title}
                  </h3>
                  <div className="grid grid-cols-3 gap-x-8 gap-y-2 flex-wrap w-full">
                        <div className='flex text-sm gap-2'>
                              <h3 className='font-bold'>Price: </h3>
                              <h3 className=''>{formatPKR(product.price)}</h3>
                        </div>
                        <div className='flex text-sm gap-2'>
                              <h3 className='font-bold'>Status: </h3>
                              <h3 className=''><ProductStatus reload={callReload} productId={product.product_id} status={product.status}/></h3>
                        </div>
                        <div className='flex text-sm gap-2'>
                              <h3 className='font-bold'>Category: </h3>
                              <h3 className='capitalize'>{`${product.type.replace('-',' ')} - ${product.category}`}</h3>
                        </div>
                        <div className='flex text-sm gap-2'>
                              <h3 className='font-bold'>Best Selling: </h3>
                              <h3 className=''>{product.bestSelling === "true" ? 'Yes' : 'No'}</h3>
                        </div>
                        <div className='flex text-sm gap-2'>
                              <h3 className='font-bold'>On Sale: </h3>
                              <h3 className=''>{product.onSale === "true" ? <>Yes - {formatPKR(product.salePrice)}</> : 'No'}</h3>
                        </div>
                        <div className='flex text-sm gap-2'>
                              <h3 className='font-bold'>Added On: </h3>
                              <h3 className=''>{product.dated.split('T')[0].split('-')[2]}-{product.dated.split('T')[0].split('-')[1]}-{product.dated.split('T')[0].split('-')[0]}</h3>
                        </div>
                  </div>
                  <Link href={`/portal/dashboard/products-list/${product.product_id}`} className='py-1 px-2 rounded-sm font-semibold text-sm border-2 hover:bg-red-700 text-red-700 hover:text-white border-red-700 mt-2'>Checkout Details</Link>
            </div>
    </div>
  );
}