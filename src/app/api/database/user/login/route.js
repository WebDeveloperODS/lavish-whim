import executeQuery from "app/lib/database";
import { NextResponse } from "next/server";

export async function POST(req){
      try {
            const { username, password } = await req.json();
            console.log('Login Attempt:', { username, password });

            const response = await executeQuery('SELECT * FROM users WHERE username=? AND password=?',[username,password]);
            if(response.length === 0){
                  return NextResponse.json('Unsuccessful')
            }
            return NextResponse.json('Successful')
      } catch (error) {
            console.error('Login Error:', error);
            return NextResponse.json('Unsuccessful')
      }
}