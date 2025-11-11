import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
      try {
            const data= await req.json();
            console.log('data from frontend: ', data)
            return NextResponse.json('Success')
      } catch  {
            return NextResponse.json('Unsuccess')
      }
}