import ProductDetails from "app/ui/components/portal/products/product-fullview";

export default async function Page(props){
      const params = await props.params;
      const product_id = await params.product_id
      return <div>
            <ProductDetails product_id={product_id}/>
      </div>
}