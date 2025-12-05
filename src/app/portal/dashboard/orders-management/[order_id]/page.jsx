import OrderDetails from "app/ui/components/portal/orders/order-details";
import { ChevronLeft } from "lucide-react";
import { ChevronLeftCircle } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Page({ params }) {
  const { order_id } = params;
  return (
    <div className="container flex flex-col gap-2">
      <Link href="/portal/dashboard/orders-management" className="flex items-center gap-2 text-xs bg-black text-white font-bold italic tracking-wide w-fit border px-2 py-1 border-black rounded-full"><ChevronLeftCircle className="w-4 h-auto"/> Return</Link>
      <OrderDetails order_id={order_id} />
    </div>
  );
}
