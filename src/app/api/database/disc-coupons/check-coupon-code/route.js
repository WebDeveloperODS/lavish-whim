import executeQuery from "app/lib/database"
import { NextResponse } from "next/server"

export async function PUT(req){
    try {
        const {coupon_code} =await req.json()
        console.log(coupon_code)
        const data = await executeQuery('SELECT * FROM coupons_table WHERE coupon_code=?;',[coupon_code])
        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json('Unable to check coupon code')
    }
}