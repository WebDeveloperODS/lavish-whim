import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const data = await req.json();
        console.log('Coupon Data: ',data)
        await executeQuery('INSERT INTO coupons_table (title, coupon_code,discount_percentage,created_on) VALUES (?,?,?,NOW())',[data.title, data.coupon_code, data.discount_percentage])
        return NextResponse.json({status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({status: 500})
    }
}