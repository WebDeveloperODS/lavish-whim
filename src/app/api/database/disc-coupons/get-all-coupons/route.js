import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const data = await executeQuery('SELECT * FROM coupons_table ORDER BY created_on DESC;');
        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return NextResponse.json({status: 500})
    }
}