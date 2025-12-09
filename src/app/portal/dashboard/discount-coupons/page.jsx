import SectionHead1 from "app/ui/components/main-heading";
import AddCoupon from "app/ui/components/portal/discount-coupons/add-coupon";
import CouponsTable from "app/ui/components/portal/discount-coupons/coupons-table";

export default function Page(){
    return (
        <div className="flex flex-col gap-3">
            <SectionHead1 className={'font-bold tracking-wide underline underline-offset-3 decoration-2 decoration-red-700'}>Discount Coupons</SectionHead1>
            <AddCoupon />
            <CouponsTable />
        </div>
    )
}