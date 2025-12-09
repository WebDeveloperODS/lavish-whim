import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";

export async function DELETE(req){
    try{
        const {id} = await req.json();
        await executeQuery('DELETE FROM coupons_table WHERE id=?',[id]);
        return NextResponse.json({status:200})
    } catch {
        console.log('Failed to delete coupon')
        return NextResponse.json({status:500})
    }
}