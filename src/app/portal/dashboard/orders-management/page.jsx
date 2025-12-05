import SectionHead1 from "app/ui/components/main-heading";
import OrdersTable from "app/ui/components/portal/orders/orders-table";

export default function Page(){
      return <div className="container">
            <SectionHead1 className={'font-bold tracking-wide underline underline-offset-3 decoration-2 decoration-red-700'}>Orders</SectionHead1>
            <OrdersTable />
      </div>
}