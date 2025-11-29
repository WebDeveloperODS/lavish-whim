import SectionHead2 from "app/ui/components/heading-two";
import AddProduct from "app/ui/home/add-product";

export default function Page(){
      return <div className="px-8 flex flex-col gap-3">
            <SectionHead2 className={'font-bold tracking-wide underline underline-offset-3 decoration-2 decoration-red-700'}>To Add New Product</SectionHead2>
            <AddProduct />
      </div>
}